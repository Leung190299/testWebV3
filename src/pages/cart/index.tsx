import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { useTranslation } from '@/libs/i18n';
import { NextPage } from 'next';
import Head from 'next/head';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { addToCheckout, PayloadAddSimToCart, setQuantity } from '@/store/cart/cartSlice';
import { selectCartItems } from '@/store/cart/selector';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { toCurrency } from '@/utilities/currency';
import { capitalizeFirstLetter } from '@/utilities/string';

import styles from '@/styles/cart.module.scss';

import ButtonIntallment from '@/components/button/button-installment';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import InderterminateCheckbox from '@/components/input/indeterminate-checkbox';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { selectInstallmentMethodSheet } from '@/components/modal/modal-select-installment-method';
import TableRowItem, { TableRowBreak, TableRowSubItem } from '@/components/pages/cart/table-row-item';
import { DropdownSelectGift, selectGiftModal } from '@/components/select/select-gift';

import BottomSheetAddToCart, { SimModalMode } from '@/components/modal/modal-add-sim';
import { CheckoutType, DemoStatus, INSTALLMENT_METHODS } from '@/constants/checkout.constants';

import PriceSummary from '@/components/cart/price-summary';
import StepSim from '@/components/sim/step-sim';
import { useGlobalContext } from '@/context/global';
import useCartProduct from '@/hooks/useCartProduct';
import { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { clear } from '@/store/fees/feesSlice';
import type { Cart, Model } from '@/types/model';
import { isValidCheckoutItem } from '@/utilities/checkout';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { randomBetween } from '@/utilities/number';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import clsx from 'clsx';
import _ from 'lodash';

type CartPageProps = {};
const steps: string[] = ['Chọn SIM số', 'Chọn loại SIM <br> & Gói cước', ' Thanh toán'];
const CartPage: NextPage<CartPageProps> = ({ router }) => {
  const [status, setStatus] = useState<DemoStatus>(DemoStatus.NORMAL);
  const isReached = useBoolean(false);
  const installmentAvaiable = useBoolean(false);
  const isEditSim = useBoolean(false);
  const isEditProduct = useBoolean(false);

  const relativeElement = useRef<HTMLElement | null>(null);
  const [giftData, setGiftData] = useState<{ data: Model.Gift[]; selected: number } | null>(null);
  const { products, removeCart, changeQuantity, length } = useCartProduct();
  const { user } = useGlobalContext();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => isReached.setValue(e.boundingClientRect.y < 0 ? true : e.isIntersecting), {
      threshold: [1]
    });

    ref.current ? observer.observe(ref.current) : void 0;
    return () => {
      observer.disconnect();
    };
  }, [isReached]);

  const { t } = useTranslation('common');
  const [selectedSim, setSelectedSim] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<Record<string, boolean>>({});
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const cartItems = useAppSelector(selectCartItems);

  const [productCart, setProductCart] = useState<Array<cartModel.ProductCart & { gift?: cartModel.ProductCart[] }>>([]);
  const [cartSimItems, setCartSimItems] = useState<Cart.SimItem[]>([]);
  const dispatch = useAppDispatch();

  const consvertSim = (simsvsPack: cartModel.ProductCart[]) => {
    let list: Array<{ sim: cartModel.ProductCart; pack?: cartModel.ProductCart }> = [];
    simsvsPack.forEach((item) => {
      if (item.productType == 1) {
        list.push({ sim: item, pack: simsvsPack.find((pack) => pack.cartId == item.cartId && pack.productType == 2) });
      }
    });
    return list;
  };
  const consverProduct = (products: cartModel.ProductCart[]) => {
    let list: Array<cartModel.ProductCart & { gift?: cartModel.ProductCart[] }> = [];
    products.forEach((item) => {
      if (item.productType == 8 || item.productType == 2 || item.productType == 9)
        list.push({ ...item, gift: products.filter((product) => product.cartId == item.cartId && product.productType == 10) });
    });
    return list;
  };

  const convertSelectOption = (variant: string) => {
    const data: cartModel.variantSelect[] = JSON.parse(variant);

    return _.isArray(data) ? data.map((item) => item.selected?.name).join(', ') : '';
  };

  useEffect(() => {
    autoSelectAll()
    dispatch(clear());

    const simsAndPack = products.filter((item) => item.productType == 1 || item.productType == 2);
    const productsAndSim = products.filter((item) => item.productType != 1 && item.productType != 2);

    const listSimPack = consvertSim(simsAndPack);
    const listProduct = consverProduct(productsAndSim);
    const listMap: Cart.SimItem[] = listSimPack.map(
      (item): Cart.SimItem => ({
        id: item.sim.productId || '',
        merchandise: [
          {
            quantity: item.sim.quantity || 1,

            sim: {
              phone: item.sim.productId || '',
              price: item.sim.price || 0,
              discount_price: item.sim.price || 0,
              type: item.sim.eSim ? 'esim' : 'physic',
              ThoiGianCamKet: item.sim.months
            },
            data: {
              id: item.pack?.id || 0,
              name: item.pack?.productId || '',
              price: item.pack?.price || 0,
              discount_price: item.pack?.price || 0,
              price_type: 'month',
              data: randomBetween(1, 5) * 1_000_000,
              data_type: 'month',

            }
          }
        ]
      })
    );
    setCartSimItems(listMap);
    setProductCart(listProduct);
  }, [products]);


  const autoSelectAll = () => {
    setSelectedSim(
      cartSimItems.reduce((obj, v) => {
        obj[v.id] = true;
        return obj;
      }, {} as any)
    );
    setSelectedProduct(
      productCart.reduce((obj, v) => {
        obj[v.cartId!] = true;
        return obj;
      }, {} as any)
    );
}
  const onRemoveFromCart = useCallback(
    (id: string, type: 'sim' | 'product') => {
      if (!id) return toast.error('Có gì đó không đúng');
      modal.confirm({
        title: 'Bạn muốn xóa sản phẩm?',
        content: 'Bằng việc lựa chọn "Xoá", sản phẩm sẽ không còn tồn tại trong giỏ hàng và bạn không thể quay trở lại thao tác này.',
        confirmLable: 'Xoá sản phẩm',
        rejectLable: 'Giữ sản phẩm',
        onDone() {
          removeCart(id);
          const { [id]: isSelectedProduct, ...restProduct } = selectedProduct;
          const { [id]: isSelectedSim, ...restSim } = selectedSim;
          if (type == 'sim' && isSelectedSim) setSelectedSim(restSim);
          if (type == 'product' && isSelectedProduct) setSelectedProduct(restProduct);
        }
      });
    },
    [removeCart]
  );

  const onParentCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const setSelect = e.currentTarget.dataset.item === 'list_sim' ? setSelectedSim : setSelectedProduct;
      const data = e.currentTarget.dataset.item === 'list_sim' ? cartSimItems : productCart;

      if (!e.target.indeterminate) {
        if (e.target.checked) {
          const selected: Record<string, boolean> = {};
          data.forEach((item) => {
            let product = item as cartModel.ProductCart;
            let sim = item as Cart.SimItem;
            if (product.cartId) {
              selected[product.cartId] = true;
            } else {
              selected[sim.id] = true;
            }
          });

          setSelect(selected);
        } else {
          setSelect({});
        }
      }
    },
    [productCart, cartSimItems]
  );
  const onChangeRootIndertermidate: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.target.indeterminate) {
        if (e.target.checked) {
          setSelectedSim(
            cartSimItems.reduce((obj, v) => {
              obj[v.id] = true;
              return obj;
            }, {} as any)
          );
          setSelectedProduct(
            productCart.reduce((obj, v) => {
              obj[v.cartId!] = true;
              return obj;
            }, {} as any)
          );
        } else {
          setSelectedSim({});
          setSelectedProduct({});
        }
      }
    },
    [cartItems, cartSimItems]
  );
  const handleCheckout = (type: CheckoutType = CheckoutType.Item) => {
    if (!isValidCheckoutItem(type)) return toast('Phương thức không hợp lệ');
    switch (status) {
      case DemoStatus.NORMAL:
        const simIds = Object.keys(selectedSim);
        const productIds = Object.keys(selectedProduct);
        // console.log(selectedProduct)
        if (type === CheckoutType.Item) {
          dispatch(
            addToCheckout({
              type,
              products: productCart
                .filter((item) => productIds.includes(item.cartId!.toString()))
                .map((item) => {
                  return {
                    dataCart: item
                  };
                }),
              sims: cartSimItems
                .filter(({ id }) => {
                  return simIds.includes(id);
                })
                .map(({ id, merchandise, gift }) => {
                  const giftSelected = gift?.selected[0] ? gift.byId[gift?.selected[0]] : undefined;
                  return {
                    id,
                    merchandise: merchandise.map(({ data, sim }) => ({ data, sim })),
                    gift: giftSelected
                  };
                })
            })
          );

          router.push(Routers.CHECKOUT);
        } else {
          dispatch(
            addToCheckout({
              type,
              products: []
            })
          );
          router.push(Routers.CHECKOUT_INSTALLMENT);
        }

        break;
      case DemoStatus.OUT_OF_STOCK:
        modal.confirm({
          title: 'Sản phẩm đã hết hàng',
          content:
            'Đã có người nhanh tay hơn mua hết món hàng cuối cùng trong kho với sản phẩm Sim số 0877 123 456.\nBạn vui lòng bỏ hoặc lựa chọn sản phẩm tương tự để tiếp tục thanh toán nhé!',
          rejectLable: 'Tìm sản phẩm mới',
          confirmLable: 'Bỏ sản phẩm',
          onDone() {}
        });
        break;
      case DemoStatus.PRICE_CHANGED:
        modal.confirm({
          title: 'Sản phẩm cập nhật giá',
          content:
            'Trong thời gian từ khi bạn đưa Sim số 0877 123 456 vào giỏ hàng đến nay, mức giá sản phẩm đã có cập nhật thay đổi.\nVui lòng tải lại trang để iTel cập nhật giúp bạn mức giá mới nhất trước khi tiến hành thanh toán nhé!',
          confirmLable: 'Tải lại trang',
          onDone() {}
        });
        break;
      case DemoStatus.EXPIRED_DISCOUNT:
        modal.confirm({
          title: 'Mã giảm giá hết hiệu lực',
          content:
            'Tiếc quá, một trong các mã giảm giá bạn đang lựa chọn đã hết hiệu lực sử dụng!\nVui lòng xóa hoặc lựa chọn mã giảm giá mới để tiếp tục.',
          confirmLable: 'Xóa mã',
          rejectLable: 'Chọn mã khác',
          onDone() {}
        });
        break;
      case DemoStatus.OUT_OF_STOCK_GIFT:
        modal.confirm({
          title: 'Quà tặng bạn chọn đã hết',
          content: 'Rất tiếc, Quà tặng Tai nghe Sony không dây đã hết hàng. Vui lòng chọn lại quà tặng khác ',
          confirmLable: 'Chọn lại',
          rejectLable: 'Để sau',
          onDone() {}
        });
        break;
      case DemoStatus.PRODUCT_HAS_NO_GIFT:
        modal.confirm({
          title: 'Sản phẩm đã hết quà tặng',
          content: 'Rất tiếc, Sản phẩm Điện thoại Oppo S9 đã hết quà tặng. ',
          confirmLable: 'Đã hiểu',
          onDone() {}
        });
        break;
      default:
        break;
    }
  };

  const handleChangePack = (cartItem: Cart.SimItem) => {
    const items: Model.Sim[] = cartItem.merchandise.map((mer, index) => ({
      id: index,
      phone: mer.sim.phone,
      price: mer.sim.price,
      sale_expiry: (mer.sim as any).sale_expiry,
      discount_percentage: mer.sim.discount_percentage,
      discount_price: mer.sim.discount_price,
      is_vip: mer.sim.is_vip
    }));

    modal.open({
      render: <BottomSheetAddToCart items={items} mode={SimModalMode.Change} />,
      closeButton: false,
      transition: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
      // Call back when click submit in modal,
      onDone(data: PayloadAddSimToCart) {
        toast.success('[NOTI]: FE Dev chỉ thực hiện hiển thị modal');
      }
    });
  };
  const handleSelectGift = (e: React.MouseEvent<HTMLButtonElement>, data: Model.Gift[], selected: number) => {
    if (innerWidth < 1200) return selectGiftModal({ data, selectedId: selected }, () => {});
    const parent = e.currentTarget.parentElement!;
    setGiftData({ data, selected });
    relativeElement.current = parent;
  };

  const handleInstallment = () => selectInstallmentMethodSheet(handleCheckout);

  const totalItem = productCart.length;

  const additionalNumber = 24_000;

  const totalCheckedSim = Object.keys(selectedSim).length;
  const totalCheckedProduct = Object.keys(selectedProduct).length;
  const totalCheckBox = cartSimItems.length + productCart.length;
  const totalChekedBox = totalCheckedSim + totalCheckedProduct;

  const isSelectAllSim = Object.keys(selectedSim).length === cartSimItems.length;
  const isSelectAllProduct = Object.keys(selectedProduct).length === productCart.length;
  const isSelectSomeSim = Object.keys(selectedSim).length ? !isSelectAllSim : false;
  const isSelectSomeProduct = Object.keys(selectedProduct).length ? !isSelectAllProduct : false;

  let total = useMemo(() => {
    let _total = 0;

    _total = cartSimItems.reduce((subtotal, item) => {
      let price = 0;
      if (selectedSim[item.id]) {
        item.merchandise.forEach((merchan) => {
          const { sim, data, quantity } = merchan;
          price += (sim.discount_price ?? sim.price) * quantity;
          price += data.discount_price ?? data.price;
        });
      }
      return subtotal + price;
    }, _total);

    _total = productCart.reduce((subtotal, item) => {
      if (selectedProduct[item.cartId!]) {
        return subtotal + (item.price || 0) * item.quantity! + item.gift!.reduce((res, item) => res + (item.price || 0), 0);
      }
      return subtotal;
    }, _total);

    return _total;
  }, [cartSimItems, selectedSim, selectedProduct, productCart]);

  return (
    <>
      <Head>
        <title>{`Itel - ${capitalizeFirstLetter(t('cart'))}`}</title>
      </Head>
      {/* Header mobile */}
      <HeaderWebDefault title={`Giỏ hàng (${totalCheckBox})`} withMenu withSearch />

      {/* Header tablet and pc */}
      <section className="container bg-neutral-0 md:bg-transparent md:px-0">
      <StepSim title={'Giỏ hàng'} step={2} steps={steps} />
      </section>

      <section className="container max-md:px-0 pb-9 md:pb-20">
        <div className="mt-2 md:mt-6 flex w-full flex-col gap-x-6 gap-y-2 md:gap-y-4 xl:flex-row">
          {/* Left column */}
          <div className="w-full min-w-0 text-sm">
            <table className={styles.table}>
              <thead className="md:rounded-lg font-bold">
                <tr className="z-10 shadow-itel">
                  <th className={styles.cell_first} />
                  <th className={styles.cell_checkbox}>
                    <InderterminateCheckbox
                      type="checkbox"
                      name="all"
                      value={'on'}
                      checked={isSelectAllProduct && isSelectAllSim}
                      inderterminate={totalChekedBox > 0 && totalChekedBox < totalCheckBox}
                      onChange={onChangeRootIndertermidate}
                    />
                  </th>
                  <th className="text-left" colSpan={2}>
                    Tất cả {length} sản phẩm
                  </th>
                  <th className="max-xl:hidden">Đơn giá</th>
                  <th>
                    <span className="max-xl:hidden">Số lượng</span>
                  </th>
                  <th className="text-right">
                    <span className="max-xl:hidden">Thành tiền</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className={clsx(styles.heading, 'md:rounded-lg')}>
                <tr>
                  <th className={styles.cell_first} />
                  <th className={styles.cell_checkbox}>
                    <InderterminateCheckbox
                      type="checkbox"
                      data-item="list_sim"
                      checked={cartSimItems.length > 0 && isSelectAllSim}
                      inderterminate={isSelectSomeSim}
                      onChange={onParentCheckboxChange}
                    />
                  </th>
                  <th colSpan={999}>
                    <div className="flex justify-between pr-4 items-center">
                      <p className="font-medium">Tất cả {cartSimItems.length} sim số</p>
                      <div className="text-xs font-normal text-subtle-content">
                        <p className="max-md:hidden">Đơn hàng eSim sẽ được gửi về địa chỉ email của bạn</p>
                        <p className="md:hidden font-medium text-base" onClick={isEditSim.toggle}>
                          {isEditSim.value ? 'Xong' : 'Sửa'}
                        </p>
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
              {cartSimItems.map((item, i) => {
                const isSingle = item.merchandise.length == 1;
                const desc =
                  isSingle && item.merchandise[0].sim.type == 'physic'
                    ? `Vật lý`
                    : `eSim`;
                const title = isSingle ? `Sim và Gói cước` : 'Sim đôi ưu đãi';
                const hasGift = item.gift && item.gift.selected.length !== 0;

                let price = 0;
                let discountPrice = 0;

                const Sim = item.merchandise.map((itemSim, index) => {
                  const { sim, data, quantity } = itemSim;
                  discountPrice += (sim.discount_price ?? 0) * quantity + (data.discount_price ?? 0);
                  price += sim.price * quantity + data.price;
                  const type = sim.type;
                  return (
                    <Fragment key={index}>
                      <TableRowBreak />
                      <TableRowSubItem
                        type="sim"
                        price={sim.price}
                        discountPrice={sim.discount_price != sim.price ? sim.discount_price : undefined}
                        quantity={quantity}
                        onChange={(v) => dispatch(setQuantity({ id: item.id, quantity: Number(v), phone: sim.phone }))}
                        title={formatPhoneNumber(sim.phone)}
                        typeSim={type}
                        desc={ type=='physic'
                        ? `Vật lý`
                        : `eSim`}
                      />
                      <TableRowSubItem
                        price={data.price}
                        discountPrice={data.discount_price != data.price ? data.discount_price : undefined}
                        type="pack"
                        title={'Gói ' + data.name}
                        desc={sim.ThoiGianCamKet ? `Cam kết trong ${sim.ThoiGianCamKet} tháng` : 'Cam kết trong 24 tháng'}
                        selectable
                        onSelect={() => handleChangePack(item)}
                      />
                    </Fragment>
                  );
                });
                // const Gift = hasGift && (
                //   <>
                //     <TableRowBreak />
                //     {item.gift!.selected.map((id, index) => {
                //       const gift = item.gift!.byId[id];
                //       return (
                //         <TableRowSubItem
                //           key={index}
                //           title={gift.name}
                //           img={gift.image}
                //           price={gift.price}
                //           discountPrice={0}
                //           desc="Quà tặng"
                //           selectable
                //           onSelect={(e) => handleSelectGift(e, Object.values(item.gift!.byId), id)}
                //         />
                //       );
                //     })}
                //   </>
                // );

                return (
                  <TableRowItem
                    key={i}
                    subtotalPrice={price}
                    subtotalDiscountPrice={discountPrice}
                    title={title}
                    desc={desc}
                    hasChild
                    totalRow={9}
                    onRemove={() => {
                      onRemoveFromCart(item.id, 'sim');
                    }}
                    isLast={cartSimItems.length - 1 == i}
                    checked={selectedSim[item.id] || false}
                    onSelect={() => {
                      const { [item.id]: isSelected, ...rest } = selectedSim;
                      if (isSelected) setSelectedSim(rest);
                      else setSelectedSim({ ...rest, [item.id]: true });
                    }}
                    isExpaned={isEditSim.value}
                  >
                    {Sim}
                    {/* {Gift} */}
                  </TableRowItem>
                );
              })}

              <tbody className={clsx(styles.heading, 'md:rounded-lg')}>
                <tr>
                  <th className={styles.cell_first} />
                  <th className={styles.cell_checkbox}>
                    <InderterminateCheckbox
                      type="checkbox"
                      data-item="list_product"
                      checked={productCart.length > 0 && isSelectAllProduct}
                      inderterminate={isSelectSomeProduct}
                      onChange={onParentCheckboxChange}
                    />
                  </th>
                  <th colSpan={999}>
                    <div className="flex justify-between pr-4 items-center">
                      <p className="font-medium">Tất cả {productCart.length} sản phẩm</p>
                      <div className="text-xs font-normal text-subtle-content">
                        <p className="max-md:hidden"></p>
                        <p className="md:hidden" onClick={isEditProduct.toggle}>
                          {isEditProduct.value ? 'Xong' : 'Sửa'}
                        </p>
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
              {productCart.map((item, id) => {
                const hasChild = item.gift && item.gift.length !== 0;
                // const totalRow = (item.gift ? item.gift.selected.length * 2 : 0) + 1;
                convertSelectOption(item.variant);
                let subtotal = item.price! * item.quantity!;
                let subtotalDiscount = (item.price ?? item.originPrice!) * item.quantity!;

                // total += subtotalDiscount;

                return (
                  <TableRowItem
                    key={item.id}
                    title={item.name}
                    desc={convertSelectOption(item.variant)}
                    img={item.image}
                    price={item.originPrice}
                    discountPrice={item.price}
                    subtotalPrice={subtotal}
                    subtotalDiscountPrice={subtotalDiscount}
                    editable
                    link={item.productId}
                    hasChild={item.variant}
                    totalRow={item.productType}
                    isLast={cartItems.length - 1 == id}
                    onChange={(v) => changeQuantity({ ProductId: item.productId, Quantity: Number(v), CartId: item.cartId })}
                    onRemove={() => {
                      onRemoveFromCart(item.cartId!, 'product');
                    }}
                    checked={selectedProduct[item.cartId || ''] || false}
                    onSelect={() => {
                      const { [item.cartId || '']: isSelected, ...rest } = selectedProduct;
                      if (isSelected) setSelectedProduct(rest);
                      else setSelectedProduct({ ...rest, [item.cartId || '']: true });
                    }}
                    quantity={item.quantity}
                    isExpaned={isEditProduct.value}
                  >
                    {hasChild && (
                      <>
                        <TableRowBreak />
                        {item.gift!.map((gift, index) => {
                          return (
                            <TableRowSubItem
                              key={index}
                              title={gift.productId}
                              img={'/icons/Sim.png'}
                              price={gift.price}
                              discountPrice={0}
                              desc="Sim vật lý, gói MAY"
                              selectable
                              onSelect={(e) => handleSelectGift(e, Object.values(gift), id)}
                            />
                          );
                        })}
                      </>
                    )}
                  </TableRowItem>
                );
              })}
            </table>
          </div>
          {/* Right column */}
          <div className="w-full flex-shrink-0 space-y-2 md:space-y-4 xl:w-[18.75rem]">
            <div className="md:sticky md:top-[13%]">
              {/* <div className="md:rounded-lg bg-base-100 ">
                <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selectedVouchers={selectedVouchers} />
              </div> */}

              <div className="px-4 bg-neutral-0 md:rounded-lg">
                <PriceSummary totalPrice={total || 0} />
              </div>
              <div ref={ref} className="mobile-container bg-transparent mt-4">
                <div className="flex justify-end xl:block gap-3 xl:gap-0 xl:space-y-3">
                  <button
                    onClick={() => handleCheckout()}
                    disabled={!totalChekedBox}
                    className="order-3 xl:order-none btn-primary btn md:btn-lg w-full md:w-[13.5rem] xl:w-full rounded-full"
                  >
                    Thanh toán ({totalChekedBox})
                  </button>
                  {installmentAvaiable.value && !totalCheckedSim && totalCheckedProduct ? (
                    <button
                      disabled={!totalChekedBox}
                      className="btn btn-secondary w-full md:hidden rounded-full gap-x-2"
                      onClick={handleInstallment}
                    >
                      Trả góp
                      <Svg src="/icons/bold/down.svg" width={20} height={20} />
                    </button>
                  ) : null}
                  {installmentAvaiable.value && !totalCheckedSim && totalCheckedProduct
                    ? INSTALLMENT_METHODS.map(({ desc, method, name, secondaryDesc, secondaryName }) => (
                        <ButtonIntallment
                          key={method}
                          disabled={!totalChekedBox}
                          onClick={() => handleCheckout(method)}
                          title={secondaryName || name}
                          desc={secondaryDesc || desc}
                          className="max-md:hidden w-[13.5rem] xl:w-full bg-transparent"
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={clsx(isReached.value ? 'hidden' : '', 'z-10 fixed bg-neutral-0 bottom-0 xl:hidden left-0 w-full')}>
        <div className="container md:flex justify-between pt-3 pb-4">
          <div className="flex justify-between md:block">
            <p className="text-sm md:text-base">Tổng tiền</p>
            <p className="text-md md:text-s-sm">
              <b>{toCurrency(total)}</b>
            </p>
          </div>
          <div className="flex gap-x-3 items-center">
            {installmentAvaiable.value &&
              INSTALLMENT_METHODS.map(({ desc, method, name }) => (
                <button
                  className="bg-transparent px-3 py-1.5 max-md:hidden group btn-secondary btn rounded-full border-neutral-800 text-sm text-neutral-800"
                  key={method}
                  disabled={!totalChekedBox}
                  onClick={() => handleCheckout(method)}
                >
                  <div>
                    {name}
                    <p className="text-xs text-subtle-content group-hover:text-neutral-200">{desc}</p>
                  </div>
                </button>
              ))}
            {installmentAvaiable.value && !totalCheckedSim && totalCheckedProduct ? (
              <button className="btn btn-secondary w-full md:hidden rounded-full gap-x-2" onClick={handleInstallment}>
                Trả góp
                <Svg src="/icons/bold/down.svg" width={20} height={20} />
              </button>
            ) : null}
            <button
              disabled={!totalChekedBox}
              onClick={() => handleCheckout()}
              className="order-3 xl:order-none btn-primary w-full md:w-auto btn rounded-full"
            >
              <span>Thanh toán</span>
            </button>
          </div>
        </div>
      </div>
      <DropdownSelectGift
        open={!!giftData}
        onClose={() => setGiftData(null)}
        onChange={() => {}}
        relativeElement={relativeElement}
        closeOnSelect
        selectedId={giftData?.selected}
        data={giftData ? giftData.data : []}
      />
      {/* <DebugUI className="bg-neutral-0 shadow-itel p-2 rounded-xl">
        <DebugUI.OptionsList options={statusCart} onChange={(v) => setStatus(v.value)} checkedValue={status} />
        <div className="mt-2 text-xs">
          <label className="flex items-center gap-x-2">
            <input checked={installmentAvaiable.value} onChange={installmentAvaiable.toggle} type="checkbox" className="h-4 w-4" />
            Trả góp
          </label>
        </div>
      </DebugUI> */}
    </>
  );
};

CartPage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();

export default CartPage;
export { getStaticProps };
