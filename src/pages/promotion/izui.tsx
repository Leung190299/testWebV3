import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import { NextPage } from 'next';
import Head from 'next/head';

import SectionSupports from '@/components/section/section-supports';
import { modal } from '@/libs/modal';

import BannerAdvertising from '@/components/banner/banner-advertising';
import CardGiftDivide from '@/components/card/card-gift-divide';
import DebugUI from '@/components/common/debug';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { toggleModalVoucher } from '@/components/modal/modal-voucher-detail';
import { quickViewVoucher } from '@/components/modal/modal-voucher-view';
import TagSale from '@/components/tag-chip/tag-sale';
import { useGlobalContext } from '@/context/global';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useCountdown from '@pit-ui/modules/hooks/useCountdown';
import Routers from '@/routes/routers';
import IwowIzuiServices from '@/services/iwow/izui';
import { VouchersServices } from '@/services/vouchers/vouchers';
import { Data, Model } from '@/types/model';
import { cloneToArray } from '@/utilities/array';
import clsx from 'clsx';
import Link from 'next/link';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { TabRouterIwow } from './club';

type PageProps = {
  izuiCheckinList: Data.IzuiCheckinList;
  vouchers: Model.Voucher[];
};
enum DemoStatus {
  Success,
  IsNotMemeber,
  Oops
}
const IWowIzuiPage: NextPage<PageProps> = ({ izuiCheckinList, vouchers, router }) => {
  const [value, { startCountdown }] = useCountdown({ countStart: 60 });
  const savedPoint = useBoolean(false);
  const { withAuth } = useGlobalContext();
  const [demo, setDemo] = useState(DemoStatus.Success);

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  const handleSavePoint = withAuth(savedPoint.setTrue, []);

  const handleReceive = useCallback(() => {
    const title: Record<DemoStatus, string> = {
      [DemoStatus.Success]: 'Bạn thật nhanh tay!\nDeal hot đã thuộc về bạn.',
      [DemoStatus.IsNotMemeber]: 'Tiếc quáaa!!! Bạn chưa phải là hội viên iTel',
      [DemoStatus.Oops]: 'Tiếc quá! Bạn bị chậm mất rồi'
    };
    const messages: Record<DemoStatus, React.ReactNode> = {
      [DemoStatus.Success]: (
        <>
          iTel đã gửi thông tin Voucher về SMS đến bạn hoặc bạn có thể xem tại{' '}
          <Link href={Routers.PROFILE_DISCOUNT} className="text-red-500">
            <b>Ưu đãi đã nhận</b>
          </Link>
        </>
      ),
      [DemoStatus.IsNotMemeber]: (
        <>
          Số điện thoại của bạn chưa đủ điều kiện để trở thành hội viên iTel Club. Sau 3 ngày kể từ ngày kích hoạt, số điện thoại của bạn sẽ
          được tham gia chương trình Hội viên thân thiết iTel Club.
          <br />
          <br />
          Chi tiết liên hệ <b>087708787</b> (Miễn phí với Thuê bao iTel)
        </>
      ),
      [DemoStatus.Oops]:
        'Số lượng deal đã hết lượt, nhưng đừng lo, iTel có rất chương trình khuyến mãi khác. Nhớ vào iZui thường xuyên để nhận được nhiều ưu đãi liền tay nhé!'
    };
    const otherOptions =
      demo == DemoStatus.Success
        ? {
            confirmLable: 'Dùng ngay',
            rejectLable: 'Để sau',
            onDone() {
              // quickViewVoucher({ voucher: vouchers[0], forceView: true });
            }
          }
        : demo === DemoStatus.Oops
        ? {
            confirmLable: 'Khám phá iZui ngay',
            onDone() {
              router.push(Routers.PROMOTION_IZUI);
            }
          }
        : undefined;

    modal.confirm({
      content: (
        <div className="text-base-content text-center">
          <Svg
            src={demo === DemoStatus.Success ? '/icons/others/order-complete.svg' : '/icons/others/phone-failed.svg'}
            className="mx-auto h-16 md:h-20 w-16 md:w-20"
          />
          <h3 className="text-lg md:text-s-md mt-8">
            <b>{title[demo]}</b>
          </h3>
          <p className="text-sm md:text-base mt-4 md:text-left">{messages[demo]}</p>
        </div>
      ),
      ...otherOptions
    });
  }, [demo, router, vouchers]);

  return (
    <>
      <Head>
        <title>Itel - Izui</title>
      </Head>
      <DebugUI title="Status" className="bg-neutral-0 rounded-lg shadow-itel">
        <DebugUI.OptionsList
          options={[
            { name: 'Thành công', value: DemoStatus.Success },
            { name: 'Oops', value: DemoStatus.Oops },
            { name: 'Không phải thành viên', value: DemoStatus.IsNotMemeber }
          ]}
          onChange={(v) => setDemo(v.value)}
          checkedValue={demo}
        />
      </DebugUI>
      <TabRouterIwow isTop />
      <BannerAdvertising
        type="tertiary"
        data={cloneToArray(
          {
            id: 1,
            media: {
              desktop: 'https://res.cloudinary.com/dvqbggeri/image/upload/v1687617424/itel/Block_Image_yxxinr.jpg',
              tablet: 'https://res.cloudinary.com/dvqbggeri/image/upload/v1687617418/itel/Block_Image_efe6f2.jpg',
              mobile: 'https://res.cloudinary.com/dvqbggeri/image/upload/v1687617447/itel/Block_Image_quzhu5.jpg'
            },
            title: 'Giờ vàng \ntràn ưu đãi',
            actionTitle: 'Giật Voucher ngay'
          },
          4
        )}
      />
      <TabRouterIwow />

      <section className="relative bg-red-500 xl:pb-28 md:pb-16 pb-6 pt-10 md:pt-[6.5rem] xl:pt-48 overflow-hidden">
        <img src="/images/iwow/asset-voucher.png" alt="asset" className="z-0 absolute w-full -bottom-8 md:-bottom-28 xl:-bottom-80" />
        <div className="container relative">
          <Thunder className="max-xl:hidden" size={50} top={-30} right={87} rotate={22} flip />
          <Thunder className="max-xl:hidden" blur={3} size={80} top={-11} left={192} rotate={-20} />
          <Thunder className="max-xl:hidden" blur={6} size={180} bottom={-121} right={-30} rotate={15} flip />

          <Thunder className="max-md:hidden xl:hidden" blur={3} size={85} top={-20} left={-40} rotate={-15} />
          <Thunder className="max-md:hidden xl:hidden" blur={6} size={80} bottom={17} right={10} rotate={15} flip />

          <Thunder className="md:hidden" blur={1} size={60} top={60} left={-40} rotate={-15} />
          <Thunder className="md:hidden" blur={2} size={60} bottom={-33} right={-10} rotate={15} flip />

          <div className="w-[125%] md:w-3/4 absolute left-1/2 -translate-x-[30%] -top-5 mt-2 md:-mt-0.5 md:-top-12 xl:-top-20">
            <svg width="925" height="616" className="w-full h-full" viewBox="0 0 925 616" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M308.346 0.281601C267.916 0.266333 227.878 8.21603 190.52 23.6775C153.163 39.1391 119.218 61.8092 90.6236 90.3925C62.0295 118.976 39.3474 152.913 23.8717 190.264C8.39612 227.616 0.429685 267.65 0.429688 308.08H616.493C616.508 267.626 608.547 227.565 593.062 190.192C577.577 152.818 554.874 118.866 526.252 90.2762C497.63 61.6868 463.651 39.022 426.26 23.5796C388.869 8.13723 348.801 0.220466 308.346 0.281601V0.281601Z"
                fill="#FFC629"
              />
              <path
                d="M616.155 616C697.819 616 776.138 583.559 833.883 525.814C891.628 468.069 924.07 389.749 924.07 308.085H308.007C308.007 348.541 315.979 388.6 331.467 425.973C346.956 463.346 369.657 497.301 398.275 525.896C426.892 554.492 460.864 577.168 498.249 592.628C535.634 608.089 575.699 616.031 616.155 616V616Z"
                fill="#CC0024"
              />
            </svg>
          </div>

          <div className="relative">
            <div className="absolute -top-10 xl:-top-14 right-1/2">
              <img src="/images/chat-icon.png" alt="Chat icon" className=" h-[5.25rem] xl:h-[7.375rem]" />
            </div>
            <img
              src="/images/iwow/checkin.png"
              className="w-full md:w-auto md:h-16 xl:h-18 mx-auto relative"
              alt="Check in nhận quà"
              aria-label="Check in nhận quà"
            />
            <div className="flex">
              <p className="max-md:hidden text-neutral-0 rounded-full px-3 py-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto">
                Check in mỗi ngày - Điểm tiêu không hết
              </p>
            </div>
          </div>
          <div className="relative mt-6 md:mt-3 xl:mt-6">
            <div className="tag md:tag-vector border-none absolute w-full h-full inset-0 bg-gradient-to-r from-yellow-500 to-red-500 p-0 rounded-2xl md:rounded-l-2xl" />
            <div className="p-0.5">
              <div className="relative tag md:tag-vector border-none w-full block p-0 overflow-hidden rounded-2xl md:rounded-l-2xl h-auto">
                <div data-theme="light" className="py-3.5 md:py-6 xl:px-[7.5rem]">
                  <div className="flex gap-1 md:gap-3 xl:gap-4 px-2.5 md:px-6">
                    {izuiCheckinList.data.map((item, i) => (
                      <div key={item.id} className={clsx(Boolean(item.state) ? 'text-orange' : 'text-neutral-500', 'text-center flex-1')}>
                        <div
                          className={clsx(
                            Boolean(item.state) ? 'border border-red-500' : 'border border-dotted border-neutral-300',
                            'flex flex-col items-center rounded-md flex-1 xl:pt-4 xl:pb-6 md:pt-3 md:pb-4 pt-1 pb-2'
                          )}
                        >
                          <p className="text-xs">+{item.value}</p>
                          <Svg
                            src={i === 0 && savedPoint.value ? '/icons/bold/tick-circle.svg' : '/icons/others/token.svg'}
                            className="xl:w-10 xl:h-10 md:w-6 md:h-6 h-4 w-4 mt-1 md:mt-2"
                          />
                        </div>
                        <p className="text-xs mt-1.5 text-center xl:text-base">{item.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 text-center mt-4 xl:mt-6">
                    {savedPoint.value ? (
                      <button className="btn btn-ghost btn-sm xl:btn-lg rounded-full text-orange font-normal md:font-bold">
                        <span className="max-md:hidden">Nhớ quay lại vào ngày mai để nhận thêm Điểm bạn nhé!</span>
                        <span className="md:hidden">Quay lại vào ngày mai để nhận 50 điểm</span>
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm xl:btn-lg rounded-full" onClick={handleSavePoint}>
                        Nhận điểm ngay
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative container mt-6 md:mt-10 xl:mt-28">
          <Header>{'Check in vòng quay \n- Zui zẻ cả ngày'}</Header>
          <div className="xl:mt-10 mt-5 relative pb-6 md:pb-0">
            <img src="/images/iwow/funny-wheel.png" alt="123123" className="w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 md:bottom-6 text-center xl:hidden">
              <button className="btn-secondary btn btn-sm cursor-pointer rounded-full border-none font-medium">Tham gia ngay</button>
            </div>
          </div>
        </div>
        <div className="relative container mt-6 md:mt-10 xl:mt-28">
          <Header>{'săn deal giờ vàng \n- ngàn quà cực chất'}</Header>
          <div className="flex flex-wrap px-3 py-8 md:px-8 bg-[#CF021A] rounded-2xl mt-5 xl:mt-10 relative">
            <div className="relative px-0 md:px-10 w-full xl:w-1/2">
              <div className="relative">
                <img className="w-full" src="/images/iwow/hunting-sale.png" alt="" />
                <div className="w-full text-center absolute -bottom-2 md:bottom-2">
                  <span className="tag tag-sale tag-base md:tag-lg bg-gradient-sale border border-yellow-600 rounded-xl py-3.5 px-4 md:py-4.5 md:px-10">
                    <TagSale.Text className="text-h-xxs md:text-h-xs">Bắt đầu sau</TagSale.Text>
                    <TagSale.Timer expiry={'2023-08-24T23:04:19.287Z'} className="text-neutral-0" />
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center font-itel text-base-100 text-h-xxs">
                <b>Sử dụng mã Voucher để nhận ngay ưu đãi nhé</b>
              </p>
            </div>
            <div className="mt-8 xl:mt-0 relative w-full xl:w-1/2">
              <div className="-mx-3 md:-mx-3">
                <div className="flex px-3 overflow-x-auto scroll-auto scrollbar-hide">
                  {vouchers.map((item, index) => (
                    <div className="px-1.5 md:px-3 w-60 md:w-1/2 box-content md:box-border flex-shrink-0" key={item.id}>
                      <CardGiftDivide
                        src={item.id}
                        img={item.banner}
                        logo={item.brand.thumbnail}
                        className="drop-shadow-lg w-full"
                        redemptionDeadline={``}
                        title={item.title}
                        point={200}
                        outOfStock={!index}
                        // onClickDetail={() =>
                        //   toggleModalVoucher({
                        //     data: item,
                        //     closeOnReceive: true,
                        //     isHot: true,
                        //     isShowDebug: false,
                        //     onDone: handleReceive
                        //   })
                        // }
                        onClickReceive={handleReceive}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionSupports />
    </>
  );
};

const Thunder = ({
  size = 85,
  flip,
  blur,
  rotate,
  className,
  ...rest
}: {
  className?: string;
  size: number;
  blur?: number;
  rotate?: number;
  flip?: boolean;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) => {
  return (
    <span
      className={clsx('absolute z-10', className)}
      style={{
        ...rest,
        filter: blur ? `blur(${blur}px)` : undefined,
        rotate: rotate ? rotate + 'deg' : undefined,
        transform: flip ? 'scaleX(-1)' : undefined
      }}
    >
      <Svg src="/icons/others/thunder.svg" width={size} height={size} />
    </span>
  );
};
const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center">
      <div className="font-itel border border-yellow-500 rounded-2xl xl:rounded-3xl overflow-hidden text-center text-h-xxs md:text-h-sm xl:text-h-lg font-bold flex">
        <div className="bg-gradient-to-r from-[#FDD20D] via-orange to-red-500 bg-orange py-1 xl:py-2 text-neutral-0 px-3">
          <h3 className="whitespace-pre md:whitespace-normal">{children}</h3>
        </div>
      </div>
    </div>
  );
};
IWowIzuiPage.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const izuiCheckinList = await IwowIzuiServices.getListXu();
  const vouchers = await VouchersServices.list({ limit: 2 });
  return {
    props: {
      izuiCheckinList,
      vouchers
    },
    // revalidate: 8600
  };
});

export default IWowIzuiPage;
export { getStaticProps };
