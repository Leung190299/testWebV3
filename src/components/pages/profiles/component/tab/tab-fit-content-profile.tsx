import React, {useEffect} from 'react';
import clsx from 'clsx';
import {useRouter} from "next/router";

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
  customClass?: string;
};

export const TabFitContent = ({ tab, setTab, tabs, removeMargin = false, customClass = ' bg-neutral-0' }: FavouriteTabProps) => {
  const route = useRouter();

  const routePath = typeof route.query?.tabs === 'string' ? route.query.tabs : tab;

  const handleSetTab = (tabID: string) => {
    const pathName = route.pathname;

    route.push({ pathname: pathName, query: { tabs: tabID } });
    setTab(tabID);

    setTab(tabID);
  };

  useEffect(() => {
    if (routePath) {
      setTab(routePath);
    }
    // eslint-disable-next-line
  }, [routePath]);


  useEffect(() => {
    const getTab = () => {
      if (!tab) {
        return;
      }
      const getTabById = document.getElementById(tab);
      if (getTabById) {
        getTabById.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'nearest'
          // inline: 'center' //option will set tab position to middle
        });
      }
    };
    getTab();
  },[tab])

  return (
    <div
      className={clsx(
        removeMargin ? 'mt-0' : 'mt-4',
        `relative overflow-scroll whitespace-nowrap scrollbar-hide max-md:block hidden`,
        customClass
      )}
    >
      <div className={'overflow-scroll whitespace-nowrap scrollbar-hide'}>
        {tabs.map((tabItem, index) => {
          const label = tabItem.label;
          const onClick = () => handleSetTab(tabItem.id);
          const isActive = tabItem.id === tab;

          return (
            <button
              key={index}
              onClick={onClick}
              id={tabItem.id}
              className={clsx(
                'cursor-pointer whitespace-nowrap border-b-2 border-transparent p-3 px-4 text-neutral-500',
                isActive ? 'border-b-red-500 text-neutral-800 relative z-10 text-neutral-800 font-bold text-base' : ''
              , index === 0 ? 'ml-4' : '')}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className={'absolute box-border border-b border-b-neutral-300 bottom-[0.5px] w-full'} />
    </div>
  );
};
