import type { Model } from '@/types/model';
import { randomOtp } from '@/utilities/string';

import { Model as BaseModel } from '@pit-ui/modules/database-ver2';

class OtpClass extends BaseModel<Model.OTP> {
  makeOtp(): Omit<Model.OTP, 'id'> {
    const otp = randomOtp();
    return { created_at: new Date().toString(), otp, status: 'valid', tried: 0, phone: null, user_id: null };
  }

  async generateOtp(user_id: number | null) {
    return this.create({ ...this.makeOtp(), user_id });
  }
  async generateOtpByPhone(phone: string) {
    return this.create({ ...this.makeOtp(), phone });
  }

  async verifyOtp(id: number, otpStr: string) {
    const otp = await this.find(id);
    if (!otp) return { message: 'OTP không hợp lệ', success: false };
    if (otp.status === 'used') return { message: 'OTP không hợp lệ', success: false };
    if (otp.status === 'expired') return { message: 'OTP hết hạn', success: false };
    if (otp.tried >= 5) return { message: 'Nhập sai nhiều quá', success: false };
    if (otp.otp !== otpStr) {
      await OTP.save(id, { tried: otp.tried + 1 });
      return { message: `Mã otp không đúng, bạn còn ${5 - otp.tried} lần thử`, success: false };
    }
    await OTP.save(id, { status: 'used' });
    return { message: 'Đúng rồi', success: true };
  }
}
export const OTP = new OtpClass('OTP');
