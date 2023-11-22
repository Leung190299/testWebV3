import RadioInput from '@/components/form/RadioInput';
import { FC, useState } from 'react';

export const TestBtn: FC<{
  options: Array<string | number>;
  onClick: Function;
}> = ({ onClick, options }) => {
  const [value, setValue] = useState(options[0]);
  return (
    <div className="fixed z-50 left-4 md:left-10 top-[20vh]">
      <button className="btn btn-primary" onClick={() => onClick(value)}>
        Test
      </button>

      {options.map((v) => (
        <div key={v} className='mt-1'>
          <RadioInput isChecked={value === v} radioId={'id' + v} label={v + ''} onClick={() => setValue(v)} />
        </div>
      ))}
    </div>
  );
};
