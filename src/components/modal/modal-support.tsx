import { CheckoutType } from '@/constants/checkout.constants';
import Routers from '@/routes/routers';
import { isBuyOtherItem } from '@/utilities/checkout';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Accordions from '../accordion/accordions';
import Svg from '../icon/svg';
import HeaderMiddleAndFull from './header/header-middle-and-full';

import type { Model } from '@/types/model';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { useModal } from '@pit-ui/modules/modal';
import { addMessage, openChat } from '@/services/chat/events';

interface ModalSupportProps {
  order: Model.Order;
}

const faqs = [
  {
    id: 1,
    question: 'Tôi không sử dụng được mã thẻ điện thoại',
    answer:
      'Hãy đảm bảo nhà mạng bạn đang sử dụng và mã thẻ bạn vừa mua là cùng một nhà mạng.\n\niTel sẽ hỗ trợ kiểm tra để xác định tình trạng mã thẻ của bạn. Và sẽ gửi mã thẻ mới hoặc hoàn tiền trong trường hợp mã thẻ hiện tại được xác nhận là không hiệu lực hoặc đã được sử dụng trước thời điểm mua mã thẻ.\n\nTrong trường hợp mã thẻ vẫn còn hiệu lực hoặc được sử dụng thành công sau thời gian thực hiện giao dịch, iTel rất tiếc không thể hỗ trợ trường hợp này.'
  },
  {
    id: 2,
    question: 'Tài khoản trừ tiền nhưng giao dịch thất bại?',
    answer:
      'Hãy đảm bảo nhà mạng bạn đang sử dụng và mã thẻ bạn vừa mua là cùng một nhà mạng.\n\niTel sẽ hỗ trợ kiểm tra để xác định tình trạng mã thẻ của bạn. Và sẽ gửi mã thẻ mới hoặc hoàn tiền trong trường hợp mã thẻ hiện tại được xác nhận là không hiệu lực hoặc đã được sử dụng trước thời điểm mua mã thẻ.\n\nTrong trường hợp mã thẻ vẫn còn hiệu lực hoặc được sử dụng thành công sau thời gian thực hiện giao dịch, iTel rất tiếc không thể hỗ trợ trường hợp này.'
  },
  {
    id: 3,
    question: 'Không gia hạn được gói cước?',
    answer:
      'Hãy đảm bảo nhà mạng bạn đang sử dụng và mã thẻ bạn vừa mua là cùng một nhà mạng.\n\niTel sẽ hỗ trợ kiểm tra để xác định tình trạng mã thẻ của bạn. Và sẽ gửi mã thẻ mới hoặc hoàn tiền trong trường hợp mã thẻ hiện tại được xác nhận là không hiệu lực hoặc đã được sử dụng trước thời điểm mua mã thẻ.\n\nTrong trường hợp mã thẻ vẫn còn hiệu lực hoặc được sử dụng thành công sau thời gian thực hiện giao dịch, iTel rất tiếc không thể hỗ trợ trường hợp này.'
  }
];
const contacts = [
  { icon: '/icons/others/zalo.svg', name: 'zalo' ,link:'https://zalo.me/3281327437324952111'},
  { icon: '/icons/others/facebook.svg', name: 'facebook',link:'https://m.me/itel.fan' },
  { icon: '/icons/bold/hotline.svg', name: '0877 087 087',link:'tel:0877087087' }
];
export const exampleOrder: Model.Order = {
  code: 'itel3412123',
  created_at: '2023-06-27T15:54:09.708Z',
  user_id: 1,
  data: {},
  id: 1,
  method: 'vnpay',
  payment_time: '2023-06-27T15:54:09.708Z',
  status: 'failed',
  transaction_price: 999_999,
  type: CheckoutType.Item
};
export const OrderSupport = (data: { order: Model.Order }) => {
  const { close } = useModal();
  const requestSupport = () => {
    if (close) {
      close();
    }
    openChat();
    addMessage(`Tôi cần hỗ trợ đơn hàng mã: ${data.order.code}`);
    const hours = new Date().getHours();
    const isMorningTime = hours > 3 && hours < 11;
    const isMidDay = hours > 10 && hours < 13;
    const isAfterNoon = hours > 12 && hours < 18;
    const message = isMorningTime ? 'buổi sáng' : isMidDay ? 'buổi trưa' : isAfterNoon ? 'buổi chiều' : 'buổi tối';

    // const is
    setTimeout(() => addMessage(`Chào ${message}, bạn muốn hỗ trợ đơn hàng nào?`, { sender: 'Chat bot số đen' }), 1000);
    setTimeout(() => addMessage(`Tình trạng đơn hàng đang như nào ạ?`, { sender: 'Chat bot số đỏ' }), 2000);
    setTimeout(() => addMessage('Ây đừng chen hàng bạn êiii!!', { sender: 'Chat bot số đen' }), 3000);
  };
  return (
    <h3 className="md:text-xl text-base">
      <b>Bạn cần hỗ trợ về đơn hàng?</b>
      <div>
        <div className="mt-3 flex md:w-min md:min-w-[31rem] whitespace-nowrap  rounded-lg bg-neutral-100 px-4 py-3">
          <div className="flex-1">
            <p className="text-sm text-subtle-content">Hỗ trợ 24/24</p>
            <p className="text-xl">
              <b>Live Chat</b>
            </p>
          </div>
          <div>
            <button onClick={requestSupport} className="btn-primary btn gap-x-2 rounded-full h-[40px] md:h-[48px]">
              <Svg width={24} height={24} src="/icons/bold/live-chat.svg" />
              Chat ngay
            </button>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-subtle-content">Hoặc liên hệ với iTel qua</p>
      <ul className="-mt-1 md:mt-2 flex flex-wrap md:flex-nowrap -mx-1.5 overflow-auto scrollbar-hide">
        {contacts.map(({ name, icon , link }) => {
          return (
            <li key={name} className="w-1/2 md:w-auto px-1.5 mt-3">
              <Link href={link} className="btn-tertiary btn btn-sm rounded-full w-full" data-target={name}>
                <Svg width={20} height={20} src={icon} className="text-red-500" />
                <span className="ml-2 capitalize text-xs">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </h3>
  );
};

const ModalSupport = ({ order }: ModalSupportProps) => {
  const expanded = useBoolean(false);
  const [activeId, setActiveId] = useState(faqs[0].id);
  const router = useRouter();

  return (
    <div>
      <HeaderMiddleAndFull title="Yêu cầu hỗ trợ" />
      <div className="mobile-container py-4 md:pb-0 md:py-0 md:mt-8 space-y-6 md:space-y-4">
        {/* Item infomation */}
        <div>
          {order.type === CheckoutType.Item || order.type === CheckoutType.Card ? (
            <div className="border border-neutral-300 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex flex-1">
                  <p className="text-sm md:text-base">
                    <span className="md:font-bold">Đơn hàng </span>
                    <span className="block md:inline font-bold">{order.code}</span>
                  </p>
                </div>
                <div className="flex flex-col-reverse md:flex-col flex-1 text-right md:text-left text-sm">
                  <p className="text-red-500">
                    <b>Giao dịch thất bại</b>
                  </p>
                  <time
                    dateTime={order.payment_time}
                    title={new Date(order.payment_time).toLocaleDateString(router.locale, {
                      weekday: 'long',
                      year: 'numeric',
                      day: 'numeric'
                    })}
                  >
                    {dayjs(order.payment_time).format('HH:mm - DD/MM/YYYY')}
                  </time>
                </div>
              </div>
            </div>
          ) : order.type === CheckoutType.Profile ? (
            <div className="border border-neutral-300 p-4 rounded-lg space-y-4">
              {(expanded.value ? order.data.merchanise : [order.data.merchanise[0]]).map((item) => {
                return (
                  <div key={item.id} className="flex items-center">
                    <div className="mr-2 md:mr-6 w-12 md:w-18">
                      <div className="card-image block-img block-square w-full">
                        <img src={item.thumbnail} alt={item.name} className="rounded-lg bg-neutral-100 object-cover" />
                      </div>
                    </div>
                    <div className="flex-1 text-sm">
                      <p>
                        <b>{item.name}</b>
                      </p>
                      <p className="text-sm">{item.title}</p>
                    </div>
                    <div className="flex-1 text-right md:text-left text-sm">
                      <p className="text-red-500">
                        <b>Yêu cầu khoản vay</b>
                      </p>
                      <time
                        dateTime={order.payment_time}
                        title={new Date(order.payment_time).toLocaleDateString(router.locale, {
                          weekday: 'long',
                          year: 'numeric',
                          day: 'numeric'
                        })}
                      >
                        {dayjs(order.payment_time).format('HH:mm - DD/MM/YYYY')}
                      </time>
                    </div>
                  </div>
                );
              })}
              {order.data.merchanise.length > 1 && (
                <button className="w-full pt-3 text-sm font-medium border-t border-neutral-200" onClick={expanded.toggle}>
                  {expanded.value ? 'Thu gọn' : `Xem thêm ${order.data.merchanise.length - 1} sản phẩm`}
                </button>
              )}
            </div>
          ) : isBuyOtherItem(order) ? (
            <div className="-mt-4 md:mt-0">
              <div className="flex items-center flex-wrap md:flex-nowrap md:rounded-lg md:border border-neutral-300 md:px-4">
                <div className="flex items-center flex-grow py-4">
                  <div className="mr-2 md:mr-6 w-12 md:w-18">
                    <div className="card-image block-img block-square w-full">
                      <img
                        src={order.data.product.image}
                        alt={order.data.product.name}
                        className={clsx(
                          order.type === CheckoutType.BuyCode || order.type === CheckoutType.Recharge ? 'object-contain' : 'object-cover',
                          'rounded-lg bg-neutral-100'
                        )}
                      />
                    </div>
                  </div>
                  {order.type === CheckoutType.BuyCode ? (
                    <div>
                      <p>
                        <b>
                          <span className="max-md:hidden">{order.data.product.desc} </span>
                          {order.data.product.name}
                        </b>
                      </p>
                      <p className="md:hidden text-sm mt-1">{order.data.product.desc}</p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <b>{order.data.product.name}</b>
                      </p>
                      <p className="text-sm mt-1">{order.data.product.desc}</p>
                    </div>
                  )}
                </div>
                <div className="flex md:block w-full md:w-1/3 text-left text-sm text-subtle-content py-4 border-t border-neutral-200 md:border-none">
                  <p className="text-red-500 flex-1">
                    <b>Giao dịch thất bại</b>
                  </p>
                  <time
                    dateTime={order.payment_time}
                    title={new Date(order.payment_time).toLocaleDateString(router.locale, {
                      weekday: 'long',
                      year: 'numeric',
                      day: 'numeric'
                    })}
                  >
                    {dayjs(order.payment_time).format('HH:mm - DD/MM/YYYY')}
                  </time>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <h3 className="text-xl">
            <b>Bạn gặp vấn đề gì?</b>
          </h3>
          <ul className="mt-1">
            {faqs.map((faq) => {
              return (
                <li key={faq.id}>
                  <Accordions isActive={faq.id === activeId}>
                    <Accordions.Button
                      className="flex w-full items-center justify-between border-b border-neutral-300 py-3 font-medium outline-none text-left"
                      onClick={() => setActiveId((prev) => (prev === faq.id ? -1 : faq.id))}
                    >
                      {({ open }) => (
                        <>
                          {faq.question}
                          <Svg
                            src="/icons/line/chevron-down.svg"
                            className={'transition-default ' + (open ? '-rotate-180' : '')}
                            width={20}
                            height={20}
                          />
                        </>
                      )}
                    </Accordions.Button>
                    <Accordions.Panel className={'whitespace-pre-wrap text-sm text-subtle-content'}>
                      <div className="mt-2">{faq.answer}</div>
                    </Accordions.Panel>
                  </Accordions>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <OrderSupport order={order} />
        </div>
      </div>
    </div>
  );
};
export default ModalSupport;
