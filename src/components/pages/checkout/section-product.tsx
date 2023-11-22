import Svg from '@/components/icon/svg';
import Routers from '@/routes/routers';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React from 'react';
import SectionHeader from './section-header';

type Props = {
  title: string;
  desc?: string;
  minShow?: number;
  totalItem?: number;
  className?: string;

  children?: React.ReactNode | ((props: { open?: boolean }) => React.ReactNode);
};

const SectionProduct = (props: Props) => {
  const { minShow = 1, totalItem = 1, className = 'mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-0 pb-5' } = props;
  const open = useBoolean(false);
  const router = useRouter();
  return (
    <section className={className}>
      <div className="mobile-container">
        <SectionHeader title={props.title} desc={props.desc} />
      </div>
      <hr className="border-neutral-200" />
      <div className="mobile-container divide-y divide-neutral-200">
        {typeof props.children === 'function' ? props.children({ open: open.value }) : props.children}
        {totalItem > 1 ? (
          <button
            type="button"
            onClick={open.toggle}
            className="flex items-center gap-2 justify-center border-t border-neutral-200 w-full md:py-4 py-2.5 font-bold md:font-medium"
          >
            {open.value ? <p>Thu gọn</p> : <p>Xem thêm {totalItem - minShow} sản phẩm</p>}
            <Svg src="/icons/line/chevron-down.svg" className={clsx('w-5 h-5 md:w-6 md:h-6', open.value && 'rotate-180')} />
          </button>
        ) : null}
      </div>
      <div className="px-3 md:px-0">
        <button
          type="button"
          onClick={() => router.push(Routers.SIM)}
          className="border border-[#aa182c] border-solid flex w-full items-center justify-between px-5 py-3 rounded-2xl "
        >
          <span className="text-base font-bold text-[#aa182c]">Chọn thêm số</span>
          <Svg src="/icons/plusSim.svg" className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default SectionProduct;
