import { ErrorMessage, Props } from '@hookform/error-message';
import React from 'react';
import Svg from '../icon/svg';
import { FieldErrors } from 'react-hook-form';
import clsx from 'clsx';

function InputError({ withoutIcon, message, className }: { withoutIcon?: boolean; message: string; className?: string }) {
  return (
    <p className={clsx('label-text flex items-center mt-2 text-red-500', className)}>
      {!withoutIcon && <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />}
      {message}
    </p>
  );
}

export function InputErrorForm<T extends FieldErrors = {}>({ withoutIcon, ...props }: Props<T, any> & { withoutIcon?: boolean }) {
  return <ErrorMessage {...props} render={({ message }) => <InputError message={message} withoutIcon={withoutIcon} />} />;
}

export default InputError;
