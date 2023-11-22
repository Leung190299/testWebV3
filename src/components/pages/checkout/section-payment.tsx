import { UseFormRegisterReturn } from 'react-hook-form';

export type PaymentOption = {
  id: string;
  name: string;
  salePrice: number;
  logoPath: string;
  isActive?: boolean;
  disabled?: boolean;
};
export type SectionPaymentMethodProps = {
  paymentOptions: Array<PaymentOption>;

  inputProps?: Partial<UseFormRegisterReturn>;
  totalPrice: number;

  onChange?(option: PaymentOption): void;
  selectedId?: string;
  includeWallet?: boolean;
};

const SectionPaymentMethod = ({
  paymentOptions,
  selectedId,
  onChange,
  totalPrice,
  inputProps,
  includeWallet
}: SectionPaymentMethodProps) => {
  // useEffect(() => {
  //   CartService.getMethodPayment().then(res=>console.log(res))
  // },[paymentOptions])

  return (
    <div>
      <div className="py-4 md:py-5">
        <h3 className="md:text-xl">
          <b>3. Chọn hình thức thanh toán</b>
        </h3>

        {/* <Images source={[{ media: '(max-width:400px)', srcSet: '/images/banner-card-mobie.png' }]} src="/images/banner-card.png"   /> */}
      </div>
      <div className="pb-4 md:pb-8">
        <div className="grid md:grid-cols-2 md:gap-4 divide-y divide-neutral-200 md:divide-none">
          {/* {isLoggedIn && includeWallet && (
            <div className="md:col-span-2">
              <label className="flex items-center relative px-4 xl:px-6 py-3.5">
                <input
                  type="radio"
                  className="peer mr-4"
                  value={walletOption.id}
                  onChange={onChange ? () => onChange(walletOption) : undefined}
                  {...inputProps}
                  checked={selectedId ? walletOption.id === selectedId : undefined}
                  // onChange={onChange ? () => onChange(walletOption) : undefined}
                  // {...register?.(name!)}
                />
                <span className="max-md:hidden absolute inset-0 peer-checked:border-red-600 border border-neutral-300 rounded-xl pointer-events-none" />
                <div className="flex-1 items-center mr-3 md:flex block">
                  <div className="flex-1">
                    <p className="text-base font-medium">{walletOption.name}</p>
                    <p className="text-sm text-neutral-500">
                      Số dư <b className="text-primary">{formattedPrice(walletOption.value)}. </b>
                      {totalPrice > walletOption.value ? (
                        <>
                          <br className="md:hidden" />
                          Cần thêm {formattedPrice(totalPrice - walletOption.value)} để thanh toán
                        </>
                      ) : null}
                    </p>
                  </div>
                  <Link href={Routers.RECHARGE} className="mt-1 md:mt-0 btn btn-secondary rounded-full btn-sm" type="button">
                    Nạp thẻ
                  </Link>
                </div>
                <div>
                  <img src="/icons/payment/cod.svg" className="w-10 h-10" alt="wallet" />
                </div>
              </label>
            </div>
          )} */}
          {paymentOptions.map((option) => {
            return (
              <div className={!option.isActive ? 'opacity-50 pointer-events-none' : ''} key={option.name}>
                <label className="flex items-center relative px-4 xl:px-6 py-3.5">
                  <input
                    type="radio"
                    className="peer mr-4 disabled:opacity-100"
                    value={option.id}
                    disabled={option.disabled}
                    {...(inputProps
                      ? inputProps
                      : {
                          checked: selectedId ? option.id === selectedId : undefined,
                          onChange: onChange ? () => onChange(option) : undefined
                        })}
                  />
                  <span className="max-md:hidden absolute inset-0 peer-checked:border-red-600 border border-neutral-300 rounded-xl pointer-events-none" />
                  <div className="flex-1 mr-3">
                    <p className="text-base font-medium">{option.name}</p>
                    <p className="text-sm text-neutral-500">
                      {/* Giảm đến <b className="text-primary">{formattedPrice(option.salePrice)}</b> */}
                    </p>
                  </div>
                  <div>
                    <img src={option.logoPath} className="w-10 h-10 object-contain" alt={option.name} />
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionPaymentMethod;
