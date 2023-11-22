import CardResultItem from '@/components/card/card-result-item';
import DropdownShare from '@/components/dropdown/dropdown-share';
import Svg from '@/components/icon/svg';
import ModalSharePost from '@/components/modal/modal-share-post';
import { CheckoutType } from '@/constants/checkout.constants';
import { modal } from '@/libs/modal';
import { Data, Model } from '@/types/model';
import { copyTextToClipboard } from '@/utilities/copy';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useCallback } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  data: Model.Order;
};

const SectionCode = ({ data }: Props) => {
  const isSuccess = data.status === 'success';
  const handleCopy = useCallback(() => {
    if (data.type !== 'code') return;
    copyTextToClipboard(data.data.code).then(() => toast.success('Đã sao chép mã thẻ'));
  }, [data]);
  function handleShare() {
    toast.success('Chia sẻ mã thẻ thành công');
  }
  const handleModalShare = useCallback(() => {
    if (data.type !== 'code') return;

    modal.open({
      render() {
        return (
          <ModalSharePost
            itemImage={data.data.product.image}
            itemName="Mã thẻ di động Viettel"
            itemDesc={'Số thẻ: ' + data.data.code}
            onCopy={handleCopy}
            onShare={handleShare}
          />
        );
      },
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-bottom-sheet md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  }, [handleCopy, data]);
  if (data.type !== CheckoutType.BuyCode) return null;
  return (
    <>
      <CardResultItem image={data.data.product.image} title={data.data.product.name} desc="Thẻ nạp điện thoại" />
      {isSuccess && (
        <div className="mt-4 flex rounded-lg bg-neutral-50 p-3">
          <div className="flex-1">
            <p>
              <b>{data.data.code}</b>
            </p>
            <p className="text-xs md:text-sm capitalize text-subtle-content">Số Seri: {data.data.serial}</p>
          </div>
          <div className="relative flex items-center">
            <Menu>
              <Menu.Button type="button" className="transition-default btn-ghost btn btn-circle mr-2 max-xl:hidden">
                <Svg src="/icons/bold/share.svg" width={24} height={24} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-[25rem] origin-top-right rounded-2xl shadow-itel" data-theme="light">
                  <DropdownShare
                    itemImage={data.data.product.image}
                    from="payment-status"
                    itemName="Mã thẻ di động Viettel"
                    itemDesc={'Số thẻ: ' + data.data.code}
                    onCopy={handleCopy}
                    onShare={handleShare}
                  />
                </Menu.Items>
              </Transition>
            </Menu>
            <button
              type="button"
              onClick={handleModalShare}
              className="transition-default btn-ghost btn btn-circle btn-sm md:btn-md md:px-0 mr-1 md:mr-2 xl:hidden"
            >
              <Svg src="/icons/bold/share.svg" width={24} height={24} />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="transition-default btn-ghost btn btn-circle btn-sm md:btn-md md:px-0 mr-1 md:mr-0"
            >
              <Svg src="/icons/bold/copy.svg" width={24} height={24} />
            </button>
            <button className="md:hidden btn btn-primary rounded-full btn-sm">Nạp</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SectionCode;
