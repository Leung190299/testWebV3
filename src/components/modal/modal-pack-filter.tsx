import useIsClient from '@/hooks/useIsClient';
import { useModal } from '@/libs/modal';
import { useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Accordions from '../accordion/accordions';
import Svg from '../icon/svg';
import ModalFilter from './modal-filter';
import { Button } from './modal-sim-filter';

import { datas, sorts } from '@/constants/pack.constants';

type Props = {
  defaultValues?: any;
};
export type IPackFilter = {
  data: number;
  sortBy: number;
  priceRange: [number, number];
};

const ModalPackFilter = (props: Props) => {
  const [, forceRender] = useIsClient();
  const [isActive, setIsActive] = useState<true | undefined>(() =>
    typeof window !== 'undefined' ? (window.innerWidth < 768 ? true : undefined) : undefined
  );

  const { done } = useModal();
  const methods = useForm<IPackFilter>({
    defaultValues: {
      sortBy: 'all',
      data: 'all',
      ...props.defaultValues
    },
    mode: 'onChange'
  });
  useEffect(() => {
    const detect = () => (window.innerWidth < 768 ? setIsActive(true) : setIsActive(undefined));
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('resize', detect);
    };
  }, []);
  const [data, sortBy] = useWatch({ name: ['data', 'sortBy'], control: methods.control });
  const dataName = useMemo(() => {
    if (!data) return undefined;
    return datas.find((s) => s.id === data);
  }, [data]);
  const sortName = useMemo(() => {
    if (!sortBy) return undefined;
    return sorts.find((s) => s.id === sortBy);
  }, [sortBy]);
  const resetForm = () => {
    methods.reset({ sortBy: 1, data: 0 });
    forceRender();
  };

  return (
    <form onSubmit={methods.handleSubmit(done)} className="md:pt-12">
      <ModalFilter.Header title="Lọc gói cước" />

      <main className="mt-2 pb-20 md:pt-0">
        <div className="bg-neutral-0">
          <div className="container">
            <ul className="space-y-8 md:space-y-0 py-6">
              <Accordions as={'li'} isActive={isActive}>
                <Button>
                  <span>Data</span>
                  {dataName && <span className="text-sm ml-2 text-red-500">{dataName.name}</span>}
                </Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4 space-y-2 md:space-y-0 font-medium">
                    {datas.map((data) => (
                      <li key={data.id}>
                        <label className="w-ful flex items-center relative">
                          <input type="radio" className="peer" hidden value={data.id} {...methods.register('data')} checked={data.id==methods.getValues('data')} />
                          <span className="absolute inset-0 rounded peer-checked:bg-neutral-100" />
                          <span className="relative block w-full py-3 px-4 md:py-4">{data.name}</span>
                          <span className="relative hidden peer-checked:block md:!hidden pr-4">
                            <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive}>
                <Button>
                  <span>Giá</span>
                  {sortName && <span className="text-sm ml-2 text-red-500">{sortName.name}</span>}
                </Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4 space-y-2 md:space-y-0 font-medium">
                    {sorts.map((sort) => (
                      <li key={sort.id}>
                        <label className="w-ful flex items-center relative">
                          <input type="radio" className="peer" hidden value={sort.id} {...methods.register('sortBy')} checked={sort.id==methods.getValues('sortBy')} />
                          <span className="absolute inset-0 rounded peer-checked:bg-neutral-100" />
                          <span className="relative block w-full py-3 px-4 md:py-4">{sort.name}</span>
                          <span className="relative hidden peer-checked:block md:!hidden pr-4">
                            <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
            </ul>
          </div>
        </div>
      </main>
      <ModalFilter.Actions onReset={resetForm} />
    </form>
  );
};

export default ModalPackFilter;
