import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import LayoutSearch from '@/components/layout/layout-search';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import React, { useState } from 'react';
import tutorials from '@/mock/tutorial.json';
import { useRouter } from 'next/router';
import Svg from '@/components/icon/svg';
import { modal } from '@/libs/modal';
import ModalSearchTutorial from '@/components/modal/modal-search-tutorial';
import clsx from "clsx";
import Routers from "@/routes";

interface PageProps {}
const SupportTutorial = (props: PageProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [searchCheck, setsearchCheck] = useState(true);
  let tabs = tutorials;
  const router = useRouter();

  const [inputValue, setInputValue] = useState('');

  const handleTabChange = (index: any) => {
    setSearchValue('');
    setActiveTab(index);
  };

  const handleInputChange = (value: any, isTrue: any) => {
    setSearchValue(value);
    setsearchCheck(isTrue);
  };

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  function onClear() {
    setSearchValue('');
  }

  const filteredData = tabs[activeTab].data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  return (
    <>
      <Head>
        <title>Hướng dẫn người dùng</title>
      </Head>
      <div className={searchCheck ? 'hidden' : ''}>
        <HeaderMobileWeb title="Hướng dẫn" />
        {/*<ModalSearchTutorial onInputChange={handleInputChange} /> */}
      </div>
      <div className={searchCheck ? '' : 'hidden'}>
        <ModalSearchTutorial onInputChange={handleInputChange} />
      </div>
      <div className={searchCheck ? 'hidden' : ''}>
        <LayoutSearch>
          <div className="relative">
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
            <div className="tab-content content-search-result">
              <div className="relative mb-6 search-ques">
                <input
                  type="text"
                  className="search-tutorial font-normal px-4"
                  value={searchValue}
                  onChange={handleSearchChange}
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
                        'absolute inset-0 left-auto flex items-center pr-3 close-result',
                        searchValue ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0 hidden'

                    )}
                >
                  <Svg src="/icons/line/close.svg" className="block w-5 md:h-6 h-5 md:w-6" />
                </button>
              </div>
              <div className="text-result-search">Kết quả cho "{searchValue}"</div>
              <ul>
                {filteredData.map((data, dataIndex) => (
                  <li className="pb-4" key={dataIndex}>
                    <div className="item-support flex p-6 pl-8 pr-8">
                      <div className="txt-left">
                        <p>{data.category}</p>
                        <a href={`${Routers.SUPPORT_TUTORIAL}/${data.slug}`} className="bold">
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
        </LayoutSearch>
      </div>
    </>
  );
};

SupportTutorial.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0 btop-tutorial footer-none">{page}</LayoutDefault>
      {/*<ChatBoxLazy /> */}
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
