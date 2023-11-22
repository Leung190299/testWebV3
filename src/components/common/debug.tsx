import { useDragItem } from '@/hooks/useDragItem';
import useIsClient from '@/hooks/useIsClient';
import { generateRandomId } from '@/utilities/string';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useGlobalEventListener from '@pit-ui/modules/hooks/useGlobalEventListener';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import clsx from 'clsx';
import EventEmitter from 'events';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import Svg from '../icon/svg';

type Props = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};
let INDEX = 0;
let DEBUG_ID = 0;

const items: string[] = [];
const events = new EventEmitter();

const useIndex = () => {
  const [index, setIndex] = useState<number | null>(null);
  const [id] = useState(generateRandomId);

  useEffect(() => {
    function updateIndex() {
      if (!items.includes(id)) items.push(id);
      setIndex(items.indexOf(id));
    }
    updateIndex();
    events.on('update', updateIndex);
    return () => {
      const idx = items.indexOf(id);
      if (idx !== -1) {
        items.splice(idx, 1);
        events.on('update', updateIndex);
      }
      events.off('update', updateIndex);
    };
  }, [id]);
  return index;
};
const useId = () => {
  useEffect(() => {
    INDEX++;
    return () => {
      INDEX--;
    };
  }, []);
  return useMemo(() => DEBUG_ID++, []);
};
function DebugUI(props: Props) {
  const expanded = useBoolean(false);
  const isAvaiable = useBoolean(false);
  const id = useId();
  const index = useIndex();
  useEffect(() => {
    const avaiable = ['vercel.app', 'local', 'localhost'];
    isAvaiable.setValue(avaiable.some((v) => window.location.hostname.includes(v)));
  }, [isAvaiable]);
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => event.key === 'm' && (event.metaKey || event.ctrlKey) && expanded.toggle(),
    [expanded]
  );
  useGlobalEventListener('keydown', onKeyDown);

  const [style, { onMouseDown, container }] = useDragItem<HTMLDivElement>({ onClick: expanded.toggle });

  return isAvaiable.value && index !== null
    ? createPortal(
        <div className="fixed z-50 left-0 top-1/2" style={{ ...style, top: style.top ?? 50 + 0 * 10 + '%' }} ref={container}>
          <div className="relative">
            <div className="absolute left-0 bottom-full">
              <button className="btn btn-secondary rounded-full btn-xs whitespace-nowrap" onMouseDown={onMouseDown}>
                {props.title || `Demo ${id}`}
              </button>
            </div>
          </div>
          <div className={clsx(expanded.value ? 'visible' : 'invisible touch-none', 'absolute')}>
            <div className="w-max max-w-xs">
              <div className={props.className}>{props.children}</div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
}

export const OptionsList = <T extends { name: string; value: any }>(props: { options: T[]; onChange(v: T): void; checkedValue?: any }) => {
  const { options, onChange, checkedValue } = props;
  return (
    <ul className="menu text-xs p-1">
      {options.map((option) => (
        <li key={option.value}>
          <label className="flex gap-x-2 p-2">
            <input
              type="radio"
              className="w-4 h-4"
              value={option.value}
              checked={checkedValue === option.value}
              onChange={(e) => {
                onChange(option);
              }}
            />
            <span>{option.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
DebugUI.OptionsList = OptionsList;
export default DebugUI;

export function Browser({
  containerClassName,
  title,
  ...props
}: JSX.IntrinsicElements['div'] & { title?: string; containerClassName?: string }) {
  const [isClient] = useIsClient();
  const [style, { onMouseDown, container }] = useDragItem<HTMLDivElement>({});
  const isMinimized = useBoolean(true);
  const isTransitionFinish = useBoolean(true);
  useIsomorphicLayoutEffect(() => {
    isTransitionFinish.setFalse();
  }, [isMinimized.value]);
  const id = useId();
  const index = useIndex();

  return index !== null && isClient
    ? createPortal(
        <div
          className={clsx(
            'fixed left-0 top-1/2 z-50 max-h-96 overflow-hidden shadow-itel backdrop-blur rounded-md bg-opacity-70 flex flex-col',
            containerClassName
          )}
          ref={container}
          style={{
            ...(isMinimized.value
              ? {
                  transform: `translate(calc(-100% + 30px), calc(-50% + 5.5rem * ${index}))`,
                  left: '0',
                  maxHeight: '5rem',
                  minHeight: '5rem'
                }
              : style),
            transition: isTransitionFinish.value
              ? undefined
              : [
                  'left 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1)',
                  'top 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1)',
                  'transform 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1)'
                ]
                  .concat(
                    isMinimized.value
                      ? ['max-height 0.3s 0.5s cubic-bezier(0.1, 1.2, 0.3, 1), opacity 0.3s']
                      : ['max-height 0.5s 0s cubic-bezier(0.1, 1.2, 0.3, 1), opacity 0.3s']
                  )
                  .join(', '),
            zIndex: isMinimized.value ? undefined : '99'
          }}
          onTransitionEnd={isTransitionFinish.setTrue}
          onClick={isMinimized.value ? isMinimized.setFalse : undefined}
          data-theme="dark"
        >
          <div
            className={clsx(
              isMinimized.value ? 'transition-opacity duration-300 delay-500 cursor-pointer' : 'pointer-events-none opacity-0',
              'absolute inset-y-0 right-0 w-8 z-10 text-sm text-center'
            )}
            data-theme="dark"
            style={{
              writingMode: 'vertical-lr',
              textOrientation: 'mixed'
            }}
          >
            {title || `s ${id}`}
          </div>
          <div
            className={clsx(
              isMinimized.value && 'opacity-0',
              'flex-none border-b border-neutral-500/30 cursor-move bg-opacity-30 rounded-t-inherit transition-opacity duration-500'
            )}
            onMouseDown={isMinimized.value || !isTransitionFinish.value ? undefined : onMouseDown}
            data-theme="dark"
          >
            <div className="flex items-center h-8 space-x-1.5 px-3 text-neutral-content">
              <button
                className="w-2.5 h-2.5 bg-red-400 rounded-full cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                type="button"
              >
                <Svg src="/icons/line/close.svg" width={10} height={10} />
              </button>
              <button
                className="w-2.5 h-2.5 bg-yellow-400 rounded-full cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={isMinimized.setTrue}
                type="button"
              >
                <Svg src="/icons/line/minus.svg" width={10} height={10} />
              </button>
              <button
                className="w-2.5 h-2.5 bg-green-400 rounded-full cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                type="button"
              ></button>
            </div>
          </div>
          <div {...props} className={clsx('flex-1 overflow-auto', props.className)}></div>
          {/* </div> */}
        </div>,
        document.body
      )
    : null;
}
