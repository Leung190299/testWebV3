import HeaderMiddle from './header-middle';
import { HeaderModalProps } from './header-middle-and-full';
import HeaderModalSheet from './header-modal-sheet';

const HeaderMiddleAndBottom = ({ title, mobileTitle, beforeClose, desc }: HeaderModalProps) => {
  return (
    <>
      {/* Header for mobile */}
      <HeaderModalSheet title={mobileTitle || title} className="md:hidden" />
      {/* Header tablet and pc */}
      <HeaderMiddle title={title} desc={desc} beforeClose={beforeClose} />
    </>
  );
};

export default HeaderMiddleAndBottom;
