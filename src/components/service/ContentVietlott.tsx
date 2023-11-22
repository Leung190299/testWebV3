import { phoneValidator } from '@/constants/validator.constants';
import Digitalservice from '@/services/Digitalservice';
import { CustomProps } from '@/types/element-type';
import { phoneNumberRegex } from '@/utilities/validator';
import { ErrorMessage } from '@hookform/error-message';
import useCountdown from '@pit-ui/modules/hooks/useCountdown';
import clsx from 'clsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { object } from 'yup';
import ButtonLoading from '../button/button-loading';
import Svg from '../icon/svg';

const OtpInput = ({
  isFocus,
  handleChange,
  ...props
}: CustomProps<{ isFocus: boolean; handleChange: (e: ChangeEvent<HTMLInputElement>) => void }, 'input'>) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isFocus) {
      ref.current?.focus();
    }
  }, [isFocus]);

  return (
    <input
      onChange={(e) => {
        handleChange(e);
        ref.current?.blur();
        // ref.current?.select();
      }}
      {...props}
      ref={ref}
      className="p-4 border border-neutral-300 rounded-xl bg-transparent lg:text-[32px] md:text-[40px] text-2xl md:w-18 w-[60px] text-center font-bold"
    />
  );
};
const PhoneSchemaValidation = object({
  phone: phoneValidator
});
type IProps = { handleClose: () => void };
const ContentVietlott = ({ handleClose }: IProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [iFocus, setIFocus] = useState<number | undefined>();
  const [isOTP, setIsOTP] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [loadingLink, setLoadingLink] = useState(false);
  const [resetIsOTP, setResetIsOTP] = useState(false);

  const methods = useForm<{ phone: string }>({ defaultValues: { phone: '' }, mode: 'all' });
  const phone = methods.getValues('phone');
  const [value, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    countStop: 0,
    onFinish: () => {
      setResetIsOTP(true);
    }
  });

  useEffect(() => {
    if (!methods.formState.isValid) {
      setOtp(['', '', '', '', '', '']);
    }
  }, [methods.formState.isValid]);

  const getOtp = async () => {
    try {
      setLoadingOTP(true);
      const res = await Digitalservice.getOTP(methods.getValues('phone'));
      if (res.code == 200) {
        setIsOTP(true);
        setLoadingOTP(false);
        startCountdown();
        setIFocus(0);
      }
    } catch (error) {
    } finally {
      setLoadingOTP(false);
    }
  };

  const getLinkVietLot = async () => {
    setLoadingLink(true);
    const params = {
      phone: methods.getValues('phone'),
      otp: otp.join('')
    };
    await Digitalservice.getLinkVietlot(params)
      .then((res) => {
        document.location.href = res.result;
      })
      .catch(() => {
        toast.error('Vui lòng kiểm tra số điện thoại và OTP');
      })
      .finally(() => setLoadingLink(false));
  };

  return (
    <>
      {/* <Svg
        src="/icons/line/close.svg"
        className={clsx(
          isOTP ? 'md:bg-neutral-100 bg-transparent top-3' : 'bg-neutral-100 top-3',
          'lg:hidden fixed md:right-4 md:left-auto md:h-14 md:w-14 w-10 h-10 cursor-pointer rounded-full p-2 z-10 md:top-16  left-2'
        )}
        onClick={handleClose}
      /> */}

      <div className="lg:relative fixed bottom-0 left-0 md:rounded-3xl">
        <div className="lg:relative fixed bottom-0 left-0 md:max-h-modalFull md:rounded-3xl h-full w-full overflow-y-scroll max-sm:bg-neutral-0">
          <div className={clsx(isOTP && 'h-full md:h-auto', 'lg:bg-transparent bg-neutral-0 lg:rounded-none md:rounded-3xl')}>
            <div
              className={clsx(
                isOTP && 'h-full md:h-auto',
                'lg:container lg:grid grid-flow-col lg:p-0 md:py-12 md:px-20 max-sm:min-h-screen'
              )}
            >
              <div
                className={clsx(
                  isOTP && 'hidden md:flex',
                  'bg-red-500 md:rounded-2xl lg:rounded-none h-full w-full flex justify-center items-center overflow-hidden'
                )}
              >
                <img src="/images/service/popupVietlott.png" alt="" className="object-cover max-h-[682px]" />
              </div>
              <div className="lg:px-10 lg:max-w-[590px] lg:py-10 px-4 md:px-0">
                <div className={clsx(isOTP && 'hidden md:block')}>
                  <div className="text-base text-neutral-500 flex flex-col gap-1 mt-8 lg:mt-0">
                    <p className="text-sm md:text-base">Xổ số Vietlott</p>
                    <h1 className="font-bold md:text-[32px] text-2xl text-neutral-800 leading-tight">Thông tin khách hàng</h1>
                    <p className="text-sm md:text-base">
                      Thông tin bạn điền sẽ được sử dụng để lập tài khoản tự động trên hệ thống Vietlott và là tài khoản nhận thưởng sau
                      này.
                    </p>
                  </div>
                  <p className="text-sm text-neutral-800 mt-8 mb-2">
                    Số điện thoại <b className="text-red-500">*</b>
                  </p>
                  <div className="flex gap-3 items-center flex-col md:flex-row md:gap-6">
                    <input
                      className="p-4 border border-neutral-300 rounded-lg bg-transparent text-base w-full max-h-[56px]"
                      placeholder="Nhập số điện thoại"
                      {...methods.register('phone', {
                        required: 'SĐT không được để trống',
                        pattern: { value: phoneNumberRegex, message: 'SĐT không đúng định dạng' }
                      })}
                    />
                    <div className=" md:hidden w-full">
                      <ErrorMessage
                        errors={methods.formState.errors}
                        name="phone"
                        render={({ message }) => (
                          <p className="label-text flex items-center mt-2 text-red-500">
                            <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
                            {message}
                          </p>
                        )}
                      />
                    </div>

                    <ButtonLoading
                      disabled={!methods.formState.isValid}
                      onClick={() => getOtp()}
                      className="btn btn-secondary rounded-full whitespace-nowrap px-8 text-sm md:text-base w-full md:w-fit max-sm:btn-primary"
                      isLoading={loadingOTP}
                      type={'button'}
                    >
                      Nhận OTP
                    </ButtonLoading>
                  </div>
                  <div className="hidden md:block">
                    <ErrorMessage
                      errors={methods.formState.errors}
                      name="phone"
                      render={({ message }) => (
                        <p className="label-text flex items-center mt-2 text-red-500">
                          <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
                          {message}
                        </p>
                      )}
                    />
                  </div>
                </div>
                <div className={clsx(isOTP ? 'md:mt-10 h-full md:h-auto' : 'mt-10', 'flex flex-col items-center')}>
                  {isOTP ? (
                    <>
                      <div className="md:hidden flex justify-center py-[18px] text-neutral-800 text-[18px] font-bold">Thông báo</div>
                      <div className="bg-neutral-100 h-2 w-full md:hidden" />
                      <p className="text-base text-neutral-500  bloc mt-4">
                        iTel đã gửi một mã xác thực OTP đến số điện thoại <b>{methods.getValues('phone')}</b>
                      </p>
                    </>
                  ) : (
                    <p className={clsx('hidden md:block', 'text-base text-neutral-500 text-center')}>
                      Nhập mã OTP đã được gửi về số điện thoại của bạn
                    </p>
                  )}
                  <div className={clsx(isOTP ? 'grid' : 'hidden md:grid', 'grid grid-cols-6 gap-2 mt-6')}>
                    {otp.map((item, i) => (
                      <OtpInput
                        disabled={!isOTP}
                        isFocus={i === iFocus}
                        maxLength={1}
                        key={i}
                        value={item}
                        handleChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[i] = e.target.value;
                          if (e.target.value) {
                            setIFocus(i + 1);
                          }
                          setOtp(newOtp);
                        }}
                      />
                    ))}
                  </div>
                  {isOTP && (
                    <>
                      <p className=" text-sm text-neutral-500 mt-5">Nhập mã OTP để xác thực</p>
                      <p
                        onClick={() => {
                          if (resetIsOTP) {
                            setResetIsOTP(false);
                            resetCountdown();
                            startCountdown();
                            setOtp(['', '', '', '', '', '']);
                            setIFocus(0);
                          }
                          getOtp();
                        }}
                        className={clsx(resetIsOTP && 'text-neutral-500', 'text-sm text-neutral-800 mt-5 font-bold cursor-pointer')}
                      >
                        Gửi lại mã {!resetIsOTP && `(${value}s)`}
                      </p>
                    </>
                  )}
                  <ButtonLoading
                    disabled={otp.join('').length < 6 || !phone}
                    className={clsx(
                      isOTP ? 'block' : 'hidden md:block',
                      'btn btn-primary flex rounded-full px-16 lg:mt-27 md:mt-20 mt-8 w-full md:w-fit'
                    )}
                    onClick={() => getLinkVietLot()}
                    isLoading={loadingLink}
                    type={'button'}
                  >
                    Tiếp tục
                  </ButtonLoading>
                  {isOTP && (
                    <p className={clsx(isOTP && 'block', 'mt-3 text-neutral-500 md:hidden text-sm text-center')}>
                      Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển <br className="block md:hidden" /> sang trang đối tác của iTel.
                    </p>
                  )}
                  <p className={clsx(isOTP && 'block', 'hidden md:block mt-3 text-neutral-500 text-sm text-center')}>
                    Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển <br className="block md:hidden" /> sang trang đối tác của iTel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentVietlott;
