import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import LayoutTutorialForm from '@/components/layout/layout-tutorial-form';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import tutorials from '@/mock/tutorial.json';
import Routers from '@/routes';
import tutorialService from '@/services/tutorial/tutorialService';
import { modal } from '@pit-ui/modules/modal';
import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface PageProps {}
const SupportTutorial = (props: PageProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  let tabs = tutorials;
  const router = useRouter();
  const [listTutorial, setListTutorial] = useState<tutorialModal.listTutorial[]>([]);
  const [listCategory, setListCategory] = useState<tutorialModal.listCategory[]>([]);

  const params: tutorialModal.params = {
    columnFilters: {},
    sort: [],
    page: 1,
    pageSize: 1000,
    lang: 1
  };
  const getListCategory = async () => {
    const res = await tutorialService.getlistCategory(params);
    setListCategory(res.result);
  };

  const getListTutorial = async () => {
    const res = await tutorialService.getlistTutorial(params);
    setListTutorial(res.result);
  };

  const putFaqLike = async (Id: number) => {
    const res = await tutorialService
      .putFaqLike(Id)
      .then((response) => {
        if (response.code == 200) {
          modal.confirm({
            title: 'Thông báo',
            content: 'Thành công, cảm ơn đã đóng góp ý kiến',
            rejectLable: 'Đóng',
            onDone() {}
          });
          return;
        }
      })
      .catch((error) => {
        modal.confirm({
          title: 'Thông báo',
          content: 'Có lỗi xảy ra!',
          onDone() {}
        });
        return;
      });
  };

  const putFaqDisLike = async (Id: number) => {
    const res = await tutorialService
      .putFaqDisLike(Id)
      .then((response) => {
        if (response.code == 200) {
          modal.confirm({
            title: 'Thông báo',
            content: 'Thành công, cảm ơn đã đóng góp ý kiến',
            rejectLable: 'Đóng',
            onDone() {}
          });
          return;
        }
      })
      .catch((error) => {
        modal.confirm({
          title: 'Thông báo',
          content: 'Có lỗi xảy ra!',
          onDone() {}
        });
        return;
      });
  };

  const getNameCategory = (id: number): string => {
    const category = listCategory.find((item) => item.id == id);
    if (category) {
      return category.text || '';
    }
    return '';
  };

  useEffect(() => {
    getListCategory();
    getListTutorial();
  }, []);

  const handleTabChange = (index: any) => {
    setSearchValue('');
    setActiveTab(index);
  };

  // const handleSearchChange = (event: any) => {
  //     setSearchValue(event.target.value);
  // };
  const handleSearchChange = (event: any) => {
    if (window.innerWidth <= 768) {
      // const searchResultsUrl = '/search-tutorial';
      // router.push(searchResultsUrl);
    } else {
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

  function onClear() {
    setIsSearch(false);
    setSearchValue('');
  }

  const [activeItems, setActiveItems] = useState<any[]>([0]);

  const handleItemClick = (item: any) => {
    if (activeItems.indexOf(item) !== -1) {
      setActiveItems(activeItems.filter((activeItem) => activeItem !== item));
    } else {
      setActiveItems([...activeItems, item]);
    }
  };

  return (
    <>
      <Head>
        <title>Câu hỏi thường gặp</title>
      </Head>
      <HeaderMobileWeb title="Câu hỏi thường gặp" />

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
          <b>Câu hỏi thường gặp</b>
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
              {listCategory.map((item) => (
                <>
                  {listTutorial
                    .filter((subItem) => subItem.FaqCategoryId == item.id)
                    .map((data, dataIndex) => (
                      <li
                        className={`mb-4 ${activeItems.includes(data) ? 'active' : ''}`}
                        key={dataIndex}
                        onClick={() => handleItemClick(data)}
                      >
                        <div className="item-support item-quesstion w-full group p-6 pl-5 pr-5">
                          <div className="top-group flex w-full">
                            <div className="txt-left">
                              <p>{item.text}</p>
                              <span className="bold">{data.Question}</span>
                            </div>
                            <div className="view-quesstion flex font-bold">
                              <span className="pr-2 ar-quess">Xem câu trả lời</span>
                              <span className="pr-2 ar-quess-focus">Ẩn câu trả lời</span>
                              <img
                                src="tutorial/arrow-down.svg"
                                className="group-focus:-rotate-180 transform transition ease duration-500"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="content-item-ques">
                            <div dangerouslySetInnerHTML={{ __html: data.Answer || '' }} />

                            <div className="huuich flex mt-4">
                              <span>Câu trả lời này có hữu ích với bạn hông? Nói cho iTel nhé</span>
                              <ul>
                                <li>
                                  <button onClick={()=>putFaqDisLike(data.Id!)} className="
                                  !flex justify-center">
                                    <img src="/tutorial/emoj-1.png" alt="" className="mr-1" />
                                    Không hữu ích
                                  </button>
                                </li>
                                <li>
                                  <button onClick={()=>putFaqLike(data.Id!)} className="!flex justify-center">
                                    <img src="/tutorial/emoj-2.png" alt="" className="mr-4" />
                                    Hữu ích
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </>
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
