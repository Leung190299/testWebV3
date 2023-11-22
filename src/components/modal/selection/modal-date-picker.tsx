import { modal, useModal } from '@/libs/modal';
import React, { useState } from 'react';
import HeaderModalSheet from '../header/header-modal-sheet';
import ModalSelection from './modal-selection';
import DatePicker from '@/components/common/date-picker';

type Props = {
  defaultValue?: Date | string;
  title?: string;
};

const ModalDatePicker = (props: Props) => {
  const { title, defaultValue } = props;
  const [value, setValue] = useState<Date>(
    typeof defaultValue === 'string' ? (defaultValue ? new Date(defaultValue) : new Date()) : defaultValue || new Date()
  );
  const { done } = useModal();
  const handleSelect = () => {
    done(value);
  };
  return (
    <div className="mobile-container pt-6 pb-16">
      <HeaderModalSheet title={title} />
      <ModalSelection.Content>
        <div className="pb-6 flex justify-center">
          <DatePicker value={value} onChange={setValue} />
        </div>
      </ModalSelection.Content>
      <ModalSelection.Footer onResolve={handleSelect} />
    </div>
  );
};
export const toggleModalDatePicker = async (props: Props) => {
  return new Promise<Date | null>((resolve, reject) => {
    modal.open({
      render: <ModalDatePicker {...props} />,
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-bottom-sheet',
      onClose: () => resolve(null),
      onDone: resolve
    });
  });
};
export default ModalDatePicker;
