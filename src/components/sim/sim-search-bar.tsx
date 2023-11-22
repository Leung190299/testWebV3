import { useEffect, useMemo, useRef, useState } from 'react';
import Drag from '../drag/drag';

import { MAX_PRICE, priceRange, sorts } from '@/constants/sim.constants';
import useDebounceInput from '@/hooks/useDebounceInput';
import useIsSticky from '@/hooks/useIsSticky';
import { TagSimTranformed } from '@/hooks/useSimFilter';
import { modal } from '@/libs/modal';
import { SimModel } from '@/types/pick-sim';
import { useFormContext, useWatch } from 'react-hook-form';
import ModalSearchSim from '../modal/modal-search-sim';
import { ISimFilter } from '../modal/modal-sim-filter';
import FilterNumber from './filterNumber';
import SimSearch from './simSearch';
import SimType from './simType';

export type FilterState = { id: string; type: string; name: string; priceRange?: [number, number] };
export type SortPriceState = { id: string; name: string; property?: string; value?: string };
export type Options = { id: string | number; name: string };

type SearchSimProps = {
  className?: string;
  selectedAttributes?: FilterState[];

  handleShowFilterModal?: () => void;
  isShowDataPack?: boolean;
  isShowTagList?: boolean;
  size?: 'small' | 'medium';
  listType: SimModel.TypeOption[];

  changeBg?: boolean;
  tags?: { id: string | number; name: string }[];
  packs?: SimModel.TypeOptionPack[];

  handleClickRemoveNumber?: (item: string) => void;
  onRemoveAttributes?(item: FilterState): void;
  onSelectedSortPrice?(item: SortPriceState): void;
  onSelectedPack?(item: SimModel.TypeOptionPack): void;
  onSelectTabType?(item: { id: number; name: string }): void;
  onSelectedRangePrice?(item: Options & { value: [number, number] }): void;
  onSearchNumber?(item: string): void;
};

