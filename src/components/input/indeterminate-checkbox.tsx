import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type Props = {
  inderterminate?: boolean | string | number;
};

const InderterminateCheckbox = forwardRef(function InderterminateCheckbox(
  { inderterminate, ...props }: Props & JSX.IntrinsicElements['input'],
  ref: ForwardedRef<HTMLInputElement>
) {
  const innerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    innerRef.current && (innerRef.current.indeterminate = Boolean(inderterminate));
  }, [inderterminate]);
  useImperativeHandle(ref, () => innerRef.current!);
  return <input {...props} ref={innerRef} />;
});

export default InderterminateCheckbox;
