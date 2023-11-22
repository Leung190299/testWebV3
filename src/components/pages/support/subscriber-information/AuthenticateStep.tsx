import Svg from '@/components/icon/svg';
import { modal } from '@/libs/modal';
import clsx from 'clsx';
import { FC, useEffect, useRef, useState } from 'react';

import { useLoading } from '@/hooks/useLoading';
import subscriberInfoService from '@/services/subscriberInfoService';
import { getInfoEKYC } from '@/store/cart/selector';
import { AxiosError } from 'axios';
import router from 'next/router';
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux';

const CountDownBtn: FC<{ time: number; onClick: Function; className: string }> = ({ time, onClick, className }) => {
  const [countDown, setCountDown] = useState(time);

  useEffect(() => {
    if (countDown)
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
  }, [countDown]);

  return (
    <button disabled={!!countDown} className={className} onClick={() => onClick()}>
      Gửi lại xác thực {!!countDown && `(${countDown}s)`}
    </button>
  );
};

const CountDown: FC<{ time: number }> = ({ time }) => {
  const [countDown, setCountDown] = useState(time);
  const infoState = useSelector(getInfoEKYC);
  const getOTP = async () => {
    await subscriberInfoService
      .getOTP(infoState.phone || '')
      .then((res) => {})
      .catch((error) => {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        modal.confirm({
          title: 'Thông báo',
          content: <>{dataError?.message}</>,
          rejectLable: '',
          confirmLable: (
            <div className="flex items-center gap-2">
              <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
            </div>
          ),
          onDone() {}
        });
      });
  };
  useEffect(() => {
    if (countDown)
      setTimeout(() => {
        setCountDown(countDown - 1);
      }, 1000);
  }, [countDown]);
  return (
    <button
      onClick={() => {
        setCountDown(180), getOTP();
      }}
      disabled={!!countDown}
      className={clsx('font-bold mt-4 md:mt-6 text-sm md:text-base', !countDown ? 'text-red-500' : 'opacity-30')}
    >
      Gửi lại mã {!!countDown && `(${countDown}s)`}
    </button>
  );
};

export const InputOtpStep: FC<{ submit: Function; btnLabel?: string; phoneNumber: string; numInputs?: number }> = ({
  submit,
  btnLabel = 'Tiếp tục',
  phoneNumber,
  numInputs = 4
}) => {
  const [otp, setOtp] = useState('');
  const refInput: any = useRef();
  const infoState = useSelector(getInfoEKYC);
  const { openLoading, closeLoading } = useLoading();

  const focusInput = () => {
    setOtp('');
    setTimeout(() => refInput.current.focus(), 100);
  };

  const paramsForm: activeModal.ParamsForm = {
    subscribers: [{ phone: infoState.phone || '', checked: false, seriValid: true, seri: otp }],
    img1: infoState.img1,
    img2: infoState.img2,
    img3: infoState.img3,
    ploaigt: infoState.ploaigt,
    psCmnd: infoState.psCmnd,
    psContactPhone: infoState.psContactPhone,
    psGioiTinh: infoState.psGioiTinh == 'nam' ? 'male' : 'female',
    psHoten: infoState.psHoten,
    psdiachi: infoState.psdiachi,
    psnoicap: infoState.placeCode,
    psNgaysinh: infoState.psNgaysinh,
    psplacedate: infoState.psplacedate,
    psQuoctich: "232",
    signatureImage: infoState.signatureImage
  };

  const subUpdateInfo = async () => {
    openLoading();
    await subscriberInfoService
      .subUpdateInfo(paramsForm)
      .then((res) => {
        if (res.code == 200) {
          closeLoading();
          router.push('/subscriber-information/success');
        }
      })
      .catch((error) => {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
            return modal.confirm({
              title: 'Xác thực OTP thất bại',
              content: (
                <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
                  Bạn đã nhập sai mã OTP.
                  <br />
                  Vui lòng kiểm tra và nhập lại. Xác thực OTP chỉ có thể gửi đến thuê bao 1 lần mỗi 3 phút.
                </p>
              ),
              rejectLable: 'Xác thực OTP',
              // confirmLable: ({ done, className }) => <CountDownBtn onClick={handleSubmit} time={countDown} className={className} />,
              onDone() {},
              onClose: () => {}
            });
      })
      .finally(() => {
        closeLoading();
      });
  };

  const handleSubmit = () => {
    subUpdateInfo();
    // submit({ otp });
  };

  return (
    <div className="text-center">

      <p className="mb-5 md:mb-6 text-neutral-500">
        iTel đã gửi một mã xác thực OTP <br /> đến số điện thoại <b className="text-neutral-800">{phoneNumber}</b>
      </p>

      <OtpInput
        containerStyle={{ justifyContent: 'center', gap: 8 }}
        value={otp}
        onChange={setOtp}
        numInputs={numInputs}
        shouldAutoFocus
        renderInput={(props, index) => (
          <input
            {...props}
            ref={(e) => {
              if (index === 0) refInput.current = e;
              props.ref(e);
            }}
            style={{}}
            className=" text-center w-[60px] h-[64px] md:w-[72px] md:h-[80px] rounded-lg border border-neutral-300 p-4 bg-transparent focus:border-neutral-800 font-bold text-2xl md:text-h-sm"
          />
        )}
      />

      <p className="text-neutral-500 mt-5 md:mt-6 text-sm md:text-base">Nhập mã OTP để xác thực</p>
      <CountDown time={180} />
      <button
        disabled={otp?.length !== numInputs}
        type="button"
        className="mt-4 md:mt-10 btn-sm md:btn-md w-[206px] block mx-auto flex-1 btn-primary btn rounded-full"
        onClick={handleSubmit}
      >
        {btnLabel}
      </button>
    </div>
  );
};

const AuthenticateStep: FC<{ submit: Function; phoneNumber: string }> = ({ submit, phoneNumber }) => {
  const [useOtp, setUseOtp] = useState(false);

  if (useOtp) return <InputOtpStep submit={submit} phoneNumber={phoneNumber} />;

  return (
    <>
      {/* <TestBtn options={[]} onClick={(v: string) => openModal()} /> */}

      <img alt="" className="w-full h-full" src="/images/plh_otp.png" />
      <div className="mt-6 rounded-2xl bg-neutral-50 p-4 md:p-6 gap-3 md:gap-6 flex">
        <Svg className="w-6 h-6 md:w-12 md:h-12" src="/icons/bold/otp.svg" />

        <p className="flex-1 text-xs md:text-base">
          iTel đã gửi thông báo xác nhận thông tin thuê bao tới thuê bao <b>{phoneNumber}</b>. Vui lòng thực hiện xác nhận trên điện thoại
          để bắt đầu việc cập nhật thông tin. Trường hợp bạn không nhận được thông báo xác nhận gửi về điện thoại, vui lòng bấm chọn{' '}
          <span onClick={() => setUseOtp(true)} className="font-bold text-red-500 cursor-pointer">
            Xác thực bằng OTP.
          </span>
        </p>
      </div>
    </>
  );
};

export default AuthenticateStep;
