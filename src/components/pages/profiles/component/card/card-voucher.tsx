import clsx from 'clsx';
import * as React from 'react';
import voucherImg from '@/components/pages/assets/voucher_img.png';
import caffeImg from '@/components/pages/assets/caffe_house_logo.png';
import Image from 'next/image';
import Svg from '@/components/icon/svg';
import Routers from "@/routes";
import {useRouter} from "next/router";
// import Routers from '@/routes';
// import Link from 'next/link';

export const CardVoucher = ({
  img = voucherImg,
  className = '',
  bodyTitle = 'The Coffee House 50.000đ',
  logo = caffeImg,
  point = 200,
  remainDays = 60,
  unit = 'ngày'
}) => {
  const router = useRouter();

  const imageClassName = 'rounded-t-xl';
  return (
    // <Link href={{ pathname: Routers.IWOW_COUPON_DETAIL, query: { id: img?.src } }}>
      <div className={clsx('bg-neutral-0 rounded-xl', className)}>
        <div className="relative w-full">
          <Image src={img} alt={''} className={clsx(imageClassName, 'object-fit aspect-video re')} />
          <div className="absolute bottom-0 left-0">
            <span className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 py-2">Giảm 50.000đ</span>
          </div>
        </div>
        <div className={'p-4 pb-6'}>
          <div className="flex items-center space-x-3">
            <p className="text-neutral-800 max-lg:text-neutral-700 font-bold text-base">{bodyTitle}</p>
            <Image src={logo} width={48} height={48} alt={''} />
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <div className="w-full flex items-center">
                <div className="grow">
                  <div className="flex items-center">
                    <Svg src={'/icons/bold/wallet.svg'} className={'text-yellow-500'} width={17.5} height={16.25} />
                    <p className="text-neutral-700 font-medium ml-[5.25px]">{point} điểm</p>
                  </div>
                  <div className="flex items-center w-full max-lg:hidden">
                    <div className="flex items-center grow">
                      <Svg src="/icons/line/calendar.svg" width={12} height={12} />
                      <p className="text-neutral-500 font-bold text-xs mx-1.5">
                        {remainDays} {unit}
                      </p>
                      <Svg src="/icons/bold/information.svg" width={12} height={12} />
                    </div>
                  </div>
                </div>

                <button
                  className={clsx('', 'transition-default btn-secondary btn md:btn-sm btn-xs rounded-full self-end')}
                  onClick={() => router.push({ pathname: Routers.PROMOTION_DETAIL, query: { id: img?.src } })}
                >
                  Đổi ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </Link>
  );
};
