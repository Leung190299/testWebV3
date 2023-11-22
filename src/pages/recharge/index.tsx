import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import Stepper from '@/components/stepper/stepper';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { modal, useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { addToCheckout } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { toCurrency } from '@/utilities/currency';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import HeaderWebDefault from '@/components/header/header-web-default';
import { CheckoutType } from '@/constants/checkout.constants';
import { LIST_CARDS } from '@/constants/recharge.constants';
import rechargeService from '@/services/rechargeService';
import { rechrageModel } from '@/types/recharge';
import { phoneNumberRegex } from '@/utilities/validator';
import { AxiosError } from 'axios';

const tabs = [
  {
    id: 'recharge',
    icon: '/icons/bold/recharge-card.svg',
    name: 'Nạp tiền điện thoại'
  },
  {
    id: 'code',
    icon: '/icons/bold/buy-card.svg',
    name: 'Mua mã thẻ'
  }
];

const ModalSelectNetwork = ({
  defaultValues,
  listNextWork
}: {
  defaultValues?: rechrageModel.network;
  listNextWork: rechrageModel.network[];
}) => {
  const { close, done } = useModal();
  const [selected, setSelected] = useState<rechrageModel.network>(defaultValues || listNextWork[0]);
  const handleSubmit = () => {
    done(selected);
  };

  return (
    <div>
      <nav className="bg-neutral-0 transition-default sticky w-full md:hidden top-0 z-50 border-b border-neutral-200">
        <div className="container">
          <div className="relative flex items-center gap-2 h-16">
            <div className="absolute left-0">
              <button type="button" className="btn-ghost btn btn-sm btn-circle" onClick={close}>
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            </div>
            <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden">
              <h1 className="truncate max-w-xs">Chọn nhà mạng</h1>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-2">
        <section className="bg-neutral-0">
          <div className="container">
            <ul className="divide-y divide-neutral-200">
              {listNextWork.map((network, index) => (
                <li key={network.Id}>
                  <label className="flex items-center gap-4 p-4 pl-0">
                    <input
                      type="radio"
                      name="network"
                      value={network.Id}
                      checked={selected.Id === network.Id}
                      onChange={(e) => {
                        setSelected(listNextWork[index]);
                      }}
                    />
                    <div className="flex-1 capitalize font-medium">{network.Name}</div>
                    <div>
                      {network.Name == 'Wintel' ? (
                        <img src={network.Path} alt={network.Name} className="h-10 w-[100px] object-cover" />
                      ) : (
                        <img src={network.Path} alt={network.Name} className="h-10 w-full object-contain" />
                      )}
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <div className="bg-neutral-0 fixed bottom-0 py-2 w-full">
        <div className="container">
          <button onClick={handleSubmit} className="btn w-full btn-primary rounded-full">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

const validTab = ['recharge', 'code'];

const pages = [

  { name: `Nạp thẻ di động`, href: '#', current: true }
];
const CardRechargePage: NextPage = () => {
  const router = useRouter();
  const currentTab = validTab.includes(String(router.query.tab)) ? String(router.query.tab) : 'recharge';

  const [selected, setSelected] = useState<rechrageModel.network>({});
  const [listNetwork, setListNetwork] = useState<rechrageModel.network[]>([]);
  const [listTopup, setListTopup] = useState<rechrageModel.topup[]>([]);
  const [isNetwork, setIsNetwork] = useState<boolean>(false);

  const refInputPhone = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const methods = useForm<{ phone: string; network: rechrageModel.network; quantity: number; price: string; idProduct: number }>({
    defaultValues: {
      quantity: 1,
      network: selected,
      price: String(LIST_CARDS[0].price),
      idProduct: LIST_CARDS[0].id
    },
    mode: 'onChange'
  });

  useEffect(() => {
    currentTab !== 'recharge' && methods.unregister('phone', { keepError: false });
    refInputPhone.current?.focus();
  }, [currentTab, methods]);

  const getNetwork = async () => {
    const res = await rechargeService.getListNetwork(currentTab == 'recharge' ? '1' : '2');
    if (res.code == 200) {
      let result: rechrageModel.network[] = res.result;
      let _listNetwork = result.map((network) => ({
        ...network,
        Path: network.Name == 'Wintel' ? `/logo/${network.Name}.jpg` : `/logo/${network.Name}.svg`
      }));
      setListNetwork(_listNetwork);
      setSelected(_listNetwork[0]);
      methods.setValue('network', _listNetwork[0]);
    }
  };

  useEffect(() => {
    const getlistTopup = async () => {
      const res = await rechargeService.getListTopup(currentTab == 'recharge' ? 1 : 2, selected.Id || 1);
      if (res.code === 200) {
        let result: rechrageModel.topup[] = res.result;
        setListTopup(result.filter((item) => item.IsActive));
        if(result.length>0)methods.setValue('idProduct', result.filter((item) => item.IsActive)[0].Id);

      }
    };
    getlistTopup();
  }, [selected, currentTab]);

  useEffect(() => {
    getNetwork();
  }, [currentTab]);

  const handleSubmit = (values: { phone: string; network: rechrageModel.network; quantity: number; price: string; idProduct: number }) => {

    dispatch(
      addToCheckout({
        type: currentTab == 'code' ? CheckoutType.BuyCode : CheckoutType.Recharge, // recharge | code
        network: values.network,
        receiver: values.phone,
        price: Number(values.price),
        quantity: Number(values.quantity),
        idProduct: values.idProduct
      })
    );
    router.push({
      pathname: Routers.CHECKOUT_CARD
    });
  };

  function InputValue(e: FormEvent<HTMLInputElement>) {
    //@ts-ignore
    e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    //@ts-ignore
    if (e.target.value.length == 10 || e.target.value.length == 3) {
      rechargeService
        //@ts-ignore
        .getNetwork(e.target.value.slice(0, 3))
        .then((res) => {
          if (res.code == 200) {
            setIsNetwork(true);
            setSelected(listNetwork.find((item) => item.Id == res.result.Id) || listNetwork[0]);
            methods.setValue('network', listNetwork.find((item) => item.Id == res.result.Id) || listNetwork[0]);
            return;
          }
          modal.confirm({
            title: 'Thông báo',
            content: res?.message || '',
            rejectLable: 'Đóng',
            onDone: close
          });
        })
        .catch((error) => {
          const err = error as AxiosError;
          const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
          modal.confirm({
            title: 'Thông báo',
            content: dataError?.message || '',
            rejectLable: 'Đóng',
            onDone: close
          });
        });
    }
  }
  const handleModalSelectNetwork = () => {
    modal.open({
      render: <ModalSelectNetwork defaultValues={selected} listNextWork={listNetwork} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-100',
      classNameContainer: 'modal-full',
      classNameOverlay: '',
      onDone(data: rechrageModel.network) {
        methods.setValue('network', data);
        setSelected(data);
      }
    });
  };

  const isValid = currentTab === 'recharge' ? methods.formState.isValid : true;

  const { ref, ...rest } =
    currentTab === 'recharge'
      ? methods.register('phone', {
          onChange(event: ChangeEvent<HTMLInputElement>) {
            methods.setValue('phone', event.target.value.trim());
          },
          pattern: {
            value: phoneNumberRegex,
            message: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!'
          },
          required: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!',
          shouldUnregister: true
        })
      : ({} as any);

  const total = useMemo(() => {
    return currentTab === 'recharge'
      ? Number(methods.getValues('price'))
      : Number(methods.getValues('price')) * Number(methods.getValues('quantity'));
  }, [selected, methods.watch('price'), methods.watch('quantity')]);

  return (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      <Head>
        <title>Itel - Nạp thẻ</title>
      </Head>
      <HeaderWebDefault title="Nạp thẻ di động" withMenu withSearch />
      <div className="bg-neutral-100">
        <Breadcrumbs breadcrumbs={pages} />
      </div>
      <section className="bg-neutral-0 md:bg-transparent">
        <div className="container md:pt-8 xl:pt-14">
          <h1 className="hidden font-itel text-h-md font-bold md:block">Nạp thẻ di động</h1>
          <div className="md:mt-6">
            <div className="tabs flex-nowrap gap-x-4 whitespace-nowrap text-base scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = tab.id === currentTab;
                return (
                  <Link
                    key={tab.id}
                    href={{ pathname: Routers.RECHARGE, query: { tab: tab.id } }}
                    shallow
                    className={clsx('tab-bordered flex-nowrap gap-x-2 pt-1 md:p-4 tab tab-primary', isActive && 'tab-active')}
                  >
                    <Svg
                      src={tab.icon}
                      className={clsx('max-md:hidden', isActive ? 'text-red-500' : 'text-base-content')}
                      width={32}
                      height={32}
                    />
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="-mt-[2px] flex-1 border-b-2 border-neutral-200"></div>
        </div>
      </section>
      {/* <hr /> */}
      <section className="bg-neutral-0 md:bg-transparent">
        <div className="container mt-2 md:mt-0">
          {currentTab === 'recharge' && (
            <div className="md:mt-6 flex w-full flex-col gap-x-6 md:flex-row">
              <label className="form-control w-full md:w-2/3">
                <div className="max-md:hidden label py-4">
                  <span className="label-text text-base font-medium" aria-required={true}>
                    Số điện thoại
                  </span>
                </div>
                <div className="font-bold">
                  <input
                    className="input-bordered input md:input-lg md:h-18 border-b border-0 md:border rounded-none md:rounded-xl outline-none md:text-s-sm xl:h-20 w-full max-md:px-0"
                    id="phone-number"
                    type="tel"
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onInput={InputValue}
                    placeholder="Nhập số điện thoại"
                    maxLength={10}
                    autoFocus
                    {...rest}
                    ref={(e) => {
                      ref(e);
                      (refInputPhone as any).current = e;
                    }}
                  />
                </div>
                {methods.formState.errors.phone && (
                  <div className="mt-2 md:mt-4">
                    <p className="text-sm md:text-base bg-neutral-50 md:bg-transparent label justify-start py-1 px-2 md:p-0 text-red-500 rounded-lg">
                      <Svg className="mr-2 h-4 md:h-6 w-4 md:w-6 text-primary" src="/icons/line/danger-circle.svg" />
                      <span>{methods.formState.errors.phone.message}</span>
                    </p>
                  </div>
                )}
              </label>

              <div className="max-md:hidden form-control relative flex w-full md:w-1/3">
                <div className="label py-4">
                  <span className="label-text text-base font-medium" aria-required={true}>
                    Nhà mạng
                  </span>
                </div>
                <Listbox
                  as="div"
                  value={selected.Name}
                  onChange={(v) => {
                    let network = listNetwork.find((item) => item.Name === v);
                    network && setSelected(network);
                    network && methods.setValue('network', network);
                  }}
                  className=" relative"
                >
                  <Listbox.Button
                    type="button"
                    className="input-bordered input input-lg h-18 w-full rounded-2xl py-3 pl-6 font-bold xl:h-20"
                  >
                    <div className="h-full flex-1">
                      {selected.Name == 'Wintel' ? (
                        <img src={selected.Path} alt={selected.Name} className="h-full object-cover w-[100px]" />
                      ) : (
                        <img src={selected.Path} alt={selected.Name} className="h-full object-contain" />
                      )}
                    </div>
                    <div className="absolute inset-y-0 right-0 mr-3 flex items-center">
                      <div className="btn-tertiary btn btn-lg hidden xl:flex">Thay đổi</div>
                      <div className="xl:hidden">
                        <Svg src="/icons/bold/down.svg" width={24} height={24} />
                      </div>
                    </div>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition-default" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="absolute left-auto right-0 top-full z-10 mt-2 w-full max-w-md rounded-2xl bg-neutral-0 px-6 py-4 shadow-itel xl:left-0">
                      <div className="text-xl">
                        <b>Chọn nhà mạng</b>
                      </div>
                      <Listbox.Options className="-mx-1.5 flex flex-wrap outline-none">
                        {listNetwork.map((network, personIdx) => (
                          <Listbox.Option key={network.Name} className="xl:w-1/3  w-1/2 px-1.5 pt-4" value={network.Name}>
                            {({ selected }) => (
                              <div className={clsx('h-16  rounded-lg border px-3', selected ? 'border-red-500' : 'border-neutral-300')}>
                                <img src={network.Path} alt={network.Name} className="h-full w-full object-contain" />
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Transition>
                </Listbox>
                <p className="mt-4 text-sm font-medium text-neutral-500 ">Vui lòng lựa chọn đúng nhà mạng của bạn</p>
              </div>
            </div>
          )}
          {currentTab === 'code' && (
            <div className="max-md:hidden md:mt-14">
              <p>
                Nhà mạng <span className="text-primary">*</span>
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {listNetwork.map((item) => (
                  <div
                    key={item.Id}
                    onClick={() => {
                      methods.setValue('network', item);
                      setSelected(item);
                    }}
                    className={`flex cursor-pointer justify-center rounded-2xl border border-neutral-200 py-2  hover:border-primary ${
                      selected.Id === item.Id && 'border-primary'
                    }`}
                  >
                    {item.Name == 'Wintel' ? (
                      <img loading="lazy" alt={`logo-${item.Name}`} src={item.Path} className="inline-block  h-18 w-[150px] object-cover" />
                    ) : (
                      <img loading="lazy" alt={`logo-${item.Name}`} src={item.Path} className="inline-block  h-18 object-contain" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="md:hidden">
            <button type="button" onClick={handleModalSelectNetwork} className="flex w-full py-2 items-center">
              <div className="flex-1 text-left font-medium">Nhà mạng</div>
              <div className="flex items-center">
                {selected.Name == 'Wintel' ? (
                  <img src={selected.Path} alt={selected.Name} className="h-10 object-cover w-[90px]" />
                ) : (
                  <img src={selected.Path} alt={selected.Name} className="h-10" />
                )}
                <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
              </div>
            </button>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 md:bg-transparent md:pb-20">
        <div className="container py-4 md:py-0 mt-2 md:mt-6 xl:mt-14">
          <div className="flex flex-col justify-center">
            <p className="label-text text-base font-medium" aria-required={true}>
              Mệnh giá nạp
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center xl:grid-cols-4">
              {listTopup.map((card) => (
                <label
                  key={card.Id}
                  className="font-medium block text-center relative overflow-hidden rounded-lg md:rounded-2xl p-4 md:px-6 md:py-4.5"
                  onClick={() => methods.setValue('idProduct', card.Id)}
                >
                  <input
                    type="radio"
                    className="sr-only peer"
                    disabled={!card.IsActive}
                    hidden
                    value={card.Value}
                    {...methods.register('price', { required: true })}
                  />

                  <span className="absolute inset-0 rounded-lg md:rounded-2xl border border-neutral-200 peer-checked:border-red-500" />
                  <p className="text-xl sm:text-2xl">{toCurrency(card.Price)}</p>
                  <p className="text-sm font-medium leading-5 text-modern-red">Giá bán: {toCurrency(card.Price)}</p>
                  <span className="absolute right-0 top-0 rounded-bl-xl bg-orange px-2 text-sm font-medium text-neutral-content">
                    {-card.Discount + '%'}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="fixed md:relative bottom-0 bg-neutral-0 left-0 w-full md:mt-10 md:py-0 md:text-center">
            {currentTab === 'code' && (
              <div className="container md:p-0 py-4 border-b border-neutral-200 md:border-none">
                <div className="flex md:block text-left justify-between md:mt-14 items-center">
                  <p className="label-text text-base font-medium" aria-required>
                    Số lượng
                  </p>
                  <div className="md:mt-4">
                    <Stepper
                      className="md:stepper-lg"
                      min={1}
                      max={10}
                      {...methods.register('quantity', { valueAsNumber: true, min: 1, max: 10 })}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="container py-2 md:p-0 flex justify-between md:justify-center">
              <div className="md:hidden">
                <p className="text-sm ">Tổng tiền</p>
                <p className="font-bold">{toCurrency(total)}</p>
              </div>
              <button type="submit" className="btn-primary btn btn-lg  md:w-[12.5rem] rounded-full" disabled={!isValid}>
                {currentTab === 'recharge' ? 'Nạp ngay' : 'Mua ngay'}
              </button>
            </div>
          </div>
        </div>
      </section>
      <SectionSupports className="max-md:hidden" />
    </form>
  );
};

CardRechargePage.getLayout = function (page) {
  return (
    <>
      <LayoutDefault className="md:bg-neutral-0" footerClassName="md:bg-neutral-0">
        {page}
      </LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default CardRechargePage;
