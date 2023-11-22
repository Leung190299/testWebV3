/* eslint-disable react-hooks/rules-of-hooks */
import { useGlobalContext } from '@/context/global';
import { Event, emitter } from '@/services/chat/events';
import { Logger } from '@/utilities/logger';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Svg from '../icon/svg';
import ChatBoxStart from './chat-box-start';

type Props = {};

const logger = new Logger('Chat Box');
const ChatBox = (props: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [isShowTip, setIsShowTip] = useState(false);
  const [isShowQuickLogin, setShowQuickLogin] = useState(true);
  const [tipIntervalId, setTipIntervalId] = useState<any>();
  const [quickLoginIntervalId, setQuickLoginTipIntervalId] = useState<any>();
  const [isStart, setIsStart] = useState(false);
  const [startTime, setStartTime] = useState<Date>(new Date());

  const { status, toggleModalAuth } = useGlobalContext();

  const isLogin = status === 'authenticated';

  useEffect(() => {

    logger.log('initial logger');
    setIsMobile(innerWidth <= 768);
    setIsTablet(768 < innerWidth && innerWidth <= 1200);
    setIsPC(innerWidth > 1200);

    // show/hide tip each 1 min
    const intervalId = setInterval(() => {
      setIsShowTip((prev) => !prev);
    }, 60000); // 1 min interval

    setTipIntervalId(intervalId);

    // show/hide button each 2 min
    const quickLoginIntervalId = setInterval(() => {
      setShowQuickLogin((prev) => !prev);
    }, 120000); // 2 min interval

    setQuickLoginTipIntervalId(quickLoginIntervalId);

    return () => {
      clearInterval(intervalId);
      clearInterval(quickLoginIntervalId);
    };
  }, []);
  useEffect(() => {
    const open = () => {
      setIsStart(true);
    };
    emitter.on(Event.Open, open);

    return () => {
      emitter.off(Event.Open, open);
    };
  }, []);

  const resetTipInterval = () => {
    clearInterval(tipIntervalId);
    clearInterval(quickLoginIntervalId);

    const newTipIntervalId = setInterval(() => {
      setIsShowTip((prev) => !prev);
    }, 300000);

    setTipIntervalId(newTipIntervalId);

    const newQuickloginIntervalId = setInterval(() => {
      setShowQuickLogin((prev) => !prev);
    }, 600000);

    setQuickLoginTipIntervalId(newQuickloginIntervalId);
    setIsShowTip(false);
    setShowQuickLogin(false);
  };

  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'name':
        setNameInput(event.target.value);
        break;
      case 'phone':
        setPhoneInput(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleOnCloseChatBox = (isStart: boolean) => {
    setIsStart(isStart);
    setIsShow(false);
    setNameInput('');
    setPhoneInput('');
  }

  return (
    <div id="__chatbox" className='transition-default z-50 hidden'
      style={isMobile && isShow ? { width: innerWidth, height: innerHeight, position: 'fixed', top: 0, background: 'rgba(0, 0, 0, 0.5)' } : undefined}>
      <div className={clsx(!isStart ? 'scale-100' : 'scale-0 opacity-0', 'fixed bottom-0 right-0 z-50 w-0 h-0')}>
        <div className={clsx(isShowTip && !isShow && !isLogin ? 'fixed bottom-60 md:bottom-28 right-5 md:right-6 z-50 w-80 rounded-2xl' : 'scale-0 opacity-0',
          'transition-default bg-neutral-600 text-neutral-0')}>
          <div className='transition-default relative'>
            <div className='p-4'>
              <p className='font-bold'>
                Tips! Đăng nhập ngay
              </p>
              <p className='mt-1 text-sm'>
                Bạn sẽ có trải nghiệm tuyệt vời nếu bạn đăng nhập đó
              </p>
              <button type="button" className={clsx(isShowQuickLogin ? 'mt-4 btn-sm transition-default btn-primary btn rounded-full' : 'hidden')} onClick={() => { resetTipInterval(); toggleModalAuth() }}>
                Đăng nhập ngay
              </button>
            </div>
            <button
              className="btn-tertiary btn btn-xs btn-circle bg-neutral-200 hover:bg-neutral-300 absolute -top-4 right-2"
              onClick={resetTipInterval}
            >
              <Svg src="/icons/bold/cancel.svg" className="inline h-3 w-3" />
            </button>
          </div>
        </div>
        <div className={clsx('fixed bottom-8 md:bottom-6 right-5 md:right-6 z-50 cursor-pointer')}>
          <div
            className={clsx(
              isShow ? 'w-[350px] xl:w-[376px] rounded-2xl' : 'h-18 w-18 rounded-[2.5rem]',
              isShow && isMobile ? 'h-[372px]' : '',
              isShow && (isPC || isTablet) ? 'h-80' : '',
              'transition-default relative bg-neutral-600 text-neutral-0'
            )}
          >
            <div onClick={() => setIsShow(true)}>
              <div
                className={clsx(
                  isShow ? 'top-[70px] w-[196px] translate-x-6' : '-top-1.5 w-27 translate-x-4',
                  'transition-default absolute right-0'
                )}
              >
                <img src="/images/chat-icon.png" alt="Chat icon" />
              </div>
              <div className={clsx(isShow ? 'h-full w-full p-4 pb-6' : 'h-0 w-0', 'overflow-hidden')}>
                {isLogin ?
                  (<div className={clsx(isShow ? 'scale-100' : 'scale-0 opacity-0', 'transition-default')}>
                    <div className="font-bold">Bạn cần trợ giúp?</div>
                    <ul className="mt-1 space-y-2 text-sm">
                      <li>Kích hoạt sim</li>
                      <li>Mở khóa sim</li>
                      <li>Đổi/Cấp lại sim</li>
                    </ul>
                  </div>)
                  :
                  (<div className={clsx(isShow ? 'scale-100' : 'scale-0 opacity-0', 'transition-default')}>
                    <div className="font-bold">Tips! Đăng nhập ngay</div>
                    <ul className="mt-1 space-y-2 text-sm">
                      <li> Bạn sẽ có trải nghiệm tuyệt vời</li>
                      <li>nếu bạn đăng nhập đó</li>
                    </ul>
                    <button type="button" className="mt-4 btn-sm transition-default btn-primary btn rounded-full" onClick={() => toggleModalAuth()}>
                      Đăng nhập ngay
                    </button>
                  </div>)
                }
                <div className={clsx(isShow ? 'scale-100' : 'scale-0 opacity-0', isLogin ? 'mt-12' : 'mt-6', 'transition-default origin-top-left')}>
                  <div className="font-bold">Trò chuyện cùng iTel?</div>
                  <div className="relative mt-3 rounded-md bg-neutral-0 text-sm">
                    <input type="text" value={nameInput} onChange={(event) => handleInputChange(event, 'name')} className="w-full bg-transparent px-4 py-3 text-neutral-800 outline-none" />
                    <label className={clsx(nameInput ? 'invisible' : 'visible', 'pointer-events-none absolute left-0 top-0 translate-x-4 translate-y-3 text-neutral-500 text-opacity-50')}>
                      Nhập tên của bạn <span className="text-red-500">*</span>
                    </label>
                  </div>
                  {
                    isMobile ? (
                      <>
                        <div className="relative mt-2 rounded-md bg-neutral-0 text-sm">
                          <input type="text" value={phoneInput} onChange={(event) => handleInputChange(event, 'phone')} className="w-full bg-transparent px-4 py-3 text-neutral-800 outline-none" />
                          <label className={clsx(phoneInput ? 'invisible' : 'visible', 'pointer-events-none absolute left-0 top-0 translate-x-4 translate-y-3 text-neutral-500 text-opacity-50')}>
                            Số điện thoại <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button disabled={!nameInput || !phoneInput} className="btn-primary btn btn-sm gap-x-2 rounded-full px-2.5" onClick={() => { setIsStart(true); setStartTime(new Date); }}>
                            <Svg className="h-5 w-5" src="/icons/bold/send.svg" />
                            Bắt đầu chat
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="relative rounded-md bg-neutral-0 text-sm">
                          <input type="text" value={phoneInput} onChange={(event) => handleInputChange(event, 'phone')} className="w-full bg-transparent px-4 py-3 text-neutral-800 outline-none" />
                          <label className={clsx(phoneInput ? 'invisible' : 'visible', 'pointer-events-none absolute left-0 top-0 translate-x-4 translate-y-3 text-neutral-500 text-opacity-50')}>
                            Số điện thoại <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <div className="flex-shrink-0">
                          <button disabled={!nameInput || !phoneInput} className="btn-primary btn btn-sm gap-x-2 rounded-full px-2.5" onClick={() => { setIsStart(true); setStartTime(new Date); }}>
                            <Svg className="h-5 w-5" src="/icons/bold/send.svg" />
                            Bắt đầu chat
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div
              className={clsx(
                isShow ? 'top-0 rotate-180' : 'top-full',
                'transition-default absolute right-2 -translate-y-1/2 rounded-full bg-red-500'
              )}
              onClick={() => setIsShow(!isShow)}
            >
              <Svg src="/icons/bold/up.svg" className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <div style={isTablet ? { width: innerWidth, height: innerHeight, backgroundColor: 'rgb(0 0 0/ 0.5)' } : undefined} className={clsx(isStart ? 'scale-100' : 'scale-0 opacity-0', 'fixed bottom-0 top-0 right-0 z-50')}>
        <ChatBoxStart isStart={isStart} startTime={startTime} onClose={handleOnCloseChatBox} />
      </div>
    </div>
  );
};

export default ChatBox;
