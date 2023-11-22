import clsx from 'clsx';
import React from 'react';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<{
  title: string;
  desc: string;
  btnLabel?: string;
  onClick?(): void;
}>;

const CardDigital = ({ title, desc, onClick, btnLabel = 'Trải nghiệm ngay', className, ...rest }: Props) => {
  return (
    <div {...rest} className={clsx('shadow-md card bg-base-200', className)}>
      <div className="card-body justify-center p-8">
        <h5 className="card-title text-xl font-bold xl:text-2xl">{title}</h5>
        <p className="text-md card-desc mt-2 whitespace-pre-line">{desc}</p>
        <div className="card-actions mt-6 xl:mt-10">
          <button type="button" onClick={onClick} className="btn-primary btn btn-sm rounded-full md:btn-md xl:btn-lg">
            {btnLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDigital;
