import type { Model } from '@/types/model';
import { Model as BaseModel } from '@pit-ui/modules/database-ver2';
import { OTP } from '../otp/model';
import { generateSimNumber } from '@/services/sim';
import { randomBetween } from '@/utilities/number';
import { ImageService } from '../image/image';

export enum UserStatus {
  InternalError,
  Found,
  NotExisted,
  PhoneExisted,
  PassIncorrect,
  OtpIncorrect,
  OtpExpired,
  OtpSent,
  Done
}
export enum UserRole {
  User = 'user',
  Admin = 'admin',
  Merchant = 'merchant'
}
class UserClass extends BaseModel<Model.UserDataBase> {
  async findUserByPhone(phone: string) {
    return this.findIndex('phone', phone.replace(/ /g, ''));
  }
  async login(phone: string, password: string) {
    const user = await this.findUserByPhone(phone);
    if (user) {
      if (!user.password && password !== '123456') {
        return { success: false, message: 'Tài khoản hoặc mật khẩu chưa chính xác. Vui lòng thử lại', user: null };
      }
      if (user.password && password !== user.password) {
        return { success: false, message: 'Tài khoản hoặc mật khẩu chưa chính xác. Vui lòng thử lại \nHint:' + user.password, user: null };
      }
      return { success: true, message: 'Đăng nhập thành công', user };
    }
    return { success: true, message: '', user: null };
  }
  async loginByPhone(phone: string) {
    try {
      const user = await this.findIndex('phone', phone);
      if (user && user.is_verified) {
        const otp = await OTP.generateOtp(user.id);
        return { success: true, status: UserStatus.Found, data: otp };
      }
      return { success: false, status: UserStatus.NotExisted };
    } catch (error: any) {
      return { success: false, status: UserStatus.InternalError, message: error?.message };
    }
  }

  async regiser(phone: string) {
    try {
      let user = await this.find(phone);
      if (user && user.is_verified) return { success: false, status: UserStatus.PhoneExisted };
      let user_id;
      if (!user)
        user = await this.create({
          default_address_id: 0,
          email: null,
          is_verified: false,
          name: null,
          password: null,
          phone,
          role: 'user'
        });
      user_id = user.id;

      const otp = await OTP.generateOtp(user_id);
      return { success: true, status: UserStatus.NotExisted, data: otp };
    } catch (error: any) {
      return { success: false, status: UserStatus.InternalError, message: error?.message };
    }
  }

  async verifyOtpRegister(id: number, otpStr: string, phone: string) {
    try {
      let result = await OTP.verifyOtp(id, otpStr);
      if (!result.success) return result;

      let user = await this.find(phone);
      if (!user || (user && user.is_verified)) return { success: false, status: UserStatus.PhoneExisted, message: 'Nhầm số rồi bạn êi' };
      await this.save(user.id, {
        phone,
        is_verified: true,
        role: 'user'
      });
      user = Object.assign(user, {
        phone,
        is_verified: true,
        role: 'user'
      });

      return { success: true, status: UserStatus.Done, data: user };
    } catch (error: any) {
      return { success: false, status: UserStatus.InternalError, message: error?.message };
    }
  }
}

export const User = new UserClass('users');

export function seedingUsers(number = 10) {
  const users: Omit<Model.UserDataBase, 'id'>[] = generateSimNumber({
    limit: number,
    include: [8, 6, 9],
    exclude: [4, 0],
    prefix: '032'
  }).map((sim, index) => ({
    default_address_id: null,
    password: null,
    email: `email${String(index).padStart(2, '0')}@gmail.com`,
    is_verified: false,
    name: `User ${String(index).padStart(2, '0')}`,
    phone: sim.phone,
    role: UserRole.User,
    balance: randomBetween(0, 200_000) * 50,
    image: ImageService.random()
  }));
  return users;
}
