import { phoneValidator } from '@/constants/validator.constants';
import { useGlobalContext } from '@/context/global';
import { modal, useModal } from '@/libs/modal';
import { phoneNumberRegex } from '@/utilities/validator';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object } from 'yup';
import Svg from '../icon/svg';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { User } from '@/services/user/model';

type Props = {};

const PhoneSchemaValidation = object({
  phone: phoneValidator
});

const ModalAccumulatePoints = (props: Props) => {
  const { done } = useModal();
  const { toggleModalAuth } = useGlobalContext();
  const methods = useForm<{ phone: string }>({ resolver: yupResolver(PhoneSchemaValidation), mode: 'onChange' });
  const isValid = methods.formState.isDirty && methods.formState.isValid;

  const handleSubmit = async (values: { phone: string }) => {
    try {
      const user = await User.findUserByPhone(values.phone);
      if (!user && values.phone !== '0987654321') {
        methods.setError('phone', { message: 'Số điện thoại chưa đăng ký tài khoản', type: 'notExisted' });
      } else {
        done(values.phone);
      }
    } catch (error: any) {
      methods.setError('phone', { message: error.message, type: 'error' });
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      <HeaderMiddleAndFull title="Tích điểm" desc="Nhập số điện thoại đã đăng ký trên iTel để tích điểm." />
      <div className="bg-neutral-100 md:hidden h-2" />
      <div className="mobile-container py-2 md:py-0">
        <p className="md:hidden text-neutral-500">Nhập số điện thoại đã đăng ký trên iTel để tích điểm.</p>
        <div className="mt-8">
          <div className="form-control w-full">
            <span className="label-text font-medium" aria-required>
              Số điện thoại
            </span>
            <input
              className="input input-bordered mt-2"
              placeholder="Nhập số điện thoại"
              {...methods.register('phone', {
                required: 'SĐT không được để trống',
                pattern: { value: phoneNumberRegex, message: 'SĐT không đúng định dạng' }
              })}
            />
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
        <div className="mt-8">
          <div className="w-1/2 px-3 mx-auto">
            <button className="btn btn-primary rounded-full w-full" disabled={!isValid}>
              Xác nhận
            </button>
          </div>
          <p className="mt-6 text-subtle-content text-center">
            <button className="text-red-500 inline" onClick={()=>toggleModalAuth()}>
              Đăng nhập
            </button>{' '}
            với số điện thoại để thanh toán dễ dàng hơn
          </p>
        </div>
      </div>
    </form>
  );
};

export const accumulatePoints = (done?: (phone: string) => any) => {
  modal.open({
    render: ModalAccumulatePoints,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
    onDone: done
  });
};

export default ModalAccumulatePoints;
