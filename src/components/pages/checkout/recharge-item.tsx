import { Checkout } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import CheckoutRowItem from './row-item';

type Props = {
  data: Checkout.Recharge;
};
const RechargeItem = ({ data }: Props) => {
  const currentNetwork = data.network;
  const title = `${data.network.Name} ${toCurrency(data.price)}`;
  const desc = data.type === 'code' ? 'Mua mã thẻ' : 'Nạp tiền điện thoại';
  const price = data.price * (data.type === 'code' ? data.quantity : 1);
  const discountPrice =
    typeof data.discount_price === 'number' ? data.discount_price * (data.type === 'code' ? data.quantity : 1) : undefined;
  return (
    <div>
      <div className="pb-4 md:py-4">
        <CheckoutRowItem
          price={price}
          discountPrice={discountPrice}
          isRoot
          img={currentNetwork.Path}
          imgClassName="object-contain"
          title={title}
          desc={desc}
          subDesc={
            <>
              Số lượng: <b>{data.quantity}</b>
            </>
          }
        >
          {data.type === 'recharge' ? (
            <>
              <div className="md:w-1/2 flex-1">
                <p className="text-sm md:text-base">
                  <b>{title}</b>
                </p>
                <p className="mt-2 md:mt-0 text-xs md:text-sm">{desc}</p>
              </div>
              <div className="hidden md:block md:w-1/2 text-sm">
                <p>
                  <b>{formatPhoneNumber(data?.receiver)}</b>
                </p>
                <p>Số điện thoại nhận</p>
              </div>
            </>
          ) : null}
        </CheckoutRowItem>
      </div>
      {data?.receiver && (
        <div className="md:hidden py-4 border-t border-neutral-200">
          <div className="text-sm flex justify-between h-full w-full">
            <p className="font-normal text-neutral-500">Số điện thoại nhận</p>
            <p>
              <b>{data.receiver}</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RechargeItem;
