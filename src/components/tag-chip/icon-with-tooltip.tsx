import React from 'react';
import Svg from '../icon/svg';

type Props = {
  conatinerClassName?: string;
  className?: string;
  children?: React.ReactNode;
  src?: string;
};

const IconWithTooltip = ({ src = '/icons/line/information.svg', className = 'h-6 w-6', children }: Props) => {
  return (
    <span className="tooltip tooltip-light">
      <Svg src={src} className={className} />
      <span className="tooltip-bottom pointer-events-none max-w-sm shadow-itel tooltip-text">{children}</span>
    </span>
  );
};

export default IconWithTooltip;
