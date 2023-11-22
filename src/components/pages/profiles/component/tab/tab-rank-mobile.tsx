import CustomLabelTab from '@/components/pages/profiles/component/tab/tab-custom-label';
import React from 'react';
import Svg from '@/components/icon/svg';
import clsx from 'clsx';
import { FavouriteTabProps } from '@/components/pages/profiles/component/tab/favourite-tab';

const FavouriteTabIcon = ({ isActive = false, url = '' }) => {
  const baseClassName = ``;
  const activeClassName = 'text-red-500';

  const iconClassName = isActive ? baseClassName + activeClassName : baseClassName;

  if (!url) {
    return null;
  }
  return <Svg src={url} width={32} height={32} className={clsx('text-neutral-800', iconClassName)} />;
};

const TabLabel = ({ text = '', url = '', isActive = false }) => {
  return (
    <div className={'flex items-center flex-col'}>
      <FavouriteTabIcon isActive={isActive} url={url} />
      <p className="text-xs font-medium text-neutral-500">{text}</p>
    </div>
  );
};

export const TabRankMobile = ({ tab, setTab, tabs, removeMargin = false }: FavouriteTabProps) => {
  const handleSetTab = (tabID: string) => {
    setTab(tabID);
  };

  return (
    <div
      className={`relative ${
        removeMargin ? 'mt-0' : ''
      } overflow-scroll whitespace-nowrap scrollbar-hide max-md:block hidden bg-neutral-0`}
    >
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
              <div className={clsx(`${tabItem.id === tab ? 'text-neutral-800 font-bold' : ''}`)}>
                <TabLabel isActive={tabItem.id === tab} url={tabItem.icon} text={tabItem.label} />
              </div>
            </button>
          );
        })}
      </div>

      <div className={'absolute box-border border-b border-b-neutral-300 bottom-[0.5px] w-full'} />
    </div>
  );
};
