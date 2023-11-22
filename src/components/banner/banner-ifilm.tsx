import { useRef, useState } from 'react';
import Svg from '../icon/svg';
import FilmVideo from '../video/film-video';
import { modal, useModal } from '@/libs/modal';
import modalFilm from '../modal/modal-film';

const defaultData = {
  id: 1,
  img: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png',
  name: 'Chiếc bật lửa và váy công chúa',
  nation: 'Trung Quốc',
  time: 150,
  category: 'Lãng mạn',
  year: '2022',
  isSeriesMovie: true,
  viewTime: 50,
  chap: '24',
  newChapter: false,
  child: [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png',
      chap: '1',
      length: 72,
      description:
        'Vương hậu đã bị giết hại: Với Ae Sin, lời nói không hề có tác dụng trước sức mạnh tàn bạo của ngoại bang, thay vào đó nàng chọn vũ khí. Eugene nhận vị trí đóng quân mới.'
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png',
      chap: '2',
      length: 72,
      description:
        'Vương hậu đã bị giết hại: Với Ae Sin, lời nói không hề có tác dụng trước sức mạnh tàn bạo của ngoại bang, thay vào đó nàng chọn vũ khí. Eugene nhận vị trí đóng quân mới.'
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png',
      chap: '3',
      length: 72,
      description:
        'Vương hậu đã bị giết hại: Với Ae Sin, lời nói không hề có tác dụng trước sức mạnh tàn bạo của ngoại bang, thay vào đó nàng chọn vũ khí. Eugene nhận vị trí đóng quân mới.'
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png',
      chap: '4',
      length: 72,
      description:
        'Vương hậu đã bị giết hại: Với Ae Sin, lời nói không hề có tác dụng trước sức mạnh tàn bạo của ngoại bang, thay vào đó nàng chọn vũ khí. Eugene nhận vị trí đóng quân mới.'
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png',
      chap: '5',
      length: 72,
      description:
        'Vương hậu đã bị giết hại: Với Ae Sin, lời nói không hề có tác dụng trước sức mạnh tàn bạo của ngoại bang, thay vào đó nàng chọn vũ khí. Eugene nhận vị trí đóng quân mới.'
    }
  ]
};

const handleModalFilmSeries = () => modalFilm({ filmDetail: defaultData });

type BannerIfilmProps = {
  name: string;
  description: string;
  chap: string;
  category: string;
  year: string;
  nation: string;
};

const BannerIfilm = ({ category, chap, description, name, nation, year }: BannerIfilmProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    modal.open({
      render: <FilmVideo videoRef={videoRef} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 md:bg-neutral-100',
      classNameContainer: 'modal-full',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });

    videoRef.current?.play();
  };

  const handleScroll = () => {
    const elements = document.getElementById('film-list');
    if (elements && elements.scrollIntoView) {
      elements.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  };

  return (
    <div className="xl:aspect-video md:aspect-tivi aspect-tivi-vertical w-full bg-center bg-cover bg-[url(https://res.cloudinary.com/dgkrchato/image/upload/v1685502837/itel-web/61e05e0abd264bc33ad3a1074f9e748b_qmq33d.png)] relative z-10">
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-900/[0.6] absolute top-0 bottom-0 xl:right-1/2 right-0 w-full opacity-20" />
      <div className="z-10 relative flex flex-col h-full xl:justify-start justify-end md:gap-12 gap-10 md:w-[86%] xl:w-2/5 xl:pt-[10%] md:py-14 md:px-10 px-4 py-6">
        <div className="flex flex-col gap-4">
          <img src={name} alt="film name" className="h-full xl:w-full md:w-4/5 w-full" />
          <div className="flex items-center justify-start gap-2 flex-wrap">
            <div className="flex items-center justify-start gap-2">
              <div className="w-1 h-1 bg-neutral-0 rounded-full block md:hidden" />
              <p className="md:text-base text-sm font-normal text-neutral-0">{chap} tập</p>
              <div className="w-1 h-1 bg-neutral-0 rounded-full" />
              <p className="md:text-base text-sm font-normal text-neutral-0">{nation}</p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="w-1 h-1 bg-neutral-0 rounded-full" />
              <p className="md:text-base text-sm font-normal text-neutral-0">{category}</p>
              <div className="w-1 h-1 bg-neutral-0 rounded-full" />
              <p className="md:text-base text-sm font-normal text-neutral-0">{year}</p>
            </div>
          </div>
          <p className="md:text-base text-sm font-medium text-neutral-0">{description}</p>
        </div>
        <div className="flex items-center justify-start gap-4">
          <button
            className="btn xl:btn-lg md:btn-md whitespace-nowrap rounded-full btn-primary"
            data-theme="dark"
            onClick={handlePlayVideo}
          >
            <Svg src="/icons/bold/play.svg" className="w-6 h-6 inline mr-1" />
            <p className="text-base font-bold">Xem phim</p>
          </button>
          <button
            className="btn xl:btn-lg md:btn-md whitespace-nowrap rounded-full btn-secondary text-base font-bold text-neutral-0 bg-transparent"
            data-theme="dark"
            onClick={handleModalFilmSeries}
          >
            Thông tin phim
          </button>
        </div>
        <div className="absolute bottom-[5%] left-16 xl:block hidden cursor-pointer hover:opacity-80" onClick={handleScroll}>
          <Svg src="/icons/line/arrow-down.svg" height={52} width={22} className="text-neutral-0" />
        </div>
      </div>
    </div>
  );
};

export default BannerIfilm;
