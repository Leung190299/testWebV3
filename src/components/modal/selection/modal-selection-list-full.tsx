import { modal, useModal } from '@/libs/modal';
import React, { useState } from 'react';
import HeaderModalSheet from '../header/header-modal-sheet';
import ModalSelection from './modal-selection';
import Svg from '@/components/icon/svg';
import useDebounced from '@/hooks/useDebounce';
import clsx from 'clsx';
import HeaderModalFull from '../header/header-modal-full';

type Props<T = any> = {
  options?: T[];
  defaultValue?: T;
  title?: string;
  placeholder?: string;
  renderContent?: React.ElementType<{ option: Exclude<T, null>; selected: boolean }>;

  getItemId?(item: T): any;
};

const ModalSelectionList = (props: Props) => {
  const { title, defaultValue, options = [], renderContent: Content, getItemId = (t) => t } = props;
  const [selected, setSelected] = useState(defaultValue);
  const { done } = useModal();
  const handleSelect = () => {
    done(selected);
  };

  return (
    <div className="pb-24">
      <HeaderModalFull title={title} />
      <div className="mt-2 mobile-container py-4">
        <ul className="divide-y divide-neutral-200">
          {Content
            ? options.map((props, index) => {
                const isSelected = getItemId(selected) === getItemId(props);
                return (
                  <li key={index}>
                    <label className="flex py-4 items-center">
                      <input type="radio" className="mr-4" checked={isSelected} onChange={() => setSelected(props)} />
                      <Content option={props} selected={isSelected} />
                    </label>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 w-full mobile-container py-2">
        <button className="btn btn-primary w-full rounded-full" onClick={handleSelect}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};
export const toggleSelectionItems = async <T = unknown,>(props: Props<T>) => {
  return new Promise<T | null>((resolve) => {
    modal.open({
      render: <ModalSelectionList {...props} />,
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-full',
      classNameOverlay: 'bg-neutral-100',
      onClose: () => resolve(null),
      onDone: resolve
    });
  });
};
export default ModalSelectionList;
