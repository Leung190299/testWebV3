import { useGlobalContext } from '@/context/global';
import { Checkout } from '@/types/model';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import CheckoutRowItem from './row-item';

type Props = {
  data: Checkout.DataPack;
};

const DataPackItem = ({ data }: Props) => {
  const { status, user, toggleModalAuth } = useGlobalContext();
  // const receiver = user?.phone || '0987654321';

  return (
    <div>
      <div className="pb-4 md:py-4">
        <CheckoutRowItem
          price={data.price}
          discountPrice={data.discount_price}
          isRoot
          imgClassName="object-contain"
        >
          <div className="md:w-1/2 flex-1">
            <p className="text-sm md:text-base">
              <b>{data.name}</b>
            </p>
            <p className="mt-2 md:mt-0 text-xs md:text-sm">{data.description}</p>
          </div>
          <div className="hidden md:block md:w-1/2 text-sm">
            <p>
              <b>{formatPhoneNumber(data.phone!)}</b>
            </p>
            <p>Số điện thoại nhận</p>
          </div>
        </CheckoutRowItem>
      </div>
      <div className="md:hidden py-4 border-t border-neutral-200">
        <div className="text-sm flex justify-between h-full w-full">
          <p className="font-normal text-neutral-500">Số điện thoại nhận</p>
          <p>
            <b>{formatPhoneNumber(data.phone!)}</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataPackItem;
