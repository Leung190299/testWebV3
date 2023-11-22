import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type Props = {};

const GiftTooltip = (props: Props) => {
  return (
    <div className="flex text-xs text-subtle-content w-full">
      <Tooltip
        content={
          <div className="flex gap-4">
            <img src="/images/gift-bonus.png" alt="gift bonus" className="h-14 w-14 object-cover" />
            <div>
              <p className="mb-1 text-sm font-bold">Tai nghe không dây chụp tai Sony WH-1000X có công nghệ chống ồn</p>
              <p className="text-sm font-bold">
                0đ <span className="ml-1 text-xs text-neutral-500 line-through">990.000đ</span>
              </p>
            </div>
          </div>
        }
        preventDefault
        className="cursor-default"
      >
        <span className="rounded bg-neutral-100 px-1 py-0.5">
          <Svg src="/icons/bold/gift.svg" width={16} height={16} className="mr-1 inline" />
          Quà
        </span>
      </Tooltip>
      <span className="ml-2 flex-1 line-clamp-1 whitespace-break-spaces">
        Dây Chuyền Ngọc Trai Nhân Tạo Màu Trắng Cao Cấp (Có Móc Khóa - Sz 7mm)
      </span>
    </div>
  );
};

export default GiftTooltip;
