import React from 'react';

type Props = {};

const SectionCheckoutPolicy = (props: Props) => {
  return (
    <div className="container pt-6 pb-2 md:pt-8 md:pb-16 xl:pt-12 xl:pb-20 space-y-1">
      <div className="text-xs font-medium text-neutral-500">
        <p>Bằng việc tiến hành Đặt Mua, khách hàng đồng ý với các Điều Kiện Giao Dịch Chung được ban hành bởi iTel:</p>
        <div className="flex-wrap flex gap-x-2 items-center gap-y-1">
          <p>Quy chế hoạt động</p>
          <div className="h-3 border-l rounded-full" />
          <p>Chính sách bảo hành</p>
          <div className="h-3 border-l rounded-full" />
          <p>Chính sách bảo mật thanh toán</p>
          <div className="h-3 border-l rounded-full" />
          <p>Chính sách bảo mật thông tin cá nhân</p>
        </div>
        <p>© 2021 - Bản quyền của Cổ phần Viễn thông Di động iTel - itel.vn</p>
      </div>
    </div>
  );
};

export default SectionCheckoutPolicy;
