import React from 'react';
import HeaderMiddle from './header-middle';
import HeaderModalFull from './header-modal-full';

export type HeaderModalProps = {
  title: string;
  mobileTitle?: string;
  desc?: React.ReactNode;
  beforeClose?(): boolean;
  onClose?(): void;
};

const HeaderMiddleAndFull = ({ title, mobileTitle = title, desc, beforeClose, onClose }: HeaderModalProps) => {
  return (
    <>
      {/* <HeaderAppDefault title={title} /> */}
      <HeaderModalFull className="md:hidden border-none" title={mobileTitle} beforeClose={beforeClose} onClose={onClose} />
      {/* Header tablet and pc */}
      <HeaderMiddle title={title} desc={desc} beforeClose={beforeClose} onClose={onClose} />
    </>
  );
};

export default HeaderMiddleAndFull;
