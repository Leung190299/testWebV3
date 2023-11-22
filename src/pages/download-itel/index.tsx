import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import SectionDownloadiTel from '@/components/section/section-download-itel';
import Link from 'next/link';
import ButtonAppStore from '@/components/button/ButtonAppStore';
import ButtonGooglePlay from '@/components/button/ButtonGooglePlay';

interface PageProps {}
const DownloadITelPage = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Itel - Ứng dụng My iTel</title>
      </Head>
      <HeaderMobileWeb title="Ứng dụng My iTel" />
      <LayoutSupport>
        <h4 className="text-h-sm hidden md:block font-itel">
          <b>ỨNG DỤNG MY ITEL</b>
        </h4>

        {/* QR code */}
        <div className="bg-neutral-0 rounded-lg mt-4 md:mt-6 overflow-hidden">
          <div className="flex flex-col-reverse xl:flex-row">
            <div className="flex-1 flex flex-col md:flex-row xl:block container p-6 md:px-8 md:py-10 xl:px-10">
              <div className="flex-1 text-center md:text-left">
                <div>
                  <p className="text-neutral-500 text-sm">App tiện ích</p>
                  <p className="mt-1 text-red-500 font-bold font-itel text-h5 md:text-h4">MY ITEL</p>
                </div>
                <div className="mt-4 xl:mt-6">
                  <p className="font-bold text-h5 xl:text-h4">
                    Một chạm vạn tiện ích. <br />
                    Tải App ngay!
                  </p>
                </div>
                <div className="mt-6 hidden xl:block">
                  <p className="text-sm md:text-base">
                    Bạn thích xem phim miễn phí.
                    <span className="font-bold">&nbsp;Tải App ngay.</span>
                  </p>
                  <p className="text-sm md:text-base">
                    Bạn muốn chơi game thả ga.
                    <span className="font-bold">&nbsp;Tải App liền.</span>
                  </p>
                  <p className="text-sm md:text-base">
                    Hàng ngàn tiện ích đang chờ bạn.
                    <span className="font-bold">&nbsp;Quét mã tải ngay.</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 md:mt-0 xl:mt-16 flex flex-col justify-center items-center">
                <img src="/images/QR-Itel.png" alt="" draggable={false} />
                <p className="mt-4 text-sm hidden xl:block">Quét mã QR để tải App</p>
                <p className="mt-2 text-sm text-center xl:hidden">
                  Quét mã QR <br /> hoặc tải App trực tiếp trên
                </p>

                <div className="mt-4 flex gap-4">
                  <Link href="https://apps.apple.com/us/app/my-itel/id1610306087">
                    <ButtonAppStore className="btn max-md:h-10 border-none bg-transparent p-0 text-neutral-0" />
                  </Link>

                  <Link href="https://play.google.com/store/apps/details?id=itelecom.vn.myitel">
                    <ButtonGooglePlay className="btn max-md:h-10 border-none bg-transparent p-0 text-neutral-0" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <img className="w-full h-full object-cover" src="/images/iTel.png" alt="" draggable={false} />
            </div>
          </div>
        </div>
        {/* end QR code */}
        <div className="h-2 md:h-4 bg-neutral-100 -ml-4 -mr-4" />

        {/* ad download */}
        <SectionDownloadiTel />
        {/* end ad download */}
      </LayoutSupport>
    </>
  );
};

DownloadITelPage.getLayout = function layout(page: any) {
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

export default DownloadITelPage;
