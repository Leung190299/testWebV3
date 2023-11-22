import { Placement } from '@popperjs/core';
import React, { ForwardedRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import useBoolean from '@pit-ui/modules/hooks/useBoolean';

import type { Props, ReactTag } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';

import Element from '../element/element';

import _styles from './tooltip.module.scss';

type TooltipProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  placement?: Placement;
  withArrow?: boolean;
  preventDefault?: boolean;
  theme?: 'dark' | 'light';
  isOpen?: boolean;
};

const Tooltip = forwardRefWithAs(function Tooltip<TTag extends ReactTag = 'span'>(
  {
    as = 'span' as TTag,
    children,
    content,
    placement = 'bottom',
    withArrow = true,
    preventDefault,
    theme = 'light',
    isOpen = true,
    ...rest
  }: Props<TTag, TooltipProps>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const tooltip = useBoolean(false);
  const [referenceElement, setReferenceElement] = React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = React.useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [8, 8]
        }
      },
      { name: 'arrow', options: { element: arrowElement } }
    ]
  });

  const handleMouseEnter = () => {};

  useEffect(() => {
    function handleMouseEnter(ev: MouseEvent) {
      // console.log('123123');
      if (preventDefault) {
        ev.preventDefault();
        ev.stopPropagation();
      }
      tooltip.setTrue();
    }
    function handleMouseLeave() {
      tooltip.setFalse();
    }
    // referenceElement?.addEventListener('touchstart', handleMouseEnter);
    referenceElement?.addEventListener('mouseenter', handleMouseEnter);
    referenceElement?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      referenceElement?.removeEventListener('mouseenter', handleMouseEnter);
      referenceElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [referenceElement, tooltip]);

  return (
    <>
      <Element as={as} {...rest} ref={setReferenceElement}>
        {children}
      </Element>
      {tooltip.value &&
        isOpen &&
        createPortal(
          <div ref={setPopperElement} className={_styles.tooltip} style={styles.popper} {...attributes.popper}>
            <div className={theme === 'dark' ? _styles.tooltip_content_dark : _styles.tooltip_content}>
              <div className="text-sm font-bold">{content}</div>
              {withArrow && (
                <div
                  ref={setArrowElement}
                  style={styles.arrow}
                  className={theme === 'dark' ? _styles.tooltip_arrow_dark : _styles.tooltip_arrow}
                  data-popper-arrow
                >
                  <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.4 1.13333C8.2 0.0666673 9.8 0.0666668 10.6 1.13333L18 11H0L7.4 1.13333Z" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
          </div>,
          __tooltip
        )}
    </>
  );
});

export default Tooltip;
