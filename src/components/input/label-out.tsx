import type { CustomProps } from '@/types/element-type';
import React from 'react';
import Element from '../element/element';

type Props = {
  label?: React.ReactNode;
  required?: boolean;
};

const LabelOut = ({ children, label, required, ...props }: CustomProps<Props, 'div'>) => {
  return (
    <Element {...props} defaultClassName="form-control">
      <label className="label">
        <span className="label-text" aria-required={required}>
          {label}
        </span>
      </label>
      {children}
    </Element>
  );
};

export default LabelOut;
