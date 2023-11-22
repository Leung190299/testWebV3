import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import SectionDownload from '@/components/pages/support/section-download';
import { ItemStep, ItemStepHeader } from '@/components/pages/support/item-step';
import { useState } from 'react';
import { useRouter } from 'next/router';

import InfoUserStep from '@/components/pages/support/InfoUserStep';
import InfoSimStep from '@/components/pages/support/change-sim/InfoSimStep';
import SelectTypeSimStep from '@/components/pages/support/change-sim/SelectTypeSimStep';
import AuthenticateStep from '@/components/pages/support/change-sim/AuthenticateStep';
import PaymentStep from '@/components/pages/support/change-sim/PaymentStep';

const STEPS = [
  {
    title: 'Bước 1. Thông tin Sim',
    shortTitle: 'Thông tin Sim',
    description: 'Vui lòng nhập thông tin Sim cần đổi/ cấp lại',
    content: (submit: Function) => <InfoSimStep submit={submit} />,
    doneDescription: (v: any) => (
      <>
        Đổi cấp lại sim <b>{v.phone}</b>
      </>
    )
  },
  {
    title: 'Bước 2. Chọn loại sim cần đổi /cấp lại',
    shortTitle: 'Chọn loại sim cần đổi /cấp lại',
    description: 'Vui lòng nhập thông tin Sim cần đổi/ cấp lại',
    doneDescription: (v: any) => (
      <>
        Đổi/cấp lại <b>{v.typeSim}</b>
      </>
    ),
    content: (submit: Function) => <SelectTypeSimStep submit={submit} />
  },
  {
    title: 'Bước 3. Xác thực chủ sở hữu thuê bao',
    shortTitle: 'Xác nhận thông tin thuê bao',
    description: 'Bạn có thể xác thực quyền sở hữu của mình bằng một trong 3 cách',
    doneDescription: (v: any) =>
      `Đã xác nhận ${
        v.type === 'phone' ? '5 số điện thoại liên hệ gần nhất' : v.type == 'iMei' ? 'số IMEI máy điện thoại' : 'dòng máy điện thoại'
      }`,
    content: (submit: Function, payload: any) => <AuthenticateStep submit={submit} phonNumber={payload[0]?.phone} />
  },
  {
    title: 'Bước 4. Chụp & xác nhận thông tin',
    shortTitle: 'Chụp & xác nhận thông tin',
    description: 'Xác thực qua CCCD/ CMND và chụp ảnh chân dung',
    doneDescription: (v: any) => (
      <>
        Số CCCD/CMND <b>{v.cardNumber}</b> | Họ và tên <b>{v.fullName}</b>
      </>
    ),
    content: (submit: Function) => <InfoUserStep submit={submit} />
  },
  {
    title: 'Bước 5. Thanh toán',
    shortTitle: 'Thanh toán',
    description: 'Thanh toán phụ phí thay mới SIM (Nếu có)',
    doneDescription: (v: any) => 'Thanh toán phụ phí thay mới SIM (Nếu có)',
    content: (submit: Function, payload: any) => (
      <PaymentStep submit={submit} phoneNumber={payload[0]?.phone} typeSim={payload[1]?.typeSim} />
    )
  }
];

interface PageProps {}
const Page = (props: PageProps) => {
  const router = useRouter();
  const [activeStep, setStep] = useState(0);

  const [payload, setPayload] = useState<any>({});

  const submitValue = (index: number, value: any) => {
    if (index == 4) {
      return router.push('/change-sim/failed');
      return router.push('/change-sim/success');
    }
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
        <title>Itel - Đổi/ Cấp lại Sim/ eSim</title>
      </Head>
      <HeaderMobileWeb title="Đổi/ Cấp lại Sim/ eSim" />
      <nav className="sticky md:hidden top-16 bg-neutral-0 p-3 z-10">
        <div className="flex gap-1 justify-center">
          {!!activeStep &&
            STEPS.map((step, index) => (
              <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
            ))}
        </div>
      </nav>

      <LayoutSupport className="bg-transparent">
        <div className="hidden md:flex gap-4">
          <h4 className="text-h-sm font-itel whitespace-nowrap">
            <b>Đổi/ Cấp lại Sim/ eSim</b>
          </h4>
          <div className="flex justify-end flex-1 gap-1 overflow-hidden">
            {!!activeStep &&
              STEPS.map((step, index) => (
                <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
              ))}
          </div>
        </div>

        {/* <SectionDownload /> */}
        {activeStep < 1 ? <SectionDownload /> : <div className="mt-8" />}

        <div className="space-y-2 mt-2">
          {(activeStep ? STEPS : [STEPS[0]]).map((step, index) => (
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
