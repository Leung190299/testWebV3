import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import { ISimFilter } from '@/components/modal/modal-sim-filter';
import { generateSimNumber } from '@/services/sim';

import CardSimLottery from '@/components/card/card-sim-lottery';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import SimRowItem from '@/components/sim/sim-row-item';
import SimSearchBar, { Options, SortPriceState } from '@/components/sim/sim-search-bar';
import SimTable from '@/components/sim/table';

import useSimFilter from '@/hooks/useSimFilter';
import useSimAction from '@/store/cart/hooks/sim';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { DeepPartial, FormProvider, useWatch } from 'react-hook-form';

import { gift, packs as packsMock, paramsListPack, paramsSimSearch, sorts } from '@/constants/sim.constants';

import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import DividerHorizontal from '@/components/common/divider-horizontal';
import DropdownSearch from '@/components/dropdown/dropdown-search';
import HeaderWebDefault from '@/components/header/header-web-default';
import Pagination from '@/components/pagination/Pagination';
import StepSim from '@/components/sim/step-sim';
import BodySkeletonSim from '@/components/skeleton/bodySkeletonSim';
import HeaderSkeletonSim from '@/components/skeleton/headerSkeletonSim';
import SkeletonTableSim from '@/components/skeleton/skeletonTableSim';
import simService from '@/services/simService';
import { Model } from '@/types/model';
import { SimModel } from '@/types/pick-sim';
import { forEach } from 'lodash';
const PER_PAGE = 15;

