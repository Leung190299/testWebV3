import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import LayoutTutorialForm from '@/components/layout/layout-tutorial-form';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import React, { useState } from 'react';
import tutorials from '@/mock/tutorial.json';
import { useRouter } from 'next/router';
import Svg from '@/components/icon/svg';
import { modal } from '@/libs/modal';
import ModalSearchTutorial from '@/components/modal/modal-search-tutorial';
import Routers from '@/routes';
import clsx from 'clsx';

interface PageProps {}
const SupportTutorial = (props: PageProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  let tabs = tutorials;
  const router = useRouter();

  const handleTabChange = (index: any) => {
    setSearchValue('');
    setActiveTab(index);
  };

  const handleSearchChange = (event: any) => {
    if (window.innerWidth <= 768) {
      // const searchResultsUrl = '/search-tutorial';
      // router.push(searchResultsUrl);
    }else{
      if (event.target.value !== '') {
        setIsSearch(true);

      } else {
        setIsSearch(false);
      }
      setSearchValue(event.target.value);
    }

  };

  const handleSearchClick = (event: any) => {
    if (window.innerWidth <= 768) {
      const searchResultsUrl = '/search-tutorial';
      router.push(searchResultsUrl);
    }
  };

  const filteredDataList = tabs[activeTab].data;

  function normalizeString(string: string) {
    return string.toLocaleLowerCase().normalize('NFC');
  }

  function onClear() {
    setIsSearch(false);
    setSearchValue('');
  }

  const filteredData = tutorials.flatMap((item) =>
    item.data
      .filter((dataItem) => normalizeString(dataItem.name).includes(normalizeString(searchValue)))
      .map((dataItem) => ({
        name: item.name,
        category: dataItem.category,
        title: dataItem.name,
        slug: dataItem.slug
      }))
  );
  return (
    <>
      <Head>
        <title>Hướng dẫn người dùng</title>
      </Head>
      <HeaderMobileWeb title="Hướng dẫn người dùng" />

      <div className="top-head-mobile">
        <div className="real-head-tab">
          <div className="tab-header mb-6">
            {tabs.map((tab, index) => (
                <div key={index} className={`tab-item ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabChange(index)}>
                  <div className="icon text-center mb-2">
                    <Svg src={tab.icon} width={40} height={40} className="mx-auto" />
                  </div>
                  <span>{tab.name}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
      <LayoutTutorialForm>
        <h4 className="text-h-sm hidden md:block font-itel mb-3">
          <b>Hướng dẫn người dùng</b>
        </h4>
        <div className="relative rel-tab">
          <div className="real-head-tab">
            <div className="tab-header mb-6">
              {tabs.map((tab, index) => (
                <div key={index} className={`tab-item ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabChange(index)}>
                  <div className="icon text-center mb-2">
                    <Svg src={tab.icon} width={40} height={40} className="mx-auto" />
                  </div>
                  <span>{tab.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tab-content">
            <div className="relative mb-6 search-ques">
              <input
                type="text"
                className="search-tutorial font-normal px-4"
                value={searchValue}
                onChange={handleSearchChange}
                onMouseEnter={handleSearchClick}
                placeholder="Tìm kiếm"
              />
              <div className="icon flex px-4">
                <div className="icon-src">
                  <img src="tutorial/search.svg" alt="" />
                </div>
              </div>
              <button
                type="button"
                onClick={onClear}
                className={clsx(
                  'absolute inset-0 left-auto flex items-center pr-3',
                  isSearch ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                )}
              >
                <Svg src="/icons/line/close.svg" className="block w-5 md:h-6 h-5 md:w-6" />
              </button>
            </div>
            <div className="list-search-head search-head-pc">
              <ul>
                {isSearch &&
                  filteredData.map((data, dataIndex) => (
                    <li key={dataIndex}>
                      <a href={`${Routers.SUPPORT_TUTORIAL}/${data.slug}`}>
                        <span>[{data.category}]</span>
                        {data.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <ul>
              {filteredDataList.map((data, dataIndex) => (
                <li className="mb-4" key={dataIndex}>
                  <div className="item-support flex p-6 pl-8 pr-8">
                    <div className="txt-left">
                      <p>{data.category}</p>
                      <a href={`${router.asPath}/${data.slug}`} className="bold">
                        {data.name}
                      </a>
                    </div>
                    <div className="t-step mx-4">{data.step > 0 ? `${data.step} bước` : ''}</div>
                    <div className="detail-tt">
                      <a href={`${router.asPath}/${data.slug}`} className="btn-secondary btn rounded-full px-9">
                        Chi tiết
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LayoutTutorialForm>
    </>
  );
};

SupportTutorial.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0 btop-tutorial">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {}
  };
});
export { getStaticProps };

export default SupportTutorial;
