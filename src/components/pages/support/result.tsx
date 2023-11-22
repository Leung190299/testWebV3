import Svg from '@/components/icon/svg';
import ModalRequestSupport from '@/components/modal/modal-request-support';
import Rating from '@/components/rating/rating';
import { useGlobalContext } from '@/context/global';
import { modal } from '@/libs/modal';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

type FailedProps = {
  title?: string;
  description?: string | React.ReactNode;
  method?: string;
  time?: string;
  status?: string;
  retry?: Function;
};

export const FailedView: FC<FailedProps> = ({ title, description, method, time, status, retry }) => {
  const router = useRouter();

  const sendRequest = () => {
    modal.open({
      render() {
        return <ModalRequestSupport name={method} />;
      },
      className: 'modal-box modal-box-lg',
      closeButton: true
    });
  };
  return (
    <>
      <div className="bg-neutral-0 px-4 pt-6 md:pt-10 pb-8 md:pb-20 text-center">
        <div className="w-full md:w-[512px] xl:w-[560px] max-w-full mx-auto">
          <div className="mx-auto w-12 h-12 md:w-20 md:h-20">
            <Svg className="w-full h-full" src="/icons/others/payment-failed.svg" />
          </div>

          <p className="font-bold text-xl md:text-2xl mt-3 md:mt-6">{title}</p>
          <p className="text-sm mt-1 md:mt-2 text-neutral-500">{description}</p>

          <div className="border-t border-t-neutral-200 my-6" />

          <div className="grid grid-cols-2 gap-3 md:gap-5">
            <p className="text-left text-sm text-neutral-500">Chức năng sử dụng</p>
            <p className="text-right text-sm md:text-base font-bold">{method}</p>
            <p className="text-left text-sm text-neutral-500">Thời gian sử dụng</p>
            <p className="text-right text-sm md:text-base font-bold">{time}</p>
            <p className="text-left text-sm text-neutral-500">Trạng thái</p>
            <p className="text-right text-sm md:text-base font-bold">{status}</p>
          </div>

          <div className="border-t border-t-neutral-200 my-6" />

          <div className="flex gap-4">
            <button type="button" className="block flex-1 btn-secondary btn rounded-full" onClick={() => router.push('/')}>
              Về trang chủ
            </button>
            <button type="button" className="block flex-1 btn-primary btn rounded-full" onClick={() => (retry ? retry() : router.back())}>
              Thử lại
            </button>
          </div>

          <p className="mt-8 font-bold cursor-pointer" onClick={() => sendRequest()}>
            Yêu cầu hỗ trợ
          </p>
        </div>
      </div>
    </>
  );
};

type SuccessProps = {
  title?: string;
  description?: string | React.ReactNode;
  questions?: string;
};
export const SuccessView: FC<SuccessProps> = ({ title, description, questions }) => {
  const router = useRouter();
  const [star, setStar] = useState(6);
  const { status, toggleModalAuth } = useGlobalContext();

  return (
    <>
      <div className="bg-neutral-0 px-4 pt-6 md:pt-10 pb-8 md:pb-20 text-center">
        <div className="w-full md:w-[512px] xl:w-[560px] max-w-full mx-auto">
          <div className="mx-auto w-20 h-20">
            <Svg className="w-full h-full" src="/icons/others/payment-success.svg" />
          </div>
          <p className="font-bold text-xl md:text-2xl mt-3 md:mt-6">{title}</p> 
          <p className="text-sm mt-1 md:mt-2 text-neutral-500">{description}</p>
          <div className="hidden md:block border-t border-t-neutral-200 my-6" />
          <div className="md:hidden -mr-4 -ml-4 h-2 bg-neutral-100 my-6" />
          <p className="text-sm">{questions}</p>
          <Rating title='' labelReject='Tạo tài khoản iTel' labelAction='Về trang chủ' />
        </div>
      </div>
    </>
  );
};
