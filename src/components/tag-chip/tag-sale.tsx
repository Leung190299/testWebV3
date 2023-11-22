import React, { useEffect } from 'react';
import Svg from '../icon/svg';
import useTimer from '@/hooks/useTimer-v2';
import dayjs from 'dayjs';
import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';

type TagSaleProps = {};
const TagSale = ({ className, ...rest }: CustomProps<TagSaleProps, 'span'>) => {
  return <span {...rest} className={clsx('tag tag-vector tag-sale bg-gradient-to-r from-yellow-500 to-red-500', className)} />;
};

TagSale.Icon = function Icon({ className, ...rest }: Omit<React.SVGProps<SVGSVGElement>, 'ref'>) {
  return <Svg src="/icons/others/flash-sale.svg" className={clsx('tag-sale-icon', className)} {...rest} />;
};
TagSale.Text = function TagSaleText({ className, ...rest }: Omit<React.HTMLAttributes<HTMLSpanElement>, 'ref'>) {
  return <span className={clsx('font-itel font-bold', className)} {...rest} />;
};
TagSale.Timer = function Timer({
  expiry,
  className,
  ...rest
}: { expiry: dayjs.ConfigType } & Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'>) {
  const { start, stop, hours, minutes, seconds } = useTimer({ expiryTimestamp: expiry });
  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);
  return (
    <div className={clsx('tag-sale-time tabular-nums', className)} {...rest}>
      <span suppressHydrationWarning>{hours.toString().padStart(2, '0')}</span>:
      <span suppressHydrationWarning>{minutes.toString().padStart(2, '0')}</span>:
      <span suppressHydrationWarning>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default TagSale;
