import useCartProduct from '@/hooks/useCartProduct';
import Routers from '@/routes/routers';
import clsx from 'clsx';
import Link from 'next/link';
import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type Props = {
  className?: string;
} & Omit<JSX.IntrinsicElements['a'], 'ref'>;

const ButtonCart = ({ className, ...rest }: Props) => {
  const { length } = useCartProduct();

  return (
    <Tooltip
      as={Link}
      href={Routers.CART}
      className={clsx('btn-sm md:btn-md transition-default btn-tertiary btn btn-circle tooltip', className)}
      content="Giỏ hàng của bạn"
      {...rest}
    >
      <Svg src="/icons/bold/cart.svg" className="w-5 h-5 md:h-6 md:w-6" />
      {length != 0 && (
        <span className="badge badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
          <span>{length}</span>
        </span>
      )}
    </Tooltip>
  );
};

export default ButtonCart;
