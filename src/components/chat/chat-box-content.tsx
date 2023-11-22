/* eslint-disable react-hooks/rules-of-hooks */
import { Logger } from '@/utilities/logger';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Svg from '../icon/svg';

enum MessageFrom {
    me,
    itel
}

enum MessageType {
    default,
    link,
    image,
    option,
    date,
    sim,
    rate
}

type ChatMessage = {
    from: MessageFrom;
    time: string;
    contents: string[];
    type: MessageType;
    data: any;
    name?: string;
}

type Props = {
    name: string;
    phone: string;
    chatContent?: ChatMessage[];
};

const ChatMessage = ({chat} : {chat: ChatMessage}) => {
  if (chat.from === MessageFrom.me) {
    return (
      <div className={`w-full flex items-end flex-col`}>
        {
          chat.contents.map((content, id) => {
            return (
              <div className="bg-red-500 px-4 py-3 rounded-t-2xl rounded-bl-2xl text-neutral-0 max-w-[75%] mt-2 break-all" key={id}>
                {content}
              </div>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <div className={`w-full flex items-start flex-col`}>
        <div className="text-neutral-500 text-xs pl-1">{chat?.name} đã trả lời lúc {chat.time}</div>
        {
          chat.contents.map((content, id) => {
            return (
              <div className="bg-neutral-0 px-4 py-3 rounded-t-2xl rounded-br-2xl max-w-[75%] mt-2 break-all" key={id}>
                {content}
              </div>
            )
          })
        }
      </div>
    )
  }

  return <></>
}

const ChatBoxContent = ({name, phone, chatContent}: Props) => {
  const [showChat, setShowChat] = useState(false);

  const demoChatContent:ChatMessage[] = [
    {
      "from": MessageFrom.me,
      "time": "10:00 10/06/2023",
      "contents": ["lslslslsl", "lslsls"],
      "type": MessageType.default,
      "data": [],
    },
    {
      "from": MessageFrom.itel,
      "time": "10:00 10/06/2023",
      "contents": ["lslslslsl", "lslslslslslslslslslslslslslslslslslslslslslslslslslslslslslslslsls"],
      "type": MessageType.default,
      "data": [],
      "name": "iTel hỗ trợ"
    },
    {
      "from": MessageFrom.me,
      "time": "10:00 10/06/2023",
      "contents": ["lslslslsl", "lslsls"],
      "type": MessageType.default,
      "data": [],
    },
    {
      "from": MessageFrom.itel,
      "time": "10:00 10/06/2023",
      "contents": ["lslslslsl", "lslslslslslslslslslslslslslslslslslslslslslslslslslslslslslslslsls"],
      "type": MessageType.default,
      "data": [],
      "name": "iTel hỗ trợ"
    },
    {
      "from": MessageFrom.itel,
      "time": "10:00 10/06/2023",
      "contents": ["lslslslsl", "lslslslslslslslslslslslslslslslslslslslslslslslslslslslslslslslsls"],
      "type": MessageType.default,
      "data": [],
      "name": "iTel hỗ trợ"
    },
  ]

  if (!chatContent) chatContent = demoChatContent;

  return (
    <div id="__chatbox">
      <div className="fixed bottom-0 right-6 z-20 flex items-end flex-col w-[428px]">
        <div className="flex bg-neutral-0 py-3 px-5 rounded-t-2xl items-center justify-between w-full">
            <div className="flex">
                <div className={`w-12 h-12 flex overflow-hidden justify-center items-center bg-neutral-800 rounded-full`}>
                    <img src="/images/chat-icon.png" alt="Chat icon" className="w-12" />
                </div>
                <div className="ml-2">
                    <div className="font-semibold">{name}</div>
                    <div className="text-neutral-500">{phone}</div>
                </div>
            </div>
            <div
                className="bg-neutral-200 h-8 w-12 flex items-center justify-center rounded-full hover:bg-neutral-300 cursor-pointer transition-all"
                onClick={() => setShowChat(!showChat)}
            >
                <Svg src="/icons/line/chevron-down.svg" className={`inline w-6 h-6 transition-all text-neutral-800 ${!showChat && "rotate-180"}`} />
            </div>
        </div>
        <div className={`bg-neutral-100 ${showChat ? "h-[512px]" : "h-0"} overflow-hidden w-full transition-all`}>
            <div className="h-[432px] overflow-y-scroll overflow-x-hidden w-full px-5 pb-8">
              {
                  chatContent?.map((chat, id) => (
                    <div className="mt-6" key={id}>
                      <ChatMessage chat={chat} />
                    </div>
                  ))
              }
            </div>
            <div className="h-[80px] w-full px-4 flex items-center justify-between">
                <input type="text" placeholder="" className="peer w-[85%] h-[48px] bg-neutral-0 px-4 py-3 text-neutral-800 outline-none rounded-full" />
                <div className="h-[48px] w-[48px] bg-red-500 rounded-full flex justify-center items-center hover:bg-modern-red cursor-pointer transition-all">
                  <Svg src="/icons/bold/send.svg" className={`inline w-6 h-6 transition-all text-neutral-0`} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxContent;
