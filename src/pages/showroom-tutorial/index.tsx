import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import TextInput from '@/components/form/TextInput';
import LayoutDefault from '@/components/layout/layout-default';
import { OrderSupport } from '@/components/modal/modal-support';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import { useState } from 'react';
import clsx from 'clsx';
import SectionLogin from '@/components/section/section-login';
import { modal } from '@/libs/modal';
import ModalOrderNotFound from '@/components/modal/modal-order-not-found';
import LayoutTutorialNormal from '@/components/layout/layout-tutorial-normal';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import City from '@/mock/quan_huyen.json';
import States from '@/mock/tinh_tp.json';
import Village from '@/mock/xa_phuong.json';

interface PageProps {}
const ShowRoomTutorial = (props: PageProps) => {
  const [currentTab, setCurrentTab] = useState(1);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedStates, setSelectedStates] = useState(null);
  const [selectedVillage, setSelectedVillage] = useState(null);

  const handleTabChange = (tabId: any) => {
    setCurrentTab(tabId);
    setSelectedCity(null);
    setSelectedStates(null);
    setSelectedVillage(null);
  };

  const handleCityChange = (cityId: any) => {
    setSelectedCity(cityId);
  };

  const handleStatesChange = (statesId: any) => {
    setSelectedStates(statesId);
  };

  const handleVillageChange = (villageId: any) => {
    setSelectedVillage(villageId);
  };

  const tabData = [
    { id: 1, name: 'Điểm dịch vụ khách hàng', icon: '/tutorial/diem-1.svg' },
    { id: 2, name: 'Điểm phân phối Sim', icon: '/tutorial/diem-2.svg' }
  ];

  const tabContentData = [
    {
      id: 1,
      tabId: 1,
      idCity: '001',
      idStates: '01',
      idVillage: 1,
      name: 'Công ty Cổ phần Thế Giới Di Động',
      address: 'Địa chỉ 1',
      phone: '1234567890',
      workingHours: '8:00 AM - 5:00 PM',
      icon: '/tutorial/diadiem.svg',
      link: 'https://example.com'
    },
    {
      id: 2,
      tabId: 2,
      idCity: '002',
      idStates: '01',
      idVillage: 2,
      name: 'name 2',
      address: 'Địa chỉ 2',
      phone: '0987654321',
      workingHours: '9:00 AM - 6:00 PM',
      icon: '/tutorial/diadiem.svg',
      link: 'https://example.com'
    },
    {
      id: 3,
      tabId: 1,
      idCity: '764',
      idStates: '79',
      idVillage: 3,
      name: 'name 3',
      address: 'Địa chỉ 3',
      phone: '111222333',
      workingHours: '7:00 AM - 4:00 PM',
      icon: '/tutorial/diadiem.svg',
      link: 'https://example.com'
    },
    {
      id: 4,
      tabId: 1,
      idCity: '761',
      idStates: '79',
      idVillage: 4,
      name: 'name 4',
      address: 'Địa chỉ 4',
      phone: '444555666',
      workingHours: '10:00 AM - 7:00 PM',
      icon: '/tutorial/diadiem.svg',
      link: 'https://example.com'
    },
    {
      id: 5,
      tabId: 1,
      idCity: '195',
      idStates: '22',
      idVillage: 5,
      name: 'name 5',
      address: 'Địa chỉ 5',
      phone: '777888999',
      workingHours: '9:00 AM - 6:00 PM',
      icon: '/tutorial/diadiem.svg',
      link: 'https://example.com'
    },
    {
      id: 6,
      tabId: 1,
      idCity: '194',
      idStates: '22',
      idVillage: 6,
      name: 'name 6',
      address: 'Địa chỉ 6',
      phone: '000111222',
      workingHours: '8:00 AM - 5:00 PM',
      icon: '/tutorial/diadiem.svg',
      link: 'https://example.com'
    }
  ];

  const filteredData = tabContentData.filter((item) => {
    return (
      (selectedCity ? item.idCity === selectedCity : true) &&
      (selectedStates ? item.idStates === selectedStates : true) &&
      (selectedVillage ? item.idVillage === selectedVillage : true)
    );
  });

  const filteredTabs = tabData.filter((tab) => {
    const tabItems = tabContentData.filter((item) => item.tabId === tab.id);
    return tabItems.length > 0;
  });

  const tabs = filteredTabs.map((tab) => tab.id);

  const tabContent = tabs.reduce((acc: any, tabId) => {
    acc[tabId] = filteredData.filter((item) => item.tabId === tabId);
    return acc;
  }, {});

  const filteredCity = City.filter((option) => option.parent_code === selectedStates);

  const filteredVillage = Village.filter((option) => option.parent_code === selectedCity);
  return (
    <>
      <Head>
        <title>Điểm dịch vụ KHÁCH HÀNG</title>
      </Head>
      <HeaderMobileWeb title="Điểm CSKH" />
      <LayoutTutorialNormal>
        <h4 className="text-h-sm hidden md:block font-itel mb-3">
          <b>Điểm dịch vụ KHÁCH HÀNG</b>
        </h4>

        <div className="scrll-tab-mb">
          <div className="relative mb-6 flex tab-place">
            {filteredTabs.map((tab) => (
              <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex p-4 ${currentTab === tab.id ? 'active' : ''}`}>
                <span className="icon">
                  <img src={tab.icon} alt="" />
                </span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="maps-frame mb-4 flex">
          <div className="avr-maps">
            <img src="/tutorial/maps.jpg" className="w-full" height={316} alt="" />
          </div>
        </div>

        <div className="content-filter-place bg-neutral-0 rounded-md p-8">
          <div className="filter-place mb-6">
            <ul className="flex">
              <li className="w-1/3 px-2">
                <select
                  className="w-full px-4 bg-neutral-0"
                  value={selectedStates || ''}
                  onChange={(e) => handleStatesChange(e.target.value)}
                >
                  <option value="">Chọn nhập tỉnh/ thành phố</option>
                  {States.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="w-1/3 px-4">
                <select className="w-full px-4 bg-neutral-0" value={selectedCity || ''} onChange={(e) => handleCityChange(e.target.value)}>
                  <option value="">Chọn nhập quận/ huyện</option>
                  {filteredCity.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </li>
              <li className="w-1/3 px-4">
                <select
                  className="w-full px-4 bg-neutral-0"
                  value={selectedVillage || ''}
                  onChange={(e) => handleVillageChange(e.target.value)}
                >
                  <option value="">Chọn nhập xã/ phường</option>
                  {filteredVillage.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </li>
            </ul>
          </div>

          <div className="content-tab-place">
            {tabContent[currentTab] !== undefined && (
              <ul>
                {tabContent[currentTab].map((item: any) => (
                  <li key={item.id} className="mb-4">
                    <div className="item-place w-full p-6 flex">
                      <div className="top mb-1">
                        <div className="icon">
                          <img src={item.icon} width={64} height={64} alt="" />
                        </div>
                        <div className="desc">
                          <h3 className="font-bold">{item.name}</h3>
                        </div>
                      </div>
                      <div className="icon-plc">
                        <img src={item.icon} width={64} height={64} alt="" />
                      </div>
                      <div className="info-place px-4">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="flex mt-2">
                          <img src="/tutorial/s-1.svg" alt="" />
                          <span className="pl-1">{item.address}</span>
                        </p>
                        <p className="flex mt-2">
                          <img src="/tutorial/s-2.svg" alt="" />
                          <span className="pl-1">
                            <label>Giờ mở cửa:</label> {item.workingHours}
                          </span>
                        </p>
                        <p className="flex mt-2">
                          <img src="/tutorial/s-3.svg" alt="" />
                          <span className="pl-1">{item.phone}</span>
                        </p>
                      </div>
                      <div className="btn-place">
                        <a href={item.link} target="_blank" className="flex btn-secondary btn rounded-full">
                          <img src="/tutorial/place.svg" alt="" />
                          <span className="pl-2">Chỉ đường</span>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </LayoutTutorialNormal>
    </>
  );
};

ShowRoomTutorial.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
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

export default ShowRoomTutorial;
