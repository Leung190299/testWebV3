import React, { useRef, useState } from 'react';
import useControlled from '@pit-ui/modules/hooks/useControlled';

const useOtpInput = (valueProp?: string, onChange?: (otp: string) => void) => {
  const numInputs = 4;
  const [value, setOtp] = useControlled(valueProp, '', onChange);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const getOTPValue = () => (value ? value.toString().split('') : []);

  const isInputValueValid = (value: string) => {
    const isTypeValid = !isNaN(Number(value));
    return isTypeValid;
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target as any;
    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
      focusInput(activeInput + 1);
    }
  };
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => (index: number) => {
    setActiveInput(index);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const otp = getOTPValue();
    if ([event.code, event.key].includes('Backspace')) {
      event.preventDefault();
      changeCodeAtFocus('');
      focusInput(activeInput - 1);
    } else if (event.code === 'Delete') {
      event.preventDefault();
      changeCodeAtFocus('');
    } else if (event.code === 'ArrowLeft') {
      event.preventDefault();
      focusInput(activeInput - 1);
    } else if (event.code === 'ArrowRight') {
      event.preventDefault();
      focusInput(activeInput + 1);
    }
    // React does not trigger onChange when the same value is entered
    // again. So we need to focus the next input manually in this case.
    else if (event.key === otp[activeInput]) {
      event.preventDefault();
      focusInput(activeInput + 1);
    } else if (event.code === 'Spacebar' || event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      event.preventDefault();
    }
  };
  const changeCodeAtFocus = (value: string) => {
    const otp = getOTPValue();
    otp[activeInput] = value[1] ?? value[0];
    handleOTPChange(otp);
  };
  const handleOTPChange = (otp: Array<string>) => {
    const otpValue = otp.join('');
    setOtp(otpValue);
  };

  const focusInput = (index: number) => {
    const activeInput = Math.max(Math.min(numInputs - 1, index), 0);

    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput]?.focus();
      setActiveInput(activeInput);
    }
  };
  return {
    inputRefs,
    handleChange,
    handleFocus,
    handleKeyDown
  };
};

export default useOtpInput;
