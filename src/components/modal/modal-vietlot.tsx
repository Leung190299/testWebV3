import { phoneValidator } from '@/constants/validator.constants';
import useOtpInput from '@/hooks/useOtpInput';
import { modal, useModal } from '@/libs/modal';
import { OTP } from '@/services/otp/model';
import { Model } from '@/types/model';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useCountdown from '@pit-ui/modules/hooks/useCountdown';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import InputError from '../input/input-error';
import LabelOut from '../input/label-out';
import ContentVietlott from '../service/ContentVietlott';
import ModalAdventise from './modal-adventise';
import { verifyOtp } from './modal-verify-otp';

type Props = {};

const ModalVietLot = (props: Props) => {
  const { done } = useModal();
  const numInputs = 4;

  const requested = useBoolean(false);
  const [otp, setOtp] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [errorOtp, setErrorOtp] = useState('');
  const { handleChange, handleFocus, handleKeyDown, inputRefs } = useOtpInput(otp, setOtp);
  const [value, { startCountdown, resetCountdown, stopCountdown, isCountdownRunning }] = useCountdown({ countStart: 60 });

  const otpRef = useRef<Model.OTP>();

  // Request new otp here
  const requestOtp = useCallback(
    async (phone: string) =>
      OTP.generateOtpByPhone(phone).then((res) => {
        requested.setTrue();
        otpRef.current = res;
      }),
    [requested]
  );
  const handleVerifyOtp = useCallback(async (otp: string) => {
    const otpData = otpRef.current;
    if (!otpData) throw new Error('[Error]: Some thing wrong');

    const response = await OTP.verifyOtp(otpData.id, otp);
    if (response.success) return true;
    else {
      return { success: false, message: response.message + '\nHint: ' + otpData.otp };
    }
  }, []);

  const modalOtp = useCallback(
    async (phone: string) => {
      return verifyOtp({ guide: false, phone: phone, resend: () => requestOtp(phone), verify: handleVerifyOtp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleVerifyOtp, requestOtp]
  );
  async function handleRequestOTP() {
    const phoneValidated = await phoneValidator
      .validate(phone)
      .then((phone) => {
        requestOtp(phone);
        return phone;
      })
      .catch((e) => setError(e.message));
    if (!phoneValidated) return;
    if (innerWidth >= 768) return startCountdown();
    try {
      const result = await modalOtp(phoneValidated);
      done(null);
      toast.success('OK');
    } catch (error) {
      console.error(error);
    }
  }
  async function handlSubmit() {
    const result = await handleVerifyOtp(otp);
    if (result === true) return toast.success('OK');
    setErrorOtp(result.message);
    toast.error(result.message);
  }

  return (
    <ModalAdventise title="Sổ số Vietlott" banner="/images/service/popupVietlott.png">
      <div className="p-4 md:p-0 md:pt-8 xl:p-10 xl:pr-12 flex flex-col h-full">
        <ModalAdventise.Heading
          title="Thông tin khách hàng"
          subtitle="Xổ số Vietlott"
          desc="Thông tin bạn điền sẽ được sử dụng để lập tài khoản tự động trên hệ thống Vietlott và là tài khoản nhận thưởng sau này."
        />
        <div className="flex-1 mt-8">
          <div className="md:flex items-end gap-x-6">
            <LabelOut label="Số điện thoại" className="font-medium flex-1" required>
              <input
                type="tel"
                placeholder="Nhập Số điện thoại"
                className="input-bordered input w-full outline-none mt-2 font-normal"
                value={phone}
                onChange={(e) => {
                  setError('');
                  setPhone(e.target.value);
                }}
                style={{
                  WebkitBoxShadow: '0 0 0px 1000px #ffffff inset'
                }}
              />
              {error && <InputError message={error} className="md:hidden" />}
            </LabelOut>
            <div>
              <button
                onClick={handleRequestOTP}
                disabled={isCountdownRunning}
                className="btn btn-primary md:btn-secondary md:btn-sm rounded-full  w-full md:w-28 mt-6 md:my-2"
              >
                Nhận OTP
              </button>
            </div>
          </div>
          {error && <InputError message={error} className="max-md:hidden" />}
          <div className="max-md:hidden mt-10">
            <p className="text-subtle-content text-center">Nhập mã OTP đã được gửi về số điện thoại của bạn</p>
            <div className="text-center text-base-content space-x-2 mt-6">
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
                    disabled={!requested.value}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <ModalAdventise.Actions
          onClick={handlSubmit}
          disabled={otp.length !== numInputs}
          className="max-md:hidden"
          type="button"
          desc="Bằng việc bấm <b>Tiếp tục</b>, bạn sẽ được chuyển sang trang đối tác của iTel."
        >
          Tiếp tục
        </ModalAdventise.Actions>
      </div>
    </ModalAdventise>
  );
};

export const showVietllot = () => {
  modal.open({
    render: <ContentVietlott handleClose={function (): void {
      modal.close()
    } } />,
    classNameContainer: 'modal-full md:modal-bottom-sheet xl:modal-middle xl:mx-6',
    classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
    className: 'modal-box xl:p-0 xl:max-w-[79.5rem]',
    closeButton:true
  });
};
export default ModalVietLot;
