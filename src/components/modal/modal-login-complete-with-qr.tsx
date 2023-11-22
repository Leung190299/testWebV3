import Svg from '@/components/icon/svg';
import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import { useModal } from '@/libs/modal';
import Routers from '@/routes';
import Link from 'next/link';
import React from 'react';

const ModalLoginCompleteWithQr = ({ onClose, isRegister }: { onClose?(): void; isRegister?: boolean }) => {
  const { done } = useModal();

  const onClickDone = () => {
    done('done');
  };

  return (
    <div className="text-center max-md:px-4">
      <button
        className="btn-ghost btn btn-circle absolute right-4 md:right-5 top-3 md:top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
        type="button"
        onClick={onClickDone}
      >
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>
      <div className="w-16 h-16 mx-auto mb-5">
        <Svg className="h-full w-full" src="/icons/others/login-complete.svg" />
      </div>
      <h2 className="text-xl md:text-s-md font-bold">{isRegister ? 'Đăng ký thành công!' : 'Đăng nhập thành công!'}</h2>
      <p className="mt-4 md:mt-8 text-subtle-content whitespace-pre-line">
        Chào mừng Ánh Nguyệt trở lại với iTel. <br /> Chúc bạn có một thời gian thú vị tại vương quốc số đỏ, <br /> iTel luôn ở đây nếu bạn
        cần hỗ trợ nhé!
      </p>
      <div className="flex flex-row gap-4 mt-4 md:mt-8">
        <Link href={Routers.PROFILE_INFORMATION} className="btn-secondary max-md:text-sm btn btn-lg w-full rounded-full">
          Trang cá nhân
        </Link>
        <button onClick={onClickDone} className="btn-primary btn btn-lg max-md:text-sm w-full rounded-full">
          Tiếp tục với website
        </button>
      </div>
    </div>
  );
};
export default ModalLoginCompleteWithQr;
