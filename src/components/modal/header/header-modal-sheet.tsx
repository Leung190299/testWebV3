import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import clsx from 'clsx';
import React from 'react';

type Props = {
  title?: string;
  className?: string;
};

const HeaderModalSheet = ({ title, className }: Props) => {
  const { close } = useModal();
  return (
    <header className={clsx('flex items-center', className)}>
      <h2 className="flex-1 text-md md:text-s-md font-bold">{title}</h2>
      <button type="button" onClick={() => close()}>
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>
    </header>
  );
};

export default HeaderModalSheet;
