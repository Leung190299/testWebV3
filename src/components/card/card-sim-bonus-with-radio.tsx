import clsx from 'clsx';
import Svg from '../icon/svg';
import { toCurrency } from '@/utilities/currency';

type CardSimBonusItem = {
  id: number;
  name: string;
  image: string;
  oldPrice?: string;
};

type CardSimWithRadioProps = {
  radioId?: string;
  isChecked?: boolean;
  onChange?: () => void;
  cardGift: CardSimBonusItem;
  price?: number;
};

const CardSimBonusWithRadio = ({ radioId, isChecked = false, onChange, cardGift, price }: CardSimWithRadioProps) => {
  return (
    <label
      htmlFor={radioId}
      className={clsx(
        'flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border p-4',
        isChecked ? 'border-red-600 bg-neutral-0' : 'border-neutral-300 bg-neutral-50'
      )}
    >
      <input type="radio" id={radioId} checked={isChecked} onChange={onChange} />
      <img src={cardGift.image} alt="gift bonus" className="h-14 w-14 rounded-lg object-cover" />
      <p className="flex-1 text-sm font-bold text-neutral-800 line-clamp-2">{cardGift.name}</p>
      <div className="flex min-w-[1.25rem] flex-col items-end justify-end">
        <p className="text-sm font-bold text-neutral-800">0đ</p>
        <p className="text-sm font-normal text-neutral-500 line-through">
          {price && toCurrency(price)}
          {cardGift.oldPrice}
        </p>
      </div>
    </label>
  );
};

export default CardSimBonusWithRadio;
