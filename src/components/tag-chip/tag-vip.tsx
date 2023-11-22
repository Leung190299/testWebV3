import React from 'react';
import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type Props = {
  className?: string;
};

const TagVip = ({ className = 'h-6 w-6' }: Props) => {
  return (
    <Tooltip content={<b>Sim VIP</b>}>
      <Svg src="/icons/bold/vip.svg" className={className} />
    </Tooltip>
  );
};

export default TagVip;
