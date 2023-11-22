import React from 'react';
import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type Props = {
  className?: string;
};

const TagSim = ({ className = 'h-6 w-6' }: Props) => {
  return (
    <Tooltip content={<b>Sim cam kết</b>}>
      <Svg src="/icons/bold/commit.svg" className={className} />
    </Tooltip>
  );
};

export default TagSim;
