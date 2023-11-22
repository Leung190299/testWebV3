import { useGlobalContext } from '@/context/global';
import clsx from 'clsx';
import Svg from '../icon/svg';

type ButtonFavoriteProps = {
  isFavorite?: boolean;
  onClick?: () => void;
  className?: string;
  theme?: 'dark' | 'light';
};

const ButtonFavorite = ({ isFavorite, onClick, className = '', theme = 'light' }: ButtonFavoriteProps) => {
  const { withAuth } = useGlobalContext();
  const cb = withAuth(onClick, []);

  return (
    <button
      className={clsx(
        'btn btn-tertiary btn-circle md:btn-lg btn-sm tooltip tooltip-dark relative z-20',
        theme === 'dark' ? 'bg-neutral-0' : 'bg-transparent hover:bg-neutral-300/[0.2]'
      )}
      onClick={cb}
    >
      <Svg
        src={isFavorite ? '/icons/bold/heart-active.svg' : '/icons/line/heart.svg'}
        className={clsx('md:w-6 md:h-6 w-5 h-5 inline text-neutral-0', className)}
      />
      <p className="font-medium tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">Thêm vào yêu thích</p>
    </button>
  );
};

export default ButtonFavorite;
