import useOnClickOutside from '@/hooks/useOnClickOutside';
import { modal, useModal } from '@/libs/modal';
import type { Model } from '@/types/model';
import React, { useEffect, useRef, useState } from 'react';
import CardGiftSelect from '../card/card-gift-select';
import HeaderMiddleAndBottom from '../modal/header/header-middle-and-bottom';

type Props = {
  data: Model.Gift[];
  selectedId?: number;
};

const PopupSelectGift = ({ data, selectedId }: Props) => {
  const [selected, setSelected] = useState(selectedId ? data.find((d) => d.id === selectedId) : null);
  const { done } = useModal();
  return (
    <div className="pb-20 md:pb-0">
      <HeaderMiddleAndBottom title="Chọn quà tặng" />
      <ul className="mt-4 space-y-4">
        {data.map((item) => {
          return (
            <li key={item.id}>
              <CardGiftSelect
                image={item.image}
                onChange={() => setSelected(item)}
                checked={item === selected}
                title={item.name}
                price={item.price}
                discountPrice={0}
              />
            </li>
          );
        })}
      </ul>
      <div className="fixed md:relative bottom-0 bg-neutral-0 left-0 w-full">
        <div className="container py-2">
          <button className="btn btn-primary btn-lg rounded-full w-full" onClick={() => done(selected)}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export const selectGiftModal = (p: Props, done: (p: Model.Gift) => void) => {
  return modal.open({
    render: <PopupSelectGift {...p} />,
    classNameOverwrite: true,
    transition: false,
    className: 'modal-box px-6 py-4 shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-bottom-sheet md:modal-middle',
    classNameOverlay: 'bg-neutral-900 bg-opacity-50',
    onDone: done
  });
};

export default PopupSelectGift;

export const DropdownSelectGift = <T extends HTMLElement>(props: {
  open?: boolean;
  relativeElement: React.RefObject<T>;
  closeOnSelect?: boolean;
  onClose(): void;
  onChange(data: Model.Gift): void;

  data: Model.Gift[];
  selectedId?: number;
}) => {
  const { open, closeOnSelect, onClose, onChange, relativeElement, data, selectedId } = props;
  const container = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<null | { top: number; left: number }>(null);
  useOnClickOutside(container, onClose);
  useEffect(() => {
    if (relativeElement.current) {
      const parent = relativeElement.current!;
      const bcr = parent.getBoundingClientRect();
      const position = { top: bcr.top + bcr.height + scrollY, left: bcr.left + scrollX };
      setPosition(position);
    }
  }, [open, relativeElement]);

  return open && position ? (
    <div ref={container} className="max-xl:hidden absolute z-10 mt-2" style={position}>
      <div className="py-4 px-6 rounded-2xl shadow-itel w-[27.5rem]" data-theme="light">
        <div className="text-xl">
          <b>Chọn quà tặng</b>
        </div>
        <ul className="mt-4 space-y-4">
          {data.map((item) => {
            return (
              <li key={item.id}>
                <CardGiftSelect
                  image={item.image}
                  onChange={() => {
                    onChange(item);
                    closeOnSelect && onClose();
                  }}
                  checked={item.id === selectedId}
                  title={item.name}
                  price={item.price}
                  discountPrice={0}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ) : null;
};
