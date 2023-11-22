import { ownerDocument } from '@/utilities/dom';
import clsx from 'clsx';
import React, { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  defaultUrl?: string;
  onClose?(): void;
  children?: React.ReactNode;
  isHome?: boolean;
  open?: boolean;
};

const ModalShared = forwardRef<HTMLDivElement, Props>(function ModalShared({ open, onClose, children, defaultUrl, isHome }: Props, ref) {
  useEffect(() => {
    const before = () => {
      let documentElement = document.documentElement;
      let ownerWindow = document.defaultView ?? window;

      const scrollbarWidthBefore = ownerWindow.innerWidth - documentElement.clientWidth;
      documentElement.style.paddingRight = scrollbarWidthBefore + 'px';
      documentElement.style.overflow = 'hidden';
    };
    const after = () => {};
    const clear = () => {
      let documentElement = document.documentElement;
      documentElement.style.overflow = '';
      documentElement.style.paddingRight = '';
    };
    open ? before() : after();

    return clear;
  }, [open]);

  useEffect(() => {
    function inAllowedContainer(el: HTMLElement) {
      return __modals.contains(el);
    }
    function onTouchMove(e: TouchEvent) {
      if (e.target instanceof HTMLElement && !inAllowedContainer(e.target)) {
        e.preventDefault();
      }
    }
    if (open) {
      const doc = ownerDocument(__modals);
      doc.addEventListener('touchmove', onTouchMove, { passive: false });
      return () => doc.removeEventListener('touchmove', onTouchMove);
    }
  }, [open]);

  return open ? createPortal(children, __modals) : null;
});

export default ModalShared;
