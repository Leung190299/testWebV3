import React from 'react';
import Tooltip from '../tooltip/tooltip';
import { useGlobalContext } from '@/context/global';
import clsx from 'clsx';
import Svg from '../icon/svg';

type Props = {
  className?: string;
} & Omit<JSX.IntrinsicElements['button'], 'ref'>;

const ButtonSearch = ({ className, ...rest }: Props) => {
  const { search } = useGlobalContext();
  return (
    <Tooltip
      content="Tìm kiếm"
      as="button"
      type="button"
      onClick={search.setTrue}
      className={clsx(className, 'btn-sm md:btn-md transition-default btn-tertiary btn btn-circle tooltip')}
      {...rest}
      theme={rest['data-theme']}
    >
      <Svg src="/icons/bold/vector.svg" className="w-5 h-5 md:h-6 md:w-6" />
    </Tooltip>
  );
};

export default ButtonSearch;
