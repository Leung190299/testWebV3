import clsx from 'clsx';

type TabProps = {
  label: string | any;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'small' | 'large';
  className?: string;
  buttonExtendClassName?: string;
};

const CustomLabelTab = ({ label, isActive, onClick, size, className = '', buttonExtendClassName = '' }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'cursor-pointer whitespace-nowrap border-b-2 border-transparent p-3 px-4  text-neutral-500',
        isActive ? 'border-b-red-500 text-neutral-800 relative z-10' : '',
        buttonExtendClassName
      )}
    >
      <div
        className={clsx(
          size === 'small' ? 'text-base font-medium' : '',
          size === 'large' ? 'md:text-2xl text-base font-bold' : '',
          className
        )}
      >
        {label}
      </div>
    </button>
  );
};

export default CustomLabelTab;
