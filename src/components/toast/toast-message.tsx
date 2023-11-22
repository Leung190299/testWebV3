import React from 'react';
import { resolveValue, toast as T, Toast } from 'react-hot-toast';
import Svg from '../icon/svg';

const ToastMessage = function ToastMessage(toast: Toast) {
  const animationStyle: React.CSSProperties = toast.height
    ? toast.visible
      ? { opacity: 1, transform: 'scale(1)' }
      : { opacity: 0, transform: 'scale(0.8)' }
    : { opacity: 0, transform: 'scale(0.8)' };
  return (
    <div
      className="transition-default flex origin-top items-center gap-x-2.5 relative rounded-xl px-4 py-2.5 text-sm"
      data-theme="dark"
      style={{ ...animationStyle, ...toast.style }}
    >
      {toast.ariaProps.role === 'alert' ? (
        <Svg src="/icons/line/information.svg" className="text-orange" width={24} height={24} />
      ) : toast.type === 'success' ? (
        <Svg src="/icons/line/check.svg" className="text-green-500" width={24} height={24} />
      ) : toast.type === 'error' ? (
        <Svg src="/icons/line/close.svg" className="text-red-500" width={24} height={24} />
      ) : null}
      <p {...toast.ariaProps}>{resolveValue(toast.message, toast)}</p>
      <button
        onClick={() => {
          T.dismiss(toast.id);
        }}
        className="absolute top-0 right-0 flex justify-center items-center  w-5 h-5 rounded-full p-1 bg-neutral-400 translate-x-1/2 -translate-y-1/2"
      >
        <Svg src="/icons/line/close.svg" className="text-neutral-600" width={10} height={10} />
      </button>
    </div>
  );
};

export default ToastMessage;
