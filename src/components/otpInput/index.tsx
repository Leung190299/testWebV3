import clsx from 'clsx';
import React, { useMemo } from 'react';

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
  containerStyle: string;
  inputStyle: string;
  onFocus?: () => void;
  onSubmit?: (value: string) => void;
};

const RE_DIGIT = new RegExp(/^\d+$/);

const OTPInput = ({ value, valueLength, onChange, containerStyle, inputStyle, onFocus, onSubmit }: Props) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement | null;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };
  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const target = e.target;
    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };
  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      return focusToNextInput(target);
    }

    if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== 'Backspace' || targetValue !== '') {
      return;
    }

    focusToPrevInput(target);
  };
  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>, idx: number) => {
    const { target } = e;
    onFocus && onFocus();
    target.focus();
    if (!value) {
      let item: string[] = [];
      for (let index = 0; index <= idx; index++) {
        item.push('*');
      }
      onChange(item.join(''));
    }
  };

  const onPasteInput = (e: any, index: number) => {
    e.preventDefault();

    let clipText = e.clipboardData.getData('text/plain');
    let numbers = getListNumFromText(clipText);
    if (numbers.length == 0) {
      return;
    }

    if (numbers.length >= 7) {
      onChange(numbers.map((number, ind) => (ind < index ? '*' : number)).join(''));
    } else {
      let item: string[] = [];
      for (let ind = 0; ind <= index; ind++) {
        item.push('*');
      }
      if (index == 0) {
        onChange(
          item
            .concat(numbers.map((number, ind) => (ind < index - 1 ? '*' : number)))
            .slice(-6)
            .join('')
        );
        return;
      }
      onChange(
        item
          .concat(numbers.map((number, ind) => (ind < index - 1 ? '*' : number)))
          .slice(-7)
          .join('')
      );
    }
  };

  const getListNumFromText = (text: string) => {
    let number: string[] = text.split('').filter((tex) => /^\d+$/.test(tex));
    if (number.length > 7) {
      number = number.slice(number.length - 7, number.length);
    }
    return number;
  };

  return (
    <div className={clsx('flex', containerStyle)}>
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          onPaste={(e) => onPasteInput(e, idx)}
          pattern="\d{1}"
          maxLength={valueLength}
          className={clsx(inputStyle)}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              console.log('dasda')
              onSubmit && onSubmit(value);
            }
          }}
          value={digit}
          onChange={(e) => inputOnChange(e, idx)}
          onKeyDown={inputOnKeyDown}
          onFocus={(e) => inputOnFocus(e, idx)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
