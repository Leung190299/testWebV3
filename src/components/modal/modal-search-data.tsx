import Svg from '@/components/icon/svg';
import { modal, useModal } from '@/libs/modal';
import clsx from 'clsx';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  defaultTabIndex?: number;
};
export const tabs = [
  {
    id: 1,
    title: 'Tìm theo từ khoá',
    label: 'Tìm theo từ khoá',
    placeholder: 'Tìm kiếm tên gói cước...',
    desc: 'Tìm kiếm theo tên Gói cước, ví dụ: iTel 49, iTel 127'
  },
  {
    id: 2,
    title: 'Tìm theo thuê bao',
    label: 'Tra gói cước theo thuê bao',
    placeholder: 'Bạn nhập số thuê bao iTel tại đây nhé',
    desc: 'Tìm kiếm theo thuê bao là tìm theo Số điện thoại sẽ giúp bạn biết được các gói cước phù hợp nhất với thuê bao đó'
  }
];
const ModalSearchData = ({ defaultTabIndex = 0 }: Props) => {
  const [currentTab, setCurrentTab] = useState(tabs[defaultTabIndex]);
  const { done, close } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const onTouchOutSide = () => {
    inputRef.current?.blur();
  };

  const onHandleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const content = inputRef.current?.value;
    if (content) done(content);
  };

  const onClose = () => {
    const content = inputRef.current?.value;
    if (!content) return done('');
    else close();
  };

  return (
    <form action="#" onSubmit={onHandleSubmit} className="min-h-full bg-neutral-0" onTouchStart={onTouchOutSide}>
      <nav className="bg-neutral-0 transition-default sticky w-full top-0 z-50 border-b border-neutral-200">
        <div className="container">
          <div className="relative flex items-center gap-2 h-16">
            <div className="absolute left-0">
              <button type="button" className="btn-ghost btn btn-sm btn-circle" onClick={onClose}>
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            </div>
            <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden">
              <h1 className="truncate max-w-xs">Tìm kiếm</h1>
            </div>
          </div>
          <div className="tabs">
            {tabs.map((tab) => {
              return (
                <div
                  key={tab.id}
                  className={clsx('tab tab-bordered tab-primary flex-1', tab == currentTab ? 'tab-active' : undefined)}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab.title}
                </div>
              );
            })}
          </div>
          <div className="input-leading-icon relative flex-1 mr-2 py-2">
            <input
              className="input text-sm py-2.5 border-none pl-11 outline-none bg-neutral-100 w-full"
              style={{ borderRadius: '0.5rem' }}
              type="text"
              ref={inputRef}
              autoFocus
              placeholder={currentTab.placeholder}
              onTouchStart={(e) => e.stopPropagation()}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
            </div>
          </div>
        </div>
      </nav>
      <main>
        <hr className="bg-neutral-100 h-2 border-transparent" />
        <div className="container py-4">
          <p>
            <b>{currentTab.placeholder}</b>
          </p>
          <p className="mt-3 text-sm text-subtle-content">{currentTab.desc}</p>
        </div>
      </main>
    </form>
  );
};

export function toggleSearchData(done?: (v: string) => void, defaultTabIndex = 0) {
  modal.open({
    render: <ModalSearchData defaultTabIndex={defaultTabIndex} />,
    transition: false,
    closeButton: false,
    className: 'modal-box shadow-itel bg-neutral-100',
    classNameContainer: 'modal-full',
    onDone: done
  });
}

export default ModalSearchData;