const steps: string[] = ['Chọn SIM số', 'Chọn loại SIM <br>Gói cước', ' Thanh toán'];
const pages = [
  { name: 'Sim', href: '#', current: true },
];
const PickSim: NextPage = () => {
  const simlist = useBoolean(true);
  const [sort, setSort] = useState(sorts[0]);
  const [excludeNumber, setExcludeNumber] = useState<string[]>([]);
  const [data, setData] = useState<Model.SimMaster[]>();
  const [simTypes, setSimTypes] = useState<SimModel.TypeOption[]>([]);
  const [packs, setPacks] = useState<SimModel.TypeOptionPack[]>(packsMock);
  const { selectedAttributes, handleRemoveAttributes, methods, handleModalFilter } = useSimFilter({
    simTypes
  });
  const [dataLuckySim, setDataLuckySim] = useState<Model.SimMaster>();
  const [luckyNumber, setLuckNumber] = useState<string>();
  const refreshIntervalId = useRef<NodeJS.Timer>();
  const timeout = useRef<NodeJS.Timer>();
  const [serverHighestSearch, setServerHighestSearch] = useState<SimModel.TagSearch[]>();
  const [paramsSearch, setParamsSearch] = useState<SimModel.ParamsSimSearchMaster>(paramsSimSearch);
  const [totalRecords, setTotalRecords] = useState<number>(10);
  const {  nextStepSelectType } = useSimAction();
  const refDiv = useRef<HTMLDivElement>(null);
  const [isLoad, setIsLoad] = useState(false);
  const [emptyData, setEmptyData] = useState<boolean>(false);

  useEffect(() => {
    fetchLuckySim();
    fetchSimCategory();
    fetchSimTypeOption();
    fetchListPack();
    if (typeof window != 'undefined') {
      const typeTab = localStorage.getItem('typeTab');
      if (innerWidth < 800) {
        simlist.setTrue();
        return;
      }
      if (typeTab == 'column') {
        simlist.setFalse();
        return;
      }
    }
    return clearInterval(refreshIntervalId.current), clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    onSearchSim();
  }, [paramsSearch]);

  useEffect(() => {
    if (selectedAttributes) {
      // console.log('selectedAttributes--->', selectedAttributes);
      let listExcept: string[] = [];
      let typeSelected = '0';
      let packName: string = '';
      let sortBy: string = 'default';
      let priceRange: number[] = [0, 5_000_000];
      let tag: number | undefined;

      forEach(selectedAttributes, (item) => {
        switch (item.type) {
          case 'excluded':
            return listExcept.push(item.id);
          case 'type':
            typeSelected = item.id;
            sortBy = item.id != 'all' ? 'desc' : 'default';
            return;
          case 'packsDesktop':
            return (packName = item.id);
          case 'sortBy':
            return (sortBy = item.id);
          case 'priceRange':
            return (priceRange = item.priceRange!);
          case 'tag':
            return (tag = Number(item.id));
        }
      });
      setParamsSearch((prev) => {
        return {
          ...prev,
          page: 1,
          columnFilters: {
            ...prev.columnFilters,
            except: listExcept,
            simTagGroup: tag,
            packName,
            simPriceFrom: priceRange[0],
            simPriceTo: priceRange[1]
          },
          extra: {
            sim_category_id_sort: parseInt(typeSelected),
            price_sort: sortBy
          }
        };
      });
    }
  }, [selectedAttributes]);

  useEffect(() => {
    function handleChange(values?: DeepPartial<ISimFilter>) {
      const data = generateSimNumber({ limit: 10, exclude: values?.excluded?.map(Number) });
    }
    handleChange();
    const subscription = methods.watch(handleChange);
    return () => {
      subscription.unsubscribe();
    };
  }, [methods]);

  const handleClickRemoveNumber = (item: string) => {
    setExcludeNumber((prev: any) => {
      const isChecked = excludeNumber && excludeNumber.includes(item);
      if (isChecked) {
        return excludeNumber.filter((item) => item !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSortPrice = (item: SortPriceState) => {
    const { value } = item;
    setParamsSearch((prev) => {
      return {
        ...prev,
        page: 1,
        extra: {
          price_sort: value
        }
      };
    });
  };

  const handleFilterByPack = (item: SimModel.TypeOptionPack) => {
    const { name, id } = item;
    setParamsSearch((prev) => {
      return {
        ...prev,
        page: 1,
        columnFilters: {
          ...prev.columnFilters,
          packName: id == 'all' ? '' : name
        }
      };
    });
  };

  const handlerSelectTabType = (item: { id: number; name: string }) => {
    if (item && item.id) {
      setParamsSearch((prev) => {
        return {
          ...prev,
          page: 1,
          columnFilters: {
            ...prev.columnFilters,
            simCategory: item.id
          }
        };
      });
    }
  };

  const handlerSearchNumber = (item: string) => {
    setParamsSearch((prev) => {
      return {
        ...prev,
        page: 1,
        columnFilters: {
          ...prev.columnFilters,
          search: item
        }
      };
    });
  };

  const handleFilterByRangePrice = (item: Options & { value: [number, number] }) => {
    const { value } = item;
    setParamsSearch((prev) => {
      return {
        ...prev,
        page: 1,
        columnFilters: {
          ...prev.columnFilters,
          simPriceFrom: value[0],
          simPriceTo: value[1]
        }
      };
    });
  };

  const tagLucky = ['Số may mắn', 'Số HOT'];
  const simByYear = useWatch({ control: methods.control, name: 'simByYear' });

  const handleScroll = () => {
    if (refDiv.current) {
      window.scrollTo({
        top: refDiv.current.offsetTop - 300,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  const fetchListPack = async () => {
    const res = await simService.getListPackFilter(paramsListPack);
    let packsFromServer = res.result.map((item) => {
      return {
        id: item.Code,
        name: item.Name
      };
    });
    const allPack = {
      id: 'all',
      name: 'Tất cả'
    };
    packsFromServer.unshift(allPack);
    setPacks(packsFromServer);
  };

  const coverNamePackToData = (name: string) => {
    switch (name) {
      case 'ITEL100':
        return 1_000_000;
      case 'ITEL149':
        return 4_000_000;
      case 'ITEL199':
        return 5_000_000;
      case 'MAY':
        return 4_000_000;
      default:
        return 4_000_000;
    }
  };

  const onSearchSim = async () => {
    // console.log('onSearchSim', paramsSearch);
    setIsLoad(true);
    const res = await simService.getSimSearchMaster(paramsSearch);
    const dataSim = res.result.map((item) => {
      const tags =
        item.SimType != 10 && item.ThoiGianCamKet > 0
          ? [
              { id: 0, name: 'Sim cam kết' },
              {
                id: item.SimType,
                name: item.group_name
              }
            ]
          : [
              {
                id: item.SimType,
                name: item.group_name
              }
            ];
      return {
        // ...item,
        gift: gift,
        pack: {
          data: coverNamePackToData(item.Pack),
          data_type: 'day',
          id: 1,
          name: item.Pack,
          price: item.PackPrice,
          discount_price: item.PackPrice,
          price_type: 'month'
        } as Model.PackOfData,
        tags: tags,
        discount_price: item.SimPrice + item.Price,
        id: parseInt(item.Phone),
        is_vip: false,
        phone: item.Phone,
        price: item.SimType != 10 ? (item.SimPrice + item.Price) * 1.1 : 50_000,
        sale_expiry: null,
        ThoiGianCamKet: item.ThoiGianCamKet,
        EsimPrice: item.EsimPrice,
        SimPrice: item.SimPrice,
        SimType: item.SimType,
        PhoneFormated: item.PhoneFormated
      };
    });
    if (dataSim.length > 0) {
      setData(dataSim);
      setTotalRecords(res.totalRecords);
      setEmptyData(false);
    } else {
      setEmptyData(true);
    }
    setIsLoad(false);
  };

  const fetchSimTypeOption = async () => {
    const params = {
      columnFilters: {},
      sort: [],
      page: 1,
      pageSize: 10
    };
    const res = await simService.getSimCategory(params);
    setSimTypes([
      {
        id: 0,
        name: 'Tất cả định dạng số'
      },
      ...res.result.map((item) => {
        return {
          id: item.Id,
          name: item.Name
        };
      })
    ]);
  };

  const fetchSimCategory = async () => {
    const params = {
      columnFilters: {
        IsManySearchMonthly: 1
      },
      sort: [],
      page: 1,
      pageSize: 10
    };
    const res = await simService.getSimCategory(params);
    setServerHighestSearch(
      res.result.map((item) => {
        return {
          id: item.Id,
          name: item.Name
        };
      })
    );
  };

  const fetchLuckySim = async () => {
    const numbers = ['0876 000303', '0878 121100', '0879 911144', '0877 231155', '0876 793344', '0877 536390', '0877 264268'];
    refreshIntervalId.current = setInterval(() => {
      setLuckNumber(numbers[Math.floor(Math.random() * numbers.length)]);
    }, 100);
    const res = await simService.getLuckySim();
    timeout.current = setTimeout(() => {
      clearInterval(refreshIntervalId.current);

      const luckyToCommon = {
        // ...item,
        gift: gift,
        pack: {
          data: coverNamePackToData(res.result.Pack),
          data_type: 'day',
          id: 1,
          name: res.result.Pack,
          price: res.result.PackPrice,
          discount_price: res.result.PackPrice,
          price_type: 'month',
          ThoiGianCamKet: res.result.ThoiGianCamKet
        } as Model.PackOfData,
        tags: [
          { id: 1, name: 'Số may mắn' },
          { id: 2, name: 'Số HOT' }
        ],
        discount_price: res.result.SimPrice + res.result.Price,
        id: parseInt(res.result.Phone),
        is_vip: false,
        phone: res.result.Phone,
        price: res.result.SimType != 10 ? (res.result.SimPrice + res.result.Price) * 1.1 : 50_000,
        sale_expiry: null,
        ThoiGianCamKet: res.result.ThoiGianCamKet,
        EsimPrice: res.result.EsimPrice,
        SimPrice: res.result.SimPrice,
        SimType: res.result.SimType
      };
      setDataLuckySim(luckyToCommon);
      setLuckNumber(res.result.Phone);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Itel - Theo là thích</title>
      </Head>
      {/* <HeaderMobileWeb title="Sim số" /> */}
      <HeaderWebDefault title="Sim số" withMenu withSearch />
      <section className="bg-neutral-0 md:bg-transparent">
        <FormProvider {...methods}>
        <Breadcrumbs breadcrumbs={pages} />
          <StepSim  step={1} steps={steps} />
          <div className="  pt-3  xl:pb-20 ">
            {/* Banner */}
            <div className="container">
              {dataLuckySim?.phone ? (
                <CardSimLottery title="Tadaa! Số may mắn dành riêng cho bạn là:" mobileTitle="Số may mắn dành cho bạn!">
                  <div className="w-full md:w-auto">
                    <p className="flex items-start md:items-center gap-1 text-h-xs xl:text-h-md">
                      <b className="font-itel w-72 flex-1">{luckyNumber ? formatPhoneNumber(luckyNumber) : ''}</b>
                      <div className="w-[1px] bg-neutral-0 h-10 mr-3 md:hidden" />
                      <CardSimLottery.Price
                        price={dataLuckySim.SimType != 10 ? dataLuckySim?.price || 50000 : 50_000}
                        discountPrice={dataLuckySim?.discount_price}
                        discountPercentage
                        className="md:hidden"
                      />
                    </p>
                    <ul className="md:flex mt-1 xl:mt-2 space-x-1 hidden ">
                      {tagLucky.map((label) => (
                        <li
                          key={label}
                          className="tag tag-primary md:bg-base-100/[0.15] tag-sm xl:tag-md md:border-transparent md:text-neutral-0"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CardSimLottery.PackOfData
                    pack={{
                      data: dataLuckySim?.pack.data || 0,
                      data_type: 'day',
                      id: 1,
                      name: dataLuckySim?.pack.name || '',
                      price: dataLuckySim?.pack.price || 0,
                      discount_price: dataLuckySim?.pack.discount_price || 0,
                      price_type: 'month',
                      ThoiGianCamKet: dataLuckySim?.pack.ThoiGianCamKet || 0,
                      SimType: dataLuckySim.SimType
                    }}
                  />
                  <CardSimLottery.RightContent>
                    <CardSimLottery.Price
                      price={dataLuckySim.SimType != 10 ? dataLuckySim?.price || 50000 : 50_000}
                      discountPrice={dataLuckySim?.discount_price}
                      discountPercentage
                      className="md:block hidden"
                    />
                    <ul className="md:hidden mt-1 xl:mt-2 space-x-1 flex-1 ">
                      {tagLucky.map((label) => (
                        <li
                          key={label}
                          className="tag tag-primary md:bg-base-100/[0.15] tag-sm xl:tag-md md:border-transparent md:text-neutral-0"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-4">
                      <button
                        className="btn-primary md:text-neutral-800 btn btn-sm md:btn-md btn-circle !p-0"
                        onClick={() => fetchLuckySim()}
                      >
                        <Svg src="/icons/bold/refresh.svg" className="h-5 md:h-6 w-5 md:w-6" />
                      </button>
                      <button
                        className="btn-primary btn btn-sm md:btn-md rounded-full"
                        onClick={() => nextStepSelectType(dataLuckySim)}
                      >
                        Mua ngay
                      </button>
                    </div>
                  </CardSimLottery.RightContent>
                </CardSimLottery>
              ) : (
                <HeaderSkeletonSim />
              )}
            </div>
            <div className='py-6 container text-center'>
              <h1 className='font-itel uppercase text-h-sm md:text-h-xl text-neutral-800 font-bold'>
                <span className='text-primary' >chọn số - </span>
                mua sim
              </h1>
              <p className='text-neutral-500'>Sở hữu ngay SIM theo yêu cầu!</p>
            </div>
            {/* <h3 className="text-xl block md:hidden pt-6">
              <b>Danh sách sim</b>
            </h3> */}
            <div className="container rounded-b-[10px]">
              <SimSearchBar
                className="mt-1"
                listType={simTypes}
                selectedAttributes={selectedAttributes}
                tags={serverHighestSearch}
                onSelectedSortPrice={handleSortPrice}
                onSelectedRangePrice={handleFilterByRangePrice}
                onSelectedPack={handleFilterByPack}
                onSearchNumber={handlerSearchNumber}
                onSelectTabType={handlerSelectTabType}
                handleClickRemoveNumber={handleClickRemoveNumber}
                onRemoveAttributes={handleRemoveAttributes}
                handleShowFilterModal={() => handleModalFilter(simTypes, packs)}
                packs={packs}
                isShowTagList
                isShowDataPack
              />
              <div className="md:mt-7 flex items-center">
                <div ref={refDiv} className="flex flex-1   flex-wrap gap-2">
                  <div className="text-2xl md:block hidden  font-bold text-neutral-800">
                    Danh sách Sim <span className="text-[14px] font-normal ">({totalRecords} số)</span>
                  </div>
                  <div className="text-sm font-bold md:hidden">
                    {totalRecords} <span className="font-normal">số hiện có</span>
                  </div>
                </div>
                <div className="my-auto md:hidden">
                  <DividerHorizontal />
                </div>
                <div className="gap flex">
                  <DropdownSearch
                    title=" Sắp xếp theo:"
                    className="relative md:mx-4"
                    value={sort}
                    options={sorts}
                    onChange={(item: SortPriceState) => {
                      setSort(item);
                      handleSortPrice(item);
                    }}
                    displayValue={(v) => v.name}
                  />
                  <button
                    className={`md:flex h-10 w-10 hidden  cursor-pointer items-center justify-center rounded ${
                      simlist.value ? 'bg-neutral-0' : ''
                    }`}
                    onClick={() => {
                      simlist.setTrue();
                      if (typeof window != 'undefined') {
                        localStorage.setItem('typeTab', 'list');
                      }
                    }}
                  >
                    <Svg src="/icons/bold/sim-list.svg" className="inline h-6 w-6" />
                  </button>
                  <button
                    className={`hidden md:flex h-10 w-10 cursor-pointer items-center justify-center rounded ${
                      !simlist.value ? 'bg-neutral-0' : ''
                    }`}
                    onClick={() => {
                      simlist.setFalse();
                      if (typeof window != 'undefined') {
                        localStorage.setItem('typeTab', 'column');
                      }
                    }}
                  >
                    <Svg src="/icons/bold/sim-table.svg" className="inline h-6 w-6" />
                  </button>
                </div>
              </div>
            {emptyData && <p className="font-bold">!!! Rất tiếc, số bạn đang tìm hiện không còn. Có thể bạn sẽ thích những số sau:</p>}
            </div>

            <div className="  flex items-start justify-between gap-6 container  px-1 md:px-10 ">
              {/* Left content, filter */}

              {/*
              Right content
              This is table layout, do not use flexbox to render if you see list item have header above
             */}
              <div className="flex-1  bg-neutral-100  rounded-xl overflow-hidden mt-2">
                <div className="rounded-lg ">
                  {simlist.value ? (
                    isLoad ? (
                      <BodySkeletonSim />
                    ) : (
                      <div className="md:bg-neutral-0 rounded-2xl">
                        <div className="md:mx-2">
                          <table className="w-full md:table">
                            <thead className="hidden md:table-header-group">
                              <tr className="text-left text-sm font-medium">
                                <td className="table-cell py-4 pl-4 pr-3 xl:py-6">SỐ ĐIỆN THOẠI</td>
                                <td className="table-cell py-4 pl-4 pr-3 xl:py-6">LOẠI SỐ</td>
                                <td className="table-cell px-3 py-4 xl:py-6">
                                  <div className="flex items-center gap-1 whitespace-nowrap">
                                    <span>GÓI CƯỚC</span>
                                    <span className="hidden xl:block uppercase">/Chính sách</span>
                                    <span className="inline-block tooltip tooltip-light">
                                      <Svg src="/icons/line/information.svg" className="h-5 w-5" />
                                      <span className="tooltip-bottom pointer-events-none whitespace-break-spaces max-w-xs shadow-itel tooltip-text">
                                        <b>Nếu là "Gói cước cam kết" vui lòng sử dụng gói hàng tháng, đúng thời gian cam kết.</b>
                                      </span>
                                    </span>
                                  </div>
                                </td>
                                <td className="table-cell px-3 py-4 xl:py-6">GIÁ TIỀN</td>
                              </tr>
                              <tr>
                                <th colSpan={33} className="" aria-colspan={15}>
                                  <hr className="-mx-2 border-neutral-300" />
                                </th>
                              </tr>
                            </thead>
                            <tbody className="block align-top md:table-row-group ">
                              {data &&
                                data.map((item) => (
                                  <SimRowItem
                                    key={item.id}
                                    item={item}
                                    pack={item.pack}
                                    onAddToCart={() => nextStepSelectType(item)}
                                    onBuy={() => nextStepSelectType(item)}
                                    onSelectTag={(tag) => handleRemoveAttributes({ name: tag.name, id: tag.id, type: 'tag' })}
                                    tags={item.tags}
                                  />
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  ) : isLoad ? (
                    <SkeletonTableSim />
                  ) : (
                    <div className="grid grid-cols-4 gap-4">
                      {data &&
                        data.map((item) => (
                          <SimTable
                            key={item.id}
                            simItem={item}
                            pack={item.pack}
                            tags={item.tags}
                            onAddToCart={() => nextStepSelectType(item)}
                            onBuy={() => nextStepSelectType(item)}
                            onSelectTag={(tag) => handleRemoveAttributes({ name: tag.name, id: String(tag.id), type: 'tag' })}
                          />
                        ))}
                    </div>
                  )}
                </div>
                {/* Unable to use this pagniation list on mobile */}
              </div>
            </div>
          </div>
        </FormProvider>
      </section>

      <section className="bg-neutral-0 py-3">
        <div hidden={totalRecords == 0} className="max-md:hidden ">
          {/* <PaginationSimple totalPage={100} adjacent={4} /> */}
          <Pagination
            pageCount={totalRecords / 20}
            forcePage={paramsSearch?.page ? paramsSearch?.page - 1 : 1}
            onPageChange={(page) => {
              const nextData = { ...paramsSearch, page: page.selected + 1 };
              setParamsSearch(nextData);
              handleScroll();
            }}
          />
        </div>
        <div hidden={totalRecords == 0} className="md:hidden mt-3 md:mt-10">
          <Pagination
            pageCount={totalRecords / 20}
            forcePage={paramsSearch?.page ? paramsSearch?.page - 1 : 1}
            onPageChange={(page) => {
              const nextData = { ...paramsSearch, page: page.selected + 1 };
              setParamsSearch(nextData);
              // onSearchSim();
              handleScroll();
            }}
          />
        </div>
      </section>

      <SectionSupports />
    </>
  );
};

PickSim.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default PickSim;
