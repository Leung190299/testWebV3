import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';

import ModalScoreGame from '@/components/modal/modal-score-igame';
import { modal } from '@/libs/modal';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import routers from '@/routes/routers';

type PlayPageProps = {};

const PlayGamePage: NextPage<PlayPageProps> = () => {
  const shouldRender = useRef<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (shouldRender.current) {
      shouldRender.current = false;
      setTimeout(() => {
        modal.open({
          render({}) {
            return <ModalScoreGame scores={1200} reward={Math.random() < 0.5} rewardCoin={50} />;
          },
          className: 'modal-box modal-full rounded-3xl max-w-xl',
          closeButton: true,
          onClose: () => {
            router.push(routers.IGAME);
          }
        });
      }, 3500);
    }
  }, []);

  return (
    <>
      <img
        src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685500851/IGame_image/Block_Image_lrd0az.png"
        alt=""
        className="h-screen object-cover w-full"
      />
    </>
  );
};
PlayGamePage.getLayout = function (page) {
  return <>{page}</>;
};

const getStaticProps = getServerPropsWithTranslation<PlayPageProps>(async () => {
  return {
    props: {},
    // revalidate: 8600
  };
});

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export default PlayGamePage;
export { getStaticProps };
