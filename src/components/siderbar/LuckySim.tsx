import dataService from '@/services/dataService';
import simService from '@/services/simService';
import useSimAction from '@/store/cart/hooks/sim';
import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { formatNumber } from '@/utilities/number';
import { useEffect, useRef, useState } from 'react';
import { getTypePack } from '../card/card-data-pack';
import CardSimLottery from '../card/card-sim-lottery';
import Svg from '../icon/svg';
import { useDataModal } from '../pages/pack-data/hooks';

const LuckySim = () => {
  const [dataLuckySim, setDataLuckySim] = useState<Model.SimMaster>();
  const [data, setData] = useState<dataModel.Pack[]>([]);
  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();

  const [luckyNumber, setLuckNumber] = useState<string>();
  const refreshIntervalId = useRef<NodeJS.Timer>();
  const timeout = useRef<NodeJS.Timer>();
  const tagLucky = ['Số may mắn', 'Số HOT'];
  const { nextStepSelectType } = useSimAction();
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
  const getListPackNew = async () => {
    try {
      const res = await dataService.getListPackNew();
      if (res.code == 200) {
        setData(res.result!);
      }
    } catch (error) {}
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

  useEffect(() => {
    fetchLuckySim();
    getListPackNew();
    return clearInterval(refreshIntervalId.current), clearTimeout(timeout.current);
  }, []);
  return (
    <div className="rounded-xl overflow-hidden bg-neutral-100 my-4">
      <div>
        <div className="relative bg-modern-red   p-4 " data-theme="dark">
          <p className=" relative text-sm font-medium text-center">Số may mắn dành cho bạn!</p>

          <div className="w-full my-3">
            <p className="flex justify-between gap-1 text-h-xs ">
              <b className="font-itel w-72 flex-1">{luckyNumber ? formatPhoneNumber(luckyNumber) : ''}</b>
              <span className="w-[1px] block bg-neutral-0 h-10 mr-3" />
              <CardSimLottery.Price
                price={dataLuckySim?.SimType != 10 ? dataLuckySim?.price || 50000 : 50_000}
                discountPrice={dataLuckySim?.discount_price}
                discountPercentage
                className=""
              />
            </p>
          </div>
          <PackOfData
            pack={{
              data: dataLuckySim?.pack.data || 0,
              data_type: 'day',
              id: 1,
              name: dataLuckySim?.pack.name || '',
              price: dataLuckySim?.pack.price || 0,
              discount_price: dataLuckySim?.pack.discount_price || 0,
              price_type: 'month',
              ThoiGianCamKet: dataLuckySim?.pack.ThoiGianCamKet || 0,
              SimType: dataLuckySim?.SimType
            }}
          />
          <div className="flex-1 w-full mt-4">
            <div className="flex min-w-max flex-wrap justify-between  ">
              <ul className=" mt-1  space-x-1 flex-1 ">
                {tagLucky.map((label) => (
                  <li key={label} className="tag tag-primary  tag-sm xl:tag-md md:border-transparent ">
                    {label}
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button className="btn-primary md:text-neutral-800 btn btn-sm  btn-circle !p-0" onClick={() => fetchLuckySim()}>
                  <Svg src="/icons/bold/refresh.svg" className="h-5  w-5 " />
                </button>
                <button className="btn-primary btn btn-sm rounded-full" onClick={() => nextStepSelectType(dataLuckySim!)}>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        <div className="text-4xl font-bold font-itel mb-5">Gói cước nổi bật</div>
        <div className="w-full flex flex-col gap-2">
          {data.slice(0, 1).map((pack, index) => (
            <div key={pack.Id}>
              <div className="flex flex-col items-center py-4 h-full md:py-0 border-b md:border-none border-neutral-100 bg-neutral-100 max-md:rounded-none overflow-hidden">
                <div className=" w-[250px] h-[250px] overflow-hidden rounded-xl">
                  <figure className="flex items-center justify-center h-full w-full">
                    <img
                      src={'/images/data/bgdata2.png'}
                      alt="promotion image"
                      className="h-full w-full object-cover rounded-lg md:rounded-none"
                    />
                    <div className=" md:scale-100 absolute text-neutral-0 font-itel text-xl md:text-xl text-center  md:-mt-8">
                      Gói {pack.Name}
                      <div className="text-base md:text-xl">
                        {pack.FreeDataPerDay ? (
                          <>
                            <span className="text-lg md:text-2xl text-yellow-400">
                              {pack.FreeDataPerDay >= 1 ? pack.FreeDataPerDay + 'GB' : pack.FreeDataPerDay * 1000 + 'MB'}
                            </span>
                            /ngày
                          </>
                        ) : (
                          <>
                            <span className="text-lg md:text-2xl text-yellow-400">
                              {pack.FreeDataPerMonth! >= 1 ? pack.FreeDataPerMonth + 'GB' : pack.FreeDataPerMonth! * 1000 + 'MB'}
                            </span>
                            /tháng
                          </>
                        )}
                      </div>
                    </div>
                  </figure>
                </div>
                <div className="card-body px-4 py-1  flex-1">
                  <div className="flex-1 text-sm flex flex-col">
                    <div
                      className="max-md:hidden mt-2  flex-1 overflow-auto  line-clamp-3 scrollbar-hide "
                      dangerouslySetInnerHTML={{ __html: pack.Brief! }}></div>
                    <div className=" text-xs mt-3">
                      <b className="mr-1 md:mr-2">
                        <span className="text-sm ">{toCurrency(pack.Price!)}</span>
                        <span className="text-xs ">/ {getTypePack(pack.Cycle!, pack.IsAddon!)}</span>
                      </b>
                    </div>
                  </div>
                  <div className="flex justify-between md:border-t text-sm border-neutral-300 pt-2  md:mt-2">
                    <button
                      className="first-letter:uppercase font-medium hover:text-red-500 whitespace-nowrap"
                      onClick={() => handleViewDetail(pack)}
                    >
                      <span className="max-md:hidden">Xem chi tiết</span>
                      <span className="md:hidden">Chi tiết</span>
                    </button>
                    <button
                      className="whitespace-nowrap flex-shrink-0 btn  btn-secondary btn-xs rounded-full max-md:py-2"
                      onClick={() => handleModalPhoneCheck(pack)}
                    >
                      Đăng ký<span className="max-md:hidden ml-1"> ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LuckySim;

function PackOfData({ pack }: { pack: Model.PackOfData }) {
  return (
    <>
      <p className=" text-sm w-full">
        <span className="text-base font-bold">{pack.name}</span>
        <b className="ml-1">
          {'('}
          {formatNumber(pack.data, ['B', 'KB', 'GB'])}
        </b>
        /ngày
        <span> | </span>
        <b>{formatNumber(pack.price)}</b>/tháng)
        {pack.SimType && pack.SimType == 10 && <s className="ml-2"> {formatNumber(77000)}/tháng</s>}
      </p>
    </>
  );
}
