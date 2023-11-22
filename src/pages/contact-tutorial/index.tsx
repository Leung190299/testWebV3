import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutDefault from '@/components/layout/layout-default';
import LayoutTutorialQuess from '@/components/layout/layout-tutorial-quess';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';

interface PageProps {}
const TrackingOrderPage = (props: PageProps) => {
  const showLiveChat = () => {
    if (typeof window == 'undefined') return;
    let liveChat: HTMLDivElement | null = document.querySelector('#cs-live-chat');
    if (!liveChat) return;
    let { x, y } = liveChat.getBoundingClientRect();

    let ev = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: x,
      screenY: y
    });

    let el = document.elementFromPoint(x + 10, y + 10);
    if (!el) return;
    console.log(el);
    el.dispatchEvent(ev);
  };
  return (
    <>
      <Head>
        <title>Liên hệ</title>
      </Head>
      <HeaderMobileWeb title="Liên hệ" />
      <LayoutTutorialQuess>
        <h1 className="text-h-sm hidden md:block font-itel mb-3">
          <b>Liên hệ</b>
        </h1>

        <div className="content-contact-tab bg-neutral-0">
          <div className="head-contact p-6 px-8">
            <div className="logo mb-2">
              <img src="/tutorial/logo-itel.svg" alt="" />
            </div>
            <p>Theo là thích</p>
          </div>
          <div className="content-info-contact bg-neutral-0 p-8">
            <div className="show-contact-info">
              <h4 className="mb-4 font-bold">Bạn cần liên hệ với iTel?</h4>
              <div className="livechat-contact flex p-3 px-4 mb-4">
                <div className="left">
                  <p>Hỗ trợ 24/24</p>
                  <h4 className="font-bold">Live Chat</h4>
                </div>
                <button className="btn-chat" onClick={() => showLiveChat()}>
                  <div className="btn-primary btn rounded-full">
                    <img src="tutorial/livechat.svg" alt="" />
                    <span className="pl-2">Chat ngay</span>
                  </div>
                </button>
              </div>
              <div className="social">
                <p className="mb-2">Hoặc liên hệ với iTel qua</p>
                <ul className="flex">
                  <li className="mr-3">
                    <a href="https://zalo.me/3281327437324952111" className="flex font-bold">
                      <img src="/tutorial/social-1.png" alt="" className="mr-2" />
                      Zalo
                    </a>
                  </li>
                  <li className="mr-3">
                    <a href="https://m.me/itel.fan" className="flex font-bold">
                      <img src="/tutorial/social-2.png" alt="" className="mr-2" />
                      Facebook
                    </a>
                  </li>
                  <li className="mr-3">
                    <a href="mailto:dvkh@itelecom.vn" className="flex font-bold">
                      <img src="/tutorial/social-3.png" alt="" className="mr-2" />
                      Email
                    </a>
                  </li>
                  <li className="mr-3">
                    <a href="tel:0877087087" className="flex font-bold">
                      <img src="/tutorial/social-4.png" alt="" className="mr-2" />
                      0877 087 087
                    </a>
                  </li>
                </ul>
              </div>
              <div className="info-place-contact mt-8 pt-8">
                <ul>
                  <li className="mb-6">
                    <label className="mb-2">Công ty</label>
                    <p>Công ty Cổ phần Viễn thông Di động Đông Dương Telecom</p>
                  </li>
                  <li className="mb-6">
                    <label className="mb-2">Chịu trách nhiệm nội dung</label>
                    <p>Ông Nguyễn Hoàng Hải</p>
                  </li>
                  <li className="mb-6">
                    <label className="mb-2">Mã số doanh nghiệp</label>
                    <p>0108115302</p>
                  </li>
                  <li className="mb-6">
                    <label className="mb-2">Địa chỉ</label>
                    <p>B018, Tháp The Manor, Mễ Trì, Q. Nam Từ Liêm, Hà Nội</p>
                  </li>
                </ul>
              </div>
              <div className='rounded-2xl overflow-hidden'>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.464561876966!2d105.77398307614436!3d21.014089880631627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345386fb729895%3A0xd208790838a9a821!2siTel%20Telecom!5e0!3m2!1svi!2s!4v1700623490797!5m2!1svi!2s"

                    className='w-full h-[248px]'

                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </LayoutTutorialQuess>
    </>
  );
};

TrackingOrderPage.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0 btop-tutorial">{page}</LayoutDefault>
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
