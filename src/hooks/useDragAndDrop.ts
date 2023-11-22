import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import React, { useCallback } from 'react';

type Props = {
  onDrop?(files: FileList): void;
};

type ReturnUseDragAndDrop<T extends HTMLElement> = [
  boolean,
  Record<'onDragEnter' | 'onDragOver' | 'onDragLeave' | 'onDrop', React.DragEventHandler<T>>
];

const useDragAndDrop = <E extends HTMLElement>(props: Props): ReturnUseDragAndDrop<E> => {
  const isDragOver = useBoolean(false);
  const handleDrag: React.DragEventHandler<E> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        isDragOver.setTrue();
      } else if (e.type === 'dragleave') {
        isDragOver.setFalse();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragOver]
  );
  const handleDrop: React.DragEventHandler<E> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDragOver.setFalse();

      props.onDrop?.(e.dataTransfer.files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isDragOver]
  );
  return [isDragOver.value, { onDragEnter: handleDrag, onDragOver: handleDrag, onDragLeave: handleDrag, onDrop: handleDrop }];
};

export default useDragAndDrop;
