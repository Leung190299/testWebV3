import Modal, { modal } from '@pit-ui/modules/modal';
import { ModalRenderProps } from '@pit-ui/modules/modal/type';

import ModalConfirm, { ModalConfirmOptions } from '@/components/modal/modal-confirm';
import React from 'react';

declare module '@/libs/modal' {
  namespace modal {
    var confirm: <T>(options: ModalConfirmOptions<T>) => void;
  }
}

modal.confirm = function <T>({ onClose, onDone, type = 'middle', ...rest }: ModalConfirmOptions<T>) {
  const options =
    type === 'middle'
      ? {
          className: 'modal-box max-w-[35rem]'
        }
      : {
          classNameOverwrite: true,
          transition: false,
          className: 'modal-box shadow-itel md:max-w-[35rem]',
          classNameContainer: 'modal-bottom-sheet md:modal-middle',
          classNameOverlay: 'bg-neutral-900 bg-opacity-50'
        };
  return modal.open({
    render: <ModalConfirm {...{ ...rest, type }} />,
    closeButton: false,
    ...options,
    onClose,
    onDone
  });
};

export { modal, ModalProvider, useModal } from '@pit-ui/modules/modal';
export default Modal;
