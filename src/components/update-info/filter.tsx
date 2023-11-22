import { addSim } from '@/store/cart/updateInfoSlice';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import DividerHorizontal from '../common/divider-horizontal';
import Svg from '../icon/svg';

type Props = {
  sim: UpdateInfoModel.resultSim;
  setRadomSim: Function;
  searchSim: (search: string) => void;
};

const FilterUpdateInfo = ({ sim, setRadomSim, searchSim }: Props) => {
  const [query, setQuery] = useState('');
  const focusInput = useBoolean(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const addToCheckout = () => {
    dispatch(addSim(sim));
    router.push('checkout/update-info');
  };
  return (
    <section>
      <div className="container">
        <p className="mt-14">Chọn số Bạn thích nhé, iTel sẽ gửi tặng Bạn hoàn toàn miễn phí</p>
        <div className="flex md:flex-row flex-col bg-neutral-0 p-6 mt-4 rounded-lg items-end md:justify-between">
          {/* input */}
          <div className="flex-1 w-full  md:w-auto md:max-w-[55%] " ref={ref}>
            <p className="text-primary text-center ">Nhập số thuê bao mong muốn</p>
            <div className="relative flex rounded-full bg-neutral-100 flex-1  mt-2 w-full mr-4">
              <div className={'py-2 px-3'}>
                <Svg src="/icons/bold/vector.svg" width={24} height={24} />
              </div>
              <div className="text-md font-bold px-3 py-1 bg-neutral-0">087</div>
              <input
                placeholder={'Tìm Sim theo nhu cầu của bạn (*222, 789*, 56,...)'}
                className={'flex-1 truncate bg-transparent outline-none p-2 h-10'}
                value={query}
                onFocus={focusInput.setTrue}
                onBlur={focusInput.setFalse}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              />

              {focusInput.value && (
                <div className="hidden xl:flex items-center gap-4">
                  {query && (
                    <button
                      onClick={() => {
                        setQuery('');
                        searchSim('');
                      }}
                    >
                      <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                    </button>
                  )}
                  <button className="btn-secondary btn py-1 h-auto  rounded-full" onClick={() => searchSim(query)}>
                    Tìm kiếm
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4 max-xl:hidden">
            <DividerHorizontal />
          </div>
          <div className='flex md:flex-row flex-col w-full md:w-auto  mt-2 items-center md:justify-between'>
            <div className="mx-10 flex flex-col items-center md:basis-[400px]">
              <p className="text-sm">Số được tặng ngẫu nhiên</p>
              <div className="flex my-2 items-center">
                <p className="mx-2 font-bold">{formatPhoneNumber(sim.Phone || '')}</p>
              <button className="mx-3 block md:hidden" onClick={() => setRadomSim()}>
                <Svg src="/icons/line/feather-icon.svg" width={24} height={24} className="text-primary" />
              </button>
              </div>
            </div>
            <div className="mb-4 max-xl:hidden">
              <DividerHorizontal />
            </div>
            <div className="flex items-center w-full mt-2">
              <button className="mx-3 hidden md:block " onClick={() => setRadomSim()}>
                <Svg src="/icons/line/feather-icon.svg" width={24} height={24} className="text-primary" />
              </button>
              <button className="btn btn-primary w-full md:w-[200px] md:px-10 rounded-full mx-3" onClick={() => addToCheckout()}>
                Nhân ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterUpdateInfo;
