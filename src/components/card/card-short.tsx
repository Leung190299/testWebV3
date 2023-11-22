import { Data, Model } from '@/types/model';
import PopupViewShort from '../shorts/PopupViewShort';
import { useState } from 'react';
import clsx from 'clsx';

type PropsCardShort = {
  short: Model.Short;
  shorts?: Data.Shorts;
  isHasInfo?: boolean;
  showPopup?: boolean;
};
const CardShort = ({ short, shorts, isHasInfo, showPopup = true }: PropsCardShort) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <div className="flex gap-6 items-center w-36 md:w-auto">
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
      {!isHasInfo && shorts && <PopupViewShort data={{ short, shorts }} open={open} setOpen={setOpen} handleClose={() => setOpen(false)} />}
    </>
  );
};

export default CardShort;
