import { FC } from 'react';
import { Control, useController } from 'react-hook-form';
import TextInput, { TextInputProps } from './TextInput';

interface InputFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
  inputTag?: FC<any>;
  trim?: boolean;
  [name: string]: any;
}

const InputField: FC<InputFieldProps> = ({ name, control, inputTag: InputTag = TextInput, ...props }) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error }
  } = useController({ control, name });
  const message = error?.message || '';

  return (
    <InputTag
      {...props}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      // placeholder={placeholder ? formatMessage({id: placeholder}) : ''}
      errorMessage={message}
      ref={ref}
    />
  );
};

export default InputField;