const SimSearchBar = ({
  className,
  tags,
  listType,
  changeBg,
  onSelectedSortPrice,
  onSelectedPack,
  onSelectedRangePrice,
  onSearchNumber,
  onSelectTabType,
  isShowDataPack,
  isShowTagList,
  selectedAttributes: selectedFilters = [],
  onRemoveAttributes,
  handleShowFilterModal,
  packs
}: SearchSimProps) => {
  const [sort, setSort] = useState(sorts[0]);
  const [pack, setPack] = useState(packs?.[0]);
  const [price, setPrice] = useState(priceRange[0]);
  const [range, setRange] = useState<[number, number]>([0, MAX_PRICE]);
  const rangeQuery = useDebounceInput<[number, number]>(range, 1000);
  const [selectTags, setSelectTagsTags] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(ref, { rootMargin: '-65px 200px 0px 200px' });

  const methods = useFormContext<ISimFilter>();

  const handleSelectTag = (tag: TagSimTranformed) => {
    const index = selectTags.indexOf(String(tag.id));

    if (index !== -1) {
      selectTags.splice(index, 1);
      setSelectTagsTags((tab) => tab.slice(index, 1));
    } else {
      setSelectTagsTags([tag.id.toString()]);
    }
  };
  const selectedTag = useWatch({ control: methods.control, name: 'tags' });

  const onChangeInput = (v: string) => {
    methods.setValue('query', v);
    onSearchNumber && onSearchNumber(v);
  };

  const sorted = useMemo(() => {
    if (!tags) return [];
    if (!selectedTag) return [];
    else {
      const sorted: any[] = [];
      selectTags.forEach((tag) => {
        const t = tags.find((item) => String(item.id) === tag);
        if (t) sorted.push({ ...t, selected: true });
      });

      sorted.push(...tags.filter((tag) => !sorted.some((s) => tag.id === s.id)));
      onSelectTabType && onSelectTabType(sorted.filter((item) => item.selected)[0]);
      return sorted;
    }
  }, [selectTags, tags]);

  const handleModalSearch = () => {
    modal.open({
      render: <ModalSearchSim defaultValues={query} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-100',
      classNameContainer: 'modal-full',
      onDone: (v: string) => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        onChangeInput(v);
      }
    });
  };

  const query = useWatch({ control: methods.control, name: 'query' });

  useEffect(() => {
    onSelectedRangePrice && onSelectedRangePrice({ id: 'range', name: 'range', value: rangeQuery });
  }, [rangeQuery]);

  useEffect(() => {
    selectedFilters.filter((item) => item.id != 'priceRange' && item.id != 'all').length == 0 ? setSort(sorts[0]) : setSort(sorts[1]);
  }, [selectedFilters]);

  return (
    <>
      {/* <div
        ref={ref}
        className={clsx(
          'sticky md:hidden top-14 z-10 border-b -mx-4 px-4 pb-2',
          isSticky ? 'border-neutral-100 ' + (changeBg ? 'bg-neutral-0' : 'bg-neutral-0') : 'border-transparent'
        )}
      >
        <div className="flex  pt-3">
          <button
            onClick={handleShowFilterModal}
            className={clsx(
              'relative btn-tertiary btn btn-sm border-none font-medium btn-square w-9 h-9 flex-shrink-0',
              isSticky ? 'bg-neutral-100' : 'bg-neutral-0',
              selectedFilters.length ? 'text-red-500' : !changeBg && 'bg-neutral-100'
            )}
          >
            <Svg src="/icons/bold/filter.svg" width={20} height={20} />
            {selectedFilters.filter((item) => item.id != 'priceRange').length ? (
              <span className="badge z-50 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                <span>{selectedFilters.filter((item) => item.id != 'priceRange').length}</span>
              </span>
            ) : null}
          </button>
          <div className="ml-1 overflow-auto flex-1 whitespace-nowrap gap-2 scrollbar-hide">
            {sorted && !selectedFilters.filter((item) => item.id != 'priceRange').length
              ? sorted.map((item) => (
                  <button
                    key={item.id}
                    className={clsx(
                      'px-4 h-9 rounded-lg border-none text-sm font-medium mx-1',
                      item.selected
                        ? 'bg-red-600 text-neutral-0'
                        : changeBg
                        ? isSticky
                          ? 'bg-neutral-100'
                          : 'bg-neutral-0'
                        : 'bg-neutral-100'
                    )}
                    onClick={() => handleSelectTag(item)}
                  >
                    {item.name}
                  </button>
                ))
              : selectedFilters
                  .filter((item) => item.id != 'priceRange')
                  .map((item, index) => {
                    return (
                      <span key={item.type + index} className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                        {item.name}
                        <button type="button" onClick={onRemoveAttributes ? () => onRemoveAttributes(item) : undefined}>
                          <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                        </button>
                      </span>
                    );
                  })}
          </div>
        </div>
        <div className="mt-3">
          <div className="input-leading-icon input-trailing-icon relative">
            <div onClick={handleModalSearch}>
              <div
                className={clsx(
                  'input text-sm py-2.5 border-none pl-11 outline-none',
                  changeBg ? (isSticky ? 'bg-neutral-100' : 'bg-neutral-0') : 'bg-neutral-100'
                )}
              >
                {!query && <span className="opacity-50">*666, *22, 686,....</span>}
                <span>{query}</span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
            </div>
            {query && (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-4"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChangeInput('');
                }}
              >
                <Svg src="/icons/line/close.svg" className="block" width={20} height={20} />
              </div>
            )}
          </div>
        </div>
      </div> */}

      {query && <div className="md:hidden font-bold text-lg mt-4">Kết quả cho “{query}”</div>}
      <div className={className}>
        <div className="rounded-2xl bg-modern-red  ">
          <div className="md:py-7 md:px-16 py-3 px-4">
            <div className="flex w-full items-start justify-between gap-4">
              <SimSearch onSearch={onSearchNumber} />
              <FilterNumber methods={methods} className="hidden md:block" />
              <SimType listType={listType} valueSelect={listType[0]} methods={methods} className="hidden md:block" />
              {/* <button onClick={handleShowFilterModal} className="btn btn-tertiary btn-lg rounded-full xl:hidden">
                <Svg src="/icons/bold/filter.svg" width={24} height={24} />
              </button> */}
              {/* {isShowDataPack && !isEmpty(packs) && (
                <>
                  <div className="my-auto max-xl:hidden">
                    <DividerHorizontal />
                  </div>
                  <div className="max-xl:hidden">
                    <DropdownSearch
                      title="Gói cước"
                      className="relative w-[11.5rem]"
                      value={pack}
                      options={packs}
                      onChange={(v: SimModel.TypeOptionPack) => {
                        setPack(v);
                        onSelectedPack && onSelectedPack(v);
                      }}
                      displayValue={(v) => (v?.id !== 'all' ? 'Gói cước ' + v?.name : v?.name)}
                    />
                  </div>
                </>
              )}
              <div className="my-auto max-xl:hidden">
                <DividerHorizontal />
              </div>
              <div className="max-xl:hidden">
                <DropdownSearch
                  title="Mức giá"
                  className="relative w-[11.5rem]"
                  value={price}
                  options={priceRange}
                  onChange={(item) => {
                    setPrice(item);
                    setRange(item.value);
                    // onSelectedRangePrice && onSelectedRangePrice({ id: 'range', name: 'range', value: item.value });
                  }}
                  displayValue={(v) => v.name}
                  prev={
                    <li className="menu-title">
                      <div className="pb-4">
                        <div className="form-control">
                          <div className="w-60 input-bordered input-group input rounded-lg p-0">
                            <NumericFormat
                              className="input w-1/2 pr-0 border-none outline-none"
                              placeholder="50.000đ"
                              // type="number"
                              thousandSeparator=","
                              disabled
                              size={1}
                              value={range[0]}
                              onValueChange={(e) => {
                                const v = Number(e.value);
                                if (isNaN(v)) return;
                                setRange([clamp(v, 0, range[1]), range[1]]);
                              }}
                            />
                            <span className="pr-1">đ</span>
                            <hr className="my-auto border-r border-neutral-400 py-4" />
                            <NumericFormat
                              className="input w-1/2 pr-0 border-none outline-none"
                              placeholder="1.000.000đ"
                              // type="number"
                              thousandSeparator=","
                              disabled
                              size={1}
                              value={range[1]}
                              onValueChange={(e) => {
                                const v = Number(e.value);
                                if (isNaN(v)) return;
                                setRange([range[0], clamp(v, range[0], 5_000_000)]);
                              }}
                            />
                            <span className="pr-1">đ</span>
                          </div>
                        </div>
                        <div className="form-control mt-4 px-2">
                          <InputSliderRange
                            min={0}
                            max={MAX_PRICE}
                            step={50_000}
                            value={range}
                            defaultValue={range}
                            onChange={(e, value) => {
                              setRange(value);
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  }
                />
              </div>
              <div className="my-auto max-xl:hidden">
                <DividerHorizontal />
              </div> */}
              {/* <div className="max-xl:hidden">
                <DropdownSearch
                  title="Sắp xếp"
                  className="relative w-[11.5rem]"
                  value={sort}
                  options={sorts}
                  onChange={(item: SortPriceState) => {
                    setSort(item);
                    onSelectedSortPrice && onSelectedSortPrice(item);
                  }}
                  displayValue={(v) => v.name}
                />
              </div> */}
            </div>
          </div>
        </div>
        <div className="md:hidden ">
          <FilterNumber methods={methods} className="flex items-center justify-between w-full " isMobie />
        <SimType listType={listType} valueSelect={listType[0]} methods={methods} className="" isMobie />
      </div>
        {isShowTagList && tags && tags.length ? (
          <div className="flex items-start md:items-center md:justify-between flex-col md:flex-row px-0 md:px-6 py-4 bg-neutral-0 rounded-[16px] overflow-hidden  mt-2">
            <div className="mr-4 whitespace-nowrap text-sm font-medium text-neutral-800 md:hidden xl:block">
              Tìm kiếm nhiều nhất trong tháng
            </div>
            <Drag className="flex select-none overflow-auto scrollbar-hide md:mt-0 mt-2 w-full md:w-auto">
              <ul className="item-center flex items-center justify-between gap-3">
                {tags.map((item) => (
                  <li key={item.id} onClick={() => setSort(sorts[1])}>
                    <label>
                      <input className="sr-only peer" hidden type="radio" value={item.id} {...methods.register('type')} />
                      <span className="btn-secondary btn btn-sm h-10 w-max font-medium peer-checked:btn-active">{item.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </Drag>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SimSearchBar;
