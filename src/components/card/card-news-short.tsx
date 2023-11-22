import { Data, Model } from '@/types/model';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import PopupViewNewsShort from '../shorts/PopupViewNewsShort';

type PropsNewsCardShort = {
  short: Model.Short;
  shorts?: Data.Shorts;
  isHasInfo?: boolean;
  showPopup?: boolean;
  autoShowPopup?: boolean;
  handleClose?: () => void;
  className?: string;
};
const NewsCardShort = ({
  short,
  shorts,
  isHasInfo,
  showPopup = true,
  className = '',
  autoShowPopup = false,
  handleClose = () => {}
}: PropsNewsCardShort) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    setOpen(autoShowPopup);
  }, [autoShowPopup]);

  return (
    <>
      <div className={clsx('flex gap-6 items-center ', className ? className : 'w-36 md:w-auto')}>
        <figure
          onClick={() => {
            showPopup && handleOpen();
          }}
          key={short.id}
          className={clsx(
            isHasInfo && 'h-24 rounded-lg',
            'group aspect-photo-vertical cursor-pointer overflow-hidden md:rounded-2xl rounded-lg'
          )}
        >
          <img
            src={short.thumbnail}
            alt="promotion image"
            className="transition-default h-full w-full object-cover group-hover:scale-110"
          />
        </figure>
        {isHasInfo && (
          <div className="flex flex-col gap-1">
            <h1 className="text-base text-neutral-0">{short.title}</h1>
            <p className="text-neutral-400">Vui nhộn, Hài hước</p>
            <p className="text-neutral-400">Shorts - 17/3/2023</p>
          </div>
        )}
      </div>
      {!isHasInfo && shorts && (
        <PopupViewNewsShort
          data={{ short, shorts }}
          open={open}
          setOpen={setOpen}
          handleClose={() => {
            setOpen(false);
            handleClose();
          }}
        />
      )}
    </>
  );
};

export default NewsCardShort;
