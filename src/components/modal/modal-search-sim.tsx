import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import React, { useLayoutEffect, useRef } from 'react';

type Props = {
  defaultValues?: string;
};
const ModalSearchSim = ({ defaultValues }: Props) => {
  const { done, close } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    inputRef.current && defaultValues && (inputRef.current.value = defaultValues);
    inputRef.current?.focus({ preventScroll: true });
  }, [defaultValues]);
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
          <div className="input-leading-icon relative flex-1 mr-2 mb-2">
            <input
              className="input text-sm py-2.5 border-none pl-11 outline-none bg-neutral-100 w-full"
              style={{ borderRadius: '0.5rem' }}
              type="text"
              ref={inputRef}
              autoFocus
              placeholder="*666, *22, 686,...."
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
            <b>Tìm theo ngày sinh, chữ số yêu thích</b>
          </p>
          <p className="mt-3 text-sm text-subtle-content">
            Để tìm Sim kết thúc bằng 686, nhập{' '}
            <span className="tag text-dark-blue bg-neutral-100 rounded border-transparent">
              <b>*686</b>
            </span>
          </p>
          <p className="mt-3 text-sm text-subtle-content">
            Để tìm Sim có chữ số 22 ở vị trí bất kỳ, nhập{' '}
            <span className="tag text-dark-blue bg-neutral-100 rounded border-transparent">
              <b>22</b>
            </span>
          </p>
        </div>
      </main>
    </form>
  );
};

export default ModalSearchSim;
