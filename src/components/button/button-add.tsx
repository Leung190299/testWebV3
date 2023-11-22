import clsx from 'clsx';
import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';
import { useGlobalContext } from '@/context/global';

type ButtonAddProps = {
  isAdd?: boolean;
  onClick?: () => void;
  className?: string;
  theme?: 'dark' | 'light';
};
const ButtonAdd = ({ isAdd = false, onClick, className = '', theme = 'light' }: ButtonAddProps) => {
  const { withAuth } = useGlobalContext();
  const cb = withAuth(onClick, []);

  return (
    <button
      className={clsx(
        'btn btn-tertiary btn-circle md:btn-lg btn-sm tooltip tooltip-dark relative z-10',
        theme === 'dark' ? 'bg-neutral-0' : 'bg-transparent hover:bg-neutral-300/[0.2]'
      )}
      onClick={cb}
    >
      <Svg
        src={isAdd ? '/icons/line/minus.svg' : '/icons/line/plus.svg'}
        className={clsx('md:w-6 md:h-6 w-5 h-5 inline text-neutral-0', className)}
      />
      <p className="font-medium tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">
        {isAdd ? 'Xóa khỏi danh sách “phim của tôi”' : 'Thêm vào danh sách “phim của tôi”'}
      </p>
    </button>
  );
};

export default ButtonAdd;
