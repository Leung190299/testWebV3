import { useRouter } from 'next/router';
import React, { forwardRef, useEffect } from 'react';

type Props = {
  onClose?(): void;
  children?: React.ReactNode;
};

const ModalSharedFilm = forwardRef<HTMLDivElement, Props>(function ModalSharedFilm({ onClose, children }: Props, ref) {
  const router = useRouter();
  function handleClose() {
    router.push('/ifilm', undefined, { shallow: true });
    onClose?.();
  }
  useEffect(() => {
    const before = () => {
      let documentElement = document.documentElement;
      let ownerWindow = document.defaultView ?? window;

      const scrollbarWidthBefore = ownerWindow.innerWidth - documentElement.clientWidth;
      documentElement.style.overflow = 'hidden';
    };
    const after = () => {};
    const clear = () => {
      document.documentElement.style.overflow = '';
    };
    before();
    after();

    return clear;
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 top-[4.5rem] z-10" data-theme="light">
      <div key="backdrop" onClick={handleClose} className="fixed inset-0 md:top-[4.5rem] top-[4rem] z-10 bg-neutral-700"></div>
      {children}
    </div>
  );
});

export default ModalSharedFilm;
