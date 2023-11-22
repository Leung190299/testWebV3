import clsx from 'clsx';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Svg from '../icon/svg';
import { ISimFilter } from '../modal/modal-sim-filter';

type props = {
  methods: UseFormReturn<ISimFilter>;
  className?: string;
  isMobie?: boolean;
};
const FilterNumber = ({ methods, className, isMobie }: props) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  if (isMobie) {
    return (
      <div className={className}>
        <div className={clsx(' font-medium text-neutral-500 text-base ')}>Loại trừ số:</div>
        <div className={ clsx("bg-neutral-200 rounded-[20px] flex flex-col py-1  px-2 gap-1 mt-2 overflow-hidden", isShow?'h-auto':'h-[40px]')}>
          <div className="flex gap-1">
            {['4', '7', '0', '1', '2'].map((number, index) => (
              <div key={number}>
                <label>
                  <input type="checkbox" className="peer sr-only" value={number} {...methods.register('excluded')} />
                  <div className="bg-white rounded-full w-8 h-8 border border-solid border-[#c5c5c5] peer-checked:bg-[#801221] peer-checked:text-neutral-0 bg-neutral-100 center-by-grid">
                    <b>{number}</b>
                  </div>
                </label>
              </div>
            ))}
            <button className="pointer-events-auto mx-1" onClick={()=>setIsShow(!isShow)}>
              <Svg src="/icons/bold/down.svg" className={isShow ? '-rotate-180' : undefined} width={24} height={24} />
            </button>
          </div>
          <div className="flex gap-1">
            {[ '3', '5', '6', '8', '9'].slice(0, 5).map((number, index) => (
              <div key={number}>
                <label>
                  <input type="checkbox" className="peer sr-only" value={number} {...methods.register('excluded')} />
                  <div className="bg-white rounded-full w-8 h-8 border border-solid border-[#c5c5c5] peer-checked:bg-[#801221] peer-checked:text-neutral-0 bg-neutral-100 center-by-grid">
                    <b>{number}</b>
                  </div>
                </label>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className={clsx(' font-medium text-neutral-0 text-base ml-4 ')}>Loại trừ số:</div>
      <ul className="bg-neutral-100 rounded-[20px] border border-solid border-[#851020] shadow-[inset_0px_4px_4px_#00000040] flex p-1 gap-1 mt-2">
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number, index) => (
          <li key={number}>
            <label>
              <input type="checkbox" className="peer sr-only" value={number} {...methods.register('excluded')} />
              <div className="bg-white rounded-full w-8 h-8 border border-solid border-[#c5c5c5] peer-checked:bg-[#801221] peer-checked:text-neutral-0 bg-neutral-100 center-by-grid">
                <b>{number}</b>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterNumber;
