import { toCurrency } from '@/utilities/currency';

export type CardDataPackProps = {
  onDetail?(): void;
  onRegister?(): void;
  image?: string;
  pack: dataModel.Pack;
  index: number;
};
export const getTypePack = (type: 'M' | 'D', isAddOn: number) => (type != 'M' ? (isAddOn == 1 ? 'lượt' : 'ngày') : 'tháng');

const CardDataPack = ({ onDetail, image, onRegister, pack, index }: CardDataPackProps) => {
  return (
    <div className="card card-side bg-base-100 py-4 h-full md:py-0 border-b md:border-none border-neutral-100 max-md:rounded-none overflow-hidden">
      <div className="w-29 md:w-48 xl:w-1/3 overflow-hidden">
        <figure className="flex items-center justify-center h-full w-full">
          <img
            src={index % 2 == 0 ? '/images/data/bgdata2.png' : '/images/data/bgdata3.png'}
            alt="promotion image"
            className="h-full w-full object-cover rounded-lg md:rounded-none"
          />
          <div className=" md:scale-100 absolute text-neutral-0 font-itel text-xl md:text-2xl text-center font-semibold md:-mt-8">
            Gói {pack.Name}
            <div className="text-base md:text-xl">
              {pack.FreeDataPerDay ? (
                <>
                  <span className="text-lg md:text-3xl text-yellow-400">
                    {pack.FreeDataPerDay >= 1 ? pack.FreeDataPerDay + 'GB' : pack.FreeDataPerDay * 1000 + 'MB'}
                  </span>
                  /ngày
                </>
              ) : (
                <>
                  <span className="text-lg md:text-3xl text-yellow-400">
                    {pack.FreeDataPerMonth! >= 1 ? pack.FreeDataPerMonth + 'GB' : pack.FreeDataPerMonth! * 1000 + 'MB'}
                  </span>
                  /tháng
                </>
              )}
            </div>
          </div>
        </figure>
      </div>
      <div className="card-body px-4 py-2.5 md:px-6 md:py-4 xl:pt-6 xl:pb-5 flex-1">
        <div className="flex-1 text-sm flex flex-col">
          <div className="max-md:hidden mt-2 xl:mt-4 flex-1 overflow-auto " dangerouslySetInnerHTML={{ __html: pack.Brief! }}>
            {/* <p>
              <span>Miễn phí </span>
              <b className="xl:text-base">gọi nội mạng iTel và VinaPhone</b>
            </p>
            <p className="text-xs">(Áp dụng cuộc gọi dưới 10 phút, tối đa 1.000 phút)</p> */}
          </div>
          <div className="mt-auto md:mt-2 xl:mt-4 text-xs">
            <b className="mr-1 md:mr-2">
              <span className="text-sm md:text-base xl:text-xl">{toCurrency(pack.Price!)}</span>
              <span className="text-xs md:text-sm">/ {getTypePack(pack.Cycle!, pack.IsAddon!)}</span>
            </b>
            {/* <s className="text-xs">
              <span>{toCurrency(77_000)}</span>
              <span className="max-md:hidden">/ tháng</span>
            </s> */}
          </div>
        </div>
        <div className="flex justify-between md:border-t border-neutral-200 pt-4 xl:mt-4 md:mt-2">
          <button className="first-letter:uppercase font-medium hover:text-red-500 whitespace-nowrap" onClick={onDetail}>
            <span className="max-md:hidden">Xem chi tiết</span>
            <span className="md:hidden">Chi tiết</span>
          </button>
          <button className="whitespace-nowrap flex-shrink-0 btn btn-secondary btn-sm rounded-full max-md:py-2" onClick={onRegister}>
            Đăng ký<span className="max-md:hidden ml-1"> ngay</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDataPack;
