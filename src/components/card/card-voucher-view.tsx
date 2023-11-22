import { toCurrency } from '@/utilities/currency';

export const CardVoucherView = (props: { banner: string; brandName: string; brandLogo: string; dateEnd: string; price: number;title:string }) => {
  return (
    <figure className="rounded-lg flex bg-neutral-50 overflow-hidden">
      <div className="w-27 md:w-48 flex-shrink-0">
        <div className="block-img block-square md:block-cinema relative">
          <img src={props.banner} className="object-cover bg-neutral-100" alt={''} />
          <div className="absolute bottom-0 left-0">
            <div className="tag tag-vector tag-md h-auto bg-gradient-to-r from-yellow-500 to-red-500 p-2 text-xs font-bold">
              Giảm {toCurrency(props.price)}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 w-full flex">
        <div className="flex-1">
          <p>
            <b>{props.title}</b>
          </p>
          <p>
            <b>{toCurrency(props.price)}</b>
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            HSD:{props.dateEnd}
          </p>
        </div>
        <div className="max-md:hidden flex-shrink-0">
          <img src={props.brandLogo} alt={props.brandName} className="bg-neutral-100 rounded-full" width={48} height={48} />
        </div>
      </div>
    </figure>
  );
};
