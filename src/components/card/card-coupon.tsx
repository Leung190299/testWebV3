import Routers from '@/routes/routers';
import itelClubService from '@/services/itelClubService';
import { modal } from '@pit-ui/modules/modal';
import clsx from 'clsx';

import { toCurrency, toNumber } from '@/utilities/currency';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CustomProps } from '../../types/element-type';
import ButtonLoading from '../button/button-loading';
import Svg from '../icon/svg';
import { toggleModalVoucher } from '../modal/modal-voucher-detail';
import Tooltip from '../tooltip/tooltip';

type Props = CustomProps<{
  title: string;
  redemptionDeadline: string;
  img: string;
  logo: string;
  point: number;
  data: itelClubModel.Voucher;
  id: string | number;
  classButton?: string;
}>;

const CardCoupon = ({
  title,
  img = '/image/logo',
  logo = '/image/url',
  redemptionDeadline,
  className,
  point,
  id,
  data,
  classButton,
  ...rest
}: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const getDetailVoucher = async (id: string | number) => {
    itelClubService
      .getDetailVoucher(id)
      .then((dataResult) => {
        toggleModalVoucher({
          data: {
            ...data,
            ...dataResult.result.data
          },
          isReceived: false,
          isRequiredPoint: true,
          isShowDebug: false
        });
      })
      .catch((e) => {
        return modal.confirm({
          title: 'Thông báo',
          content: <p data-theme="light">{e.response.data.result.error}</p>,
          confirmLable: 'Xác nhận',
          onDone: () => {
            router.push(Routers.PROMOTION_ICLUB);
          }
        });
      });
  };
  const handleOpenConfirm = async () => {
    try {
      setIsLoading(true);
      getDetailVoucher(id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <figure
      className={clsx('group transition-default card bg-neutral-0 tooltip-light z-0', className, isLoading && 'opacity-70')}
      {...rest}
    >
      <Link href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: id, type: 'GET', category: data.parent_cat_id } }}>
        <div className="block-img block-video relative rounded-t-lg md:rounded-t-2xl overflow-hidden">
          <img src={img} alt="promotion image" className="transition-default h-full w-full object-cover group-hover:scale-110" />
          <div className="absolute bottom-0 left-0">
            <span className="tag tag-vector h-auto bg-gradient-to-r from-yellow-500 to-red-500 px-2 py-1 md:px-4 md:py-2">
              <span className="max-md:hidden text-sm">Giảm {toCurrency(Number(data.price) || 0)}</span>
              <span className="md:hidden text-xs">Giảm {toCurrency(Number(data.price) || 0)}</span>
            </span>
          </div>
        </div>
      </Link>

      <div className="card-body md:gap-6 md:px-4 md:py-3 gap-2 p-2">
        <Link href={{ pathname: Routers.PROMOTION_DETAIL, query: { id: id, type: 'GET', category: data.parent_cat_id } }}>
          <h5 className="card-title max-sm:text-sm justify-between gap-3 font-bold items-start md:items-center">
            <Tooltip content={title} placement="top-start">
              <p className="text-left line-clamp-2">{title}</p>
            </Tooltip>
            <div className="relative aspect-square md:w-12 md:h-12 w-6 h-6 flex-shrink-0 overflow-hidden z-0 rounded-full">
              <img src={logo} alt="logo image" className="h-full w-full object-cover" />
            </div>
          </h5>
        </Link>
        <div className="card-actions justify-between">
          <div>
            <div className="flex items-center gap-1 max-sm:text-xs">
              <Svg src="/images/iwow/point.svg" className="h-5 w-5" />
              {toNumber(point)} điểm
            </div>
            <div className="card-desc mt-1 flex items-center gap-1 text-xs font-semibold md:font-normal text-neutral-800 md:text-neutral-600">
              <Svg src="/icons/line/calendar.svg" className="h-4 w-4" fill="#666666" />
              {redemptionDeadline}
              <Tooltip content={`Hạn sử dụng ${redemptionDeadline} kể từ ngày đổi ưu đãi`}>
                <Svg src="/icons/line/information.svg" className="h-4 w-4" />
              </Tooltip>
            </div>
          </div>
          <ButtonLoading
            disabled={isLoading}
            className={clsx(classButton, 'transition-default btn-secondary btn md:btn-sm btn-xs rounded-full')}
            onClick={handleOpenConfirm}
            isLoading={isLoading}
            type={'button'}
          >
            Đổi ngay
          </ButtonLoading>
        </div>
      </div>
    </figure>
  );
};

export default CardCoupon;
