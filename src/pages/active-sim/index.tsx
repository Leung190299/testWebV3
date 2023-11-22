import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import SectionDownload from '@/components/pages/support/section-download';
import { ItemStep, ItemStepHeader } from '@/components/pages/support/item-step';
import { useEffect, useState } from 'react';

import InfoSimStep from '@/components/pages/support/InfoSimStep';
import InfoUserStep from '@/components/pages/support/InfoUserStep';
import SignStep from '@/components/pages/support/SignStep';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { addInfoEKYC } from '@/store/sim/actionSimSlice';

const STEPS = [
  {
    title: 'Bước 1. Thông tin Sim',
    shortTitle: 'Thông tin Sim',
    description: 'Vui lòng hoàn thiện các thông tin theo yêu cầu để bắt đầu sử dụng các dịch vụ tại iTel',
    content: (submit: Function) => <InfoSimStep submit={submit} />,
    doneDescription: (v: any) => (
      <>
        Số thuê bao <b>{v.phone}</b> | Số seri <b>{v.seri}</b>
      </>
    )
  },
  {
    title: 'Bước 2. Chụp & xác nhận thông tin cá nhân',
    shortTitle: 'Chụp & xác nhận thông tin',
    description: 'Chụp ảnh CCCD/ CMND & ảnh chân dung để iTel có thể cập nhật thông tin chính chủ cho thuê bao',
    doneDescription: (v: any) => (
      <>
        Số CCCD/CMND <b>{v.cardNumber}</b> | Họ và tên <b>{v.fullName}</b>
      </>
    ),
    content: (submit: Function) => <InfoUserStep submit={submit} />
  },
  {
    title: 'Bước 3. Ký điện tử',
    shortTitle: 'Ký điện tử',
    description: (
      <>
        Các thông tin và chữ ký của bạn sẽ được tự động điền vào <b>Hợp đồng cung cấp và sử dụng dịch vụ thông tin di động trả trước</b>
      </>
    ),
    doneDescription: (v: any) => (
      <>
        Các thông tin và chữ ký của bạn sẽ được tự động điền vào <b>Hợp đồng cung cấp và sử dụng dịch vụ thông tin di động trả trước</b>
      </>
    ),
    content: (submit: Function) => {
      return (
        <>
          <SignStep
            submit={submit}
            classNameSignature="right-2 bottom-7 sm:right-16 sm:bottom-14 md:right-10 md:bottom-14 xl:right-10 xl:bottom-16 w-[154px] h-[35px] sm:w-[154px] sm:h-[40px] md:w-[264px] md:h-[56px] xl:w-[308px] xl:h-[72px]"
            src={''}
          />
        </>
      );
    }
  }
];

interface PageProps {}
const ActiveSimPage = (props: PageProps) => {
  const router = useRouter();
  const [activeStep, setStep] = useState(0);
  const [payload, setPayload] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(addInfoEKYC({ img4: '', phone: '', seri: '' }));
  },[]);
  const submitValue = (index: number, value: any) => {
    // if (index == 2) {
    //   if (value == 1) return router.push('/active-sim/failed');
    //   else return router.push('/active-sim/success');
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
        <title>Itel - Kích hoạt Sim</title>
      </Head>
      <HeaderMobileWeb title="Kích hoạt Sim" />
      <nav className="sticky md:hidden top-16 bg-neutral-0 p-3 z-50">
        <div className="flex gap-1 justify-center">
          {STEPS.map((step, index) => (
            <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
          ))}
        </div>
      </nav>

      <LayoutSupport className="bg-transparent">
        <div className="hidden md:flex">
          <h4 className="text-h-sm font-itel">
            <b>KÍCH HOẠT SIM</b>
          </h4>
          <div className="flex justify-end flex-1 gap-1">
            {STEPS.map((step, index) => (
              <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
            ))}
          </div>
        </div>

        {activeStep < 2 ? <SectionDownload /> : <div className="mt-8" />}

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
              {step.content((value: any) => submitValue(index, value))}
            </ItemStep>
          ))}
        </div>
      </LayoutSupport>
    </>
  );
};

ActiveSimPage.getLayout = function layout(page: any) {
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

export default ActiveSimPage;
