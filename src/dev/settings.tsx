import Svg from '@/components/icon/svg';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { useSettings } from '@/hooks/useSettings';
import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithChildren, useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

import { useGlobalContext } from '@/context/global';
import { useDragItem } from '@/hooks/useDragItem';

const ITEL_SETTING_KEY = 'itel.settings';

const SettingsDrawer = () => {
  const expanded = useBoolean(false);
  const { setOption, settings } = useSettings();
  const { status, setUser } = useGlobalContext();
  const [style, { onMouseDown }] = useDragItem({ onClick: expanded.setTrue });

  const isSynced = useBoolean(false);
  useEffect(() => {
    function synSettings() {
      try {
        const rawSettings = localStorage.getItem(ITEL_SETTING_KEY);
        if (rawSettings) {
          const settings = JSON.parse(rawSettings);
          Object.entries(settings).forEach(([key, value]) => {
            setOption(key as any, value);
          });
        }
      } catch (error) {
      } finally {
        isSynced.setTrue();
      }
    }
    synSettings();
  }, [isSynced, setOption]);
  useEffect(() => {
    function synSettings() {
      localStorage.setItem('itel.settings', JSON.stringify(settings));
    }
    isSynced.value && synSettings();
  }, [isSynced.value, settings]);

  return createPortal(
    <div>
      <div className="bg-base-100" data-theme="dark">
        <div
          className={clsx(
            'fixed bottom-0 left-0 top-0 z-50 flex w-full max-w-xs flex-col bg-base-100 transition-transform duration-300',
            expanded.value ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex justify-between px-6 pb-1 pt-8 align-baseline">
            <div className="">
              <h5 className="text-xl font-semibold">App Configurator</h5>
              <p className="font-thin">See options.</p>
            </div>
            <button className="translate-y-1" aria-hidden="true" onClick={expanded.setFalse}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
          <div className="p-6 pt-1">
            <FieldBase title="Components" className="mt-6">
              {/* <span className="text-sm font-thin">Choose between different staking types.</span> */}
              <div className="mt-2">
                <Link href="/components/icons" className="btn-secondary btn btn-sm">
                  Icon
                </Link>
              </div>
            </FieldBase>
            <FieldBase title="Default login" className="mt-6">
              <SwitchButton checked={settings.defaultLogin} onChange={() => setOption('defaultLogin', !settings.defaultLogin)} />
              <div>
                <button className="btn btn-primary" onClick={() => setUser(null)} disabled={status !== 'authenticated'}>
                  Logout
                </button>
              </div>
            </FieldBase>
            <BreakLine />
            <BreakLine />
          </div>
        </div>
      </div>
      <div className="">
        <span
          className="fixed z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base-100 cursor-move select-none left-4 bottom-4"
          aria-hidden="true"
          role={'button'}
          draggable={false}
          onMouseDown={onMouseDown}
          style={style}
        >
          <Svg src="/icons/line/information.svg" className="h-8 w-8 select-none" />
        </span>
      </div>
    </div>,
    __settings
  );
};

const FieldBase = ({ title, className, children, ...rest }: JSX.IntrinsicElements['div']) => {
  return (
    <div className={className} {...rest}>
      <h6 className="font-semibold">{title}</h6>
      {children}
    </div>
  );
};

type FieldInputProps = PropsWithChildren<{ title: string } & Omit<JSX.IntrinsicElements['input'], 'ref'>>;
const FieldInput = ({ title, children, className, ...rest }: FieldInputProps) => {
  return (
    <FieldBase title={title} className={clsx('flex items-center justify-between', className)}>
      <input className="bg-white/20 text-white w-auto rounded-sm px-3 py-1 text-right" {...rest} />
    </FieldBase>
  );
};
type FieldSelectProps = PropsWithChildren<{ title: string } & Omit<JSX.IntrinsicElements['select'], 'ref'>>;
const FieldSelect = ({ title, className, ...rest }: FieldSelectProps) => {
  return (
    <FieldBase title={title} className={clsx('flex items-center justify-between', className)}>
      <select className="bg-white/20 text-white w-auto rounded-sm px-3 py-1 text-right" {...rest}></select>
    </FieldBase>
  );
};

type SwitchButtonProps = {
  checked?: boolean;
  onChange?(): void;
  className?: string;
};

const SwitchButton = ({ className, checked, onChange }: SwitchButtonProps) => {
  const id = useId();
  return (
    <label htmlFor={id} className={clsx('inline-flex cursor-pointer items-center select-none', className)}>
      <input type="checkbox" id={id} className="peer sr-only" checked={checked} onChange={onChange} />
      <div
        className={clsx(
          'peer-checked:bg-neutral-500 peer-checked:after:translate-x-full',
          "relative h-5 w-9 rounded-full bg-neutral-700 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-red-500 after:bg-red-500 after:transition-all after:content-['']"
        )}
      ></div>
    </label>
  );
};

const BreakLine = () => {
  return <hr className="via-white my-4 h-px flex-shrink-0 border-none bg-gradient-to-r from-transparent to-transparent opacity-25" />;
};
export default SettingsDrawer;
