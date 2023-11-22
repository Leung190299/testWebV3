import { Props, ReactTag } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';
import clsx from 'clsx';
import { ForwardedRef, useState } from 'react';
import Element from '../element/element';
import { useDrag } from './use-drag';

type DragProps = JSX.IntrinsicElements['div'];
const Drag = forwardRefWithAs(function Drag<TTag extends ReactTag = 'div'>(props: Props<TTag, DragProps>, ref: ForwardedRef<HTMLElement>) {
  const [isDrag, setIsDrag] = useState(false);
  const innerRef = useDrag<HTMLDivElement>({
    onDragStart() {
      setIsDrag(true);
    },
    onDragEnd() {
      setIsDrag(false);
    }
  });

  return <Element ref={innerRef} {...props} className={clsx(isDrag ? 'cursor-grabbing' : 'cursor-grab', props.className)}></Element>;
});

export default Drag;
