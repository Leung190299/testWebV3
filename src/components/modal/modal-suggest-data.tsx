import { modal, useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { withMobile } from '@/utilities/function';
import Link from 'next/link';
import { useState } from 'react';
import ComboboxesSimple from '../comboboxes/comboboxes-simple';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { toggleModalSelectionList } from './selection/modal-selection-list';

export type Option = {
  id: number;
  name: string;
  short_name: string;
  desc?: string;
  values?: number | [number, number];
};

export const dataUsedOption: Array<Option> = [
  {
    id: 1,
    name: 'Từ 4GB/ ngày',
    desc: '(~120GB/ tháng)',
    short_name: '0 - 4 GB',
    values: [0, 120]
  },
  {
    id: 2,
    name: 'Từ 2 đến dưới 4GB/ ngày',
    desc: '(~60-120GB/ tháng)',
    short_name: '2 - 4 GB',
    values: [60, 120]
  },
  {
    id: 3,
    name: 'Từ 1 đến dưới 2GB/ ngày',
    desc: '(~30-60GB/ tháng)',
    short_name: '1 - 2 GB',
    values: [30, 60]
  },
  {
    id: 4,
    name: 'Dưới 1GB/ ngày',
    desc: '(~30GB/ tháng)',
    short_name: '0 - 1 GB',
    values: [0, 30]
  },
  {
    id: 5,
    name: 'Tôi không quan trọng số Data sử dụng',
    short_name: 'Khoong',
    values: [0, Infinity]
  }
];

export const minutesAmountOption: Array<Option> = [
  {
    id: 1,
    name: 'Từ 30 phút/ ngày',
    desc: '(~1000 phút/ tháng)',
    short_name: '0 - 30 phút',
    values: 1000
  },
  {
    id: 2,
    name: 'Từ 15 phút/ ngày',
    desc: '(~500 phút/ tháng)',
    short_name: '0 - 30 phút',
    values: 500
  },
  {
    id: 3,
    name: 'Tôi không quan trọng số phút gọi',
    short_name: 'Không',
    values: Infinity
  }
];

export const priceUsedOption: Array<Option> = [
  {
    id: 1,
    name: 'Dưới 800/ ngày',
    desc: '(~20.000/ tháng)',
    short_name: '0 - 800',
    values: [0, 20_000]
  },
  {
    id: 2,
    name: 'Từ 800 đến dưới 1.600/ ngày',
    desc: '(~20.000 - 50.000/ tháng)',
    short_name: '800 - 1.600',
    values: [20_000, 50_000]
  },
  {
    id: 3,
    name: 'Từ 1.600 đến dưới 2.400/ ngày',
    desc: '(~50.000 - 80.000/ tháng)',
    short_name: '1.600 - 2.400',
    values: [50_000, 80_00]
  },
  {
    id: 4,
    name: 'Trên 2.400/ ngày',
    desc: '(~80.000/ tháng)',
    short_name: '2.400 - infinite',
    values: [80_000, Infinity]
  }
];

export const ModalSuggestData = () => {
  const { done } = useModal();
  const [dataUsed, setDataUsed] = useState<Option | null>(null);
  const [minutesAmount, setMinutesAmount] = useState<Option | null>(null);
  const [price, setPrice] = useState<Option | null>(null);

  const isInvalid = !dataUsed && !minutesAmount && !price;

  function handleSubmit() {
    done({ data: dataUsed, minutes: minutesAmount, price });
  }


  const handleSelectData = withMobile(async () => {
    const v = await toggleModalSelectionList({
      title: 'Số Data sử dụng/ ngày',
      defaultValue: dataUsed,
      options: dataUsedOption
    }).catch(() => null);
    if (v) setDataUsed(v);
  });

  const handleSelectMinutes = withMobile(async () => {
    const v = await toggleModalSelectionList({
      title: 'Chọn số phút',
      defaultValue: minutesAmount,
      options: minutesAmountOption
    }).catch(() => null);
    if (v) setMinutesAmount(v);
  });

  const handleSelectPrice = withMobile(async () => {
    const v = await toggleModalSelectionList({
      title: 'Số tiền/ ngày',
      defaultValue: price,
      options: priceUsedOption
    }).catch(() => null);
    if (v) setPrice(v);
  });



  return (
    <div className="h-full flex flex-col">
      <HeaderMiddleAndFull title="Tìm gói cước cho riêng bạn" desc="Chia sẻ nhu cầu sử dụng để iTel tư vấn cho bạn nhé!" />
      <div className="mobile-container mt-2 md:mt-6 flex-1 pt-4 md:pt-0">
        <div className="md:hidden text-subtle-content">Chia sẻ nhu cầu sử dụng để iTel tư vấn cho bạn nhé!</div>
        <div className="mt-8 md:mt-0">
          <div className="space-y-3 md:space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Số Data sử dụng/ ngày</span>
              </label>
              <ComboboxesSimple
                onChange={setDataUsed}
                value={dataUsed}
                options={dataUsedOption}
                displayValue={(data) => data.name}
                disableInput
                placeholder="Chọn mức Data"
                onClick={handleSelectData}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Số phút gọi/ ngày</span>
              </label>
              <ComboboxesSimple
                onChange={setMinutesAmount}
                value={minutesAmount}
                options={minutesAmountOption}
                displayValue={(data) => data.name}
                disableInput
                placeholder="Chọn số phút"
                onClick={handleSelectMinutes}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Số tiền/ ngày</span>
              </label>
              <ComboboxesSimple
                value={price}
                onChange={setPrice}
                options={priceUsedOption}
                displayValue={(data) => data.name}
                disableInput
                placeholder="Chọn mức tiền"
                onClick={handleSelectPrice}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8 pb-6 md:pb-0 bg-neutral-0">
        <div className="md:w-1/2 px-3 mx-auto">
          <button onClick={handleSubmit} type="button" className="btn btn-primary md:btn-lg rounded-full w-full" disabled={isInvalid}>
            Tra cứu
          </button>
        </div>
        <p className="mt-6 text-subtle-content text-center">
          <span className="max-md:block">Bạn chưa có Sim?</span>
          <Link href={Routers.SIM} className="text-red-500">
            <b> Mua Sim iTel </b>
          </Link>
          để trải nghiệm ngay nhé.
        </p>
      </div>
    </div>
  );
};

export function toggleModalDataSuggest(onDone?: (values: Record<'data' | 'minutes' | 'price', Option>) => void) {
  return modal.open({
    render: <ModalSuggestData />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone
  });
}

export default ModalSuggestData;
