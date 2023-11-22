import { modal, useModal } from '@/libs/modal';
import film from '@/mock/film.json';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import ButtonAdd from '../button/button-add';
import ButtonFavorite from '../button/button-favorite';
import ButtonShare from '../button/button-share';
import { CardFilmItem, FilmChapter } from '../card/card-film';
import CardFilmGrid from '../card/card-film-grid';
import HeaderAppDefault from '../header/header-app-default';
import Svg from '../icon/svg';
import FilmProgerssBar from '../progress/film-progress-bar';
import WidgetScroll from '../scroll/widget-scroll';
import Tab from '../tabs/tabs';
import FilmVideo from '../video/film-video';
import SectionFilmList from './section-film-list';

export type SectionFilmSeriesDetailProps = {
  filmDetail: CardFilmItem;
};

const tabs = [
  { id: 1, label: 'Các tập' },
  { id: 2, label: 'Phim tương tự' },
  { id: 3, label: 'Trailer & nội dung khác' }
];

const SectionFilmSeriesDetail = ({ filmDetail }: SectionFilmSeriesDetailProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [data, setData] = useState<CardFilmItem[]>([]);
  const [filmChapter, setFilmChapter] = useState<FilmChapter[]>([]);
  const [tabId, setTabId] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { close } = useModal();

  useEffect(() => {
    if (tabId === 2) {
      setData(getMultipleRandom(film, 6));
    } else if (tabId === 3) {
      setData(getMultipleRandom(film, 1));
    } else if (tabId === 1 && filmDetail.child) {
      setFilmChapter(filmDetail.child);
    }
  }, [filmDetail.child, tabId]);

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

  const handleClickAddButton = () => {
    setIsAdded(!isAdded);
    toast.success(!isAdded ? 'Đã thêm vào danh sách phim của tôi' : 'Đã bỏ khỏi danh sách phim của tôi', {
      style: { backgroundColor: '#FFFFFF', color: '#181818' }
    });
  };

  const handleClickFavoriteButton = () => {
    setIsFavorite(!isFavorite);
    toast.success(!isFavorite ? 'Đã thêm vào danh sách yêu thích' : 'Đã xóa khỏi danh sách yêu thích', {
      style: { backgroundColor: '#FFFFFF', color: '#181818' }
    });
  };

  return (
    <div className="bg-neutral-800 pb-12">
      <HeaderAppDefault title="Thông tin phim" theme="dark" mode="close" type="fixed" />
      <div className="w-full md:flex justify-end xl:px-4 md:px-2 z-10 sticky top-0 hidden">
        <button className="btn-tertiary btn-circle btn btn-md bg-neutral-600 border-none mt-4 hover:bg-neutral-700" onClick={close}>
          <Svg src="/icons/line/close.svg" width={24} height={24} className="text-neutral-0" />
        </button>
      </div>
      <div className="md:container">
        <div
          className="aspect-video w-full bg-center bg-cover md:rounded-2xl md:px-12 md:py-10 px-4 py-5 flex flex-col justify-end relative"
          style={{ backgroundImage: `url(${filmDetail.img})` }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="flex justify-start items-end md:items-start gap-2">
                <Svg src="/logo/logo-color.svg" width={60} height={24} className=" text-neutral-0" />
                <p className="md:text-xl text-sm font-medium text-neutral-0">PHIM BỘ</p>
              </div>
              <Svg src="/images/film-name.svg" className="inline md:w-[22rem] md:h-[4.5rem] w-[9.75rem] h-8" />
            </div>
            <div className="md:w-[19rem] w-full">
              <FilmProgerssBar timeWatched={filmDetail.viewTime} totalTime={filmDetail.time} displayDetail />
            </div>
            <div className="md:flex justify-start items-center gap-4 relative hidden">
              <button className="btn btn-lg rounded-full btn-primary" data-theme="dark" onClick={handlePlayVideo}>
                <Svg src="/icons/bold/play.svg" className="w-6 h-6 inline mr-1" />
                <p className="text-base font-bold">Tiếp tục xem</p>
              </button>
              <ButtonAdd isAdd={isAdded} onClick={handleClickAddButton} />
              <ButtonFavorite isFavorite={isFavorite} onClick={handleClickFavoriteButton} />
              <ButtonShare />
            </div>
          </div>
        </div>
        <div className="px-4 md:px-0">
          <div className="grid grid-cols-1 xl:grid-cols-2 md:mt-12 mt-4 gap-12">
            <div className="flex flex-col gap-4 md:gap-0">
              <div className="flex justify-between items-start">
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm font-medium text-neutral-0">{filmDetail.year}</p>
                  <div className="border border-neutral-0 px-1 rounded">
                    <p className="text-sm font-medium text-neutral-0">18+</p>
                  </div>
                  <p className="text-sm font-medium text-neutral-0">{filmDetail.chap} tập</p>
                  <div className="border border-neutral-0 px-1 rounded">
                    <p className="text-sm font-medium text-neutral-0">HD</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden justify-start items-center gap-2 flex">
                <button className="btn md:btn-lg btn-sm rounded-full btn-primary flex-1" data-theme="dark" onClick={handlePlayVideo}>
                  <Svg src="/icons/bold/play.svg" className="w-6 h-6 inline mr-1" />
                  <p className="md:text-base text-sm font-bold whitespace-nowrap">Tiếp tục xem</p>
                </button>
                <div className="flex justify-between items-center gap-2">
                  <ButtonAdd isAdd={isAdded} onClick={handleClickAddButton} />
                  <ButtonFavorite isFavorite={isFavorite} onClick={handleClickFavoriteButton} />
                  <ButtonShare />
                </div>
              </div>
              <div className="flex flex-col md:gap-8 gap-4 md:mt-10">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-start items-center gap-1">
                    <p className="md:text-xl text-base font-medium text-neutral-200">Giới thiệu về</p>
                    <p className="md:text-xl text-base font-bold text-neutral-0">{filmDetail.name}</p>
                  </div>
                  <p className="md:text-base text-sm text-neutral-0 font-normal">
                    Vương hậu đã bị giết hại: Với Ae Sin, lời nói không hề có tác dụng trước sức mạnh tàn bạp của ngoại bang, thay vào đó
                    nàng chọn vũ khí. Eugene nhận vị trí đóng quân mới.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="md:text-base text-sm text-neutral-0 font-medium">
                    <span className="text-neutral-400">Diễn viên:</span> Lee Byung-hun, Kim Tae Ri, Yoo Yeon Seok, Byun Yo Han, Kim Min
                    Joung, Kim Gap Soo, Choi Mu Sung, Kim Eui Sung, David Lee Mclnnis, Kim Byoung Chul, Lee Seung Jun, Kang Shin Il, Jo Woo
                    Jin, Lee Ho Jae
                  </p>
                  <p className="md:text-base text-sm text-neutral-0 font-medium">
                    <span className="text-neutral-400">Thể loại:</span> Hàn Quốc, Phim truyền hình chính kịch lãng mạn, Chương trình truyền
                    hình về chính trị, Thời kỳ lịch sử, Phim truyền hình chính kịch
                  </p>
                  <p className="md:text-base text-sm text-neutral-0 font-medium">
                    <span className="text-neutral-400">Chương trình này:</span> Ngọt ngào cay đắng, Xúc động, Lý thú
                  </p>
                </div>
              </div>
            </div>
            {filmDetail.isSeriesMovie && (
              <div className="md:flex flex-col px-4 hidden">
                <p className="text-lg font-bold text-neutral-0 whitespace-nowrap">
                  Tập (25/<span className="text-neutral-400">30</span>)
                </p>
                <div className="h-[37.5rem]">
                  <WidgetScroll>
                    {filmDetail.child &&
                      filmDetail.child.map((item, index) => (
                        <div className="flex justify-between items-center py-6 border-b border-b-neutral-600" key={item.id}>
                          <div className="px-4 flex justify-between items-center gap-10">
                            <div className="flex justify-start items-center gap-6">
                              <p className="font-itel text-neutral-400 font-bold text-h3">{index + 1}</p>
                              <img src={item.image} alt="img" className="aspect-video w-36 rounded" />
                              <div className="flex flex-col gap-2">
                                <p className="text-base text-neutral-0 font-bold">Tập {item.chap}</p>
                                <p className="text-neutral-400 font-normal text-sm line-clamp-2">{item.description}</p>
                              </div>
                            </div>
                            <p className="text-sm font-bold text-neutral-200">{item.length}p</p>
                          </div>
                        </div>
                      ))}
                  </WidgetScroll>
                </div>
              </div>
            )}
          </div>
          <div className="mt-12 md:block hidden">
            <SectionFilmList label="Phim tương tự" filmData={getMultipleRandom(film, 12)} isDisplayButtonFilter={false} />
            <div className="flex justify-center items-center w-full mt-4">
              <button className="btn btn-lg btn-ghost gap-2 rounded-full" data-theme="dark">
                <p className="text-base font-semibold text-neutral-0">Xem thêm</p>
                <Svg src="/icons/line/chevron-down.svg" className={clsx('inline h-6 w-6 text-neutral-0')} />
              </button>
            </div>
          </div>
          <div className="mt-12 md:block hidden">
            <SectionFilmList label="Trailer & Nội dung khác" filmData={getMultipleRandom(film, 1)} isDisplayButtonFilter={false} />
          </div>
          <div className="flex justify-start items-center border-b border-b-neutral-600 mt-4 overflow-auto scrollbar-hide md:hidden">
            {tabs.map((item) => (
              <Tab
                key={item.id}
                label={item.label}
                size="small"
                onClick={() => setTabId(item.id)}
                isActive={item.id === tabId}
                className={`${item.id === tabId ? 'text-neutral-0' : ''}`}
              />
            ))}
          </div>
          <div className="mt-4 md:hidden">
            {tabId === 1 && (
              <div className="h-[37.5rem]">
                <WidgetScroll>
                  {filmDetail.isSeriesMovie && (
                    <div className="flex flex-col md:hidden">
                      <p className="text-lg font-bold text-neutral-0 whitespace-nowrap">
                        Tập (25/<span className="text-neutral-400">30</span>)
                      </p>
                      {filmChapter.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-3 py-3 border-b border-b-neutral-600">
                          <div className="flex justify-between items-center">
                            <div className="flex justify-between items-center gap-5">
                              <div className="flex justify-start items-center gap-3">
                                <img src={item.image} alt="img" className="aspect-video w-29 rounded" />
                                <p className="text-base font-medium text-neutral-0">{index + 1}. Vị trí của một người trên thế giới</p>
                              </div>
                              <p className="text-sm font-bold text-neutral-200">{item.length}p</p>
                            </div>
                          </div>
                          <p className="text-neutral-400 font-normal text-sm line-clamp-2">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </WidgetScroll>
              </div>
            )}
            {tabId === 2 && (
              <div className="grid grid-cols-2 gap-3">
                {data.map((item) => (
                  <CardFilmGrid key={item.id} cardFilm={item} />
                ))}
              </div>
            )}
            {tabId === 3 && (
              <div className="grid grid-cols-2 gap-3">
                {data.map((item) => (
                  <CardFilmGrid key={item.id} cardFilm={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFilmSeriesDetail;
