import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Popover } from '@headlessui/react';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { useGlobalContext } from '@/context/global';
import styles from '@/styles/chat.module.scss';
import type { Model } from '@/types/model';
import { withMobile, withoutMobile } from '@/utilities/function';
import { fileToBlob } from '@/utilities/image';
import { Logger } from '@/utilities/logger';


import Avatar from '../avatar/avatar';
import DatePicker, { InputDate } from '../common/date-picker';
import Svg from '../icon/svg';
import { toggleModalDatePicker } from '../modal/selection/modal-date-picker';
import StarRating from '../star-rating/star-rating';
import ChatBoxCarousel from './chat-box-carousel';
import { Event, emitter, messageListener } from '@/services/chat/events';
import { generateRandomId } from '@/utilities/string';
import useDragAndDrop from '@/hooks/useDragAndDrop';

type Props = {
  isStart: boolean,
  startTime: Date,
  onClose: (isStart: boolean) => void,
};

type Message = {
  id: string;
  key?: string;
  sender: string;
  content?: string;
  file?: any;
  image?: any;
  previewUrl?: any;
  action?: any[];
  isHasCarosel?: boolean;
  time?: Date;
};

const ChatBoxStart = (props: Props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPC, setIsPC] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  // const [isDragOver, setIsDragOver] = useState(false);
  const [chatValue, setChatValue] = useState<any>('');
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isQuickMenuVisible, setQuickMenuVisible] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedDate, setSelectedDate] = useState<any>(new Date().toString());
  const [chattingWith, setChattingWith] = useState<Model.User>({
    id: 1,
    email: '',
    name: 'iTel số đỏ',
    role: '',
    phone: '0877 087 087',
    default_address_id: 1,
    is_verified: true,
  });
  const fileInputRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const messagesRef = useRef<any>(null);

  const { status, user, toggleModalAuth } = useGlobalContext();
  const [isDragOver, handler] = useDragAndDrop({
    onDrop(files) {
      if (!files.length) return;
      const file = fileToBlob(files[0]);
      const newMessage: Message = {
        id: '',
        // sender: user.name ? user.name : 'Me',
        sender: 'Me',
        file: file,
        time: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  });

  const isLogin = status === 'authenticated';

  const QUICK_MENUS = [
    {
      id: 1,
      key: 'tracking_order',
      content: 'Tracking đơn hàng'
    },
    {
      id: 2,
      key: 'active_sim',
      content: 'Kích hoạt Sim mới'
    },
    {
      id: 3,
      key: 'sim',
      content: 'Tìm Sim theo ngày sinh'
    },
    {
      id: 4,
      key: 'data',
      content: 'Lựa chọn gói cước Data'
    },
    {
      id: 5,
      key: 'itel',
      content: 'Giới thiệu về iTel'
    },
  ];

  const quickMessageCarousel = [
    {
      title: '1. Mua sim số',
      description: 'Nhà mạng tiên phong triển khai mô hình mạng di động ảo tại Việt Nam!',
      img: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png'
    },
    {
      title: '2. Dịch vụ số',
      description: 'Nhà mạng tiên phong triển khai mô hình mạng di động ảo tại Việt Nam!',
      position: 'Product Growth',
      img: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png'
    },
    {
      title: '3. Kích hoạt sim',
      description: 'Nhà mạng tiên phong triển khai mô hình mạng di động ảo tại Việt Nam!',
      img: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png'
    },
  ];

  const quickMessageAction4 = [
    {
      id: 1,
      sender: 'Chatbot Số đỏ',
      title: 'Rating',
      isDatePicker: false,
      isRating: true,
      actionMessage: 'Đóng góp của bạn là vô cùng quý giá với iTel. iTel xin cảm ơn và chúc bạn buổi sáng vui vẻ ạ.',
      action: [],
    },
  ];

  const quickMessageAction3 = [
    {
      id: 1,
      sender: 'Chatbot Số đỏ',
      title: 'Mua số 0877 123 456',
      isDatePicker: false,
      isRating: false,
      actionMessage: 'Hi vọng bạn đã có trải nghiệm tốt với iTel số đỏ. Nhằm nâng cao chất lượng dịch vụ, xin bạn vui lòng đánh giá chất lượng hỗ trợ:',
      action: quickMessageAction4,
    },
    {
      id: 2,
      sender: 'Chatbot Số đỏ',
      title: 'Mua số khác',
      isDatePicker: false,
      isRating: false,
      actionMessage: 'Hi vọng bạn đã có trải nghiệm tốt với iTel số đỏ. Nhằm nâng cao chất lượng dịch vụ, xin bạn vui lòng đánh giá chất lượng hỗ trợ:',
      action: quickMessageAction4,
    },
  ];

  const quickMessageAction2 = [
    {
      id: 1,
      sender: 'Chatbot Số đỏ',
      title: 'Chọn ngày sinh',
      isDatePicker: true,
      isRating: false,
      actionMessage: 'Sim phong thủy phù hợp với ngày sinh DOB của bạn là 0877 123 456',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      action: quickMessageAction3,
    },
  ];

  const quickMessageActionStep1 = [
    {
      id: 1,
      sender: 'Chatbot Số đỏ',
      title: 'Sim phong thủy',
      isDatePicker: false,
      isRating: false,
      actionMessage: 'Bạn vui lòng cung cấp ngày sinh để iTel tư vấn Sim phong thủy nhé!',
      link: '',
      action: quickMessageAction2,
    },
    {
      id: 2,
      sender: 'Chatbot Số đỏ',
      title: 'Sim thần số học',
      isDatePicker: false,
      isRating: false,
      actionMessage: 'Bạn vui lòng cung cấp ngày sinh để iTel tư vấn Sim thần số học nhé!',
      link: '',
      action: quickMessageAction2,
    },
    {
      id: 3,
      sender: 'Chatbot Số đỏ',
      title: 'Chỉ cần đúng ngày sinh',
      isDatePicker: false,
      isRating: false,
      actionMessage: 'Bạn vui lòng cung cấp ngày sinh để iTel tư vấn Sim nhé!',
      link: '',
      action: quickMessageAction2,
    },
  ];

  const QUICK_MESSAGE_SCENARIOS: Message[] = [
    {
      id: '1',
      key: 'tracking_order',
      sender: 'Chatbot Số đỏ',
      content: 'Chào buổi sáng, bạn muốn tìm đơn hàng?',
      isHasCarosel: true,
      action: [],
    },
    {
      id: '2',
      key: 'active_sim',
      sender: 'Chatbot Số đỏ',
      content: 'Chào buổi sáng, bạn muốn kích hoạt Sim?',
      isHasCarosel: false,
      previewUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      action: [],
    },
    {
      id: '3',
      key: 'sim',
      sender: 'Chatbot Số đỏ',
      content: 'Chào buổi sáng, bạn muốn tìm Sim ngày sinh theo phong thủy hay theo thần số học?',
      isHasCarosel: false,
      action: quickMessageActionStep1,
    },
    {
      id: '4',
      key: 'data',
      sender: 'Chatbot Số đỏ',
      content: 'Chào buổi sáng, bạn muốn tìm gói data?',
      isHasCarosel: false,
      image: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686337458/Recruitment/Block_Image_3_qv0tcu.png',
      action: [],
    },
    {
      id: '5',
      key: 'itel',
      sender: 'Chatbot Số đỏ',
      content: 'Chào buổi sáng, bạn muốn tìm hiểu về iTel?',
      isHasCarosel: true,
      action: [],
    }
  ];

  useEffect(() => {
    const onMessage = (message: string, extraData?: { type: string; sender?: any }) => {
      const newMessage: Message = {
        id: generateRandomId(),
        sender: extraData?.sender || 'Me',
        content: message,
        time: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    return messageListener(Event.Message, onMessage);
  }, []);

  useEffect(() => {
    setIsMobile(innerWidth <= 768);
    setIsTablet(768 < innerWidth && innerWidth <= 1200);
    setIsPC(innerWidth > 1200);
  }, []);

  useEffect(() => {
    // new message contact with chatbot
    if (messages.length === 1 && messages[0].sender === 'Me') {
      const newMessage: Message = {
        id: '2',
        sender: 'Chatbot Số đỏ',
        content: 'Chào Anh Chị',
        time: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    if (messagesRef) {
      const element = messagesRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [messages]);

  const sendMessage = (value?: string) => {
    if (chatValue.trim() === '' && (!value || value?.trim() === '')) return; // Ignore empty messages

    if (chatValue) {
      if (isLink(chatValue)) {
        handleGetPreviewData(chatValue, 'Me');
      } else {
        const newMessage: Message = {
          id: '',
          // sender: user.name ? user.name : 'Me',
          sender: 'Me',
          content: chatValue,
          time: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setChatValue('');
      }
    } else if (value) {
      const newMessage: Message = {
        id: '',
        // sender: user.name ? user.name : 'Me',
        sender: 'Me',
        content: value,
        time: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  const handleEmojiSelect = (event: any) => {
    setChatValue(chatValue + event.native);
    setPickerVisible(!isPickerVisible);
  }

  const handleQuickMenuClick = (item: any) => {
    const quickMessage = QUICK_MESSAGE_SCENARIOS.find((message) => message.key === item.key);
    if (quickMessage) {
      const newMessage: Message = {
        id: '',
        key: quickMessage.key,
        sender: quickMessage.sender,
        content: quickMessage.content,
        time: new Date(),
      };

      if (quickMessage.image) {
        Object.assign(newMessage, { image: quickMessage.image });
      }

      if (quickMessage.action && quickMessage.action.length > 0) {
        Object.assign(newMessage, { action: quickMessage.action });
      }

      if (quickMessage.isHasCarosel) {
        Object.assign(newMessage, { isHasCarosel: quickMessage.isHasCarosel });
      }

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatValue('');


      if (quickMessage.previewUrl) {
        handleGetPreviewData(quickMessage.previewUrl, quickMessage.sender);
      }
    }
    setQuickMenuVisible(!isQuickMenuVisible);
  }

  const handleQuickMessageButtonClick = async (item: any) => {
    if (item) {
      const newMessage: Message = {
        id: '',
        sender: item.sender,
        content: item.actionMessage,
        time: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatValue('');

      if (item.link) {
        await handleGetPreviewData(item.link, item.sender);
      }

      if (item.action && item.action.length > 0) {
        const newMessage: Message = {
          id: '',
          sender: item.sender,
          action: item.action,
          time: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setChatValue('');
      }
    }
  }

  const handleConfirmDateChange = (actionItem: any, date?: Date) => {
    setIsPopoverOpen(false);
    sendMessage(date ? date.toLocaleDateString('en-GB') : new Date(selectedDate).toLocaleDateString('en-GB'));
    actionItem.actionMessage = actionItem.actionMessage.replace('DOB', date ? date.toLocaleDateString('en-GB') : new Date(selectedDate).toLocaleDateString('en-GB'))
    handleQuickMessageButtonClick(actionItem);
  }

  const handleChooseRate = (actionItem: any) => {
    sendMessage(`${rating} ★`);
    handleQuickMessageButtonClick(actionItem);
  }

  const handleFileInputFileChange = () => {
    if (fileInputRef && fileInputRef.current.files.length > 0) {
      const file = fileToBlob(fileInputRef.current.files);
      const newMessage: Message = {
        id: '',
        // sender: user.name ? user.name : 'Me',
        sender: 'Me',
        file: file,
        time: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChatValue('');
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const isLink = (input: string) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(input) || ['.com', '.net'].some((extension) => input.includes(extension));
  };

  const handleGetPreviewData = async (url: string, sender: string) => {
    await axios.get(`https://api.linkpreview.net/?key=61bd1a36eb0fd797e5518cff554a75d7&q=${encodeURIComponent(url)}`)
      .then(response => {
        const newMessage: Message = {
          id: '',
          // sender: user.name ? user.name : 'Me',
          sender: sender,
          content: url,
          previewUrl: response.data,
          time: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setChatValue('');
      })
      .catch(error => {
        console.error('Error fetching link preview:', error);
      });
  };

  const formatFullTime = (time?: Date, isGetOnlyTime?: boolean) => {
    if (time) {
      const formatter = new Intl.DateTimeFormat('vi-VN', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'short',
        hour12: false,
      });
      const formattedDate = formatter.format(time);

      // Extract the time and date components
      const dateTimeComponent = formattedDate.split(/\s/);

      if (isGetOnlyTime) {
        return `${dateTimeComponent[0].replace(',', '')}`;
      } else {
        return formattedDate;
      }
    }
  };

  return (
    <div style={isTablet || isMobile ? { width: innerWidth, height: isMobile ? '100%' : '95%', right: 0 } : undefined} className={clsx(styles.chat, props.isStart ? `w-[350px] xl:w-[428px] xl:h-[592px]` : 'h-0 w-0', 'fixed bottom-0 right-2 md:right-6 z-50 transition-default')}>
      <div style={isMobile ? { justifyContent: 'flex-start', gap: 20 } : undefined} className={clsx(styles.header, 'bg-neutral-0', isMobile ? '' : 'rounded-t-2xl')}>
        {isMobile ? <button
          className={clsx('btn-circle btn-tertiary btn btn-xs bg-neutral-0 border-none')}
          onClick={() => { props.onClose(false); setChatValue(''); setMessages([]); }}
        >
          <Svg src="/icons/line/close.svg" className="inline h-4 w-4" />
        </button> : <></>}
        <div className="flex items-center gap-4">
          <Avatar img="/images/chatbot-avatar.png" alt={chattingWith.name as string} />
          <div className={styles.info}>
            <div className="font-bold text-lg">{chattingWith.name}</div>
            <div className="text-neutral-500 text-sm">{chattingWith.phone}</div>
          </div>
        </div>
        {!isMobile ? <button
          className={clsx(isTablet ? 'btn-circle' : '', 'btn-tertiary btn btn-xs rounded-2xl bg-neutral-200 hover:bg-neutral-300')}
          onClick={() => { props.onClose(false); setChatValue(''); setMessages([]); }}
        >
          {isTablet ? <Svg src="/icons/line/close.svg" className="inline h-4 w-4" /> : <Svg src="/icons/line/chevron-down.svg" className="inline h-4 w-4" />}
        </button> : <></>}
      </div>
      <div ref={messagesRef} style={isTablet || isMobile ? { width: innerWidth, height: isMobile ? 'calc(100vh - 160px)' : 'calc(100vh - 210px)', maxHeight: isMobile ? 'calc(100vh - 160px)' : 'calc(100vh - 210px)', right: 0 } : undefined}
        className='h-[432px] max-h-[432px] transition-default relative bg-neutral-100 overflow-y-auto overscroll-contain flex flex-wrap'
        {...handler}
      >
        <div className={clsx(styles.messages, 'bg-neutral-100 flex flex-col justify-end')}>
          <div className="text-center text-neutral-500 text-xs mb-6">
            {formatFullTime(props.startTime, false)}
          </div>
          {messages.map((message, index) => {
            if (message.sender === 'Me') {
              return (
                <div key={`me-${index}`}>
                  {
                    !message.file && !message.previewUrl && message.content ? (
                      <div key={`mw-${index}`} className={clsx(styles.message, 'flex justify-end')}>
                        <div key={`mc-${index}`} className={clsx(styles.content, 'max-w-[280px] md:max-w-md xl:max-w-xs bg-red-500 text-neutral-0 rounded-l-xl rounded-tr-xl')}>{message.content}</div>
                      </div>
                    ) : <></>
                  }
                  {
                    message.file ? (
                      <div key={`f-${index}`} className={clsx(styles.message, 'flex justify-end')}>
                        <img key={`fi-${index}`} alt={message.file[0].name} src={message.file[0].src} className="rounded-lg object-cover w-52" loading="lazy" />
                      </div>
                    ) : <></>
                  }
                  {
                    message.previewUrl ? (
                      <div key={`pu-${index}`} className={clsx(styles.message, 'flex justify-end')}>
                        <a href={message.content} target="_blank" rel="noopener noreferrer"
                          className={clsx('max-w-[280px] md:max-w-md xl:max-w-xs bg-neutral-0 text-neutral-800 rounded-xl text-sm')}
                          style={{ overflowWrap: 'break-word' }}>
                          <img className='rounded-t-xl w-full h-48' src={message.previewUrl.image} alt={message.previewUrl.title} />
                          <div className='px-4 py-3'>
                            <div className='text-red-500 font-bold'>{message.previewUrl.title}</div>
                            <div>{message.content}</div>
                          </div>
                        </a>
                      </div>
                    ) : <></>
                  }
                </div>
              );
            } else {
              return (
                <div key={`bot-${index}`}>
                  {(index === 0 || (messages.length >= 2 && messages[index - 1] && messages[index - 1].sender !== message.sender)) &&
                    <div key={`time-${index}`} className="text-left text-neutral-500 text-xs mb-2">
                      {message.sender} đã trả lời lúc {formatFullTime(props.startTime, true)}
                    </div>
                  }
                  <div key={`botmsg-${index}`}>
                    {
                      !message.file && !message.previewUrl && message.content ? (
                        <div key={`mw-${index}`} className={clsx(styles.message, 'flex justify-start')}>
                          <div key={`mc-${index}`} className={clsx(styles.content, 'max-w-[280px] md:max-w-md xl:max-w-xs bg-neutral-0 text-neutral-800 rounded-tl-xl rounded-r-xl')}>{message.content}</div>
                        </div>
                      ) : <></>
                    }
                    {
                      message.file ? (
                        <div key={`f-${index}`} className={clsx(styles.message, 'flex justify-start')}>
                          <img key={`fi-${index}`} alt={message.file[0].name} src={message.file[0].src} className="rounded-lg object-cover w-52" loading="lazy" />
                        </div>
                      ) : <></>
                    }
                    {
                      message.image ? (
                        <div key={`i-${index}`} className={clsx(styles.message, 'flex justify-start')}>
                          <img draggable={false} className='rounded-lg object-cover w-52 md:w-[440px]' src={message.image} alt="" />
                        </div>
                      ) : <></>
                    }
                    {
                      message.previewUrl ? (
                        <div key={`pu-${index}`} className={clsx(styles.message, 'flex justify-start')}>
                          <a href={message.content} target="_blank" rel="noopener noreferrer"
                            className={clsx('max-w-[240px] md:max-w-md xl:max-w-xs bg-neutral-0 text-neutral-800 rounded-xl text-sm')}
                            style={{ overflowWrap: 'break-word' }}>
                            <img className='rounded-t-xl w-full h-48' src={message.previewUrl.image} alt={message.previewUrl.title} />
                            <div className='px-4 py-3'>
                              <div className='text-red-500 font-bold'>{message.previewUrl.title}</div>
                              <div>{message.content}</div>
                            </div>
                          </a>
                        </div>
                      ) : <></>
                    }
                    {
                      message.isHasCarosel ? (
                        <div key={`c-${index}`} className={clsx(styles.message, 'w-[110%] relative overflow-hidden')}>
                          <ChatBoxCarousel items={quickMessageCarousel}></ChatBoxCarousel>
                        </div>
                      ) : <></>
                    }
                    {
                      message.action ? (
                        <div key={`aw-${index}`}>
                          {
                            message.action.map((item, i) => (
                              <div key={`a-${i}`} className={clsx(styles.message, 'flex justify-start')}>
                                {
                                  item.isDatePicker && !item.isRating ?
                                    <Popover key={`datepicker-${i}`} className={'relative'}>
                                      <Popover.Button className="relative flex w-full text-left"
                                        onClick={(e) => {
                                          withMobile(() => {
                                            toggleModalDatePicker({ defaultValue: selectedDate, title: 'Chọn ngày sinh' }).then((v) => {
                                              if (v) {
                                                setSelectedDate(v.toString());
                                                handleConfirmDateChange(item, v);
                                              }
                                            });
                                          })(e);
                                          withoutMobile(() => {
                                            setIsPopoverOpen(true);
                                          })();
                                        }}
                                        onMouseDown={withMobile((e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                        })}>
                                        <div className="btn-secondary btn btn-sm flex-1 rounded-full" data-theme="light">
                                          <Svg src="/icons/line/calendar.svg" width={24} height={24} style={{ marginRight: '10px', }} />
                                          {item.title}
                                        </div>
                                      </Popover.Button>
                                      <Popover.Panel className={clsx(!isPopoverOpen ? 'hidden' : 'block z-50', isPopoverOpen && !isPC ? 'absolute bottom-[3rem]' : 'fixed bottom-3')}>
                                        <div className="bg-neutral-0 flex flex-col items-center rounded-2xl shadow-itel p-4">
                                          <InputDate.Wrapper>
                                            <InputDate
                                              className="input input-bordered w-full input-trailing-icon mb-2"
                                              placeholder="dd/mm/yyyy"
                                              value={selectedDate}
                                              onChange={(d) => setSelectedDate(d?.toString()!)}
                                            />
                                            <DatePicker value={selectedDate} onChange={(date) => setSelectedDate(date.toString())} />
                                            <button className="w-32 btn-primary btn btn-sm rounded-full my-2" onClick={() => handleConfirmDateChange(item)}>
                                              Xong
                                            </button>
                                          </InputDate.Wrapper>
                                        </div>
                                      </Popover.Panel>
                                    </Popover>
                                    :
                                    <></>
                                }
                                {
                                  item.isRating && !item.isDatePicker ?
                                    <div key={`rating-${index}`} className={clsx(styles.message, 'flex justify-start')}>
                                      <div className={clsx(styles.content, 'max-w-[312px] md:max-w-md xl:max-w-xs bg-neutral-0 text-neutral-800 rounded-xl')}>
                                        <StarRating maxRating={7} rating={rating} onRate={(newRate) => setRating(newRate)} />
                                        <button className="max-w-fit btn-primary btn btn-sm flex-1 rounded-full my-2" onClick={() => handleChooseRate(item)}>
                                          Gửi đánh giá
                                        </button>
                                      </div>
                                    </div>
                                    :
                                    <></>
                                }
                                {
                                  !item.isDatePicker && !item.isRating ?
                                    <button key={`normal-${i}`} className="max-w-fit btn-secondary btn btn-sm flex-1 rounded-full" data-theme="light" onClick={() => handleQuickMessageButtonClick(item)}>
                                      {item.title}
                                    </button>
                                    : <></>
                                }
                              </div>
                            ))
                          }
                        </div>
                      ) : <></>
                    }
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className={clsx(!isDragOver ? 'hidden' : 'opacity-70', 'flex items-center justify-center w-full absolute top-0 bottom-0')}>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-full bg-neutral-500"
          >
            <div className="flex flex-col items-center justify-center p-8 text-neutral-0">
              <Svg className="w-10 h-10 mb-2" src={'/icons/line/plus.svg'} />
              <h4 className="text-lg">
                Thả tệp vào đây
              </h4>
            </div>
          </label>
        </div>
      </div>
      <div className='flex items-center p-4 gap-2 bg-neutral-100 transition-default relative'>
        <div className={clsx('transition-default relative flex items-center flex-grow')}>
          <button onClick={() => setQuickMenuVisible(!isQuickMenuVisible)} className={clsx('btn-tertiary btn btn-xs btn-circle text-red-500 hover:text-red-600 transition-default absolute left-0', !chatValue ? 'scale-100' : 'scale-0 opacity-0')}>
            <Svg src="/icons/line/menu.svg" className="inline h-5 w-5" />
          </button>
          {/* menu */}
          <div className={clsx(isQuickMenuVisible ? 'block' : 'hidden', 'transition-default pointer-events-auto absolute left-0 bottom-14 w-max max-w-md rounded-xl shadow-itel z-30')}>
            <ul className="menu w-full rounded-[1.25rem] bg-base-100 p-2">
              {QUICK_MENUS.map((item) => {
                return (
                  <li key={item.key}>
                    <button onClick={() => handleQuickMenuClick(item)} className={clsx('btn-tertiary btn btn-md border-none justify-start bg-neutral-0 hover:bg-neutral-100 transition-default')}>
                      {item.content}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          {/* menu end */}
          <button onClick={handleSelectFile} className={clsx('btn-tertiary btn btn-xs btn-circle text-red-500 hover:text-red-600 transition-default absolute left-7 md:left-11', !chatValue ? 'scale-100' : 'scale-0 opacity-0')}>
            <Svg src="/icons/bold/image.svg" className="inline h-5 w-5" />
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileInputFileChange} className='hidden' />
          <button onClick={handleSelectFile} className={clsx('btn-tertiary btn btn-xs btn-circle text-red-500 hover:text-red-600 transition-default absolute left-14 md:left-[5.5rem]', !chatValue ? 'scale-100' : 'scale-0 opacity-0')}>
            <Svg src="/icons/line/clips.svg" className="inline h-5 w-5" />
          </button>
          <div className={clsx(styles.input, 'bg-neutral-0 h-12 transition-default flex items-center relative', !chatValue ? 'ml-24 md:ml-36' : 'ml-0')}>
            <input
              type="text"
              placeholder="Nhắn tin..."
              value={chatValue}
              onChange={(e) => setChatValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              className={clsx('text-sm bg-neutral-0 h-8 outline-none flex-1')}
            />
            <button onClick={() => setPickerVisible(!isPickerVisible)} className={clsx('btn-tertiary btn btn-xs btn-circle bg-neutral-0 border-none text-red-500 hover:text-red-600 transition-default')}>
              <Svg src="/icons/bold/smile-face.svg" className="inline h-6 w-6" />
            </button>
          </div>
          <div className={clsx(isPickerVisible ? 'block' : 'hidden', 'absolute right-0 bottom-14')}>
            <Picker data={data} previosPosition="none" onEmojiSelect={(e: any) => handleEmojiSelect(e)} emojiButtonSize={32} emojiSize={18} />
          </div>
        </div>
        <button onClick={() => sendMessage()} className={clsx(!chatValue ? 'hidden' : 'btn-tertiary btn btn-sm btn-circle text-neutral-0 hover:text-neutral-0 bg-red-500 hover:bg-red-600')}>
          <Svg src="/icons/bold/send.svg" className="inline h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBoxStart;
