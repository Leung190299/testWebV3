import Svg from '@/components/icon/svg';
import { useGlobalContext } from '@/context/global';
import { toCurrency } from '@/utilities/currency';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export const RankCard = () => {
  const { push } = useRouter();
  const { info } = useGlobalContext();
  const percentPoint = useMemo(() => Math.floor(info.pointUpRank! / (info.currentPoint! + info.pointUpRank!) * 100), [info])

  return (
    <div className={'flex flex-col max-lg:flex-row max-lg:gap-4 max-md:grid max-md:grid-cols-1'}>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-gradient-rank p-6 text-center text-neutral-0  max-lg:h-auto">
        <img alt="" src="/images/iwow/silver.svg" className="h-8 w-8 md:h-12 md:w-12" />
        <h5 className="mt-2 font-itel text-h4">{info.rankName}</h5>
        <div className="flex justify-start items-center w-full h-1 mt-2">
          <div className={clsx('w-full h-1 bg-neutral-0/[0.5] overflow-hidden  rounded-full')}>
            <div
              className={clsx('h-full bg-neutral-0 rounded-full')}
              style={{
                width: percentPoint.toString() + '%'
              }}
            />
          </div>
        </div>
        <p className="mt-6 max-md:mt-1 text-xs">
          Điểm cần để lên hạng: <b className="max-md:hidden">{toCurrency(info.pointUpRank!||0)}</b>
        </p>
        <span className="md:hidden text-xs">234</span>
      </div>
      <div className="flex h-full w-[185px] flex-col items-center justify-center rounded-2xl bg-neutral-0 p-6 max-md:p-4 mt-4 max-lg:mt-0 text-center text-neutral-0 w-full">
        <p className={'text-neutral-800 font-bold text-h4'}>{toCurrency(info.currentPoint!||0)}</p>
        <p className={'text-neutral-500 font-sans'}>điểm iTel Rewards</p>
        <button
          type="button"
          className="btn-sm transition-default btn-primary btn rounded-full w-full mt-4"
          onClick={() => push('https://itel-web.vercel.app/promotion/club')}
        >
          Đổi quà iTel Club
        </button>
        {/* <p className="mt-4 text-neutral-800 text-sm font-medium	">48 điểm sẽ hết hạn vào {info.totalPointCycle}</p> */}
        <p className={'text-neutral-500 mt-4 text-xs max-lg:hidden'}>
          Để điểm thưởng không bay mất, nhanh tay thực hiện 1 giao dịch tích luỹ điểm thưởng để gia hạn thời gian sử dụng điểm nhé!
        </p>
        <div className={'box-border border-b border-b-divider-rank bottom-[0.5px] w-full h-px my-4'} />
        <div
          className="flex justify-between w-full text-neutral-800 items-center cursor-pointer"
          onClick={() => push('/profile/point-guide')}
        >
          <p className="text-neutral-800 font-medium text-sm">Xem cách tích điểm</p>
          <Svg src="/icons/bold/right-arrow.svg" width={16} height={16} />
        </div>
      </div>
    </div>
  );
};
