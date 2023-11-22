import ModalShared from '@/components/modal/modal-shared';
import { useGlobalContext } from '@/context/global';
import Routers from '@/routes/routers';
import type { CustomProps } from '@/types/element-type';
import dynamic from 'next/dynamic';
import { Fragment, createContext } from 'react';
import FooterDefault from '../footer/default';
import { INavgationList } from '../header';
import HeaderNavigation from '../header/header-navigation';
import HeaderSecondary from '../header/header-secondary';
import InputSearchProvider, { InputSearch, useInputSearch } from '../input/input-search-header';
import SharedSectionSearchGame from '../section/shared-section-search-igame';

const SettingsDrawer = dynamic(() => (process.env.NODE_ENV === 'development' ? import('@/dev/settings') : Promise.resolve(() => null)), {
  ssr: false
});

type DefaultProps = { isSearchPage?: boolean; showHeaderOnMobile?: boolean };
type Props = CustomProps<DefaultProps>;

export const navigations: INavgationList = [
  {
    id: '0',
    title: 'Hành động',
    href: Routers.IGAME_ACTION
  },
  {
    id: '1',
    title: 'Thể thao',
    href: Routers.IGAME_SPORTS
  },
  {
    id: '2',
    title: 'Trí tuệ',
    href: Routers.IGAME_INTELLECTUAL
  }
];

export const IGameContext = createContext({
  quickSearch(v: string) {},
  query: '',
  isShow: false
});

const LayoutIgame = ({ children, isSearchPage, showHeaderOnMobile, ...rest }: Props) => {
  const { search } = useGlobalContext();
  const input = useInputSearch({ saveQuery: 'igame' });
  const isShow = !isSearchPage && search.value;

  return (
    <Fragment>
      <SettingsDrawer />
      <HeaderSecondary
        logo="/logo/igame.svg"
        href={Routers.IGAME}
        isHomePage={showHeaderOnMobile}
        navigations={navigations}
        onGoback={input.handleSearchClear}
        withAuth
        withMenu
        data-theme='light'
      >
        <InputSearchProvider {...input}>
          <InputSearch
            onChange={input.onChangeText}
            onSubmit={input.onSubmit}
            onClear={input.handleSearchClear}
            value={input.query}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            open={search.value}
            ref={input.inputRef}
            placeholder="Game Săn mồi"
          />
          <ModalShared open={isShow} onClose={() => void 0}>
            <div key="backdrop" className="fixed inset-0 top-16 md:top-0 z-10 bg-neutral-100 md:bg-neutral-50"></div>
            <div className="fixed inset-0 top-16 md:top-[4.5rem] z-10">
              <div className="h-full overflow-y-scroll">
                <SharedSectionSearchGame />
              </div>
            </div>
          </ModalShared>
        </InputSearchProvider>
      </HeaderSecondary>
      <HeaderNavigation className="top-16 md:top-[4.5rem]" navigations={navigations} />
      <main className="md:bg-neutral-0" {...rest}>
        {children}
      </main>
      <FooterDefault className="bg-neutral-0" />
    </Fragment>
  );
};

export default LayoutIgame;
