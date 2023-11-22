import DatePicker, { InputDate } from '@/components/common/date-picker';
import HeaderProfileModal from '@/components/header/header-profile-modal';
import Svg from '@/components/icon/svg';
import { toggleModalDatePicker } from '@/components/modal/selection/modal-date-picker';
import { useGlobalContext } from '@/context/global';
import { useModal } from '@/libs/modal';
import { User } from '@/services/user/model';
import { Model } from '@/types/model';
import { withMobile } from '@/utilities/function';
import { omitFieldByValue } from '@/utilities/object';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ComboboxesSimple from '../comboboxes/comboboxes-simple';
import { InputErrorForm } from '../input/input-error';
import { toggleModalSelectionList } from './selection/modal-selection-list';

import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { emailValidator } from '@/constants/validator.constants';
import useIsClient from '@/hooks/useIsClient';

type IForm = Omit<Model.User, 'gender' | 'date_of_birth'> & { gender: { value: string; name: string }; dateOfBirth: string };
const valueForm = [
  { id: 1, value: 'male', name: 'Nam' },
  { id: 2, value: 'female', name: 'Nữ' }
];
const updateUserSchema = object().shape({ email: emailValidator });
const ModalUpdateProfile = ({ isUseForCreateProfile }: { isUseForCreateProfile?: boolean }) => {
  useIsClient();
  const { done, close, reject } = useModal();
  const { user, setUser } = useGlobalContext();
  const { register, handleSubmit, control, formState, getValues, setValue } = useForm<IForm>({
    defaultValues: user
      ? {
          email: user.email,
          name: user.name,
          gender: user.gender ? valueForm.find((s) => s.value === user.gender) : undefined,
          dateOfBirth: user.date_of_birth ? new Date(user.date_of_birth * 1000).toISOString() : undefined
        }
      : {},
    mode: 'onChange',
    resolver: yupResolver(updateUserSchema)
  });

  const onSubmit: SubmitHandler<IForm> = async (values) => {
    if (isUseForCreateProfile) return reject(null);
    const timestamp = values.dateOfBirth ? Math.floor(new Date(values.dateOfBirth).getTime() / 1000) : undefined;
    const updateValue = omitFieldByValue(
      { gender: values.gender?.value, name: values.name, email: values.email, date_of_birth: timestamp },
      [undefined]
    );
    if (user && user.id) {
      await User.save(user.id, updateValue);
    }
    setUser({ ...user, ...updateValue });
    done(null);
    toast.success('Đã cập nhật Thông tin cá nhân');
  };

  const handleDateOfBirth = withMobile(() => {
    toggleModalDatePicker({ defaultValue: getValues('dateOfBirth'), title: 'Chọn ngày sinh' }).then(
      (date) => date && setValue('dateOfBirth', date.toString(), { shouldDirty: true, shouldTouch: true, shouldValidate: true })
    );
  });

  const isValid = formState.isDirty && formState.isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="h-full">
      <div className="md:flex hidden">
        <span className="md:text-s-md text-xl mb-8 font-bold text-neutral-800">
          {isUseForCreateProfile ? 'Cập nhật thông tin tài khoản' : 'Cập nhật thông tin cá nhân'}
        </span>
        <Svg
          src="/icons/line/close.svg"
          className="absolute right-4 top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
          onClick={close}
        />
      </div>
      <HeaderProfileModal onClose={close} title={isUseForCreateProfile ? 'Cập nhật thông tin tài khoản' : 'Cập nhật thông tin cá nhân'} />
      <div className="flex md:hidden h-2 bg-neutral-100" />
      <div className="body-modal max-md:p-4 h-[90%] flex flex-col">
        <div className="grid gap-7 grid-cols-1 md:grid-cols-2 ">
          <div className="form-control">
            <label className="label-text text-base font-medium" aria-required>
              Họ và tên
            </label>
            <input
              type="text"
              className="input input-bordered mt-2"
              data-headlessui-focus-guard="true"
              placeholder="Nhập họ và tên"
              {...register('name')}
            />
            <InputErrorForm errors={formState.errors} name="name" />
          </div>
          <div className="form-control w-full">
            <span className="label-text text-base font-medium" aria-required>
              Giới tính
            </span>
            <Controller
              control={control}
              name="gender"
              render={({ field: { ref, onChange, ...field } }) => (
                <ComboboxesSimple
                  {...field}
                  onChange={onChange}
                  options={valueForm}
                  btnClassName="mt-2"
                  placeholder="Chọn giới tính"
                  onClick={withMobile(() => toggleModalSelectionList({ options: valueForm, title: 'Chọn giới tính' }).then(onChange))}
                  btnOnMobile
                />
              )}
            />
          </div>
          <div className="w-full">
            <div className="label-text text-base" aria-required>
              Ngày sinh
            </div>
            <div className="mt-2">
              <div className={'relative'}>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  render={({ field }) => {
                    return (
                      <InputDate.Wrapper>
                        <button
                          className="relative flex w-full text-left"
                          onClick={handleDateOfBirth}
                          tabIndex={1}
                          type="button"
                          onMouseDown={withMobile((e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          })}
                        >
                          <InputDate
                            className="input input-bordered w-full input-trailing-icon"
                            placeholder="dd/mm/yyyy"
                            value={field.value}
                            onChange={(d) => field.onChange(d?.toString())}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
                            <Svg src="/icons/line/calendar.svg" width={24} height={24} />
                          </div>
                        </button>
                        <InputDate.Content className="absolute mt-2 z-10">
                          {({ hide }) => (
                            <div className="bg-neutral-0 rounded-2xl shadow-itel px-6 py-8">
                              <DatePicker
                                onChange={(date) => {
                                  field.onChange(date.toString());
                                  hide();
                                }}
                                value={field.value}
                              />
                            </div>
                          )}
                        </InputDate.Content>
                      </InputDate.Wrapper>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="label-text text-base font-medium" aria-required>
              Email
            </label>
            <input type="text" className="input input-bordered mt-2" placeholder="Nhập địa chỉ email" {...register('email')} />
            <InputErrorForm errors={formState.errors} name="email" />
          </div>
        </div>
        <label className="label w-auto cursor-pointer justify-normal py-8">
          <div className="mr-2 p-0.5">
            <input type="checkbox" className="block" />
          </div>
          <span className="label-text font-medium">Đồng ý nhận thông tin khuyến mại</span>
        </label>
        <div className="max-md:flex-1 max-md:w-full max-md:flex max-md:items-end text-center">
          <div className="max-md:w-full max-md:mt-2">
            <button type="submit" disabled={!isValid} className="btn-primary btn btn-lg max-md:w-full min-w-[14.5rem] rounded-full">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ModalUpdateProfile;
