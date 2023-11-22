import type { CustomProps } from '@/types/element-type';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';

import FooterDefault from '../footer/default';
import { INavgationList } from '../header';
import ModalShared from '../modal/modal-shared';

import Routers from '@/routes/routers';

import { useGlobalContext } from '@/context/global';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HeaderNavigation from '../header/header-navigation';
import HeaderSecondary from '../header/header-secondary';
import InputSearchProvider, { InputSearch, useInputSearch } from '../input/input-search-header';
import SharedSectionSearchProduct from '../section/shared-section-search-product';
import Schema from '../seo/Schema';

const SettingsDrawer = dynamic(() => (process.env.NODE_ENV === 'development' ? import('@/dev/settings') : Promise.resolve(() => null)), {
  ssr: false
});

type DefaultProps = {
  isSearchPage?: boolean;
  title?: string;
  footerClassName?: string;
  headerClassName?: string;
  isHomePage?: boolean;
};
type Props = CustomProps<DefaultProps>;

export const navigations: INavgationList = [
  {
    id: '0',
    title: 'Điện thoại - Thiết bị',
    href: Routers.IMALL_DEVICE
  }
  // {
  //   id: '1',
  //   title: 'Thời trang',
  //   href: Routers.IMALL_FASHION
  // },
  // {
  //   id: '2',
  //   title: 'Mẹ và bé',
  //   href: Routers.IMALL_MOTHER_TO_BABY
  // },
  // {
  //   id: '3',
  //   title: 'Ăn uống',
  //   href: Routers.IMALL_FOOD
  // }
];

export const quickSearchs = [];

const LayoutImall = ({ children, isSearchPage, title, footerClassName, isHomePage, ...rest }: Props) => {
  const { search } = useGlobalContext();
  const rounter= useRouter()
  const input = useInputSearch();

  const isShow = !isSearchPage && search.value;

  return (
    <Fragment>
      {/* <SettingsDrawer /> */}
      <Head>
        <link rel="canonical" href={`https://v3.itel.vn${rounter.asPath}`} />
      </Head>
      <HeaderSecondary
        logo="/logo/imall.svg"
        href={Routers.HOME}
        isHomePage={isHomePage}
        navigations={navigations}
        onGoback={input.handleSearchClear}
        withAuth
        withCart
        withMenu
        data-theme="light"
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
          />
          <ModalShared open={isShow} onClose={() => void 0}>
            <div key="backdrop" className="fixed inset-0 top-16 md:top-0 z-10 bg-neutral-100 md:bg-neutral-50"></div>
            <div className="fixed inset-0 top-16 md:top-[4.5rem] z-10">
              <div className="h-full overflow-y-scroll xl:pt-6">
                <SharedSectionSearchProduct />
              </div>
            </div>
          </ModalShared>
        </InputSearchProvider>
      </HeaderSecondary>
      <HeaderNavigation className="top-16 md:top-[4.5rem]" navigations={navigations} />

      <main {...rest}>{children}</main>
      <FooterDefault className={footerClassName} />
      <Schema type='all'/>
      <Schema type='business'/>
      <Schema type='Searchbox'/>
    </Fragment>
  );
};

export default LayoutImall;
