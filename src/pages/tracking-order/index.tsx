import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import TextInput from '@/components/form/TextInput';
import LayoutDefault from '@/components/layout/layout-default';
import { OrderSupport, exampleOrder } from '@/components/modal/modal-support';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import SectionLogin from '@/components/section/section-login';
import ModalOrderNotFound from '@/components/modal/modal-order-not-found';
import { modal } from '@/libs/modal';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import { useGlobalContext } from '@/context/global';
import { NextPage } from 'next';
import trackingService from '@/services/trackingService';
import { isEmpty } from 'lodash';
import { time } from 'console';

const EXAMPLE_ORDER = {
  id: '#ITEL123456',
  name: 'Nguyễn Bảo Ngọc',
  phone: '096*****967',
  schedules: [
    {
      time: '12:15, 12 tháng 3',
      active: true,
      title: 'Đang vận chuyển',
      description: 'Đơn hàng đang trên đường giao tới bạn'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển',
      description: 'Đơn hàng đang trên đường giao tới bạn'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển',
      description: 'Đơn hàng đang trên đường giao tới bạn'
    }
  ]
};

const ahmStatus = [
  { id: 'IDLE', text: 'Đã tiếp nhận' },
  { id: 'ASSIGNING', text: 'Đã điều phối lấy hàng' },
  { id: 'ACCEPTED', text: 'Đã tiếp nhận' },
  { id: 'IN PROCESS', text: 'Shipper báo đã lấy hàng' },
  { id: 'COMPLETED', text: 'Hoàn thành đơn hàng' },
  { id: 'CANCELLED', text: 'Hủy đơn hàng' }
];

