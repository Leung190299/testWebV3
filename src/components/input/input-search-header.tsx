import { useGlobalContext } from '@/context/global';
import useDebounceQuery from '@/hooks/useDebounceQuery';
import { getSearchQueryHistory, saveSearchQuery } from '@/services/search/model';
import useBoolean, { UseBooleanOutput } from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import React, { PropsWithChildren, createContext, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import Svg from '../icon/svg';

export const useInputSearch = ({ saveQuery }: { saveQuery?: string } = {}) => {
  const { menu, search } = useGlobalContext();
  const focus = useBoolean();
  const [querySubmited, setSubmitedText] = useState('');
  const [query, setQuery] = useState('');
  const [queryDebounced, setQueryDebounced, forceQueryDebounced] = useDebounceQuery(300, true, false);
  const [historySearch, setHistorySearch] = useState<{ id: string; text: string; timestamp: number }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.value && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search.value]);
  useEffect(() => {
    if (saveQuery && !historySearch.length) {
      setHistorySearch(getSearchQueryHistory(saveQuery));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveQuery]);

  // input event
  const onChangeText = (text: string) => {
    setQuery(text);
    setQueryDebounced(text);
    if (!text) setSubmitedText('');
  };
  const onFocus = () => {
    focus.setTrue();
    search.setTrue();
    menu.setFalse();
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    focus.setFalse();
    inputRef.current?.blur();
    if (saveQuery) {
      const res = saveSearchQuery(saveQuery, query);
      res && setHistorySearch([...res]);
    }
    setSubmitedText(query);
  };
  const onBlur = () => {
    focus.setFalse();
  };

  // Action
  const handleSearchClear = () => {
    search.setFalse();
    menu.setFalse();
    setQueryDebounced('');
    setQuery('');
    setSubmitedText('');
  };

  const handleSearchSelect = (text: string) => {
    focus.setFalse();
    inputRef.current?.blur();
    setQuery(text);
    forceQueryDebounced(text);
    // saveSearchQuery(text);
    setSubmitedText(text);
  };
  return {
    historySearch,
    queryDebounced,
    focus,
    querySubmited,
    query,
    inputRef,
    onChangeText,
    onFocus,
    onSubmit,
    onBlur,
    handleSearchClear,
    handleSearchSelect
  };
};

type ReturnUseInputSearch = ReturnType<typeof useInputSearch>;
const SearchContext = createContext<ReturnUseInputSearch>({
  historySearch: [],
  handleSearchClear() {},
  handleSearchSelect(text: string) {},
  querySubmited: '',
  queryDebounced: '',
  focus: {} as UseBooleanOutput,
  inputRef: { current: null },
  onBlur() {},
  onChangeText() {},
  onFocus() {},
  onSubmit() {},
  query: ''
});
export const useSearchContext = () => useContext(SearchContext);
const InputSearchProvider = ({ children, ...rest }: PropsWithChildren<ReturnUseInputSearch>) => {
  return <SearchContext.Provider value={rest}>{children}</SearchContext.Provider>;
};

type InputSearchProps = {
  onSubmit?(e: React.FormEvent<any>): void;
  onClear?(): void;
  onChange(text: string): void;
  open?: boolean;
};
type InputProps = Omit<JSX.IntrinsicElements['input'], keyof InputSearchProps>;
const InputSearch = forwardRef<HTMLInputElement, InputProps & InputSearchProps>(function InputSearchHeaderFn(
  { onSubmit, onClear, open, onChange, children, ...props },
  ref
) {
  return (
    <form
      onSubmit={onSubmit}
      className={clsx(open ? 'input-trailing-icon' : 'max-xl:hidden', 'input-leading-icon search-bar flex-1 relative')}
    >
      <input
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        className="input rounded-full text-sm md:text-base border-none h-10 md:h-12 bg-neutral-100 dark:bg-neutral-600"
        placeholder="Tìm sản phẩm theo nhu cầu của bạn"
        {...props}
      />
      <div className="absolute inset-y-0 flex items-center pl-2.5 md:pl-3 xl:pl-4">
        <Svg src="/icons/bold/vector.svg" className="block w-5 md:h-6 h-5 md:w-6" />
      </div>
      <button
        type="button"
        onClick={onClear}
        className={clsx(
          'absolute inset-0 left-auto flex items-center pr-3',
          open ? '!pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <Svg src="/icons/line/close.svg" className="block w-5 md:h-6 h-5 md:w-6" />
      </button>
      {children}
    </form>
  );
});

export { InputSearch };
export default InputSearchProvider;
