import Svg from '@/components/icon/svg';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

type ItemProps = PropsWithChildren<{
  title: string;
  description: string | JSX.Element;
  show?: boolean;
  isDone?: boolean;
  onEdit: () => void;
}>;

export const ItemStep: FC<ItemProps> = ({ children, title, description, show, isDone, onEdit }) => {
  return (
    <div className={clsx(isDone || show ? 'bg-neutral-0' : 'bg-neutral-50', ' px-4 py-4 md:px-8 md:py-5 rounded-lg')}>
      <div>
        <div className="flex gap-6 items-center">
          <div className=" flex-1">
            <p className={isDone ? 'text-sm text-neutral-500' : 'md:text-xl font-bold'}>{title}</p>
            {typeof description == 'string' ? (
            <div className={isDone ? 'md:text-xl' : 'mt-1 text-xs md:text-sm text-neutral-400'} dangerouslySetInnerHTML={{__html:description}} ></div>
            ) : (
            <div className={isDone ? 'md:text-xl' : 'mt-1 text-xs md:text-sm text-neutral-400'} >{description}</div>
            )}
          </div>

          {isDone && !show && (
            <div className="flex gap-2 cursor-pointer" onClick={onEdit}>
              <Svg width={20} height={20} src="/icons/line/edit-3.svg" />
              <p className="md:hidden text-sm font-bold">Sửa</p>
              <p className="hidden md:block text-sm font-bold">Chỉnh sửa</p>
            </div>
          )}
        </div>
      </div>

      <div className={clsx(!show && 'hidden', 'mt-4 md:mt-5 border-t border-t-neutral-200 pt-4 md:pt-5')}>{children}</div>
    </div>
  );
};

type ItemStepHeaderProps = {
  index: number;
  title: string;
  active?: boolean;
  isDone?: boolean;
};

export const ItemStepHeader = ({ index, title, isDone, active }: ItemStepHeaderProps) => {
  return (
    <div className="flex items-center gap-1 min-w-[32px]">
      {index > 0 && <div className="w-4 border-t border-dashed border-t-neutral-400 h-0" />}
      <div
        className={clsx(
          'flex min-w-[32px] w-8 h-8 justify-center items-center rounded-full overflow-hidden',
          active ? 'bg-neutral-100 md:bg-neutral-0' : isDone ? 'bg-red-600' : 'bg-neutral-200'
        )}
      >
        {active ? (
          <p className="font-medium text-neutral-800">{index + 1}</p>
        ) : isDone ? (
          <Svg className="text-red-600" src="/icons/bold/tick-circle.svg" width={32} height={32} />
        ) : (
          <p className="font-medium text-neutral-500">{index + 1}</p>
        )}
      </div>
      {active && <p className="flex-1 truncate font-bold text-xs">{title}</p>}
    </div>
  );
};
