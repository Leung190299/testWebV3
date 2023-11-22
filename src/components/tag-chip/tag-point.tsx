import clsx from 'clsx';
import React from 'react';

type Props = {} & JSX.IntrinsicElements['span'];

const TagPoint = ({ className, ...rest }: Props) => {
  return <span className={clsx('tag tag-vector-1 bg-dark-blue', className)} {...rest}></span>;
};

export default TagPoint;
