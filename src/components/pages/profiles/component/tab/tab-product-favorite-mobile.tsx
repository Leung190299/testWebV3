import React from 'react';
import clsx from 'clsx';

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

export const TabFavouriteMobile = ({ tab, setTab, tabs, removeMargin = false }: FavouriteTabProps) => {
  const handleSetTab = (tabID: string) => {
    setTab(tabID);
  };

  return (
    <div className={`relative ${removeMargin ? 'mt-0' : ''} overflow-scroll whitespace-nowrap scrollbar-hide max-md:block hidden px-4 bg-neutral-0`}>
      <div className={'overflow-scroll whitespace-nowrap scrollbar-hide flex'}>
        {tabs.map((tabItem) => {
          const label = tabItem.label;
          const onClick = () => handleSetTab(tabItem.id);
          const isActive = tabItem.id === tab;

          return (
            <button
              key={tabItem.id}
              onClick={onClick}
              className={clsx(
                'cursor-pointer whitespace-nowrap border-b-2 border-transparent p-3 px-4 grow w-full text-neutral-500',
                isActive ? 'border-b-red-500 text-neutral-800 relative z-10' : ''
              )}
            >
              <div className={clsx(`${tabItem.id === tab ? 'text-neutral-800 font-bold' : ''}`)}>{label}</div>
            </button>
          );
        })}
      </div>

      <div className={'absolute box-border border-b border-b-neutral-300 bottom-[0.5px] w-full'} />
    </div>
  );
};
