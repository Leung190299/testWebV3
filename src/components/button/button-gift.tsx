import Svg from '../icon/svg';

type ButtonGiftProps = {
  isHaveGift?: boolean;
  size?: 'small' | 'medium' | 'large',
  inSimPoint?: boolean;
};

const ButtonGift = ({ isHaveGift=false, size='medium', inSimPoint }: ButtonGiftProps) => {
  return (
    <div className="group relative">
      <Svg src="/icons/bold/gift.svg" className={`${size === 'large' ? 'md:w-10 md:h-10 w-6 h-6' : ''} ${size === 'medium' ? 'md:h-6 md:w-6 w-5 h-5' : ''} ${size === 'small' ? 'w-4 h-4' : ''} cursor-pointer ${isHaveGift ? 'inline' : 'hidden'}`} />
      <div className={`absolute ${inSimPoint ? '-right-[9rem]' : '-right-[11rem]'} ${inSimPoint ? 'md:-right-[8rem]' : 'md:-right-4'} xl:-right-5 z-20 mt-3 hidden w-[21rem] items-start justify-between gap-2 rounded-xl bg-neutral-0 p-4 shadow-itel group-hover:flex`}>
        <img src="/images/gift-bonus.png" alt="gift bonus" className="aspect-square w-14" />
        <div>
          <p className="mb-1 text-sm font-bold">Tai nghe không dây chụp tai Sony WH-1000X có công nghệ chống ồn</p>
          <p className="text-sm font-bold">
            0đ <span className="ml-1 text-xs text-neutral-500 line-through">990.000đ</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButtonGift;
