import LayoutProfile from '@/components/layout/layout-profile';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { RankDetail } from '@/components/pages/profiles/component/rank/rank-detail';
import { RankPointHistory } from '@/components/pages/profiles/component/rank/rank-point-history';

const Rank: NextPage = () => {
  return (
    <>
      <Head>
        <title>Itel - profile</title>
      </Head>
      <section className="bg-neutral-100 mb-[1rem] max-lg:mb-6 max-md:hidden">
        <h2 className="font-itel text-h3 font-bold max-lg:text-h4 ">Hạng thành viên</h2>
      </section>
      <RankDetail />
      {/* <section className="bg-neutral-100 mb-[1rem] mt-16 max-lg:mt-6 max-md:px-4">
        <h2 className="font-itel text-h3 max-lg:text-h4 font-bold max-md:text-xl block">Lịch sử tích điểm</h2>
      </section>
      <RankPointHistory /> */}
    </>
  );
};

Rank.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Hạng thành viên" footerClassName="bg-neutral-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default Rank;
