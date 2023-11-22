import { SimQuery, fengShuiTabs, numerologyTabs } from '@/constants/sim.constants';
import { modal, useModal } from '@/libs/modal';
import clsx from 'clsx';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import HeaderAppDefault from '../header/header-app-default';
import Svg from '../icon/svg';
import SimSearchForm, { IChangeLookup, SimSearchFormProps } from '../sim/sim-search-form';

type Props = {
  type?: 'sheng_fui' | 'numerology';
  defaultIndex?: number;
};

const ModalSimLookup = ({ type = 'sheng_fui', defaultIndex = 0 }: Props) => {
  const { close, done } = useModal();
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const methods = useForm<IChangeLookup>({ defaultValues: { gender: 'male' } });

  const options: SimSearchFormProps =
    type === 'sheng_fui'
      ? {
          includeGender: true,
          includePhone: selectedIndex == 1,
          includeTimeOfBirth: true
        }
      : {
          includeName: true,
          includePhone: selectedIndex == 1
        };

  const tabs = type === 'sheng_fui' ? fengShuiTabs : numerologyTabs;
  const handleSubmit = (values: any) => {
    const tab = tabs[selectedIndex];
    done({ ...values, mode: tab.id });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <HeaderAppDefault title="Đổi tra cứu" mode="close">
          <div className="mobile-container">
            <ul className="tabs">
              {tabs.map((t, index) => (
                <li
                  key={t.id}
                  className={clsx('tab flex-1 tab-bordered tab-primary', index === selectedIndex && 'tab-active')}
                  onClick={() => setSelectedIndex(index)}
                >
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </HeaderAppDefault>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
        <div className="max-md:hidden">
          <ul className="tabs border-b border-neutral-200 gap-x-6 text-s-sm font-bold">
            {tabs.map((t, index) => (
              <li
                key={t.id}
                onClick={() => setSelectedIndex(index)}
                className={clsx('p-4 tab tab-bordered tab-primary', index === selectedIndex && 'tab-active')}
              >
                <div className="">{t.label}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mobile-container mt-2 md:mt-0 py-4">
          <p className="text-subtle-content">
            {selectedIndex === 1
              ? 'Để chấm điểm sim, vui lòng điền đầy đủ các thông tin bên dưới'
              : 'Để tìm số đẹp, vui lòng điền đầy đủ các thông tin bên dưới'}
          </p>
          <SimSearchForm className="mt-8" {...options} />
          <div className="mt-8 text-center">
            <button className="btn w-full md:w-1/2 btn-primary rounded-full">
              <span className="md:hidden">{selectedIndex == 1 ? 'Chấm điểm Sim' : 'Chọn Sim hợp tuổi'}</span>
              <span className="max-md:hidden">{selectedIndex == 1 ? 'Chấm điểm Sim' : 'Tra cứu'}</span>
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export function toggleModalSimLookup(onDone?: (values: IChangeLookup & { mode: SimQuery }) => void, props?: Props) {
  return modal.open({
    render: <ModalSimLookup {...props} />,
    onDone,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    classNameContainer: 'modal-full md:modal-middle'
  });
}

export default ModalSimLookup;
