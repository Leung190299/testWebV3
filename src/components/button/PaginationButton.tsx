import clsx from 'clsx';

type PaginationButtonProps = {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  theme?: 'dark' | 'light';
};

const PaginationButton = ({ label, isActive, onClick, theme = 'light' }: PaginationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex lg:h-12 lg:w-12 w-10 h-10 items-center justify-center rounded-lg border border-neutral-300 text-base font-medium ',
        isActive && label !== '...' ? 'bg-red-600 text-neutral-0' : '',
        isActive && label === '...' ? 'border-neutral-500' : '',
        theme === 'dark' ? 'text-neutral-0' : ''
      )}
    >
      {label}
    </button>
  );
};

export default PaginationButton;
