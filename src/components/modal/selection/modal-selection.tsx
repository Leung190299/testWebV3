import { PropsWithChildren } from 'react';

const ModalSelection = () => {};
ModalSelection.Content = function Content({ children }: PropsWithChildren) {
  return <div className="mt-4">{children}</div>;
};
ModalSelection.Footer = function Footer({ onResolve, onReject }: { onResolve?: AnyVoidFunction; onReject?: AnyVoidFunction }) {
  return (
    <footer className="fixed left-0 bottom-0 w-full bg-neutral-0 py-2 md:pt-6 md:pb-8">
      <div className="mobile-container">
        <div className="flex justify-center -mx-1.5 md:-mx-3">
          {onReject && (
            <div className="w-full px-1.5 md:px-3">
              <button className="md:w-[9.52rem] btn-secondary btn w-full rounded-full" onClick={onResolve}>
                Xác nhận
              </button>
            </div>
          )}
          <div className="w-full px-1.5 md:px-3">
            <button className="md:w-[9.52rem] btn-primary btn w-full rounded-full" onClick={onResolve}>
              {onReject ? 'Áp dụng' : 'Xác nhận'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModalSelection;
