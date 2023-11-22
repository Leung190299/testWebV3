import type { CustomProps } from '@/types/element-type';
import type { Model } from '@/types/model';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { CSSProperties } from 'react';

type CommentProps = {
  userAvatar?: string;
  userName?: string;
  userRating: number;
  content?: string | null;

  createdAt: string;
  // updatedAt:string;

  attachments?: Model.AttachmentFile[];
};

const Comment = ({ userName, userAvatar, userRating, content, attachments, createdAt, ...rest }: CustomProps<CommentProps, 'section'>) => {
  const router = useRouter();
  return (
    <article {...rest}>
      <footer className="flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <img
              className="mr-3 h-12 w-12 overflow-hidden rounded-full bg-base-200 object-cover"
              loading="lazy"
              crossOrigin="anonymous"
              src={userAvatar}
              alt={userName}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2 text-sm">
              <p className="font-medium">{userName}</p>
              <hr className="h-4 border-r border-neutral-200"></hr>
              <p className="text-neutral-500">
                <time
                  dateTime={createdAt}
                  title={new Date(createdAt).toLocaleDateString(router.locale, { weekday: 'long', year: 'numeric', day: 'numeric' })}
                >
                  {dayjs(createdAt).format('DD.MM.YYYY')}
                </time>
              </p>
            </div>
            <div className="mt-1 flex text-yellow-500" data-rating={4}>
              {Array.from({ length: 5 }, (e, i) => (
                <i
                  key={i}
                  style={i > userRating - 1 ? ({ '--point': '0%' } as CSSProperties) : undefined}
                  className={clsx('icon-rating h-4 w-4', i > userRating - 1 ? 'bg-neutral-100' : 'bg-yellow-500')}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
      <div className="mt-2 md:mt-6 md:border-l border-neutral-300 md:pl-3">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{content}</p>
        <ul className="mt-3 gap-2 flex flex-wrap text-xs">
          <li>
            <span className="tag tag-secondary font-normal">Đúng mô tả</span>
          </li>
          <li>
            <span className="tag tag-secondary font-normal">Giá phải chăng</span>
          </li>
          <li>
            <span className="tag tag-secondary font-normal">Cấu hình mượt</span>
          </li>
        </ul>
      </div>
      {attachments ? (
        <div className="mt-3 md:mt-6 flex flex-wrap gap-3">
          {attachments.map(({ type, url }, i) =>
            type === 'img' ? (
              <div key={i} className="w-20">
                <div className="block-img block-square">
                  <img src={url} alt="asdfasdfjlk" className="rounded-xl object-cover" loading="lazy" />
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : null}
    </article>
  );
};

export default Comment;
