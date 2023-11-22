import { useGlobalContext } from '@/context/global';
import React, { useMemo } from 'react';

type Props = {};

const useWalletOption = () => {
  const { user } = useGlobalContext();
  const walletOption = useMemo(
    () => ({
      id: 'wallet',
      name: 'Tài khoản thuê bao',
      salePrice: 0,
      value: user?.balance || 0,
      logoPath: '/icons/payment/cod.svg'
    }),
    [user]
  );
  return walletOption;
};

export default useWalletOption;
