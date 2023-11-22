import type { CustomProps } from '@/types/element-type';
import { createContext, useMemo } from 'react';

import FooterDefault from '../footer/default';
import { INavgationList, SectionSearchHeader } from '../header';

import Routers from '@/routes/routers';

import { useGlobalContext } from '@/context/global';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import useMediaQuery, { MediaScreen } from '@/hooks/useMediaQuery';
import films from '@/mock/film.json';
import { stringToASCII } from '@/utilities/string';
import HeaderNavigation from '../header/header-navigation';
import HeaderSecondary from '../header/header-secondary';
import InputSearchProvider, { InputSearch, useInputSearch } from '../input/input-search-header';
import ModalShared from '../modal/modal-shared';
import SharedFilmSectionSearch from '../section/shared-film-section-search';

type DefaultProps = { isSearchPage?: boolean; title?: string; footerClassName?: string; isHomePage?: boolean; pageMobileTitle?: string };
type Props = CustomProps<DefaultProps>;

export const navigations: INavgationList = [
  {
    id: '0',
    title: 'Phim bộ',
    href: Routers.FILM_SERIES
  },
  {
    id: '1',
    title: 'Phim lẻ',
    href: Routers.FILM_FEATURED
  },
  {
    id: '2',
    title: 'Phổ biến',
    href: Routers.FILM_POPULAR
  },
  {
    id: '3',
    title: 'Phim của tôi',
    href: Routers.FILM_FAVORITE
  }
];

export const filmQuickSearchs = [
  { id: 0, text: 'Tòa án' },
  { id: 1, text: 'Người đẹp Gangnam' },
  { id: 2, text: 'Điên thì có sao' },
  { id: 3, text: 'Mùa hè' },
  { id: 4, text: 'Bom tấn' },
  { id: 5, text: 'Hài hước' },
  { id: 6, text: 'Gia đình' },
  { id: 7, text: 'Học đường' },
  { id: 8, text: 'Hài hước' },
  { id: 9, text: 'Hoàng hậu' },
  { id: 10, text: 'Người đẹp Gangnam' }
  // { id: 11, text: 'Tòa án' },
  // { id: 12, text: 'Mùa hè' },
  // { id: 13, text: 'Bom tấn' },
  // { id: 14, text: 'Hài hước' },
  // { id: 15, text: 'Gia đình' },
  // { id: 16, text: 'Điên thì có sao' },
  // { id: 17, text: 'Điên thì có sao' },
  // { id: 18, text: 'Học đường' }
];

let prevMode = '';
export const IfilmContext = createContext({ quickSearch(v: string) {}, query: '', isShow: false });
const LayoutIFilm = ({ children, isSearchPage, title, footerClassName, isHomePage, pageMobileTitle = '', ...rest }: Props) => {
  const { search, toggleModalAuth, status } = useGlobalContext();
  const input = useInputSearch();
  const media = useMediaQuery();

  const isShow = !isSearchPage && search.value;
  const suggestList = useMemo(() => {
    if (input.queryDebounced) {
      let text = input.queryDebounced.toLowerCase().split(' ').map(stringToASCII);
      return films.filter((item) => text.every((t) => item.name.toLowerCase().includes(t)));
    }
    return films;
  }, [input.queryDebounced]);

  const isChangedQuery = input.querySubmited !== input.queryDebounced;
  useIsomorphicLayoutEffect(() => {
    const html = document.scrollingElement;
    if (html) {
      prevMode ||= html.classList.contains('theme-dark') ? 'theme-dark' : 'theme-light';
      html.classList.remove(prevMode);
      html.classList.add('theme-dark');
      return () => {
        html.classList.remove('theme-dark');
        html.classList.add(prevMode);
        prevMode = '';
      };
    }
  }, []);

  const navigations = useMemo(() => {
    const navigations: INavgationList = [
      {
        id: '0',
        title: 'Phim bộ',
        href: Routers.FILM_SERIES
      },
      {
        id: '1',
        title: 'Phim lẻ',
        href: Routers.FILM_FEATURED
      },
      {
        id: '2',
        title: 'Phổ biến',
        href: Routers.FILM_POPULAR
      },
      {
        id: '3',
        title: 'Phim của tôi',
        href: Routers.FILM_FAVORITE,
        onClick(e) {
          if (status !== 'authenticated') {
            e.preventDefault();
            return toggleModalAuth(0, { type: 'secondary' });
          }
        }
      }
    ];
    return navigations;
  }, [status, toggleModalAuth]);

  return (
    <>
      <HeaderSecondary
        logo="/logo/ifilm.svg"
        href={Routers.IFILM}
        isHomePage
        navigations={navigations}
        onGoback={input.handleSearchClear}
        withAuth
        withMenu
        data-theme="dark"
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
            placeholder="The Glory"
          >
            {media !== MediaScreen.Mobile && input.focus.value && input.queryDebounced && (
              <div className="absolute w-full left-0 top-full">
                <ul className="mt-2 bg-neutral-700 rounded-xl p-2 shadow-itel menu max-h-[25rem] overflow-auto">
                  {suggestList.map((item) => (
                    <li
                      key={item.id}
                      className="w-full"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => input.handleSearchSelect(item.name)}
                    >
                      <b>{item.name}</b>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </InputSearch>
          <ModalShared open={isShow} onClose={() => void 0}>
            <div key="backdrop" className="fixed inset-0 top-16 md:top-0 z-10 bg-neutral-900"></div>
            <div className="fixed inset-0 top-16 md:top-[4.5rem] z-10" data-theme="dark">
              <div className="h-full overflow-y-scroll">
                {media === MediaScreen.Mobile && isChangedQuery ? (
                  <SectionSearchHeader title="GỢI Ý TỪ KHÓA" className="mt-2 py-2 md:py-0 md:mt-6 xl:mt-8">
                    <div className="mt-2 md:mt-4">
                      <ul>
                        {suggestList.map(({ name, id }) => {
                          return (
                            <li key={id} className="py-3 md:py-2 flex items-center gap-x-2" onClick={() => input.handleSearchSelect(name)}>
                              <p className="font-medium">{name}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </SectionSearchHeader>
                ) : null}
                {(media === MediaScreen.Mobile ? !isChangedQuery : true) && <SharedFilmSectionSearch />}
              </div>
            </div>
          </ModalShared>
        </InputSearchProvider>
      </HeaderSecondary>
      <HeaderNavigation className="top-16 md:top-[4.5rem]" navigations={navigations} />
      <main {...rest}>{children}</main>
      <FooterDefault className={footerClassName} theme="dark" />
    </>
  );
};

export default LayoutIFilm;
