import Stepper from '@/components/stepper/stepper';
import { toCurrency } from '@/utilities/currency';
import React from 'react';

import Svg from '@/components/icon/svg';
import Tooltip from '@/components/tooltip/tooltip';
import Routers from '@/routes/routers';
import styles from '@/styles/cart.module.scss';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSwipeable } from 'react-swipeable';

type CommonProps = {
  // quanitty
  // Option for quanity
  min?: number;
  max?: number;
  quantity?: number;
  editable?: boolean;
  onChange?(quantity: number): void;

  title?: string;
  desc?: string;
  price?: number;
  discountPrice?: number;
};

type Props = {
  children?: React.ReactNode;
  hasChild?: boolean;
  totalRow?: number;
  img?: string;
  isLast?: boolean;
  checked?: boolean;
  onSelect?: React.ChangeEventHandler<HTMLInputElement>;

  subtotalPrice: number;
  subtotalDiscountPrice?: number;
  isExpaned?: boolean;
  link?: string;
  onRemove?(): void;
} & CommonProps;

const TableRowItem = ({
  title,
  desc,
  children,
  hasChild,
  totalRow = 1,
  onRemove,
  editable,
  img,
  isLast,
  quantity,
  onChange,
  link,
  price,
  discountPrice,
  subtotalPrice,
  subtotalDiscountPrice,
  isExpaned: isExpanedProps,

  // Input props
  checked,
  onSelect
}: Props) => {
  const deleteable = useBoolean(false);
  const router = useRouter();
  const handler = useSwipeable({
    onSwipedLeft: deleteable.setTrue,
    onSwipedRight: deleteable.setFalse,
    swipeDuration: 300,
    preventScrollOnSwipe: true,
    // Only enable in development
    // swipe to show delete only show on mobile
    trackMouse: process.env.NODE_ENV === 'development',
    trackTouch: true
  });
  const isExpaned = isExpanedProps || deleteable.value;

  const imgSrc =
    img || '/images/iconCart.png';

  return (
    <tbody
      className={clsx('transition-default', styles.row_group, isLast && 'md:rounded-b-lg')}
      {...handler}
      draggable={false}
      style={{ userSelect: 'none', transform: `translateX(${isExpaned ? -74 : 0}px)` }}
    >
      <tr
        className="md:hidden absolute right-0 inset-y-0 bg-red-500 mb-px transition-default"
        data-theme="dark"
        style={{ transform: `translateX(${isExpaned ? 74 : 0}px)`, width: 74 }}
        onClick={onRemove}
      >
        <td className="center-by-grid h-full text-sm" style={{ background: 'transparent' }}>
          <div>Xoá</div>
        </td>
      </tr>
      <tr className={clsx(styles.row_parent, { [styles.has_child]: hasChild })}>
        <td className={clsx(styles.cell_first, hasChild ? '' : 'rounded-bl-inherit')} />
        {/* Cell checkbox */}
        <td className={styles.cell_checkbox}>
          <input type="checkbox" className="flex" name="sim" checked={checked} onChange={onSelect} />
        </td>
        {/* Cell for image */}
        <td className={clsx('w-1 max-md:hidden', styles.cell_image)}>
          <div className="w-20">
            <div className="block-img block-square">
              <img src={imgSrc} alt="this is sim" className="rounded-lg bg-neutral-200 object-cover" />
            </div>
          </div>
        </td>
        {/* Cell for information */}
        <td>
          <div className="flex items-center">
            <div className="md:hidden w-18 md:w-16 mr-2">
              <div className="block-img block-square">
                <img src={imgSrc} alt="this is sim" className="rounded-lg bg-neutral-200 object-cover" />
              </div>
            </div>
            <div className="flex flex-1">
              <div>
                <div className="text-sm md:text-base">
                  <Link href={link ? `${Routers.IMALL_DETAIL}?slug=${link}` : ''}>
                    <b>{title} </b>
                  </Link>
                </div>
                <p className="text-xs md:text-sm text-subtle-content">{desc}</p>
              </div>
            </div>
          </div>
        </td>
        {/* Cell for basic price */}
        {price ? (
          <td className="max-xl:hidden text-right">
            <div className="text-sm font-medium">
              <b>{toCurrency(discountPrice ?? price)}</b>
            </div>
            {discountPrice && (
              <p className="text-xs text-subtle-content">
                <s>{toCurrency(price)}</s>
              </p>
            )}
          </td>
        ) : (
          <td className="max-xl:hidden text-right"></td>
        )}
        <td className="max-md:hidden text-center">
          {editable && (
            <div className="inline-flex px-2">
              <Stepper
                className="w-min"
                min={1}
                max={20}
                value={quantity}
                defaultValue={quantity}
                onChange={onChange ? (e) => onChange(Number(e.target.value)) : undefined}
              />
            </div>
          )}
        </td>
        {/* Cell for basic quantity and unit */}
        <td className="text-sm text-right">
          <div className="md:text-base">
            <b>{toCurrency(subtotalDiscountPrice ?? subtotalPrice)}</b>
          </div>
          {subtotalDiscountPrice && (
            <p className="text-xs md:text-sm text-subtle-content xl:hidden">
              <s>{toCurrency(subtotalPrice)}</s>
            </p>
          )}
        </td>
        <td className="md:hidden w-4" rowSpan={totalRow}></td>
        <td className={clsx('w-1 max-md:hidden', isLast && 'rounded-br-inherit')}>
          <div className="px-4 py-5 inset-y-0 right-0">
            <button type="button" className="block" onClick={onRemove}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
        </td>
      </tr>
      {children}
      <tr>
        <td className={clsx(hasChild ? 'md:h-4' : isLast ? '' : 'border-b', 'bg-neutral-0 border-neutral-200')} colSpan={999} />
      </tr>
    </tbody>
  );
};
type TableRowSubItemProps = {
  img?: React.ReactNode;
  typeSim?:string
  // type
  type?: 'pack' | 'sim' | 'product' | 'gift';

  selectable?: boolean;
  onSelect?(e: React.MouseEvent<HTMLButtonElement>): void;
} & CommonProps;
export const TableRowSubItem = ({
  price = 0,
  discountPrice,
  title,
  desc,
  img,
  selectable,
  editable,
  onChange,
  quantity,
  onSelect,
  typeSim,
  type = 'product'
}: TableRowSubItemProps) => {
  return (
    <tr className={clsx(styles.row_item, styles.first_child)}>
      <td className={styles.cell_first} />
      {/* Cell for checkbox */}
      <td className={styles.cell_checkbox}></td>
      {/* Cell for image */}
      <td className={clsx('w-1 max-md:hidden', styles.cell_image)} />
      {/* Cell for information */}
      <td>
        <div className="flex items-center">
          <div className="w-10 xl:w-14">
            <div className="block-img block-square">
              {typeof img === 'string' ? (
                <img src={img} alt={img} className="rounded-lg object-cover" />
              ) : type === 'sim' ? (
                <div className={clsx("absolute inset-0 rounded-lg  center-by-grid",typeSim=='physic'?'bg-dark-blue':'bg-[#3416b6]')}>
                    <span className="xl:px-2 text-center font-itel text-xs xl:text-sm leading-[0.875rem] text-neutral-0">{typeSim=='physic'?'Sim':'E-Sim'}</span>
                </div>
              ) : type == 'pack' ? (
                <div className="absolute inset-0 rounded-lg bg-blue-500 center-by-grid">
                  <span className="xl:px-2 text-center font-itel text-xs xl:text-sm leading-[0.875rem] text-neutral-0">Gói cước</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="ml-2 md:ml-3 xl:ml-4 flex-1">
            <div className="text-sm flex items-center gap-x-1">
              <b>{title}</b>
              {type === 'sim' && (
                <Tooltip content="Cam kết">
                  <Svg src="/icons/others/hand-shake.svg" width={20} height={20} className="inline-block" />
                </Tooltip>
              )}

              {selectable && (
                <button className="ml-2 md:hidden" onClick={onSelect}>
                  <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
                </button>
              )}
            </div>
            <p className="text-xs text-subtle-content">{desc}</p>
          </div>
          {/* {selectable && (
            <button className="ml-2 max-md:hidden" onClick={onSelect}>
              <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
            </button>
          )} */}
        </div>
      </td>
      {/* Cell for basic price */}
      <td className="text-xs max-xl:hidden text-right tabular-nums">
        <p className="md:text-sm font-medium">{toCurrency(discountPrice ?? price)}</p>
        {typeof discountPrice === 'number' ? (
          <p className="text-subtle-content">{type == 'product' ? toCurrency(price) : <s>{toCurrency(price)}</s>}</p>
        ) : null}
      </td>
      {/* Cell for basic quantity and unit */}
      <td className="max-md:hidden text-center">
        {editable && (
          <div className="inline-flex px-2">
            <Stepper
              className="w-min"
              min={1}
              max={100}
              value={quantity}
              defaultValue={quantity}
              onChange={onChange ? (e) => onChange(Number(e.target.value)) : undefined}
            />
          </div>
        )}
      </td>
      {/* Cell for summary */}
      <td className="text-xs text-right">
        <p className="md:text-sm tabular-num text-subtle-content">{toCurrency(price * (quantity || 1))}</p>
        {typeof discountPrice === 'number' ? (
          <p className="text-xs text-subtle-content xl:hidden">
            <s>{toCurrency(price * (quantity || 1))}</s>
          </p>
        ) : null}
      </td>
      <td className="max-md:hidden" />
    </tr>
  );
};

export const TableRowBreak = () => {
  return (
    <tr>
      <td colSpan={2} className="md:hidden"></td>
      <td colSpan={3} className="max-md:hidden"></td>
      <td className="xl:hidden !px-0" colSpan={3}>
        <hr className="border-neutral-200" />
      </td>
      <td className="max-xl:hidden !px-0" colSpan={4}>
        <hr className="border-neutral-200" />
      </td>
      <td colSpan={999}></td>
    </tr>
  );
};
export default TableRowItem;
