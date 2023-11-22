import { GetStaticPaths, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutDefault from '@/components/layout/layout-default';
import LayoutDetailTutorial from '@/components/layout/layout-tutorial-detail';
import LayoutTutorialKhac from '@/components/layout/layout-tutorial-detail-khac';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import { getTutorialBySlug, getTutorialSlugs } from '@/services/tutorial/tutorial';
import { Data, Model } from '@/types/model';

type PageProps = {
  tutor: Data.TutorialDetail;
  ads: Model.Ads;
};

const SupportTutorialDetail: NextPage<PageProps> = ({ router, tutor, ads }) => {
  return (
    <>
      <Head>
        <title>Hướng dẫn người dùng</title>
      </Head>
      <section className="max-md:hidden bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500 ">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}> Trang chủ </Link>
              </li>
              <li>
                <Link href="#">Hỗ trợ</Link>
              </li>
              <li>
                <Link href={Routers.SUPPORT_TUTORIAL}>Hướng dẫn người dùng</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>{tutor.data.name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <HeaderMobileWeb className="head-mobile" title="" />
      {tutor.data.category != 'Khác' ? (
        <LayoutDetailTutorial tutorial={tutor} ads={ads}>
          <h4 className="text-h-sm hidden md:block font-itel">
            <b>Hướng dẫn người dùng</b>
          </h4>
        </LayoutDetailTutorial>
      ) : (
        <LayoutTutorialKhac  tutorial={tutor} ads={ads}/>
      )}
    </>
  );
};

SupportTutorialDetail.getLayout = function layout(page: any) {
  return (
    <>
      {/*<LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>*/}
      <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>
      {/* <ChatBoxLazy /> */}
    </>
  );
};

export const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const slug = params?.slug;
  if (!slug) return { notFound: true };

  const tutor = await getTutorialBySlug(String(slug));
  const ads = {
    image: '/tutorial/banner-sidebar.png',
    title: 'Bạn đã sẵn sàng chọn số, mua Sim?',
    desc: 'Cùng Anh iTel đi liền thôiiiiii! Gét gô',
    link: '#'
  };
  if (!tutor) return { notFound: true };

  return {
    props: {
      tutor,
      ads
    }
  };
});

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getTutorialSlugs();

  const paths = slugs.map((slug) => ({
    params: { slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};
export default SupportTutorialDetail;
