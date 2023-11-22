import dynamic from 'next/dynamic';

// import ChatBoxLazy from './chat-box'

const ChatBoxLazy = dynamic(() => import('./chat-box'), { ssr: false });

export default ChatBoxLazy;
