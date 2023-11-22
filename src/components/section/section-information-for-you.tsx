import itelClubService from '@/services/itelClubService';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const informations = [
  {
    id: 1,
    href: '/',
    label: 'Lướt thẻ nhận deal Vàng – Rộn ràng khai xuân',
    desc: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.',
    image: 'https://images-ng.pixai.art/images/orig/34a3d37a-a463-441e-87c6-80d492b745e5'
  },
  {
    id: 2,
    href: '/',
    label: 'Lướt thẻ nhận deal Vàng – Rộn ràng khai xuân',
    desc: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.',
    image: 'https://images-ng.pixai.art/images/orig/e3466004-7d3e-4938-98b5-15292f34cad8'
  },
  {
    id: 4,
    href: '/',
    label: 'Lướt thẻ nhận deal Vàng – Rộn ràng khai xuân',
    desc: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.',
    image: 'https://images-ng.pixai.art/images/orig/dc23707b-5535-4c23-a97b-5c642f4bd179'
  },
  {
    id: 5,
    href: '/',
    label: 'Lướt thẻ nhận deal Vàng – Rộn ràng khai xuân',
    desc: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.',
    image: 'https://images-ng.pixai.art/images/orig/e39ad9a8-e89d-4c38-88e0-073e05f3f505'
  }
];

const TAB_INFORMATIONS = [
  { id: 0, title: 'Tin tức, thông báo' },
  { id: 1, title: 'Chính sách, hướng dẫn' }
];

type Props = { classSection?: string };

const SectionInformation = ({ classSection }: Props) => {
  const [categoryNews, setCategoryNews] = useState<itelClubModel.CategoryNews[]>([]);
  const [blogLoyalty, setBlogLoyalty] = useState<itelClubModel.BlogLoyalty[]>([]);
  const [activeCategory, setActiveCategory] = useState<number>(2);
  const handleChangeCategory = (id: number) => {
    setActiveCategory(id);
  };
  const params: itelClubModel.Params = {
    columnFilters: {},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };

  const blogLoyaltyParams: itelClubModel.BlogLoyaltyParams = {
    columnFilters: {categoryId: activeCategory },
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  }
  const getListCategoryNews = async () => {
    const getCategoryNews = await itelClubService.getCategoryNews(params);
    setCategoryNews(getCategoryNews.result);
  };

  const getListBlogLoyalty = async () => {
    const getBlogLoyalty = await itelClubService.getBlogLoyalty(blogLoyaltyParams);
    setBlogLoyalty(getBlogLoyalty.result);
  }
  useEffect(()=>{
  getListCategoryNews();
  getListBlogLoyalty();
  },[activeCategory])


  return (
    <section className={clsx(classSection, 'bg-neutral-100')}>
      <div className="container md:pt-20 pt-10">
        <h2 className="flex-1 font-itel text-xl md:text-h4 font-bold xl:text-h3">ITEL CHÍNH SÁCH/ TIN TỨC ƯU ĐÃI</h2>
        <div className="tabs -mb-px flex-nowrap md:gap-x-4 gap-x-3 overflow-auto whitespace-nowrap scrollbar-hide border-b-[1px] border-b-neutral-200">
          {categoryNews.map((tab) => (
            <button
              onClick={() => handleChangeCategory(tab.Id!)}
              className={clsx(
                'tab tab-bordered border-red-500 border-opacity-0 md:p-4 p-0 py-3 text-base',
                tab.Id == activeCategory && 'tab-active'
              )}
              key={tab.Id}
            >
              {tab.Name}
            </button>
          ))}
        </div>
        <div className="mt-10 grid md:gap-x-6 md:gap-y-10 gap-x-3 gap-y-6 grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {blogLoyalty.map((information) => {
            return (
              <div key={information.Id} className="group rounded-xl overflow-hidden">
                <Link href={{pathname: '/news/detail', query: { slug: information.Slug, type: information.BlogLoyaltyCategorySlug }}} className="transition-default md:flex w-full items-center gap-6 overflow-hidden bg-neutral-0">
                  <div className="overflow-hidden aspect-photo  md:rounded-none rounded-xl md:w-1/3 ">
                    <img
                      alt={information.Title}
                      className="transition-default w-full h-full object-cover group-hover:scale-110"
                      src={information.Thumbnail}
                    />
                  </div>
                  <div className="md:pr-6 md:p-2 p-2 flex-1">
                    <p className="md:text-xl text-neutral-800 text-sm line-clamp-2">{information.Title}</p>
                    <p className="md:text-base text-neutral-500 text-xs line-clamp-2 mt-1">{information.Brief}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionInformation;
