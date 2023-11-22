import useOnClickOutside from '@/hooks/useOnClickOutside';
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Svg from '../icon/svg';
import useControlled from '@pit-ui/modules/hooks/useControlled';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { usePopper } from 'react-popper';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type Props = {
  totalPage?: number;
  page?: number;
  adjacent?: number | [number, number];
  onChangePage?(page: number): void;
};

const PaginationSimple = ({ totalPage = 1, page: pageProp, adjacent = 3, onChangePage }: Props) => {
  const [page, setPage] = useControlled(pageProp, pageProp || 1, onChangePage);
  const tooltip = useBoolean(false);
  const [referenceElement, setReferenceElement] = React.useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [8, 8]
        }
      }
    ]
  });

  useOnClickOutside({ current: popperElement }, tooltip.setFalse);

  const [paginations, restPage] = useMemo(() => {
    const adjacentLeft = typeof adjacent === 'number' ? adjacent : adjacent[0];
    const adjacentRight = typeof adjacent === 'number' ? adjacent : adjacent[1];
    const totalAdjacent = adjacentLeft + adjacentRight;
    if (totalPage < totalAdjacent) return [Array.from({ length: totalPage }, (_, i) => i + 1), []];
    else {
      const placeholder: Array<string | number> = [];
      placeholder.length = 1;
      placeholder.fill('');
      for (let index = 0; index < Math.max(adjacentLeft, adjacentRight); index++) {
        if (index < adjacentLeft) placeholder.unshift(adjacentLeft - index);
        if (index < adjacentRight) placeholder.push(totalPage - adjacentRight + index + 1);
      }
      const restPage: Array<number> = [];
      for (let index = adjacentLeft; index < totalPage - adjacentRight; index++) {
        restPage.push(index);
      }

      return [placeholder, restPage];
    }
  }, [adjacent, totalPage]);

  useEffect(() => {
    if (!popperElement) return;
    const listener: any = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements
      if (popperElement?.contains(event.target)) {
        return;
      }
      tooltip.setFalse();
    };

    document.addEventListener('mouseup', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mouseup', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [popperElement, tooltip]);

  const handlePage: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    
    (e) => {
      const page = e.currentTarget.dataset.page;

      if (!page) {
        setReferenceElement(e.currentTarget);
        tooltip.setTrue();
      } else {
        setPage(Number(page));
        tooltip.setFalse();
      }
    },
    [setPage, tooltip]
  );

  const handleNextPage = () => {
    if (page >= totalPage) return;
    setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (page <= 1) return;
    setPage((prev) => prev - 1);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center gap-2 md:gap-3 flex-wrap">
        <button type="button" className="flex md:h-12 md:w-12 h-10 w-10 items-center justify-center" onClick={handlePrevPage}>
          <Svg src="/icons/line/chevron-right.svg" className="inline h-6 w-6 md:h-10 md:w-10 rotate-180" />
        </button>
        {paginations.map((id, idx) => {
          return (
            <button
              className={clsx(
                page === id ? 'bg-red-600 border-red-600 text-base-100' : 'border-neutral-300',
                'h-10 w-10 md:h-12 md:w-12 rounded-lg border box-border'
              )}
              data-page={id}
              key={idx}
              onClick={handlePage}
            >
              {typeof id === 'string' ? '...' : id}
            </button>
          );
        })}
        <button type="button" className="flex md:h-12 md:-w-12 h-10 w-10 items-center justify-center" onClick={handleNextPage}>
          <Svg src="/icons/line/chevron-right.svg" className="inline h-6 w-6 md:h-10 md:w-10" />
        </button>
      </div>
      {tooltip.value &&
        createPortal(
          <div
            ref={setPopperElement}
            className="bg-neutral-0 max-w-md p-3 rounded-lg shadow-itel z-[60]"
            style={styles.popper}
            {...attributes.popper}
          >
            <div>
              <p>
                <b>Chọn số trang</b>
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {restPage.map((id) => (
                  <button
                    type="button"
                    className={clsx(
                      page === id ? 'bg-red-600 border-red-600 text-base-100' : 'border-neutral-300',
                      'h-12 w-12 rounded-lg border box-border'
                    )}
                    data-page={id}
                    key={id}
                    onClick={handlePage}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          __tooltip
        )}
    </div>
  );
};

const Button = ({
  activeClassName,
  idleClassName,
  className,
  isActive,
  ...rest
}: PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    activeClassName?: string;
    idleClassName?: string;
    isActive?: boolean;
  }
>) => {
  return <button {...rest} className={clsx(isActive ? activeClassName : idleClassName, className)} />;
};

export default PaginationSimple;
