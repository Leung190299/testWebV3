import { NextPage } from 'next';
import { Logger } from '@/utilities/logger';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Head from 'next/head';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import LayoutIgame from '@/components/layout/layout-igame';
import { IGame } from '@/pages/igame/index';
import gameService, { IGameDetail } from '@/services/game/game';
import Routers from '@/routes';
import CardGame from '@/components/card/card-game';
import SectionIgame from '@/components/section/section-igame';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Menu } from '@headlessui/react';
import Svg from '@/components/icon/svg';
import DropdownShare from '@/components/dropdown/dropdown-share';
import { modal } from '@/libs/modal';
import ModalSharePost from '@/components/modal/modal-share-post';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Tab from '@/components/tabs/tabs';
import { copyTextToClipboard } from '@/utilities/copy';
import { useGlobalContext } from '@/context/global';
import useWindowDimensions from '@/hooks/useWindowDimention';
import HeaderWebDefault from '@/components/header/header-web-default';

type PageProps = {
  game: IGameDetail;
  similarGames: IGame[];
};

const IGameDetailPage: NextPage<PageProps> = ({ game, similarGames }) => {
  const { withAuth } = useGlobalContext();
  const { value: isLiked, toggle: toggleLike } = useBoolean(false);
  const href = typeof window !== 'undefined' ? window.location.href : '/';
  const { width } = useWindowDimensions();

  // useEffect(() => {
  //   if (isLiked) toast.success('Đã thêm vào danh sách yêu thích');
  // }, [isLiked]);

  const handleModalShare = useCallback(() => {
    modal.open({
      render(props) {
        return (
          <div className="container py-6" style={{ minHeight: '30vh' }}>
            <ModalSharePost href={href} onCopy={handleCopy} withLink itemImage={game.image} itemName={'Game'} itemDesc={game.name} />
          </div>
        );
      },
      closeButton: true,
      className: 'modal-box max-w-[35rem]'
    });
  }, [game]);

  function handleCopy() {
    copyTextToClipboard(href).then(() => toast.success('Đã sao chép'));
  }

  const handleShowBottomSheet = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    modal.open({
      render(props) {
        return (
          <div className="container py-1" style={{ minHeight: '30vh' }}>
            <ModalSharePost href={href} onCopy={handleCopy} withLink itemImage={game.image} itemName={'Game'} itemDesc={game.name} />
          </div>
        );
      },
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-bottom-sheet',
      classNameOverwrite: true,
      closeButton: false,
      transition: false
    });
  };

  const isPlayInWeb = game.playingPlatforms.includes('Website');
  const handlePlay = withAuth((gameId: string) => {
    window.open(Routers.IGAME_PLAY.replace('[id]', gameId));
  }, []);

  const tabs = [
    { id: 1, label: 'Thông tin chung' },
    { id: 2, label: 'Thông tin tích điểm' }
  ];
  const [tabId, setTabId] = useState<number>(1);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isShowSticky = useMemo(() => {
    if (!!width && width > 760) {
      return scrollPosition > 800 && scrollPosition < 1200;
    } else if (!!width && width > 0 && width <= 760) {
      return scrollPosition > 520 && scrollPosition < 780;
    }
  }, [width, scrollPosition]);

  return (
    <div className="max-md:bg-neutral-0">
      <HeaderWebDefault title="Chi tiết game" withSearch withMenu />
      <Head>
        <title>{`IGame - ${game.name}`}</title>
      </Head>
      {isShowSticky ? (
        <div className="fixed z-50 bottom-0 xl:hidden justify-between max-md:gap-3 flex max-md:flex-col py-4 w-screen px-4 md:px-6 bg-neutral-0 border-t-[1px] border-neutral-200">
          <div className="flex flex-col w-1/2 max-md:w-full">
            <p className="text-neutral-500 text-sm">Game</p>
            <p className="text-xl font-bold line-clamp-1">Game {game.name}</p>
          </div>
          <div className="flex gap-2 w-1/2 max-md:w-full">
            <button type="button" className={`w-1/2 btn btn-lg rounded-full ${!isPlayInWeb ? 'btn-primary w-full' : 'btn-secondary'}`}>
              Chơi trên app
            </button>
            {isPlayInWeb && (
              <button type="button" onClick={() => handlePlay(game.id)} className="btn-primary btn btn-lg rounded-full w-1/2">
                Chơi ngay
              </button>
            )}
          </div>
        </div>
      ) : null}
      <div className={isShowSticky ? 'hidden' : undefined}>
        <ChatBoxLazy />
      </div>
      <section>
        <div className="container py-10 xl:pr-10 py-4 md:py-10 xl:py-20 flex flex-col xl:flex-row w-full gap-10">
          <div className="game-info w-full xl:w-2/3">
            <img
              src={game.image}
              alt={game.name}
              className={`mb-5 md:mb-6 rounded-2xl w-full transition-default object-cover group-hover:scale-110 `}
            />
            <div className="game-social-card-tablet xl:hidden">
              <div className="flex justify-between mb-2 md:mb-3">
                <h2 className="flex-1 font-itel md:text-h4 font-bold text-xl xl:text-h3">{game.name}</h2>
                <div className="relative space-x-3">
                  <button
                    type="button"
                    className="transition-default max-md:hidden md:btn-tertiary md:btn md:btn-circle"
                    onClick={handleModalShare}
                  >
                    <Svg src="/icons/bold/share.svg" width={24} height={24} />
                  </button>
                  <button
                    type="button"
                    className="transition-default md:hidden md:btn-tertiary md:btn md:btn-circle"
                    onClick={() => {
                      if (!isLiked) toast.success('Đã thêm vào danh sách yêu thích');
                      else toast.success('Đã bỏ khỏi danh sách yêu thích của tôi');
                      toggleLike();
                    }}
                  >
                    {isLiked ? (
                      <Svg className="text-red-500 font-bold" src="/icons/others/heart.svg" width={24} height={24} />
                    ) : (
                      <Svg src="/icons/bold/heart-outline.svg" className={'font-bold'} width={24} height={24} />
                    )}
                  </button>
                  <button
                    type="button"
                    className="transition-default md:hidden md:btn-tertiary md:btn md:btn-circle"
                    onClick={handleShowBottomSheet}
                  >
                    <Svg src="/icons/bold/share.svg" width={24} height={24} />
                  </button>
                  <button
                    type="button"
                    className="transition-default max-md:hidden md:btn-tertiary md:btn md:btn-circle"
                    onClick={() => {
                      if (!isLiked) toast.success('Đã thêm vào danh sách yêu thích');
                      else toast.success('Đã bỏ khỏi danh sách yêu thích của tôi');
                      toggleLike();
                    }}
                  >
                    {isLiked ? (
                      <Svg className="text-red-500 font-bold" src="/icons/others/heart.svg" width={24} height={24} />
                    ) : (
                      <Svg src="/icons/bold/heart-outline.svg" className={'font-bold'} width={24} height={24} />
                    )}
                  </button>
                </div>
              </div>
              <div className="card-tags mb-4">
                {game.categories.map((cate) => (
                  <span key={cate} className="tag tag-primary text-xs md:text-base py-1.5 px-3 h-auto">
                    {cate}
                  </span>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-base mb-2 text-neutral-500">Nền tảng chơi</p>
                <span className="font-bold text-xl">
                  {game.playingPlatforms.length > 0 ? game.playingPlatforms.join(' và ') : game.playingPlatforms[0]}
                </span>
              </div>
              <div className="flex flex-row gap-4 mb-6">
                <button
                  type="button"
                  className={`w-1/2 btn btn-lg rounded-full ${!isPlayInWeb ? 'btn-primary w-full md:w-1/2' : 'btn-secondary'}`}
                >
                  Chơi trên app
                </button>
                {isPlayInWeb && (
                  // <Link className="w-1/2" href={{ pathname: Routers.IGAME_PLAY, query: { id: game.id } }} target="_blank">
                  <button type="button" onClick={() => handlePlay(game.id)} className="btn-primary btn btn-lg rounded-full w-1/2">
                    Chơi ngay
                  </button>
                  // </Link>
                )}
              </div>
              <div className="bg-neutral-200 h-[1px] mb-6"></div>
            </div>
            <div className="game-description max-md:hidden">
              <h5 className="font-bold xl:text-xl mb-4">Thông tin chung</h5>
              <p className="md:text-base mb-4">{game.generalInfo}</p>
              <h5 className="font-bold xl:text-xl mb-4">Thông tin tích điểm</h5>
              <h6 className="font-bold mb-4">Tích điểm</h6>
              <p className="md:text-base mb-4">{game.pointsInfo.pointInfo}</p>
              <h6 className="font-bold mb-4">Điều kiện, thể lệ:</h6>
              <p className="md:text-base mb-4">{game.pointsInfo.rulesAndConditions}</p>
            </div>
            <div className="md:hidden">
              <div className="flex items-center justify-start md:hidden mt-4 border-b border-neutral-100 mb-4">
                {tabs.map((tab) => (
                  <Tab
                    className="w-1/2"
                    key={tab.id}
                    label={tab.label}
                    onClick={() => setTabId(tab.id)}
                    isActive={tabId === tab.id}
                    size="large"
                  />
                ))}
              </div>
              <div className={`${tabId === 1 ? '' : 'hidden'} transition-all duration-500`}>
                <p className="md:text-base mb-4">{game.generalInfo}</p>
              </div>
              <div className={`${tabId === 2 ? '' : 'hidden'} transition-all duration-500`}>
                <h6 className="font-bold mb-4">Tích điểm</h6>
                <p className="md:text-base mb-4">{game.pointsInfo.pointInfo}</p>
                <h6 className="font-bold mb-4">Điều kiện, thể lệ:</h6>
                <p className="md:text-base mb-4">{game.pointsInfo.rulesAndConditions}</p>
              </div>
            </div>
          </div>
          <div className="game-social-card-pc hidden xl:flex flex-col w-1/3 border border-neutral-300 rounded-2xl xl:h-fit xl:min-h-[650px] p-8">
            <h2 className="flex-1 font-itel text-h4 font-bold xl:text-h3 mb-5">{game.name}</h2>
            <div className="mb-4">
              <p className="text-base mb-2">Loại game</p>
              <div className="card-tags">
                {game.categories.map((cate) => (
                  <span key={cate} className="tag tag-primary text-base py-1.5 px-3 h-auto">
                    {cate}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-base mb-2 text-neutral-500">Nền tảng chơi</p>
              <span className="font-bold text-xl">
                {game.playingPlatforms.length > 0 ? game.playingPlatforms.join(' và ') : game.playingPlatforms[0]}
              </span>
            </div>
            <div className="bg-neutral-200 h-[1px] mb-6"></div>
            <div className="mb-6">
              <p className="font-bold text-xl mb-2">Tóm tắt</p>
              <span className="text-base">{game.summary}</span>
            </div>
            <div className="relative flex justify-around align-center mb-4">
              <Menu>
                <Menu.Button
                  type="button"
                  className="flex items-center justify-center gap-2 w-1/2 py-3 transition-default hover:text-primary max-xl:hidden"
                >
                  <Svg src="/icons/bold/share.svg" width={24} height={24} />
                  <span className="font-bold">Chia sẻ</span>
                </Menu.Button>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-[25rem] origin-top-right rounded-2xl shadow-itel" data-theme="light">
                  <DropdownShare withLink itemImage={game.image} itemName={'Game'} itemDesc={game.name} href={href} onCopy={handleCopy} />
                </Menu.Items>
              </Menu>
              <button
                type="button"
                className="flex hover:text-primary items-center gap-2 w-1/2 py-3 transition-default"
                onClick={() => {
                  if (!isLiked) toast.success('Đã thêm vào danh sách yêu thích');
                  else toast.success('Đã bỏ khỏi danh sách yêu thích của tôi');
                  toggleLike();
                }}
              >
                {isLiked ? (
                  <>
                    <Svg className="text-red-500" src="/icons/others/heart.svg" width={24} height={24} />
                    <span className="font-bold">Đã yêu thích</span>
                  </>
                ) : (
                  <>
                    <Svg src="/icons/bold/heart-outline.svg" width={24} height={24} />
                    <span className="font-bold">Yêu thích</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {isPlayInWeb && (
                // <Link href={{ pathname: Routers.IGAME_PLAY, query: { id: game.id } }} target="_blank">
                <button type="button" onClick={() => handlePlay(game.id)} className="btn-primary btn btn-lg rounded-full w-full">
                  Chơi ngay
                </button>
                // </Link>
              )}
              <button
                type="button"
                className={` btn btn-lg rounded-full ${
                  !isPlayInWeb
                    ? 'btn-primary'
                    : 'btn-secondary border-0 text-neutral-800 hover:bg-neutral-0 hover:border hover:text-primary'
                }`}
              >
                Chơi trên app
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-neutral-50">
        <SectionIgame title={'Game tương tự'} className="game-similar container py-10 xl:pr-10 xl:py-20 max-md:py-4" href={Routers.IGAME}>
          <div className="max-md:-mx-1 -mx-3 mt-3 flex flex-wrap gap-y-6 md:mt-6 xl:mt-8 xl:gap-y-8">
            {similarGames.map((item) => (
              <div key={item.id} className="w-1/2 px-1.5 md:px-3 md:w-1/2 xl:w-1/3">
                <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }}>
                  <CardGame
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    categories={item.categories}
                    numberOfPlayer={item.numberOfPlayer}
                    isHotWeek={item.isHotWeek}
                    isHot={item.isHot}
                    isOutstanding={item.isOutstanding}
                    playingPlatforms={item.playingPlatforms}
                  />
                </Link>
              </div>
            ))}
          </div>
        </SectionIgame>
      </div>
    </div>
  );
};

IGameDetailPage.getLayout = function getLayout(page, props) {
  return <LayoutIgame>{page}</LayoutIgame>;
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id as string;
  if (!id) return { notFound: true };
  const [game, similarGames] = await Promise.all([gameService.getGameById(id), gameService.getSimilarGameById(id)]);

  if (!game) return { notFound: true };
  return {
    props: {
      game,
      similarGames
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}

export { getStaticProps };
export default IGameDetailPage;
