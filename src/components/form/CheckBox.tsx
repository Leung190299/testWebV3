import clsx from 'clsx';
import Svg from '../icon/svg';

type InputProps = {
  disabled?: boolean;
  value?: boolean;
  onChange?: (v: boolean) => void;
};

const CheckBox = ({ value, onChange, disabled }: InputProps) => {
  return (
    <div
      className={clsx(
        'w-5 h-5 rounded border flex justify-center items-center cursor-pointer',
        disabled ? 'border-neutral-500 bg-neutral-500' : value ? 'border-red-500 bg-red-500' : 'border-neutral-300'
      )}
      onClick={() => !disabled && onChange?.(!value)}
    >
      {value && <Svg width={15} className="text-neutral-0" src="/icons/line/check.svg" />}
    </div>
  );
};

export default CheckBox;
