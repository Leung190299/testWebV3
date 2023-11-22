import dataService from '@/services/dataService';
import { toCurrency } from '@/utilities/currency';
import { useEffect, useState } from 'react';
import { getTypePack } from '../card/card-data-pack';
import { useDataModal } from '../pages/pack-data/hooks';

const PackSidlerBar = () => {
  const [data, setData] = useState<dataModel.Pack[]>([]);
  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();
  const getListPackNew = async () => {
    try {
      const res = await dataService.getListPackNew();
      if (res.code == 200) {
        setData(res.result!);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getListPackNew();
  }, []);
  return (
    <div className="mt-4">
      <div className="text-lg font-bold mb-1">Gói cước nổi bật</div>
      <div className="w-full flex flex-col gap-2">
        {data.slice(0.3).map((pack, index) => (
          <div key={pack.Id}>
            <div className="card card-side  py-4 h-full md:py-0 border-b md:border-none border-neutral-100 bg-neutral-100 max-md:rounded-none overflow-hidden">
              <div className="w-29 md:w-48 xl:w-1/3 overflow-hidden">
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
                  <div className="max-md:hidden mt-2  flex-1 overflow-auto  line-clamp-3 scrollbar-hide " dangerouslySetInnerHTML={{ __html: pack.Brief! }}>
                    {/* <p>
              <span>Miễn phí </span>
              <b className="xl:text-base">gọi nội mạng iTel và VinaPhone</b>
            </p>
            <p className="text-xs">(Áp dụng cuộc gọi dưới 10 phút, tối đa 1.000 phút)</p> */}
                  </div>
                  <div className="mt-auto text-xs">
                    <b className="mr-1 md:mr-2">
                      <span className="text-sm ">{toCurrency(pack.Price!)}</span>
                      <span className="text-xs ">/ {getTypePack(pack.Cycle!, pack.IsAddon!)}</span>
                    </b>
                    {/* <s className="text-xs">
              <span>{toCurrency(77_000)}</span>
              <span className="max-md:hidden">/ tháng</span>
            </s> */}
                  </div>
                </div>
                <div className="flex justify-between md:border-t text-sm border-neutral-200 pt-2  md:mt-2">
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
  );
};

export default PackSidlerBar;
