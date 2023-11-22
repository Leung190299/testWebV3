import type { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatPhone } from '@/utilities/formatSimNumber';
import React from 'react';
import TagVip from '../tag-chip/tag-vip';
import Svg from '../icon/svg';
import { formatNumber } from '@/utilities/number';

type Props = {
  item: Model.Sim;
  pack: Model.PackOfData;
  className?: string;
  tags?: { id: number | string; name: string }[];
};

const SimRowAppItem = ({ item, pack, className, tags = [] }: Props) => {
  return (
    <div className="flex py-4 px-3 gap-x-3">
      <div className="flex-1">
        <p className="flex items-center gap-x-1">
          <b className="">{formatPhone(item.phone)}</b>
          {item.is_vip ? <TagVip /> : null}
          <span>
            <Svg src="/icons/bold/gift.svg" width={16} height={16} />
          </span>
        </p>
        <p className="text-xs mt-1">
          <b>{pack.name} </b>
          <b>({formatNumber(pack.data, ['B', 'KB', 'GB'])}</b>
          <span className="text-neutral-500">/ngày</span>
          <span> | </span>
          <b>{formatNumber(pack.price)}</b>
          <span className="text-neutral-500">/tháng)</span>
        </p>
        <ul className="mt-2 space-x-1">
          {tags.map((tag) => (
            <li key={tag.id} className="tag tag-primary tag-sm">
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-sm">
          <b>{toCurrency(item.discount_price || item.price)}</b>
        </p>
        {item.discount_price && (
          <p className="text-xs text-neutral-500">
            <s>{toCurrency(item.price)}</s>
          </p>
        )}
      </div>
    </div>
  );
};

export default SimRowAppItem;
