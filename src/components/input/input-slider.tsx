import useControlled from '@pit-ui/modules/hooks/useControlled';
import { areArraysEqual } from '@/utilities/array';
import { clamp, percentToValue, roundValueToStep, valueToPercent } from '@/utilities/number';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useEventCallback } from '@/hooks/useEventCallback';
import { ownerDocument } from '@/utilities/dom';

type SliderParameters<T extends number | [number, number]> = {
  value?: T;
  defaultValue?: T;
  axis?: 'vertical' | 'horizontal' | 'horizontal-reverse';
  step?: number;
  disableSwap?: boolean;
  min: number;
  max: number;
  /**
   * Name attribute of the hidden `input` element.
   */
  name?: string;

  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: (event: React.ChangeEvent<Omit<HTMLInputElement, 'value'> & { value: T }>, value: T, activeThumb: number) => void;
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted?: (event: React.SyntheticEvent | Event, value: T) => void;
};
function isTouchEvent(e: TouchEvent | MouseEvent): e is TouchEvent {
  return (e as TouchEvent).touches !== undefined;
}
function trackFinger(e: TouchEvent | MouseEvent) {
  if (isTouchEvent(e)) {
    if (e.changedTouches)
      for (let i = 0; i < e.changedTouches.length; i += 1) {
        const touch = e.changedTouches[i];
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    return false;
  }
  return { x: e.clientX, y: e.clientY };
}

function findClosest(values: number[], currentValue: number) {
  const { index: closestIndex } =
    values.reduce<{ distance: number; index: number } | null>((acc, value: number, index: number) => {
      const distance = Math.abs(currentValue - value);

      if (acc === null || distance < acc.distance || distance === acc.distance) {
        return {
          distance,
          index
        };
      }

      return acc;
    }, null) ?? {};
  return closestIndex;
}
function asc(a: number, b: number) {
  return a - b;
}
function setValueIndex({ values, newValue, index }: { values: number[]; newValue: number; index: number }) {
  const output = values.slice();
  output[index] = newValue;
  return output.sort(asc);
}

function areValuesEqual(newValue: number | Array<number>, oldValue: number | Array<number>): boolean {
  if (typeof newValue === 'number' && typeof oldValue === 'number') {
    return newValue === oldValue;
  }
  if (typeof newValue === 'object' && typeof oldValue === 'object') {
    return areArraysEqual(newValue, oldValue);
  }
  return false;
}

const axisProps = {
  horizontal: {
    offset: (percent: number) => ({ left: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` })
  },
  'horizontal-reverse': {
    offset: (percent: number) => ({ right: `${percent}%` }),
    leap: (percent: number) => ({ width: `${percent}%` })
  },
  vertical: {
    offset: (percent: number) => ({ bottom: `${percent}%` }),
    leap: (percent: number) => ({ height: `${percent}%` })
  }
};

const InputSliderRange = <T extends number | [number, number]>({
  axis = 'horizontal',
  step = 1,
  name,
  defaultValue,
  disableSwap,
  min,
  max,
  value: propValue,
  onChange,
  onChangeCommitted
}: SliderParameters<T>) => {
  const [dragging, setDragging] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const previousIndex = React.useRef<number>();
  const moveCount = React.useRef<number>();

  const [valueDerived, setValue] = useControlled(propValue, defaultValue || [0, 0]);
  const range = Array.isArray(valueDerived);

  useEffect(() => {
    if (range) {
      const newMin = Math.max(valueDerived[0], min);
      const newMax = Math.min(valueDerived[1], max);
      setValue([newMin, newMax]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  const getFingerNewValue = ({ finger, move = false }: { finger: { x: number; y: number }; move?: boolean }) => {
    const { current: slider } = sliderRef;
    const { width, height, bottom, left } = slider!.getBoundingClientRect();
    let percent;

    if (axis.indexOf('vertical') === 0) {
      percent = (bottom - finger.y) / height;
    } else {
      percent = (finger.x - left) / width;
    }

    if (axis.indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min, max);
    if (step) {
      newValue = roundValueToStep(newValue, step, min);
    }
    // else {
    //   const closestIndex = findClosest(marksValues, newValue);
    //   newValue = marksValues[closestIndex!];
    // }

    newValue = clamp(newValue, min, max);
    let activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values, newValue)!;
      } else {
        activeIndex = previousIndex.current!;
      }

      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(newValue, values[activeIndex - 1] || -Infinity, values[activeIndex + 1] || Infinity);
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values,
        newValue,
        index: activeIndex
      });

      // Potentially swap the index if needed.
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }

    return { newValue, activeIndex };
  };

  const handleChange =
    onChange &&
    ((event: Event | React.SyntheticEvent, value: T, thumbIndex: number) => {
      // Redefine target to allow name and value to be read.
      const nativeEvent = (event as React.SyntheticEvent).nativeEvent || event;
      // @ts-ignore The nativeEvent is function, not object
      const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: { value, name }
      });

      onChange(clonedEvent, value, thumbIndex);
    });

  const handleMouseDown = useEventCallback((e: MouseEvent) => {
    e.preventDefault();
    const finger = trackFinger(e);
    if (finger !== false) {
      const { newValue, activeIndex } = getFingerNewValue({ finger });

      setValue(newValue as any);
    }
    moveCount.current = 0;

    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('mousemove', handleTouchMove);
    doc.addEventListener('mouseup', handleTouchEnd);
  });
  const handleTouchStart = useEventCallback((e: TouchEvent) => {
    const finger = trackFinger(e);
    if (finger !== false) {
      const { newValue, activeIndex } = getFingerNewValue({ finger });
      // focusThumb({ sliderRef, activeIndex, setActive });

      setValue(newValue as any);

      // if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      //   handleChange(nativeEvent, newValue, activeIndex);
      // }
    }

    moveCount.current = 0;

    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });
  const handleTouchMove = useEventCallback((e: MouseEvent | TouchEvent) => {
    const finger = trackFinger(e);
    if (!finger) return;
    const { newValue, activeIndex } = getFingerNewValue({ finger, move: true });

    setValue(newValue as any);

    if (handleChange && !areValuesEqual(newValue, valueDerived)) {
      handleChange(e, newValue as any, activeIndex);
    }
    setDragging(true);
  });
  const handleTouchEnd = useEventCallback((e: MouseEvent | TouchEvent) => {
    const finger = trackFinger(e);
    setDragging(false);
    if (!finger) return;
    const { newValue, activeIndex } = getFingerNewValue({ finger, move: true });

    if (onChangeCommitted) {
      onChangeCommitted(e, newValue as any);
    }
    stopListening();
  });

  const stopListening = useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  let values = typeof valueDerived === 'number' ? [valueDerived] : valueDerived.slice();
  const trackOffset = valueToPercent(range ? values[0] : min, min, max);
  const trackLeap = valueToPercent(values[values.length - 1], min, max) - trackOffset;

  return (
    <div
      onMouseDown={handleMouseDown as any}
      onTouchStart={handleTouchStart as any}
      ref={sliderRef}
      className="relative inline-block h-[3px] w-full touch-none py-3"
    >
      <div className="absolute  top-1/2 h-[inherit] w-full -translate-y-1/2 rounded-full bg-base-200" />
      <div
        className="absolute top-1/2 h-[inherit] w-full -translate-y-1/2 rounded-full bg-base-content"
        style={{
          ...axisProps[axis].offset(trackOffset),
          ...axisProps[axis].leap(trackLeap)
        }}
      />
      {values.map((v, index) => {
        const percent = valueToPercent(v, min, max);
        const style = axisProps.horizontal.offset(percent);
        return (
          <span
            className="absolute box-content h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-base-100 bg-base-content shadow-md"
            key={index}
            style={{ ...style }}
          >
            <input type="range" min={0} max={100} className="absolute inset-0 w-0 appearance-none" style={{ clip: 'rect(0 0 0 0)' }} />
          </span>
        );
      })}
    </div>
  );
};

export default InputSliderRange;
