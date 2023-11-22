import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import React from 'react';

type Props = {
  title: string;
  desc?: React.ReactNode;
  beforeClose?(): boolean;
  onClose?(): void;
};

const HeaderMiddle = ({ title, desc, beforeClose, onClose }: Props) => {
  const { close } = useModal();
  const handleClose = () => {
    if (onClose) return onClose();
    if (beforeClose) {
      if (beforeClose()) close();
    } else close();
  };
  return (
    <div className="max-md:hidden flex items-center">
      <div>
        <h2 className="text-xl md:text-s-md font-bold">{title}</h2>
        {desc && <p className="mt-2 text-subtle-content">{desc}</p>}
      </div>
      <button
        className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
        type="button"
        onClick={handleClose}
      >
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>
    </div>
  );
};

export default HeaderMiddle;
