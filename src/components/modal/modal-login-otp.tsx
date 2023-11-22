import Svg from '@/components/icon/svg';
import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import useOtpInput from '@/hooks/useOtpInput';
import { useModal } from '@/libs/modal';
import LoginService from '@/services/loginService';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useCountdown from '@pit-ui/modules/hooks/useCountdown';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ButtonLoading from '../button/button-loading';

type Props = {
  phone: string;
  isRegister: boolean;
  isForgotPassword?: boolean;
  isLookUser?: boolean;
  numInputs: number;
};

const ModalLoginOtp = ({ phone, isRegister, isForgotPassword, isLookUser, numInputs = 4 }: Props) => {
  const { done } = useModal();
  const handlerClose = () => {
    done({ isClose: true, otp: '123', isRegister: isRegister, isLookUser: isLookUser });
  };
  const submitting = useBoolean(false);
  const verify = useBoolean(true);
  const [isLoadOTP, setIsLoadOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const { handleChange, handleFocus, handleKeyDown, inputRefs } = useOtpInput(otp, setOtp);

  const [value, { startCountdown, resetCountdown, stopCountdown }] = useCountdown({ countStart: 60 });

  useEffect(() => {
    verify.value ? startCountdown() : stopCountdown();
  }, [verify.value, startCountdown, stopCountdown]);
  const loginWithOtp = async (phone: string) => {
    const res = LoginService.getOPt(phone);
    await res
      .then((data) => {
        if (data.code == 200) {
        }
      })
      .catch((e) => {
        const errorResult: loginModel.response = e.response.data;
        return toast.error(errorResult.message);
      });
  };
  const handlerReset = () => {
    loginWithOtp(phone);
    void resetCountdown();
    void startCountdown();
  };
  const handleSubmit = async () => {
    // try {
    //   submitting.setTrue();
    //   if (otp !== '1234') {
    //     return setError('Mã OTP không chính xác. Vui lòng thử lại');
    //   }
    //   await done({ otp });
    // } catch (error: any) {
    //   setError(error.message);
    // } finally {
    //   submitting.setFalse();
    // }
    setIsLoadOTP(true);
    const param: loginModel.paramsOTP = {
      password: otp,
      username: phone
    };
    const res = LoginService.loginOTP(param);

    await res
      .then((data) => {
        if (data.code === 200) {
          localStorage.setItem('token', data.result.token);
          localStorage.setItem('user', data.result.msisdn);
          return done({ phone, token: data.result.token });
        }
        setError(data.message);
      })
      .catch((e) => {
        const errorResult: loginModel.response = e.response.data;
        if (errorResult.message.includes('invalid')) {
          setOtp('');
          inputRefs.current[0]?.focus();
          return setError('Mã OTP không chính xác. Vui lòng thử lại');
        }
      })
      .finally(() => {
        setIsLoadOTP(false);
      });
  };
  return (
    <div className="max-md:bg-neutral-100">
      <div className="flex flex-row gap-2 font-bold items-center cursor-pointer -mt-2 max-md:hidden" onClick={handlerClose}>
        <Svg src="/icons/line/arrow-left.svg" width={15} height={15} />
        <p> Quay lại</p>
      </div>
      <HeaderMiddleAndFull title={''} mobileTitle={'Xác thực OTP'} />
      <div className="max-md:hidden mx-auto">
        <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
      </div>
      <div className="container md:px-0 bg-neutral-0 mt-2 py-4 text-subtle-content text-center">
        <p className="max-md:text-left text-neutral-500 mb-4 md:mb-8">
          Một mã xác thực OTP đã được gửi đến số điện thoại <br className="max-md:hidden" />{' '}
          <span className="font-bold max-md:text-neutral-800">{phone || '0877 123 456'}</span>
        </p>
        <div className="space-y-5 md:space-y-6">
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
                  onFocus={(event) => {
                    handleFocus(event)(index);
                    setError('');
                  }}
                  autoComplete="off"
                />
              );
            })}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {isRegister && !error && <p>Nhập mã OTP để đăng ký</p>}
          {!isRegister && !isForgotPassword && !error && <p>Nhập mã OTP để đăng nhập</p>}
          {isForgotPassword && !error && <p>Nhập mã OTP để xác thực SĐT</p>}
          <button disabled={Boolean(value)} className="cursor-pointer" onClick={handlerReset}>
            <b className={!value ? 'text-primary' : ''}>Gửi lại mã {value ? `(${value}s)` : null}</b>
          </button>
        </div>
        <div className="mt-8 md:mt-6 w-full md:w-1/2 mx-auto">
          <ButtonLoading
            className="btn btn-primary rounded-full w-full"
            disabled={otp.length !== numInputs || submitting.value}
            onClick={handleSubmit}
            isLoading={isLoadOTP}
            type="button"
          >
            Tiếp tục
          </ButtonLoading>
        </div>
        {isRegister && (
          <div className="text-center pt-4 md:pd-6">
            <p className="text-sm text-neutral-500">Bằng việc Đăng ký, bạn đã đồng ý với</p>
            <p className="text-sm font-bold text-neutral-800">Điều khoản sử dụng & Chính sách bảo mật của iTel</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalLoginOtp;
