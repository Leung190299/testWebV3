import { addSim } from '@/store/cart/updateInfoSlice';
import { toCurrency } from '@/utilities/currency';
import { formatPhone } from '@/utilities/formatSimNumber';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

type Props = {
  item: UpdateInfoModel.resultSim;
};
const SimItem = ({ item }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const addToCheckout = () => {
    dispatch(addSim(item));
    router.push('checkout/update-info');
  };
  return (
    <tr className={'group relative flex-wrap border-b border-neutral-200 py-5 max-md:flex md:border-none'}>
      {/* Infor */}
      <td className="table-cell w-full max-w-xs md:w-auto md:py-6 md:pb-6 md:pl-4 md:pr-3">
        <span className="transition-default pointer-events-none absolute inset-0 rounded-xl border border-transparent duration-200 group-hover:border-red-500 max-md:hidden"></span>
        <p className="flex items-center gap-1 text-h-xxs leading-6 md:text-xl xl:text-2xl">
          <b className="font-itel">{formatPhone(item.Phone!)}</b>
        </p>
      </td>
      {/* Pack data */}
      <td className="px-3 py-6 text-left max-md:hidden"></td>
      {/* Price */}
      <td className="mt-3 w-full md:w-auto md:px-3 md:py-6">
        <div className="flex min-w-max flex-wrap items-center md:items-start justify-between md:flex-nowrap">
          <div className="flex-1">
            <div className="price-info items-start">
              <div className="flex items-center gap-1 md:block">
                <p className="text-base md:text-sm xl:text-base">
                  <b>{toCurrency(item.Price || 0)}</b>
                </p>
              </div>
            </div>
          </div>
          {/* Action */}
          <div className="flex gap-3">
            {/* <button className="btn-tertiary btn btn-sm btn-circle" onClick={handleOpenAddToCardModal}>
              <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
            </button> */}
            <button className="btn-secondary btn btn-sm rounded-full" onClick={() => addToCheckout()}>
              Mua ngay
            </button>
          </div>
        </div>
      </td>
      {/* {isOpenAddToCartModal && (
	  <ModalAddToCart handleCloseModal={() => setIsOpenAddToCartModal(false)} haveGiftBonus={simItem.gift ? true : false} />
	)}
	{isOpenModalPickSim && (
	  <ModalPickSim handleCloseModal={() => setIsOpenModalPickSim(false)} haveGiftBonus={simItem.gift ? true : false} />
	)} */}
    </tr>
  );
};

export default SimItem;