const ghtkStatus = [
  { id: '-1', text: 'Hủy đơn hàng' },
  { id: '1', text: 'Chưa tiếp nhận' },
  { id: '2', text: 'Đã tiếp nhận' },
  { id: '3', text: 'Đã lấy hàng/Đã nhập kho' },
  { id: '4', text: 'Đã điều phối giao hàng/Đang giao hàng' },
  { id: '5', text: 'Đã giao hàng/Chưa đối soát' },
  { id: '6', text: 'Đã đối soát' },
  { id: '7', text: 'Không lấy được hàng' },
  { id: '8', text: 'Hoãn lấy hàng' },
  { id: '9', text: 'Không giao được hàng' },
  { id: '10', text: 'Delay giao hàng' },
  { id: '11', text: 'Đã đối soát công nợ trả hàng' },
  { id: '12', text: 'Đã điều phối lấy hàng/Đang lấy hàng' },
  { id: '13', text: 'Đơn hàng bồi hoàn' },
  { id: '20', text: 'Đang trả hàng (COD cầm hàng đi trả)' },
  { id: '21', text: 'Đã trả hàng (COD đã trả xong hàng)' },
  { id: '123', text: 'Shipper báo đã lấy hàng' },
  { id: '127', text: 'Shipper (nhân viên lấy/giao hàng) báo không lấy được hàng' },
  { id: '128', text: 'Shipper báo delay lấy hàng' },
  { id: '45', text: 'Shipper báo đã giao hàng' },
  { id: '49', text: 'Shipper báo không giao được giao hàng' },
  { id: '410', text: 'Shipper báo delay giao hàng' }
];
interface PageProps {}
const TrackingOrderPage: NextPage<PageProps> = (props) => {
  const defaultCode = props.router.query.code;
  const [orderCode, setOrderCode] = useState(typeof defaultCode === 'string' ? defaultCode : '');
  const [order, setOrder] = useState<trackingModal.Result>({});
  const { toggleModalAuth, user, logout, status } = useGlobalContext();
  const isLoggedIn = status === 'authenticated' && !!user;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getOrder = async () => {
    try {
      const res = await trackingService.getOrder(orderCode);
      if (isEmpty(res.result)) {
        modal.confirm({
          title: 'Không tìm thấy đơn hàng',
          desc: 'Rất tiếc iTel chưa tìm thấy thông tin phù hợp với mã đơn hàng bạn đã cung cấp. Vui lòng kiểm tra lại mã đơn hàng hoặc liên hệ tổng đài Chăm sóc khách hàng 0877 087 087 để được hỗ trợ.\nTips: bạn có thể tra cứu đơn hàng nhanh hơn nếu đăng nhập!',
          rejectLable: 'Đã hiểu',
          confirmLable: !isLoggedIn ? 'Đăng nhập' : null,
          onDone() {
            toggleModalAuth();
          }
        });
        return
      }
      if ((isEmpty(res.result.shipment) && res.result.hassim) || 0 > 0) {
        modal.confirm({
          title: 'Đơn hàng đã được xử lý',
          desc: `Cảm ơn Bạn đã sử dụng dịch vụ của iTel. Đơn hàng ${orderCode} của Bạn đang được xử lý và chuyển tới đơn vị vận chuyển. Hỗ trợ LH 0877 087 087`,
          rejectLable: 'Đã hiểu',
          confirmLable: !isLoggedIn ? 'Đăng nhập' : null,
          onDone() {
            toggleModalAuth();
          }
        });
        return
      }
      if (isEmpty(res.result.shipment)) {
        if (res.result.hassim != 0) {
          modal.confirm({
            title: 'Đơn hàng đã được xử lý',
            desc: `Cảm ơn Bạn đã sử dụng dịch vụ của iTel. Đơn hàng ${orderCode} của Bạn đang được xử lý và chuyển tới đơn vị vận chuyển. Hỗ trợ LH 0877 087 087`,
            rejectLable: 'Đã hiểu',
            confirmLable: !isLoggedIn ? 'Đăng nhập' : null,
            onDone() {
              toggleModalAuth();
            }
          });
          return
        }
        modal.confirm({
          title: 'Đơn hàng đã được xử lý',
          desc: `Cảm ơn Bạn đã sử dụng dịch vụ của iTel. Đơn hàng ${orderCode} của Bạn đã được xử lý. Bạn vui lòng kiểm tra email và làm theo hướng dẫn. Hỗ trợ LH 0877 087 087`,
          rejectLable: 'Đã hiểu',
          confirmLable: !isLoggedIn ? 'Đăng nhập' : null,
          onDone() {
            toggleModalAuth();
          }
        });
        return
      }
      setOrder(res.result);
    } catch (error) {}
  };

  const filterStatus = (id: string) => {
    const getStatus = ghtkStatus.find((e) => e.id == id);
    if (getStatus) {
      return getStatus.text;
    }
  };

  const filterStatusAha = (id: string) => {
    const getStatus = ahmStatus.find((e) => e.id == id);
    if (getStatus) {
      return getStatus.text;
    }
  };
  function formatPhoneNumber(phone: string) {
    var cleaned = ('' + phone).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{4})(\d{3})$/);
    if (match) {
      return match[1] + '****' + match[3];
    }
    return null;
  }

  // const openModalNotFound = () => {

  // };

  return (
    <>
      <Head>
        <title>Itel - Theo dõi đơn hàng</title>
      </Head>
      <HeaderMobileWeb title="Theo dõi đơn hàng" />
      <LayoutSupport>
        <h4 className="text-h-sm hidden md:block font-itel">
          <b>THEO DÕI ĐƠN HÀNG</b>
        </h4>

        {/* search box */}
        <div className="bg-neutral-0 rounded-lg mt-4 md:mt-6 md:pt-5 pb-4 md:pb-6 md:px-8">
          <p className="font-bold text-base md:text-xl">Tra cứu đơn hàng dễ dàng với mã đơn</p>
          <p className="text-neutral-500 text-xs md:text-sm mt-1">Cảm ơn Quý khách đã sử dụng dịch vụ của iTel.</p>
          <div className="border-t border-neutral-200 my-4 md:mt-5 md:mb-6" />
          <TextInput
            ref={inputRef}
            inputLabel="Mã đơn hàng"
            placeholder="Nhập mã đơn hàng"
            value={orderCode}
            onChange={(e) => setOrderCode(e.currentTarget.value)}
            clear
          />

          <button
            disabled={!orderCode}
            type="button"
            className="block w-[206px] btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
            onClick={() => {
              getOrder();
            }}
          >
            Tra cứu
          </button>
        </div>
        {/* end search box */}

        {/* result box */}
        {!isEmpty(order?.FullName) && !isEmpty(order?.shipment) && (
          <>
            <div className="h-2">
              <div className="absolute md:hidden h-2 bg-neutral-100 w-[100vw] left-0" />
            </div>
            <div className="bg-neutral-0 mt-4 rounded-lg md:pt-10 xl:pt-11 pb-4 md:pb-6 md:px-8">
              <p className="text-base md:text-xl font-bold">Trạng thái đơn hàng {order.OrderId}</p>
              <p className="text-xs md:text-sm text-neutral-500 mt-1">
                <span className="font-bold">{order.FullName}</span> | <span>{formatPhoneNumber(order.ContactPhone || '')}</span>
              </p>

              <div className="border-t border-neutral-200 my-4 md:mt-5 md:mb-6" />

              {order.shipment?.map((item, index: number) => (
                <div key={index} className="flex min-h-[72px]">
                  <div className="min-w-[120px] w-[120px] text-right pt-0.5">
                    {index == 0 ? (
                      <p className={clsx({ 'font-medium text-sm text-neutral-500': true })}>{item.date_}</p>
                    ) : (
                      <p className={clsx({ 'font-medium text-sm text-neutral-500': true, 'opacity-50': true })}>{item.date_}</p>
                    )}
                  </div>
                  <div className="mx-5 text-center flex flex-col items-center">
                    {index == 0 ? (
                      <>
                        <div className={clsx({ 'h-2 w-[1px] bg-neutral-800': true })} />
                        <div className={clsx({ 'w-[9px] h-[9px]  rounded-full bg-red-600': true })} />
                      </>
                    ) : (
                      <>
                        <div className={clsx({ 'h-2 w-[1px]  bg-neutral-800': true, 'opacity-50': true })} />
                        <div className={clsx({ 'w-[9px] h-[9px]  rounded-full bg-neutral-800': true, 'opacity-50': true })} />
                      </>
                    )}

                    {index < order.shipment!.length - 1 && (
                      <div className={clsx({ 'flex-1 w-[1px] bg-neutral-800': true, 'opacity-50': !order.shipment![index + 1] })} />
                    )}
                  </div>
                  {index == 0 ? (
                    <>
                      <div className={clsx({ 'pb-6 text-sm md:text-base': true })}>
                        <p className="font-bold">
                          {item.status!.length > 3 ? filterStatusAha(item.status || '') : filterStatus(item.status || '')}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={clsx({ 'pb-6 text-sm md:text-base': true, 'opacity-50': true })}>
                        <p className="font-bold">
                          {item.status!.length > 3 ? filterStatusAha(item.status || '') : filterStatus(item.status || '')}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div>
                {' '}
                {order.shipmentInfo?.shared_link ? (
                  <div>
                    {' '}
                    Để theo dõi hành trình đơn hàng,{' '}
                    <a href={order.shipmentInfo.shared_link} className=" text-red-500">
                      Click vào đây
                    </a>{' '}
                  </div>
                ) : (
                  <div>
                    Đơn hàng của Bạn đang được xử lý và chuyển tới đơn vị vận chuyển
                  </div>
                )}{' '}
              </div>
              <div className="border-t border-neutral-200 my-4 md:my-6" />

              <OrderSupport order={exampleOrder} />
            </div>
          </>
        )}
        {/* end result box */}

        <div className="h-2">
          <div className="absolute md:hidden h-2 bg-neutral-100 w-[100vw] left-0" />
        </div>

        {/* login box */}
        <SectionLogin className="mt-4" />
        {/* end login box */}
      </LayoutSupport>
    </>
  );
};

TrackingOrderPage.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {}
  };
});
export { getStaticProps };

export default TrackingOrderPage;
