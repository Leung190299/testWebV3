import { SimModel } from '@/types/pick-sim';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
import Svg from '../icon/svg';
import { ISimFilter } from '../modal/modal-sim-filter';

type props = {
  listType: SimModel.TypeOption[];
  valueSelect: SimModel.TypeOption;
  methods: UseFormReturn<ISimFilter>;
  className?: string;
  isMobie?: boolean;
};
const SimType = ({ listType, valueSelect, methods, className, isMobie }: props) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const _type = useWatch({ name: 'type', control: methods.control });
  const [value, setValue] = useState<SimModel.TypeOption>({ id: 0, name: 'Tất cả định dạng số' });
  useEffect(() => {
    setValue(valueSelect);
  }, [valueSelect]);

  if (isMobie)
    return (
      <div className={clsx('flex   items-center justify-between', className)}>
        <div className=" font-medium text-neutral-500 text-base ">Định dạng số:</div>

        <div className=" relative px-3 py-2 mt-2 flex bg-neutral-100 rounded-[20px] justify-between  min-w-[230px]">
          <span className="flex-1">{!value ? 'Tất cả định dạng số' : value.name}</span>
          <button onClick={() => setIsShow(!isShow)} className={clsx(isShow ? 'rotate-180' : 'rotate-0', 'transition-all ')}>
          <Svg src="/icons/bold/down.svg" className={isShow ? '-rotate-180' : undefined} width={24} height={24} />
          </button>
        {isShow && (
          <div className="absolute z-10 -bottom-1 left-0   translate-y-full w-full bg-neutral-0 rounded-[16px] shadow-[0px_1px_4px_#00000029] py-2 px-1 ">
            {listType.map((type) => (
              <div
                className={clsx(
                  'w-full px-8 py-2 rounded-md  cursor-pointer',
                  type.id == Number(_type[0]) ? 'bg-neutral-200' : 'bg-neutral-0'
                )}
                key={type.id}
                onClick={() => {
                  setIsShow(false);
                  methods.setValue('type', [type.id.toString()]);
                  setValue(type);
                }}
              >
                <div className=" font-bold  text-base ">{type.name}</div>
              </div>
            ))}
          </div>
        )}
        </div>

      </div>
    );

  return (
    <div className={clsx('min-w-[300px] relative', className)}>
      <div className=" font-medium text-neutral-0 text-base ml-4 ">Định dạng số:</div>

      <div className=" px-6 py-2 mt-2 flex bg-neutral-100 rounded-[20px] border border-solid border-[#8d1223] shadow-[inset_0px_4px_4px_#00000040]">
        <span className="flex-1">{!value ? 'Tất cả định dạng số' : value.name}</span>
        <button onClick={() => setIsShow(!isShow)} className={clsx(isShow ? 'rotate-180' : 'rotate-0', 'transition-all')}>
          <img className=" w-[16px] h-[9px] top-0 left-0" alt="Vector stroke" src="/icons/arownfliter.svg" />
        </button>
      </div>

      {isShow && (
        <div className="absolute z-10 -bottom-1 left-0   translate-y-full w-full bg-neutral-0 rounded-[16px] shadow-[0px_1px_4px_#00000029] py-2 px-1 ">
          {listType.map((type) => (
            <div
              className={clsx(
                'w-full px-8 py-2 rounded-md  cursor-pointer',
                type.id == Number(_type[0]) ? 'bg-neutral-200' : 'bg-neutral-0'
              )}
              key={type.id}
              onClick={() => {
                setIsShow(false);
                methods.setValue('type', [type.id.toString()]);
                setValue(type);
              }}
            >
              <div className=" font-bold  text-base ">{type.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimType;
