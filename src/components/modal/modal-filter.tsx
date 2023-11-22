import React from 'react';
import Svg from '../icon/svg';
import { useModal } from '@/libs/modal';

type Props = {};

const ModalFilter = (props: Props) => {
  return <div>ModalFilte</div>;
};
ModalFilter.Header = function ModalFilterModal({ title, mobileTitle = 'Bộ lọc' }: { title: string; mobileTitle?: string }) {
  const { close } = useModal();
  return (
    <>
      <header className="md:hidden sticky w-full top-0 bg-neutral-0 py-4.5 z-10 border-b border-neutral-100">
        <div className="container flex">
          <div className="flex-1">
            <button type="button" onClick={close}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
          <h2 className="flex-1 text-center text-[1.125rem]">
            <b>{mobileTitle}</b>
          </h2>
          <div className="flex-1"></div>
        </div>
      </header>
      <header className="max-md:hidden container">
        <h2 className="text-h-sm">
          <b>{title}</b>
        </h2>
        <button
          className="btn-tertiary btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </header>
    </>
  );
};
ModalFilter.Actions = function ModalFilterActions({
  onReset,
  reset = 'Xoá bộ lọc',
  apply = 'Áp dụng'
}: {
  onReset?(): void;
  reset?: string;
  apply?: string;
}) {
  return (
    <footer className="fixed bottom-0 w-full bg-neutral-0 py-2 md:pt-6 md:pb-8">
      <div className="container">
        <div className="-mx-1.5 flex justify-center">
          <div className="w-1/2 md:w-auto px-1.5">
            <button type="button" className="md:w-[9.52rem] btn-secondary btn w-full rounded-full" onClick={onReset}>
              {reset}
            </button>
          </div>
          <div className="w-1/2 md:w-auto px-1.5">
            <button className="md:w-[9.52rem] btn-primary btn w-full rounded-full">{apply}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModalFilter;
