import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import { ItemStep, ItemStepHeader } from '@/components/pages/support/item-step';
import { useState } from 'react';
import InfoUserStep from '@/components/pages/support/InfoUserStep';
import SignStep from '@/components/pages/support/SignStep';
import { useRouter } from 'next/router';
import InfoSim from '@/components/pages/support/unlock-sim/InfoSim';
import InfoSeriSimStep from '@/components/pages/support/unlock-sim/InfoSeriSimStep';
import AuthenticateStep, { InputOtpStep } from '@/components/pages/support/subscriber-information/AuthenticateStep';

const STEPS_2_WAY = [
  {
    title: 'Bước 1. Xác định tình trạng thuê bao',
    shortTitle: '',
    description: '',
    content: (submit: Function) => <></>,
    doneDescription: (v: any) => (
      <>
        Thực hiện mở khóa cho số thuê bao <b>{v.phone}</b>
      </>
    )
  },
  {
    title: 'Bước 2. Nhập số Serial trên phôi Sim',
    shortTitle: 'Số Serial trên phôi Sim',
    description: 'Số Serial nằm trên phôi Sim, bắt đầu bằng 087',
    content: (submit: Function) => <InfoSeriSimStep submit={submit} />,
    doneDescription: (v: any) => (
      <>
        Số seri <b>{v.seri}</b>
      </>
    )
  },
  {
    title: 'Bước 3. Chụp & xác nhận thông tin',
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
    title: 'Bước 4. Ký điện tử',
    shortTitle: 'Ký điện tử',
    description: (
      <>
        Các thông tin và chữ ký của bạn sẽ được tự động điền vào <b>Phiếu xác nhận thông tin thuê bao</b>
      </>
    ),
    doneDescription: (v: any) => (
      <>
        Các thông tin và chữ ký của bạn sẽ được tự động điền vào <b>Phiếu xác nhận thông tin thuê bao</b>
      </>
    ),
    content: (submit: Function) => (
      <SignStep
        submit={submit}
        classNameSignature="right-10 bottom-10 md:right-10 md:bottom-14 xl:right-10 xl:bottom-16 w-[154px] h-[40px] md:w-[264px] md:h-[56px] xl:w-[308px] xl:h-[72px]"
        src={''}
      />
    )
  }
];

const STEPS_1_WAY = [
  {
    title: 'Bước 1. Xác định tình trạng thuê bao',
    shortTitle: '',
    description: '',
    content: (submit: Function) => <></>,
    doneDescription: (v: any) => (
      <>
        Thực hiện mở khóa cho số thuê bao <b>{v.phone}</b>
      </>
    )
  },
  {
    title: 'Bước 2. Xác thực chủ sở hữu thuê bao',
    shortTitle: 'Xác nhận thông tin thuê bao',
    description: 'Xác thực OTP trên điện thoại',
    doneDescription: (v: any) => 'Đã xác nhận thông tin thuê bao',
    content: (submit: Function, payload: any) => <AuthenticateStep submit={submit} phoneNumber={payload[0]?.phone} />
  },
  {
    title: 'Bước 3. Chụp & xác nhận thông tin cá nhân',
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
    title: 'Bước 4. Ký xác nhận cập nhật thông tin thuê bao',
    shortTitle: 'Ký xác nhận thông tin thuê bao',
    description: 'Các thông tin và chữ ký của bạn sẽ được tự động điền vào Phiếu yêu cầu thay đổi thông tin thuê bao',
    doneDescription: (v: any) => (
      <>
        Chữ ký đã được điền vào <b>Phiếu yêu cầu thay đổi thông tin thuê bao</b>
      </>
    ),
    content: (submit: Function) => <SignStep src={''} submit={submit} />
  },
  {
    title: 'Bước 5. Xác thực & hoàn tất',
    shortTitle: 'Xác thực & hoàn tất',
    description: 'Hoàn thành cập nhật thông tin thuê bao với mã OTP gửi về điện thoại',
    doneDescription: (v: any) => 'Hoàn thành cập nhật thông tin thuê bao với mã OTP gửi về điện thoại',
    content: (submit: Function, payload: any) => <InputOtpStep submit={submit} btnLabel="Hoàn tất" phoneNumber={payload[0]?.phone} />
  }
];

interface PageProps {}
const ActiveSimPage = (props: PageProps) => {
  const router = useRouter();
  const [activeStep, setStep] = useState(0);

  const [steps, setSteps] = useState<any>([]);

  const [payload, setPayload] = useState<any>({});

  const submitValue = (index: number, value: any) => {
    if (payload[0]?.type === '1way' && index == 4) {
      return router.push('/unlock-sim/failed');
    }
    if (payload[0]?.type === '2way' && index == 3) {
      return router.push('/unlock-sim/success');
    }
    const _payload = {
      ...payload,
      [index]: value
    };
    setPayload(_payload);
    setStep(index + 1);
  };

  const onNext = (payload: any) => {
    submitValue(0, payload);
    if (payload.type === '1way') {
      setSteps(STEPS_1_WAY);
    } else {
      setSteps(STEPS_2_WAY);
    }
  };

  return (
    <>
      <Head>
        <title>Itel - Mở khóa Sim</title>
      </Head>
      <HeaderMobileWeb title="Mở khóa Sim" />
      <nav className="sticky md:hidden top-16 bg-neutral-0 p-3 z-50">
        <div className="flex gap-1 justify-center">
          {steps.map((step: any, index: number) => (
            <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
          ))}
        </div>
      </nav>

      <LayoutSupport className="bg-transparent">
        <div className="hidden md:flex">
          <h4 className="text-h-sm font-itel">
            <b>MỞ KHÓA SIM</b>
          </h4>
          <div className="flex justify-end flex-1 gap-1">
            {steps.map((step: any, index: number) => (
              <ItemStepHeader key={index} index={index} title={step.shortTitle} isDone={payload[index]} active={index === activeStep} />
            ))}
          </div>
        </div>

        <div className={steps.length ? 'hidden' : ''}>
          <InfoSim submit={onNext} />
        </div>

        <div className="space-y-2 mt-6">
          {steps.map((step: any, index: number) => (
            <ItemStep
              key={index}
              title={step.title}
              description={payload[index] ? step.doneDescription(payload[index]) : step.description}
              show={index === activeStep}
              isDone={payload[index]}
              onEdit={() => {
                if (index === 0) setSteps([]);
                else setStep(index);
              }}
            >
              {step.content((value: any) => submitValue(index, value), payload)}
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
