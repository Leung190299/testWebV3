import clsx from 'clsx';
import React, { forwardRef } from 'react';
import Svg from '../icon/svg';
import { PropsOf } from '@/types/element-type';

type Props<I extends React.ElementType> = {
  title: string;
  required?: boolean;
  as?: React.ElementType;
  btn?: React.ElementType;
  input?: I;

  containerProps?: any;

  onClickButton?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
} & PropsOf<I>;

const InputLabelIn = forwardRef<HTMLInputElement, Props<'input'>>(function InputLabelOut(
  {
    containerProps,
    as: Container = 'div',
    btn: Button = 'button',
    input: Input = 'input',
    title,
    required,
    className,
    children,
    onClickButton,
    ...rest
  },
  ref
) {
  return (
    <Container
      as={typeof Container === 'string' ? undefined : 'div'}
      className={clsx('relative px-4 pt-3 pb-2', className)}
      {...containerProps}
    >
      <div className="flex">
        <label className="form-control flex-1">
          <p className="label-text font-medium text-subtle-content" aria-required={required}>
            {title}
          </p>
          <Input type="text" className="bg-transparent outline-none mt-1 font-bold" {...rest} ref={ref} />
        </label>
        <Button className="" onClick={onClickButton}>
          <Svg src="/icons/bold/down.svg" className="w-6 h-6" />
        </Button>
      </div>
      {children}
    </Container>
  );
});

export default InputLabelIn;
