import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import clsx from 'clsx';
import React from 'react';

type Props = {
  title?: string;
  className?: string;
  beforeClose?(): boolean;
  onClose?(): void;
};

const HeaderModalFull = ({ title, className, beforeClose, onClose }: Props) => {
  const { close } = useModal();
  const handleClose = () => {
    if (onClose) return onClose();
    if (beforeClose) {
      if (beforeClose()) close();
    } else close();
  };
  return (
    <nav className={clsx('bg-neutral-0 transition-default sticky w-full top-0 z-50 border-b border-neutral-200', className)}>
      <div className="container">
        <div className="relative flex items-center gap-2 h-16">
          <div className="absolute -left-2">
            <button type="button" className="btn-ghost btn btn-sm btn-circle" onClick={handleClose}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
          <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden">
            <h1 className="truncate max-w-xs">{title}</h1>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderModalFull;
