import Svg from '@/components/icon/svg';
import useDebounced from '@/hooks/useDebounce';
import { modal, useModal } from '@/libs/modal';
import clsx from 'clsx';
import React, { useState } from 'react';
import HeaderModalSheet from '../header/header-modal-sheet';
import ModalSelection from './modal-selection';

type Props<T = unknown> = {
  options?: T[];
  defaultValue?: T;
  title?: string;
  withSearch?: boolean;
  withReject?: boolean;
  type?: 'primary' | 'secondary';
  placeholder?: string;
  maxHeight?: boolean;
  displayValue?(item: T): string;
  renderContent?(props: Exclude<T, null>): React.ReactNode;
};

const ModalSelectionList = (props: Props) => {
  const {
    title,
    defaultValue,
    options = [],
    displayValue = (option) => (typeof option === 'string' ? option : (option as any).name),
    withSearch,
    type = 'primary',
    renderContent,
    placeholder,
    withReject
  } = props;
  const [query, setQuery] = useState('');
  const setQueryDebounced = useDebounced(setQuery, [], 300);
  const [selected, setSelected] = useState(defaultValue);
  const { done, reject } = useModal();
  const handleSelect = () => {
    done(selected);
  };
  const handleReject = () => {
    reject(selected);
  };

  const filteredOption =
    query === ''
      ? options
      : options.filter((option) => {
          return displayValue(option).toLowerCase().includes(query.toLowerCase());
        });


  return (
    <div className="mobile-container pt-6 pb-16">
      <HeaderModalSheet title={title} />
      <ModalSelection.Content>
        {withSearch && (
          <div className="py-4">
            <label className="block relative input-leading-icon">
              <input
                className="input rounded-full text-sm py-3 border-none bg-neutral-100 outline-none"
                onChange={(e) => setQueryDebounced(e.target.value)}
                data-headlessui-focus-guard="true"
                placeholder={placeholder}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
              </div>
            </label>
          </div>
        )}
        <ul className={type === 'primary' ? 'menu' : 'space-y-3'}>
          {filteredOption.map((option, index) => {
            const isSelected = option === selected;
            return type === 'primary' ? (
              <li key={index} className={isSelected ? 'menu-active w-full' : 'w-full'}>
                <button onClick={() => setSelected(option)} className="py-3 font-medium rounded-lg flex w-full">
                  <span className="flex-1 text-left truncate">{displayValue(option)}</span>
                  {isSelected && <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />}
                </button>
              </li>
            ) : (
              <li key={index} className="menu-title">
                <label className="relative flex items-center p-4 gap-4">
                  <input type="radio" name="example" className="peer" checked={isSelected} onChange={() => setSelected(option)} />
                  <span className="absolute inset-0 rounded-lg border-neutral-300 border peer-checked:border-red-500 pointer-events-none" />
                  {renderContent?.(option)}
                </label>
              </li>
            );
          })}
        </ul>
      </ModalSelection.Content>
      <ModalSelection.Footer onResolve={handleSelect} onReject={withReject ? handleReject : undefined} />
    </div>
  );
};
export const toggleModalSelectionList = async <T = unknown,>(props: Props<T>) => {
  return new Promise<T | null>((resolve) => {
    modal.open({
      render: <ModalSelectionList {...props} />,
      classNameOverwrite: true,
      transition: false,
      className: clsx('modal-box shadow-itel', props.maxHeight && 'h-full'),
      classNameContainer: 'modal-bottom-sheet',
      onClose: () => resolve(null),
      onReject: resolve,
      onDone: resolve
    });
  });
};
export default ModalSelectionList;
