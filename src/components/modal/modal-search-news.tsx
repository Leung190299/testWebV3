import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  data: {
    id: number;
    name: string;
    href: string;
    category: string;
  }[];
};
const ModalSearchNews = ({ data }: Props) => {
  const { close } = useModal();
  const [query, setQuery] = useState('');

  const onClose = () => {
    close();
  };

  const filteredNews =
    query === ''
      ? []
      : data.filter((item) => {
          return item.name.toLowerCase().includes(query?.toLowerCase()) || item.category.toLowerCase().includes(query?.toLowerCase());
        });

  return (
    <form action="#" className="min-h-full bg-neutral-0">
      <nav className="bg-neutral-0 transition-default sticky w-full top-0 z-50 border-b border-neutral-200">
        <div className="container">
          <div className="relative flex items-center gap-2 h-16">
            <div className="absolute left-0">
              <button type="button" className="btn-ghost btn btn-sm btn-circle" onClick={onClose}>
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            </div>
            <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden">
              <h1 className="truncate max-w-xs">Tìm kiếm</h1>
            </div>
          </div>
          <div className="input-leading-icon relative flex-1 flex mb-2 bg-neutral-100 rounded-lg">
            <input
              className="input text-sm py-2.5 border-none pl-11 outline-none bg-neutral-100 w-full"
              style={{ borderRadius: '0.5rem' }}
              type="text"
              autoFocus
              placeholder="Tìm kiếm tin tức, video"
              value={query}
              onTouchStart={(e) => e.stopPropagation()}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
            </div>
            {query && (
              <div className="w-16 flex justify-center items-center hover:cursor-pointer" onClick={() => setQuery('')}>
                <Svg src="/icons/line/close.svg" className="inline h-6 w-6" />
              </div>
            )}
          </div>
        </div>
      </nav>
      <main>
        <hr className="bg-neutral-100 h-2 border-transparent" />
        <div className="container py-4">
          {filteredNews.length > 0
            ? filteredNews.map((item) => (
                <Link key={item.id} href={item.href} onClick={onClose}>
                  <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg">
                    <strong>[{item.category}]</strong> {item.name}
                  </div>
                </Link>
              ))
            : query && <div className="hover:bg-neutral-100 hover:cursor-pointer p-4 rounded-lg truncate">Không tìm thấy !</div>}
        </div>
      </main>
    </form>
  );
};

export default ModalSearchNews;
