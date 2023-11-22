import clsx from 'clsx';

type TabProps = {
  label: string | any;
  isActive?: boolean;
  onClick?: () => void;
  size?: 'small' | 'large';
  className?: string;
  tabStyle?:string;
};

const Tab = ({ label, isActive, onClick, size, className = '', tabStyle='' }: TabProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'cursor-pointer whitespace-nowrap border-b-2 border-transparent pb-4 px-4 md:p-4 text-neutral-500',
        isActive ? 'border-b-red-500 text-neutral-800' : '',
        tabStyle
      )}
    >
      <p
        className={clsx(
          size === 'small' ? 'text-base font-medium' : '',
          size === 'large' ? 'md:text-2xl text-base font-bold' : '',
          className
        )}
      >
        {label}
      </p>
    </button>
  );
};

export default Tab;
