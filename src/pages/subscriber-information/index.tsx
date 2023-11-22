import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutDefault from '@/components/layout/layout-default';
import LayoutSupport from '@/components/layout/layout-support';
import { ItemStep, ItemStepHeader } from '@/components/pages/support/item-step';
import SectionDownload from '@/components/pages/support/section-download';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import InfoUserStep from '@/components/pages/support/InfoUserStep';
import SignStep from '@/components/pages/support/SignStep';
import { InputOtpStep } from '@/components/pages/support/subscriber-information/AuthenticateStep';
import InfoSimStep from '@/components/pages/support/subscriber-information/InfoSimStep';
import { addInfoEKYC } from '@/store/sim/actionSimSlice';
import { AppDispatch } from '@/store/store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const STEPS = [
  {
    title: 'Bước 1. Thông tin thuê bao',
    shortTitle: 'Thông tin Sim',
    description: 'Vui lòng nhập số thuê bao cần cập nhật thông tin',
    content: (submit: Function) => <InfoSimStep submit={submit} />,
    doneDescription: (v: any) => (
      <>
        Cập nhật thông tin thuê bao <b>{v.phone}</b>
      </>
    )
  },
  // {
  //   title: 'Bước 2. Xác thực chủ sở hữu thuê bao',
  //   shortTitle: 'Xác nhận thông tin thuê bao',
  //   description: 'Xác thực OTP trên điện thoại',
  //   doneDescription: (v: any) => 'Đã xác nhận thông tin thuê bao',
  //   content: (submit: Function, payload: any) => <AuthenticateStep submit={submit} phoneNumber={payload[0]?.phone} />
  // },
  {
    title: 'Bước 2. Chụp & xác nhận thông tin cá nhân',
    shortTitle: 'Chụp & xác nhận thông tin',
    description: 'Xác thực qua chụp ảnh CCCD/ CMND và ảnh chân dung',
    doneDescription: (v: any) => (
      <>
        Số CCCD/CMND <b>{v.cardNumber}</b> | Họ và tên <b>{v.fullName}</b>
      </>
    ),
    content: (submit: Function) => <InfoUserStep submit={submit} />
  },
  {
    title: 'Bước 3. Ký xác nhận cập nhật thông tin thuê bao',
    shortTitle: 'Ký xác nhận thông tin thuê bao',
    description: 'Các thông tin và chữ ký của bạn sẽ được tự động điền vào <b>Hợp đồng yêu cầu thay đổi thông tin thuê bao</b>',
    doneDescription: (v: any) => (
      <>
        Chữ ký đã được điền vào <b>Hợp đồng yêu cầu thay đổi thông tin thuê bao</b>
      </>
    ),
    content: (submit: Function) => <SignStep src={''} submit={submit} />
  },
  {
    title: 'Bước 4. Xác thực & hoàn tất',
    shortTitle: 'Xác thực & hoàn tất',
    description: 'Hoàn thành cập nhật thông tin thuê bao với mã OTP gửi về điện thoại',
    doneDescription: () => 'Hoàn thành cập nhật thông tin thuê bao với mã OTP gửi về điện thoại',
    content: (submit: Function, payload: any) => (
      <InputOtpStep numInputs={5} submit={submit} btnLabel="Hoàn tất" phoneNumber={payload[0]?.phone} />
    )
  }
];

interface PageProps {}
const Page = (props: PageProps) => {
  const router = useRouter();
  const [activeStep, setStep] = useState(0);

  const [payload, setPayload] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(addInfoEKYC({ img4:'', seri:'',phone:'' }));
  },[])
  const submitValue = (index: number, value: any) => {
    // if (index == 3) {
    //   return router.push('/subscriber-information/failed');
    //   return router.push('/subscriber-information/success');
    // }
    const _payload = {
      ...payload,
      [index]: value
    };
    setPayload(_payload);
    setStep(index + 1);
  };

  return (
    <>
      <Head>
        <title>Itel - Cập nhật thông tin thuê bao</title>
      </Head>
      <HeaderMobileWeb title="Cập nhật thông tin thuê bao" />
      <nav className="sticky md:hidden top-16 bg-neutral-0 p-3 z-50">
        <div className="flex gap-1 justify-center">
          {STEPS.map((step, index) => (
            <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
          ))}
        </div>
      </nav>

      <LayoutSupport className="bg-transparent">
        <div className="hidden md:flex gap-4">
          <h4 className="text-h-sm font-itel">
            <b className="hidden xl:inline">CẬP NHẬT THÔNG TIN THUÊ BAO</b>
            <b className="xl:hidden">CẬP NHẬT TT THUÊ BAO</b>
          </h4>
          <div className="flex justify-end flex-1 gap-1">
            {STEPS.map((step, index) => (
              <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
            ))}
          </div>
        </div>

        {/* <SectionDownload /> */}
        {activeStep < 1 ? <SectionDownload /> : <div className="mt-8" />}

        <div className="space-y-2 mt-2">
          {STEPS.map((step, index) => (
            <ItemStep
              key={index}
              title={step.title}
              description={payload[index] ? step.doneDescription(payload[index]) : step.description}
              show={index === activeStep}
              isDone={payload[index]}
              onEdit={() => setStep(index)}
            >
              {step.content((value: any) => submitValue(index, value), payload)}
            </ItemStep>
          ))}
        </div>
      </LayoutSupport>
    </>
  );
};

Page.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {}
  };
});
export { getStaticProps };

export default Page;
