import { useGlobalContext } from '@/context/global';
import useIsSticky from '@/hooks/useIsSticky';
import Routers from '@/routes/routers';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import Svg from '../icon/svg';

type Props = {
  className?: string;
  title?: string;

  type?: 'sticky' | 'fixed' | 'static';
  theme?: 'light' | 'dark';
  mode?: 'close' | 'back';

  withCart?: boolean;
  withMenu?: boolean;
  withSearch?: boolean;

  actionBackground?: boolean;

  onClose?(): void;
};

const HeaderWebMobileNews = (props: Props) => {
  const { type = 'sticky', withCart, withMenu, withSearch, onClose = () => void 0 } = props;
  const router = useRouter();
  const { menu } = useGlobalContext();
  const ref = useRef<HTMLHRElement>(null);
  const stickyStatus = useIsSticky(ref, {});

  const isSticky = type === 'sticky' || stickyStatus;

  return (
    <>
      <hr className="border-none absolute w-full h-px pointer-events-none" ref={ref}></hr>
      <nav className={clsx(type, 'md:hidden w-full top-0 z-40')}>
        <div className="relative">
          <div
            className={clsx(
              isSticky ? 'bg-base-100 text-base-content' : 'bg-transparent text-base-content transition-default',
              'absolute inset-0'
            )}
          />
          <div className="relative container pl-4 flex justify-between items-center py-3">
            <Link href={'/'}>
              <Svg src={'/logo/logo-color.svg'} className="w-20 h-8 text-primary" />
            </Link>
            <div className="ml-2 flex gap-3">
              {withSearch && <ButtonSearch />}
              {withCart && <ButtonCart />}
              {withMenu && <ButtonMenu />}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

type ButtonProps = { bg?: boolean };
const ButtonMenu = (props: ButtonProps) => {
  const { menu } = useGlobalContext();
  return (
    <button className={clsx('btn-tertiary btn btn-sm btn-circle')} onClick={menu.toggle}>
      <Svg src={menu.value ? '/icons/line/close.svg' : '/icons/line/menu.svg'} width={24} height={24} />
    </button>
  );
};
const ButtonCart = (props: ButtonProps) => {
  return (
    <Link href={Routers.CART} className={clsx('btn-tertiary btn btn-sm btn-circle')}>
      <Svg src="/icons/bold/cart.svg" width={20} height={20} />
    </Link>
  );
};
const ButtonSearch = (props: ButtonProps) => {
  return (
    <button className={clsx('btn-tertiary btn btn-sm btn-circle')}>
      <Svg src="/icons/bold/vector.svg" width={20} height={20} />
    </button>
  );
};
export default HeaderWebMobileNews;
