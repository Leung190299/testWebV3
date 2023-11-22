import Svg from '@/components/icon/svg';
import React, { useEffect } from 'react';
import CustomLabelTab from '@/components/pages/profiles/component/tab/tab-custom-label';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type TabType = {
  id: string;
  label: string;
  icon: string;
};

export type FavouriteTabProps = {
  tab: string;
  tabs: TabType[];
  setTab: React.Dispatch<React.SetStateAction<string>>;
  removeMargin?: boolean;
};

const FavouriteTabIcon = ({ isActive = false, url = '' }) => {
  const baseClassName = `mr-2 `;
  const activeClassName = 'text-red-500';

  const iconClassName = isActive ? baseClassName + activeClassName : baseClassName;

  if (!url) {
    return null;
  }
  return <Svg src={url} width={32} height={32} className={clsx('text-neutral-800', iconClassName)} />;
};

const tabLabel = (text = '', icon: React.ReactNode) => {
  return (
    <div className={'flex items-center'}>
      {icon}
      {text}
    </div>
  );
};

export const ProfileTab = ({ tab, setTab, tabs, removeMargin = false }: FavouriteTabProps) => {
  const route = useRouter();

  const routePath = typeof route.query?.tabs === 'string' ? route.query.tabs : tab;

  const handleSetTab = (tabID: string) => {
    const pathName = route.pathname;

    route.push({ pathname: pathName, query: { tabs: tabID } });
    setTab(tabID);
  };

  useEffect(() => {
    if (routePath) {
      setTab(routePath);
    }
    // eslint-disable-next-line
  }, [routePath]);

  return (
    <div className={`relative ${removeMargin ? 'mt-0' : 'mt-4'} overflow-scroll whitespace-nowrap scrollbar-hide max-md:hidden`}>
      <div className={'overflow-scroll whitespace-nowrap scrollbar-hide'}>
        {tabs.map((tabItem, index) => (
          <div className={`${index === tabs.length - 1 ? '' : 'mr-2'} inline`} key={tabItem.id}>
            <CustomLabelTab
              key={tabItem.id}
              label={tabLabel(tabItem.label, <FavouriteTabIcon isActive={tabItem.id === tab} url={tabItem.icon} />)}
              onClick={() => handleSetTab(tabItem.id)}
              isActive={tabItem.id === tab}
              className={`${tabItem.id === tab ? 'text-neutral-800 font-bold' : ''}`}
            />
          </div>
        ))}
      </div>

      <div className={'absolute box-border border-b border-b-neutral-300 bottom-[0.5px] w-full'} />
    </div>
  );
};
