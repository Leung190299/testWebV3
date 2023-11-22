import React, { FC } from 'react';
import { useModal } from '@/libs/modal';
import Svg from '../icon/svg';

interface Props {}

const ModalOrderNotFound: FC<Props> = ({}) => {
  const { close } = useModal();

  return (
    <div>
      <div className="flex items-center">
        <div>
          <h2 className="text-lg md:text-s-md font-bold">Không tìm thấy đơn hàng</h2>
        </div>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <div className="mt-6 md:mt-8">
        <p className="text-neutral-500">
          Rất tiếc iTel chưa tìm thấy thông tin phù hợp với mã đơn hàng bạn đã cung cấp. Vui lòng kiểm tra lại mã đơn hàng hoặc liên hệ tổng
          đài Chăm sóc khách hàng 0877 087 087 để được hỗ trợ. Tips: bạn có thể tra cứu đơn hàng nhanh hơn nếu đăng nhập!
        </p>
        <div className="flex gap-4 mt-6 md:mt-8">
          <button type="button" className="block flex-1 btn-secondary btn rounded-full" onClick={() => close()}>
            Đã hiểu
          </button>
          <button type="button" className="block flex-1 btn-primary btn rounded-full" onClick={() => close()}>
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrderNotFound;
