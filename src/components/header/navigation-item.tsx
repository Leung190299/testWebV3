import clsx from 'clsx';
import Link from 'next/link';
import { INavigationItem } from '.';
import Svg from '../icon/svg';

export const NavigationItem = (props: INavigationItem & { className?: string }) => {
  const Element = props.onClick ? 'button' : Link;
  const _props = props.onClick ? { onClick: props.onClick } : { href: props.href };
  return (
    <Element {...(_props as any)} className={clsx('transition-default gap-3 rounded-md', props.className)}>
      {props.icon ? (
        <div className="menu-icon flex items-center justify-center">
          <Svg src={props.icon} className="h-8 w-8" />
        </div>
      ) : null}
      <div className="flex-1 text-left">
        <div className="font-bold">{props.title}</div>
        <p className="text-sm font-normal text-neutral-500">{props.description}</p>
      </div>
      <div className="menu-icon-arrow max-xl:hidden">
        <Svg src="/icons/line/arrow-right.svg" className="inline h-6 w-6 text-red-500" />
      </div>
    </Element>
  );
};
