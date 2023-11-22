import { useModal } from '@/libs/modal';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Svg from '../icon/svg';
import HeaderMiddleAndFull from './header/header-middle-and-full';

import { PHONE_NAME } from '@/constants/checkout.constants';
import { ErrorMessage } from '@hookform/error-message';
import { phoneNumberRegex } from '@/utilities/validator';
import useIsClient from '@/hooks/useIsClient';

type ModalAuthProps = {
  tabIndex?: number;
  type?: 'primary' | 'secondary';
  // onValid: SubmitHandler<IFormSignIn>;
};

const oauth = [
  { provider: 'facebook', icon: '/icons/others/facebook.svg' },
  { provider: 'google', icon: '/icons/others/gmail.svg' },
  { provider: 'zalo', icon: '/icons/others/zalo.svg' }
];

interface ISignIn {
  phone: string;
}

const ModalAuth = (props: ModalAuthProps) => {
  const { type = 'primary' } = props;
  useIsClient();
  const [tabIndex, setTabIndex] = useState(props.tabIndex || 0);

  const { done } = useModal();
  const methods = useForm<ISignIn>();

  const className = ({ selected }: any) =>
    clsx('tab tab-bordered w-1/2 whitespace-nowrap border-red-500 border-opacity-0 py-4 text-s-sm outline-none', selected && 'tab-active');
  const onSubmit: SubmitHandler<ISignIn> = (params) => {
    done({ ...params, tabIndex });
  };
  const onClickQr = () => {
    done({ tabIndex });
  };

  const onDeletePhone = () => {
    methods.resetField('phone');
  };

  return (
    <div className="theme-light" data-theme="light">
      <HeaderMiddleAndFull title="" mobileTitle={''} desc="" />
      {type === 'primary' ? (
        <div className="w-full max-md:hidden text-center">
          <div className="text-center flex mb-4">
            <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
          </div>
          <span>
            Đăng nhập/ đăng ký tài khoản iTel <br /> để tận hưởng muôn vàn trải nghiệm, ưu đãi hấp dẫn.
          </span>
        </div>
      ) : (
        <div className="max-md:hidden">
          <h1 className="text-h4 font-bold">Yêu cầu đăng nhập/ đăng ký</h1>
          <p className="mt-2 text-subtle-content">Chức năng chỉ dành cho hội viên iTel. Bạn đã có tài khoản chưa?</p>
        </div>
      )}
      <Tab.Group onChange={(i: number) => setTabIndex(i)} defaultIndex={tabIndex} as="div" className="mt-8 md:space-y-10">
        <Tab.List className="max-md:hidden tabs flex-nowrap gap-x-6 border-b-[1px] border-neutral-200">
          <Tab className={className}>Dùng số điện thoại</Tab>
          <Tab className={className}>Dùng mã QR</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel as="form" onSubmit={methods.handleSubmit(onSubmit)} className="px-4 md:px-6">
            <div className="md:hidden my-10">
              <div className="text-center flex">
                <Svg src="/logo/logo-color.svg" className="text-red-500 mx-auto w-[97px] md:w-[117px] h-10 md:h-12" />
              </div>
              <p className="max-md:text-sm text-center mt-6">
                Đăng nhập/ đăng ký tài khoản iTel <br />
                để tận hưởng muôn vàn trải nghiệm, ưu đãi hấp dẫn.
              </p>
            </div>
            <div className="input-leading-icon relative text-xl">
              <input
                className="input-bordered input rounded-full py-4d:py-[1.125rem] pl-14 pr-8"
                type="text"
                placeholder="Số điện thoại"
                data-headlessui-focus-guard="true"
                {...methods.register('phone', {
                  validate(value) {
                    const isValid = phoneNumberRegex.test(value.replace(/ /g, ''));
                    return isValid || 'Số điện thoại không đúng định dạng. Vui lòng thử lại2';
                  },
                  onBlur: () => methods.trigger('phone'),
                  required: 'Số điện thoại không đúng định dạng. Vui lòng thử lại'
                })}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                <Svg src="/icons/line/phone.svg" width={24} height={24} />
              </div>
              {methods.watch('phone') && (
                <div onClick={onDeletePhone} className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-5">
                  <Svg src="/icons/line/close.svg" width={24} height={24} />
                </div>
              )}
            </div>
            {methods.watch('phone') && (
              <ErrorMessage
                errors={methods.formState.errors}
                name={PHONE_NAME}
                render={({ message }) => (
                  <p className="label">
                    <span className="label-text-alt flex items-center text-red-500 first-letter:capitalize">
                      <Svg className="mr-1 h-4 w-4 inline" src="/icons/line/danger-circle.svg" />
                      {message}
                    </span>
                  </p>
                )}
              />
            )}
            <button
              className="btn-primary btn btn-sm max-md:h-12 md:btn-lg mt-6 w-full rounded-full"
              disabled={!methods.formState.isValid || methods.formState.isSubmitting}
            >
              Tiếp tục
            </button>
          </Tab.Panel>
          <Tab.Panel>
            <div className="" onClick={onClickQr}>
              <img
                src="/images/qr-code.png"
                width={248}
                height={248}
                className="mx-auto bg-base-200 object-cover center-by-grid"
                alt="cover"
              />
            </div>
            <p className="mt-2 text-center text-subtle-content">Sử dụng app My iTel quét mã QR để đăng nhập</p>
          </Tab.Panel>
        </Tab.Panels>
        <div className="px-6 mt-6">
          <div className="text-sm overflow-hidden px-8 text-center text-neutral-300">
            <div className="divider-hr">
              <span className="text-subtle-content">hoặc tiếp tục với</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2 md:gap-4">
            {oauth.map((o) => (
              <button type="button" key={o.provider} className="btn-tertiary btn btn-sm flex-1 gap-x-2 rounded-full capitalize">
                <Svg src={o.icon} width={20} height={20} />
                <span className="max-md:hidden">{o.provider}</span>
              </button>
            ))}
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default ModalAuth;
