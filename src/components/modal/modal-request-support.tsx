import Routers from '@/routes/routers';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Accordions from '../accordion/accordions';
import Svg from '../icon/svg';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';

interface ModalRequestSupportProps {
  name?: string;
  desc?: string;
  time?: string | number | Date;
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
  { icon: '/icons/others/zalo.svg', name: 'zalo' },
  { icon: '/icons/others/facebook.svg', name: 'facebook' },
  { icon: '/icons/others/gmail.svg', name: 'email' },
  { icon: '/icons/bold/hotline.svg', name: '0877 087 087' }
];

export const OrderSupport = () => {
  const router = useRouter();
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
            <button onClick={() => router.push(Routers.HOME)} className="btn-primary btn gap-x-2 rounded-full h-[40px] md:h-[48px]">
              <Svg width={24} height={24} src="/icons/bold/live-chat.svg" />
              Chat ngay
            </button>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-subtle-content">Hoặc liên hệ với iTel qua</p>
      <ul className="-mt-1 md:mt-2 flex flex-wrap md:flex-nowrap -mx-1.5 overflow-auto scrollbar-hide">
        {contacts.map(({ name, icon }) => {
          return (
            <li key={name} className="w-1/2 md:w-auto px-1.5 mt-3">
              <Link href={Routers.HOME} className="btn-tertiary btn btn-sm rounded-full w-full" data-target={name}>
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

const ModalRequestSupport = ({ name, desc = 'Yêu cầu hỗ trợ', time }: ModalRequestSupportProps) => {
  const [activeId, setActiveId] = useState(faqs[0].id);

  return (
    <div>
      <HeaderMiddleAndFull title="Yêu cầu hỗ trợ" />
      <div className="mobile-container py-4 md:pb-0 md:py-0 md:mt-8 space-y-6 md:space-y-4">
        {/* Item infomation */}
        <div>
          <div className="-mt-4 md:mt-0">
            <div className="flex items-center flex-wrap md:flex-nowrap md:rounded-lg md:border border-neutral-300 md:px-4">
              <div className="flex-grow py-4">
                <p>
                  <b>{name}</b>
                </p>
                <p className="text-sm mt-1 text-neutral-500">{desc}</p>
              </div>
              <div className="flex md:block w-full md:w-1/3 text-left text-sm text-subtle-content py-4 border-t border-neutral-200 md:border-none">
                <p className="text-red-500 flex-1">
                  <b>Gửi yêu cầu thất bại</b>
                </p>
                <p>{dayjs(time).format('HH:mm - DD/MM/YYYY')}</p>
              </div>
            </div>
          </div>
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
          <OrderSupport />
        </div>
      </div>
    </div>
  );
};
export default ModalRequestSupport;
