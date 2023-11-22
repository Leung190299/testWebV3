import clsx from 'clsx';
import * as React from 'react';
import voucherImg from '@/components/pages/assets/voucher_img.png';
import caffeImg from '@/components/pages/assets/caffe_house_logo.png';
import Image from 'next/image';
import Svg from '@/components/icon/svg';
import Routers from '@/routes';
import Link from 'next/link';

export const CardMobileHistoryVoucher = ({
  img = voucherImg,
  className = '',
  bodyTitle = 'Voucher The Coffee House',
  logo = caffeImg,
  point = 200,
  remainDays = 60,
  unit = 'ngày'
}) => {
  return (
    <Link href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: img?.src } }}>
      <div className={clsx('bg-neutral-0 rounded-lg border border-solid border-neutral-200', className)}>
        <div className="relative w-full">
          <Image src={img} alt={''} className={clsx('rounded-lg', 'object-fit aspect-video')} />
          <div className="absolute bottom-0 left-0">
            <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2">Giảm 50k</span>
          </div>
        </div>
        <div className={'p-2 pb-4'}>
          <div className="flex items-start space-x-3">
            <p className="text-neutral-800 font-bold font-medium">{bodyTitle}</p>
            <Image src={logo} width={24} height={24} alt={''} />
          </div>
          <span className="text-neutral-500 font-medium text-xs">HSD: 28/02/2023</span>
          <div className="mt-1">
            <div className="flex items-center">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div className="flex items-center grow">
                    <Svg src="/icons/line/calendar.svg" width={14} height={15} />
                    <p className="text-neutral-500 font-medium text-xs mx-1.5">
                      {remainDays} {unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<button className="btn-secondary btn btn-xs px-3 rounded-full mt-2" onClick={() => {}}>*/}
          {/*  <span className={'whitespace-nowrap'}>Đổi ngay</span>*/}
          {/*</button>*/}
        </div>
      </div>
    </Link>
  );
};
