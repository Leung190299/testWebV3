import React from 'react';
import Svg from '../icon/svg';
import { useGlobalContext } from '@/context/global';

type Props = {};
const ButtonMenu = (props: Props) => {
  const { menu } = useGlobalContext();
  return (
    <button className="btn-sm md:btn-md btn-tertiary btn btn-circle xl:hidden" onClick={menu.toggle}>
      <Svg src={menu.value ? '/icons/line/close.svg' : '/icons/line/menu.svg'} className="w-5 h-5 md:h-6 md:w-6" />
    </button>
  );
};

export default ButtonMenu;
