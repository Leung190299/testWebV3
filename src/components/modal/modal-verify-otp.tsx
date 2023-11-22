import useOtpInput from '@/hooks/useOtpInput';
import { modal, useModal } from '@/libs/modal';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useCountdown from '@pit-ui/modules/hooks/useCountdown';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import HeaderMiddleAndFull from './header/header-middle-and-full';

export type ModalVerifyProps = {
  title?: string;
  guide?: boolean;
  phone: string;
  resend(): any;
  verify(otp: string): ResponseVerifyOtp | Promise<ResponseVerifyOtp>;
  numInputs?: number;
};
export type ResponseVerifyOtp = boolean | { success: boolean; message: string };

const ModalVerifyOtp = ({ title = 'Thông báo', guide: showGuide = true, phone, verify, resend, numInputs = 4 }: ModalVerifyProps) => {
  const { done } = useModal();
  const guide = useBoolean(showGuide);
  const submitting = useBoolean(false);

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { handleChange, handleFocus, handleKeyDown, inputRefs } = useOtpInput(otp, setOtp);

  const [value, { startCountdown, resetCountdown, stopCountdown }] = useCountdown({ countStart: 60 });
  useEffect(() => {
    guide.value ? stopCountdown() : startCountdown();
  }, [guide.value, startCountdown, stopCountdown]);
  useEffect(() => {
    setError('');
  }, [otp]);

  const handleSubmit = async () => {
    try {
      submitting.setTrue();
      if (otp.length !== numInputs) return;
      const isValid = await verify(otp);
      if (typeof isValid === 'boolean') {
        if (isValid === false) throw new Error('Error');
      } else if (isValid.success === false) return setError(isValid.message);

      done({ otp });
    } catch (error: any) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      setError(dataError.message);
    } finally {
      submitting.setFalse();
    }
  };
  const resendOtp = async () => {
    await resend();
    resetCountdown();
    startCountdown();
  };

  return (
    <div>
      <HeaderMiddleAndFull title={title} />
      {!guide.value ? (
        <div className="container md:px-0 bg-neutral-0 mt-2 py-4 text-subtle-content text-center">
          <div className="space-y-5 md:space-y-6">
            <p className="text-left md:text-center">
              iTel đã gửi một mã xác thực OTP
              <br className="max-md:hidden" /> đến số điện thoại <b className="text-base-content">{formatPhoneNumber(phone)}</b>
            </p>
            <div className="text-center text-base-content space-x-2">
              {Array.from({ length: numInputs }, (_, index) => {
                return (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    tabIndex={index + 1}
                    type="tel"
                    className="input w-18 h-20 input-bordered outline-none text-s-md text-center font-medium"
                    size={1}
                    value={otp[index] ?? ''}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={(event) => handleFocus(event)(index)}
                    autoComplete="off"
                  />
                );
              })}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <p>Nhập mã OTP để xác thực</p>
            <button disabled={Boolean(value)} onClick={resendOtp}>
              <b>Gửi lại mã {value ? `(${value}s)` : null}</b>
            </button>
          </div>
          <div className="mt-8 md:mt-6 w-full md:w-1/2 mx-auto">
            <button
              className="btn btn-primary rounded-full w-full"
              disabled={otp.length !== numInputs || submitting.value}
              onClick={handleSubmit}
            >
              Xác nhận
            </button>
          </div>
        </div>
      ) : (
        <div className="container md:px-0 bg-neutral-0 mt-2 py-4">
          <div className="block-img block-video">
            <img
              src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685966734/itel/images/Block_Image_vfkriq.jpg"
              alt="123"
              className="object-cover"
            />
          </div>
          <p className="mt-4 md:mt-6">
            iTel đã gửi<b> thông báo xác nhận </b>đăng ký gói cước tới thuê bao <b>{formatPhoneNumber(phone)}</b>. Vui lòng thực hiện xác
            nhận trên điện thoại để hoàn tất việc đăng ký.
          </p>
          <br />
          <p>
            Trường hợp bạn không nhận được thông báo xác nhận gửi về điện thoại, vui lòng chọn
            <span
              onClick={() => {
                guide.setFalse();
                resend();
              }}
              className="text-red-500 cursor-pointer"
            >
              <b> Xác thực bằng OTP</b>
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ModalVerifyOtp;

export function verifyOtp(data: ModalVerifyProps) {
  return new Promise<{ otp: string }>((resolve, reject) => {
    return modal.open({
      render: <ModalVerifyOtp {...data} />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
      onDone: resolve,
      onClose() {
        reject(new Error('Modal closed'));
      },
      onReject(err) {
        reject(err);
      }
    });
  });
}
