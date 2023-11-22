import clsx from 'clsx';
import { FormEvent, forwardRef } from 'react';

type Props = {
  title: string;
  required?: boolean;
  pattern?: any;
} & JSX.IntrinsicElements['input'];

const InputLabelOut = forwardRef<HTMLInputElement, Props>(function InputLabelOut(
  { title, required, className, pattern, children, ...rest },
  ref
) {
  function InputValue(e: FormEvent<HTMLInputElement>) {
    //@ts-ignore
    e.target.value = e.target.value.replace(pattern, '');
  }
  return (
    <div className={clsx('form-control', className)}>
      <label className="label-text font-medium" aria-required={required}>
        {title}
      </label>
      <input type="text" className="input input-bordered mt-2" onInput={(e) => (pattern ? InputValue(e) : null)} {...rest} ref={ref} />
      {children}
    </div>
  );
});

export default InputLabelOut;
