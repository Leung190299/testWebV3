import { ModalVerifyProps, verifyOtp } from '@/components/modal/modal-verify-otp';
import { useGlobalContext } from '@/context/global';
import { OTP } from '@/services/otp/model';
import type { Model } from '@/types/model';
import { useCallback, useRef } from 'react';

const useModalOtp = (props: Omit<ModalVerifyProps, 'verify' | 'phone' | 'resend'>) => {
  const { user } = useGlobalContext();
  const otpRef = useRef<Model.OTP>();

  // Request new otp here
  const requestOtp = useCallback(
    async (userId?: number) => OTP.generateOtp(userId || user?.id || 1).then((res) => (otpRef.current = res)),
    [user]
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
    async (data: { phone?: string }) => {
      const phone = data.phone ;
      if (!phone) throw new Error('[Error]: Phone is required');
      await requestOtp();

      return verifyOtp({ ...props, phone: phone, resend: requestOtp, verify: handleVerifyOtp });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleVerifyOtp, props.guide, props.title, requestOtp, user?.phone]
  );
  return {
    open: modalOtp
  };
};

export default useModalOtp;
