import clsx from 'clsx';
import Svg from '../icon/svg';
import { FC } from 'react';
import { useGlobalContext } from '@/context/global';
import { useRouter } from 'next/router';

interface Props {
  className?: string;
}

const SectionLogin: FC<Props> = ({ className }) => {
  const { status, toggleModalAuth } = useGlobalContext();
  const router = useRouter();
  return (
    <div className={clsx('bg-neutral-0 rounded-lg p-8 text-center', className)}>
      <Svg src="/icons/others/payment-success.svg" className="mx-auto w-14 h-14 md:w-20 md:h-20" />

      <p className="text-sm md:text-base mt-3 md:mt-4">
        {status !== 'authenticated' ? (
          <>
            <span onClick={() => toggleModalAuth()} className="font-bold text-red-500 cursor-pointer">
              Đăng nhập
            </span>
            {' để trải nghiệm dịch vụ tốt hơn'}
          </>
        ) : (
          <>
            {'Xem '}
            <span onClick={() => router.push('/profile/my-order')} className="font-bold text-red-500 cursor-pointer">
              đơn hàng của tôi
            </span>
          </>
        )}
      </p>
    </div>
  );
};
export default SectionLogin;
