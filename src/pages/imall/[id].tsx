/* eslint-disable react-hooks/exhaustive-deps */
import { Listbox, Menu } from '@headlessui/react';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { generateGiftProducts, getListProduct, getProductById } from '@/services/product/product';

import ButtonIntallment from '@/components/button/button-installment';
import CardPolicy from '@/components/card/card-policy';
import CardRating from '@/components/card/card-rating';
import { variantsTranslateWithoutOpacity } from '@/components/carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '@/components/carousel/full-carousel';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Comment from '@/components/comment/comment';
import DropdownShare from '@/components/dropdown/dropdown-share';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import LayoutImall from '@/components/layout/layout-imall';
import ModalReview from '@/components/modal/modal-reviews';
import ModalSharePost from '@/components/modal/modal-share-post';
import PriceListProduct from '@/components/price/price-list-product';
import RatingProductDetail from '@/components/rating/rating-product-detail';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import Stepper from '@/components/stepper/stepper';
import TagSale from '@/components/tag-chip/tag-sale';

import { Data, Model } from '@/types/model';

import { CheckoutType, INSTALLMENT_METHODS } from '@/constants/checkout.constants';
import useSlider from '@/hooks/useSlider';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';

import { modal } from '@/libs/modal';
import Routers from '@/routes/routers';

import DebugUI from '@/components/common/debug';
import HeaderAppDefault from '@/components/header/header-app-default';
import Modal from '@/libs/modal';
import { CommentService } from '@/services/comment/comment';
import { ImageService } from '@/services/image/image';
import useProduct from '@/store/cart/hooks/product';
import useProductDetail from '@/store/cart/hooks/product-detail';
import { IForm } from '@/types/form';
import { copyTextToClipboard } from '@/utilities/copy';
import { toCurrency } from '@/utilities/currency';
import { withoutMobile } from '@/utilities/function';
import { useInView } from 'framer-motion';

type PageProps = {
  product: Data.ProductDetail;
  similarProducts: Data.Product[];
  flashSaleExpiry?: number;
  isFlashSale?: boolean;
  gifts: Array<Model.Gift>;
  simGift: any;
};

const tabs = [
  { id: 'content', title: 'Thông tin sản phẩm' },
  { id: 'system', title: 'Cấu hình' },
  { id: 'rating', title: 'Đánh giá' },
  { id: 'policy', title: 'Mua hàng & bảo hành' }
];

type Rate = { id: number; rate?: number; value?: number; name: string };
const rates = [
  { id: 2, rate: 5, value: 99, name: '5 sao' },
  { id: 3, rate: 4, value: 66, name: '4 sao' },
  { id: 4, rate: 3, value: 33, name: '3 sao' },
  { id: 5, rate: 2, value: 22, name: '2 sao' },
  { id: 6, rate: 1, value: 11, name: '1 sao' }
];
const rateDefault = { id: 1, rate: undefined, name: 'Tất cả' };
const rateWithDefault = [rateDefault, ...rates];

const ImallDetailPage: NextPage<PageProps> = ({ router, product, similarProducts, flashSaleExpiry, isFlashSale, gifts, simGift }) => {
  const { addToCart, likeItem, liked } = useProduct();
  const modalComment = useBoolean(false);
  const slider = useSlider({ totalSlide: product.attachments.length + 1 });
  const installmentAvaiable = useBoolean(false);
  const [selectedRate, setSelectedRate] = useState(rateDefault.id);
  const [selectedTab, setSelectedTab] = useState('content');
  useEffect(() => {
    setSelectedTab('content');
  }, [router.query.id]);
  const ref = useRef<HTMLDivElement>(null);

  const isInview = useInView(ref, { margin: '-64px 0px -64px 0px' });

  const [comments, setComments] = useState<Array<Model.Comment>>([]);
  const viewMoreComment = useBoolean(false);

  const [rateSelected, setRateSelected] = useState<Rate>(rateDefault);
  const methods = useForm<IForm.FormSelectItem>();
  const { optimizedVariants, handleCheckoutItem } = useProductDetail(product);

  useEffect(() => {
    CommentService.list({ limit: 10, product_id: product.id, skip: 0, rating: rateSelected.rate }).then((p) => setComments(p));
  }, [product.id, rateSelected.rate]);

  useEffect(() => {
    function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      if (e.currentTarget.getAttribute('target') === '_blank') return;
      if (e.currentTarget.href.startsWith('/') || e.currentTarget.href.includes(window.location.hostname)) {
        e.preventDefault();
        router.push(e.currentTarget.href);
      }
    }
    document.querySelectorAll('.rich_content a').forEach((e) => {
      e.addEventListener('click', handleClick as any);
    });
    return () => {
      document?.querySelectorAll('.rich_content a').forEach((e) => {
        e.removeEventListener('click', handleClick as any);
      });
    };
  }, []);
  useEffect(() => {
    methods.reset({});
  }, [router.asPath]);

  const selectedOptionValue = useWatch({
    name: product.options.map((option, index) => `options.${index}.option_value`) as `options.${number}.option_id`[],
    control: methods.control
  });

  // Take variant from selectedOptionsValue
  const variant = useMemo(() => {
    if (!product.options.length) return optimizedVariants.variants[0];
    if (selectedOptionValue && selectedOptionValue.every((v) => Boolean(v)))
      return optimizedVariants.variantByOption;
  }, [selectedOptionValue, optimizedVariants.variantByOption]);

  const handleBuy = (type: CheckoutType = CheckoutType.Item) => {
    if (type === CheckoutType.BuyCode || type == CheckoutType.BuyData || type === CheckoutType.Recharge) return;
    methods.handleSubmit((values) => {
      if (!variant) return toast.error('Vui lòng chọn biến thể');

      const gift = gifts.find((gift) => gift.id === Number(values.gift)) || gifts[0];
      // handleCheckoutItem(type, variant, gift);
      router.push(type === CheckoutType.Item ? Routers.CHECKOUT : Routers.CHECKOUT_INSTALLMENT);
    })();
  };

  const handleAddToCart: SubmitHandler<IForm.FormSelectItem> = (values) => {
    // if (!variant) return;
    // addToCart(
    //   variant,
    //   product,
    //   gifts.length
    //     ? {
    //         gift: {
    //           id: values.gift,
    //           options: gifts
    //         }
    //       }
    //     : {}
    // );
  };

  function handleCopy() {
    copyTextToClipboard(window.location.href).then(() => toast.success('Đã sao chép đường dẫn đến sản phẩm'));
  }
  function handleShare() {
    toast.success('Chia sẻ sản phẩm thành công');
  }
  const handleReview = useCallback(() => {
    modal.open({
      render({ close }) {
        return (
          <ModalReview
            onClose={close}
            itemImage={product.thumbnail}
            itemName={product.name}
            itemPrice={product.priceRange.min}
            itemDesc="123123123"
          />
        );
      },
      className: 'modal-box shadow-itel md:max-w-[45rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
      closeButton: true
    });
  }, [product]);
  const handleModalShare = useCallback(() => {
    modal.open({
      render: (
        <ModalSharePost
          withLink
          itemImage={product.thumbnail}
          itemName={product.name}
          itemDesc="123123123"
          href={window.location.href}
          onCopy={handleCopy}
          onShare={handleShare}
        />
      ),
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-bottom-sheet md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  }, [product]);

  const handleScrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    setSelectedTab(id);
    var headerOffset = 96;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const mergedImage = useMemo(() => [product.thumbnail, ...product.attachments.map((v) => v.thumbnail!)], [product]);
  const img = mergedImage[slider.index];

  return (
    <>
      <Head>
        <title>{`Imall - ${product.name}`}</title>
      </Head>
      <HeaderWebDefault title="Chi tiết sản phẩm" type="fixed" withMenu withCart withSearch />
      <section className="max-md:hidden md:bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.IMALL}> Trang chủ </Link>
              </li>
              <li>
                <Link href={Routers.IMALL_DEVICE}>Điện thoại, thiết bị</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>{product.name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="md:bg-neutral-0">
        <div className="md:pt-6 max-md:px-0 container grid w-full gap-x-12 md:gap-y-10 text-subtle-content xl:grid-cols-[1fr,30.8125rem]">
          {/* Product images */}
          <div className="bg-neutral-0 md:bg-transparent overflow-hidden">
            <div className="order-1 flex w-auto flex-col gap-2 overflow-hidden md:-mx-10 xl:mx-0 xl:flex-row-reverse">
              <div className="mx-auto w-full flex-1 md:max-w-[33rem] xl:max-w-[39.75rem] xl:w-auto box-content md:px-10 xl:px-0">
                <FullCarousel
                  index={slider.index}
                  onSlide={slider.onSlide}
                  numItems={mergedImage.length}
                  className="block-img block-square overflow-hidden md:rounded-xl"
                >
                  <FullCarouselItem variants={variantsTranslateWithoutOpacity} index={slider.index} direction={-slider.direction}>
                    <img
                      key={img}
                      loading="lazy"
                      src={img}
                      draggable={false}
                      className="md:rounded-xl w-full h-full bg-base-200 object-cover center-by-grid"
                      alt="image"
                    />
                  </FullCarouselItem>
                  {isFlashSale && (
                    <div className="md:hidden absolute bottom-0 left-0">
                      <TagSale className="tag-sm flex rounded-l-[0.25rem]">
                        <TagSale.Icon />
                        <TagSale.Timer expiry={flashSaleExpiry} />
                      </TagSale>
                    </div>
                  )}
                  <span className="md:hidden absolute right-2 bottom-2">
                    <span className="tag  bg-neutral-0 text-base-content border-none tag-sm">
                      {slider.index + 1}/{mergedImage.length}
                    </span>
                  </span>
                </FullCarousel>
              </div>
              <div className="relative w-full xl:w-20">
                <div className="inset-0 xl:absolute">
                  <div className="flex gap-3 overflow-auto px-4 scrollbar-hide xl:h-full md:px-10 xl:flex-col xl:px-0">
                    {mergedImage.map((attachment, index) => {
                      return (
                        <div key={attachment + index} className="h-20 w-20 flex-shrink-0 select-none">
                          <img
                            src={attachment}
                            draggable={false}
                            alt="123123"
                            className="h-full w-full rounded-xl bg-base-200 object-cover"
                            loading="lazy"
                            role="button"
                            onClick={() => slider.onChange(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Side */}
          <form onSubmit={methods.handleSubmit(handleAddToCart)} className="order-2 xl:row-span-2">
            <div className="sticky divide-y divide-neutral-200">
              <div className="px-4 py-4 md:p-0 bg-neutral-0 md:bg-transparent space-y-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm text-subtle-content">{product.brand?.name}</div>
                    <h2 className="font-itel text-h-xs md:text-h3 font-bold md:font-medium text-base-content">{product.name}</h2>
                  </div>
                  <div className="max-md:hidden relative space-x-3">
                    <Menu>
                      <Menu.Button type="button" className="transition-default btn-tertiary btn btn-circle max-xl:hidden">
                        <Svg src="/icons/bold/share.svg" width={24} height={24} />
                      </Menu.Button>
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-[25rem] origin-top-right rounded-2xl shadow-itel"
                        data-theme="light"
                      >
                        <DropdownShare
                          withLink
                          itemImage={product.thumbnail}
                          itemName={product.name}
                          itemDesc="123123123"
                          href={typeof window !== 'undefined' ? window.location.href : '/'}
                          onCopy={handleCopy}
                          onShare={handleShare}
                        />
                      </Menu.Items>
                    </Menu>
                    <button
                      type="button"
                      className="transition-default btn-tertiary btn btn-circle xl:hidden duration-200"
                      onClick={handleModalShare}
                    >
                      <Svg src="/icons/bold/share.svg" width={24} height={24} />
                    </button>
                    <button type="button" className="transition-default btn-tertiary btn btn-circle duration-200" onClick={likeItem}>
                      {liked ? (
                        <Svg className="text-red-500" src="/icons/others/heart.svg" width={24} height={24} />
                      ) : (
                        <Svg src="/icons/others/heart-stroke.svg" width={24} height={24} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <RatingProductDetail rate={4.5} view={2203} />
                  <div className="md:hidden text-base-content">
                    <button type="button" className="mr-4" onClick={likeItem}>
                      {liked ? (
                        <Svg className="text-red-500" src="/icons/others/heart.svg" width={24} height={24} />
                      ) : (
                        <Svg src="/icons/others/heart-stroke.svg" width={24} height={24} />
                      )}
                    </button>
                    <button type="button" onClick={handleModalShare}>
                      <Svg src="/icons/bold/share.svg" width={24} height={24} />
                    </button>
                  </div>
                </div>
                <PriceListProduct
                  isFlasSale={isFlashSale}
                  className="items-center gap-x-2"
                  itemClassName="text-2xl font-bold items-center flex flex-row gap-x-2"
                  // discountPrice={variant?.discount_price || product.priceRange.discount_min}
                  // price={variant?.price || product.priceRange.max}
                  discountPercentage={20} price={0}                />

                {isFlashSale && (
                  <TagSale className="max-md:hidden rounded-l-[0.25rem]">
                    <TagSale.Icon />
                    <TagSale.Timer expiry={flashSaleExpiry} />
                  </TagSale>
                )}
              </div>
              <div className="mt-2 md:mt-6 md:pb-6 space-y-2 md:space-y-0">
                {/* <ProductOptions /> */}
                <div className="p-4 md:p-0 bg-neutral-0 md:bg-transparent">
                  {product.options.map((option, index) => {
                    return (
                      <dl key={option.id} className="space-y-2 py-3">
                        <dt>{option.name}</dt>
                        <input
                          type="text"
                          hidden
                          {...methods.register(`options.${index}.option_id`, {
                            value: option.id,
                            valueAsNumber: true,
                            shouldUnregister: true
                          })}
                        />
                        <dd className="flex flex-wrap gap-2 text-base-content">
                          {option.options.map((op) => {
                            return (
                              <Fragment key={op.id}>
                                <label>
                                  <input
                                    type="radio"
                                    className="peer"
                                    hidden
                                    value={op.id}
                                    {...methods.register(`options.${index}.option_value`, { valueAsNumber: true, shouldUnregister: true })}
                                  />
                                  <span className="font-medium text-sm block peer-checked:bg-red-600 peer-checked:border-red-600 border rounded-lg border-neutral-200 peer-checked:text-neutral-0 py-2 px-4">
                                    {op.value}
                                  </span>
                                </label>
                              </Fragment>
                            );
                          })}
                        </dd>
                      </dl>
                    );
                  })}
                  <div className="flex justify-between md:block md:space-y-2 py-3">
                    <p>Số lượng</p>
                    <Stepper
                      className="w-min"
                      min={1}
                      max={100}
                      {...methods.register('quantity', {
                        min: 1,
                        max: 100,
                        valueAsNumber: true,
                        value: 1
                      })}
                    />
                  </div>
                </div>
                <div className="px-4 md:px-0 bg-neutral-0 md:bg-transparent space-y-2 py-3">
                  <p>Quà tặng kèm</p>
                  <ul className="space-y-2 md:space-y-4">
                    {gifts.map((gift, i) => (
                      <li key={i}>
                        <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                          <input type="radio" value={i} className="relative z-10 peer" {...methods.register('gift')} />
                          <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                          <div className="ml-3 md:ml-4 relative w-14 flex-shrink-0">
                            <div className="card-image block-img block-square shrink-0 overflow-hidden rounded-lg md:rounded-2xl bg-base-200">
                              <img className="object-cover" src={gift.image} alt={gift.name} />
                              <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                                <Svg src="/icons/others/gift.svg" width={16} height={16} />
                              </div>
                            </div>
                          </div>
                          <div className="ml-3 md:ml-4 relative card-body p-0">
                            <h5 className="text-sm line-clamp-2 font-bold text-base-content">{gift.name}</h5>
                            <p className="max-md:hidden card-desc text-xs">{gift.count} chiếc</p>
                          </div>
                          <div className="ml-2 md:ml-4 relative div min-w-[5rem] text-right">
                            <p className="font-bold text-base-content">{toCurrency(0)}</p>
                            <p className="text-xs">
                              <s>{toCurrency(gift.price)}</s>
                            </p>
                          </div>
                        </label>
                      </li>
                    ))}
                    <li>
                      <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                        <input type="radio" value={'sim'} className="relative peer z-10" {...methods.register('gift')} />
                        <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                        <div className="ml-3 md:ml-4 relative w-14 flex-shrink-0">
                          <div className="card-image block-img block-square shrink-0 overflow-hidden rounded-lg md:rounded-2xl bg-base-200">
                            <img className="object-cover" src={simGift.image} alt={simGift.phone} />
                            <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                              <Svg src="/icons/others/gift.svg" width={16} height={16} />
                            </div>
                          </div>
                        </div>
                        <div className="ml-3 md:ml-4 relative card-body p-0">
                          <h5 className="text-sm line-clamp-2 font-bold text-base-content">Tặng Sim số {simGift.phone}</h5>
                          <p className="max-md:hidden card-desc text-xs">Gói cước iTel 77k</p>
                        </div>
                        <div className="ml-2 md:ml-4 relative flex items-center md:flex-row-reverse gap-x-2 md:gap-x-3">
                          <div className="div text-right">
                            <p className="font-bold text-base-content">{toCurrency(0)}</p>
                            <p className="text-xs">
                              <s>{toCurrency(simGift.price)}</s>
                            </p>
                          </div>
                          <button type="button" className="md:p-1 hover:animate-spin " style={{ animationDirection: 'reverse' }}>
                            <Svg src="/icons/line/feather-icon.svg" width={24} height={24} />
                          </button>
                        </div>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div ref={ref} className="max-md:hidden pt-6">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-center">
                  <button
                    type="submit"
                    className="btn-secondary btn btn-lg rounded-full border-neutral-800 text-neutral-800"
                    // disabled={!variant || !variant.quantity}
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    type="button"
                    className="btn-primary btn btn-lg rounded-full"
                    onClick={() => handleBuy()}
                    // disabled={!variant || !variant.quantity}
                  >
                    Mua ngay
                  </button>
                  {INSTALLMENT_METHODS.map((method) => (
                    <ButtonIntallment
                      key={method.method}
                      type="button"
                      data-payment={method.method}
                      onClick={() => handleBuy(method.method)}
                      title={method.tertiaryName || method.name}
                      desc={method.secondaryDesc || method.desc}
                    />
                  ))}
                </div>
              </div>
            </div>
          </form>
          {/* Products info */}
          <div className="order-3 min-w-0 mt-2 md:mt-0">
            <div className="sticky md:static top-12 px-4 md:p-0 bg-neutral-0 md:bg-transparent z-10">
              <div className="border-b border-neutral-200">
                <div className="tabs -mb-px flex-nowrap gap-x-8 overflow-auto whitespace-nowrap scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      type="button"
                      className={clsx(
                        'block tab-bordered border-red-500 border-opacity-0 p-4 text-base tab',
                        tab.id == selectedTab && 'tab-active'
                      )}
                      onClick={() => handleScrollIntoView(tab.id)}
                      key={tab.id}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4 px-4 md:p-0 bg-neutral-0 md:bg-transparent">
              {/* HTML */}
              <div id="content" className="md:mt-8" aria-label="content">
                {/* <HTMLContent /> */}
              </div>
            </div>
            {/* System */}
            <div id="system" className="pb-4 pt-6 px-4 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="system">
              <h2 className="text-s-sm font-bold text-base-content">Cấu hình Điện thoại OPPO Reno8 T 5G 256GB</h2>
              <table className="text-sm md:text-base mt-6 w-full">
                <tbody>
                  {product.attributes.map((attribute) => (
                    <tr key={attribute.id} className="-mx-2 odd:bg-neutral-100">
                      <td className="w-4/12 pl-4 pr-2 py-3">{attribute.name}</td>
                      <td className="pl-2 pr-4 py-3 font-bold text-base-content">{attribute.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="max-md:text-base-content btn-ghost btn-sm md:btn-md md:btn-secondary btn w-[12.5rem] rounded-full"
                >
                  <span>Xem thêm</span>
                  <span className="md:hidden">
                    <Svg src="/icons/line/chevron-down.svg" width={20} height={20} />
                  </span>
                </button>
              </div>
            </div>
            {/* Rating */}
            <div id="rating" className="px-4 py-6 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="rating">
              <div className="pb-2 md:pb-0 border-b md:border-none border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-s-sm font-bold text-base-content">Đánh giá</h2>
                  <button className="md:hidden flex items-center gap-x-1 text-base-content text-sm">
                    Tất cả
                    <Svg src="/icons/line/chevron-right.svg" height={16} width={16} />
                  </button>
                  <div className="max-md:hidden relative">
                    <Listbox value={rateSelected} onChange={setRateSelected}>
                      <Listbox.Button
                        className={({ open }) => clsx('btn-filter btn gap-x-2 rounded-full px-6', open ? 'text-red-500' : '')}
                      >
                        {rateSelected.name}
                        <Svg src="/icons/bold/down.svg" width={24} height={24} />
                      </Listbox.Button>
                      <Listbox.Options
                        as="ul"
                        className="menu absolute right-0 z-10 mt-2 w-64 rounded-lg p-2 font-medium shadow-itel outline-none"
                        data-theme="light"
                      >
                        {rateWithDefault.map((rate) => {
                          return (
                            <Listbox.Option
                              as="li"
                              className={({ selected }) => (selected ? 'menu-active' : '')}
                              key={rate.id}
                              value={rate}
                            >
                              <button>{rate.name}</button>
                            </Listbox.Option>
                          );
                        })}
                      </Listbox.Options>
                    </Listbox>
                  </div>
                </div>
                <div className="md:hidden mt-1">
                  <div className="flex justify-between">
                    <RatingProductDetail rate={4.4} rateCount={2203} />
                  </div>
                </div>
              </div>
              <div className="md:mt-6">
                <div className="max-md:hidden">
                  <CardRating maxRating={5} ratings={rates} />
                </div>
                <div className="space-y-6 divide-y divide-neutral-200 text-base-content">
                  {(viewMoreComment.value ? comments : [comments[0], comments[1], comments[2]].filter(Boolean)).map((comment) => (
                    <Comment
                      key={comment.id}
                      userName={comment.user_name}
                      userAvatar={comment.user_avatar}
                      userRating={comment.user_rating}
                      createdAt={comment.created_at}
                      content={comment.content}
                      className="pt-6 first:block hidden md:block"
                      attachments={comment.attachments}
                    />
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 px-0 py-4 xl:px-16">
                  <button
                    type="button"
                    onClick={handleReview}
                    className="btn-secondary btn w-full flex-1 gap-2 whitespace-nowrap rounded-full md:w-1/2"
                  >
                    <Svg width={24} height={24} src="/icons/bold/edit.svg" />
                    Viết đánh giá
                  </button>
                  <button
                    type="button"
                    onClick={withoutMobile(viewMoreComment.setTrue, modalComment.toggle)}
                    className="btn-secondary btn w-full flex-1 gap-2 whitespace-nowrap rounded-full md:w-1/2"
                  >
                    <span className="max-md:hidden">Xem 340 đánh giá</span>
                    <span className="md:hidden">Xem tất cả</span>
                    <Svg width={24} height={24} src="/icons/line/chevron-right.svg" />
                  </button>
                </div>
              </div>
            </div>
            {/* purchase policy */}
            <section id="policy" className="px-4 py-6 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="purchase policy">
              <h2 className="text-s-sm font-bold text-base-content">Chính sách mua hàng</h2>
              <div className="-mx-2 mt-6 flex">
                <div className="w-full px-2">
                  <CardPolicy
                    title="MUA HÀNG & VẬN CHUYỂN"
                    desc="Liên hệ ngay với iTel khi Quý khách cần hỗ trợ các vấn đề khi mua hàng."
                    logo="/logo/logo-color.svg"
                    url="/"
                  />
                </div>
                <div className="w-full px-2">
                  <CardPolicy
                    title="BẢO HÀNH CHÍNH HÃNG"
                    desc="Liên hệ ngay với OPPO khi Quý khách cần hỗ trợ các vấn đề khi mua hàng."
                    logo="https://res.cloudinary.com/dt1oay7cv/image/upload/v1687348573/itel/images/c1a123da1e75579e2191475f0ef2ac33_gfa9nh.png"
                    logoBg="white"
                    url="/"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <div
        className={clsx(isInview ? 'hidden' : undefined, 'fixed z-10 xl:hidden w-full bottom-0 bg-neutral-0 border-t border-neutral-200')}
      >
        <div className="container py-2 flex -mx-1.5">
          <div className="max-md:hidden flex-1">
            <p className="text-sm text-neutral-500">Tổng tiền</p>
            {/* <p className="text-s-sm font-bold">{toCurrency(variant?.discount_price || product.priceRange.discount_min)}</p> */}
          </div>
          {installmentAvaiable.value ? (
            <>
              <div className="px-1.5 md:hidden">
                <button className="btn-tertiary btn btn-circle" type="button" onClick={methods.handleSubmit(handleAddToCart)}>
                  <Svg src="/icons/bold/cart.svg" width={20} height={20} />
                </button>
              </div>
              <div className="px-1.5 flex-1 md:hidden">
                <button
                  className="btn btn-secondary w-full rounded-full"
                  type="button"
                  // onClick={() =>
                  //   modalSelectProduct({
                  //     gifts,
                  //     product,
                  //     simGift,
                  //     flashSaleExpiry,
                  //     isFlashSale,
                  //     type: 'installment'
                  //   })
                  // }
                >
                  Trả góp
                  <Svg src="/icons/bold/down.svg" width={20} height={20} />
                </button>
              </div>
              <div className="relative px-1.5 max-md:hidden group">
                <button className="btn btn-secondary w-full rounded-full text-base-content border-base-content" type="button">
                  Trả góp
                  <Svg src="/icons/bold/down.svg" width={20} height={20} />
                </button>
                <div className="absolute left-0 bottom-full pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto">
                  <ul className="mb-2 menu p-2 bg-neutral-0 rounded-[1.25rem] shadow-itel z-10">
                    {INSTALLMENT_METHODS.map((installment) => (
                      <li key={installment.method}>
                        <button type="button" className="text-left block w-full" onClick={() => handleBuy(installment.method)}>
                          <div className="w-max">
                            <p className="font-bold">{installment.name}</p>
                            <p className="font-medium text-subtle-content">{installment.desc}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="max-md:hidden px-1.5">
                <button
                  className="btn btn-secondary w-full rounded-full text-base-content border-base-content"
                  type="button"
                  onClick={methods.handleSubmit(handleAddToCart)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 md:flex-none px-1.5">
              <button className="btn btn-secondary w-full rounded-full" type="button" onClick={methods.handleSubmit(handleAddToCart)}>
                Thêm vào giỏ
              </button>
            </div>
          )}
          <div className="flex-1 md:flex-none px-1.5">
            <button
              className="btn btn-primary w-full rounded-full"
              type="button"
              // onClick={() =>
              //   modalSelectProduct({
              //     gifts,
              //     product,
              //     simGift,
              //     flashSaleExpiry,
              //     isFlashSale
              //   })
              // }
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      {/* Similar product */}
      <SectionProduct title="Sản phẩm tương tự" className="max-md:hidden container py-16">
        {/* <ListProduct products={similarProducts} maxItem={{ tablet: 3 }} /> */}
      </SectionProduct>
      <SectionSupports className="md:hidden" />
      <Modal open={modalComment.value} className="modal-full" transition={false} classNameOverlay="bg-neutral-100">
        <Modal.ModalBody className="modal-box shadow-itel bg-neutral-100" onClose={undefined}>
          <HeaderAppDefault mode="close" title="Đánh giá (340)" onClose={modalComment.setFalse}>
            <ul className="flex overflow-auto scrollbar-hide px-4 textsm font-medium gap-x-2 pb-3">
              {rateWithDefault.map((rate) => {
                return (
                  <li
                    key={rate.id}
                    onClick={() => setSelectedRate(rate.id)}
                    className={clsx(
                      rate.id === selectedRate ? 'border-red-600 bg-red-600 text-neutral-0' : 'border-neutral-200',
                      'px-4 py-2 rounded-md border whitespace-nowrap'
                    )}
                  >
                    {rate.id == 1 ? (
                      <span>Tất cả</span>
                    ) : (
                      <span className="flex items-center gap-x-2">
                        {7 - rate.id}
                        <Svg src="/icons/bold/star-2.svg" width={16} height={16} className="inline-block text-yellow-500" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </HeaderAppDefault>
          <div className="mt-2 mobile-container pb-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                userName={comment.user_name}
                userAvatar={comment.user_avatar}
                userRating={comment.user_rating}
                createdAt={comment.created_at}
                content={comment.content}
                className="pt-6"
                attachments={comment.attachments}
              />
            ))}
            <div className="mt-2">
              <button
                type="button"
                onClick={handleReview}
                className="btn-primary btn w-full flex-1 gap-2 whitespace-nowrap rounded-full md:w-1/2"
              >
                <Svg width={24} height={24} src="/icons/bold/edit.svg" />
                Viết đánh giá
              </button>
            </div>
          </div>
        </Modal.ModalBody>
      </Modal>
      <DebugUI>
        <div className="bg-neutral-0 shadow-itel p-4 rounded-md">
          <label className="flex items-center gap-x-2">
            <input checked={installmentAvaiable.value} onChange={installmentAvaiable.toggle} type="checkbox" />
            Trả góp
          </label>
        </div>
      </DebugUI>
    </>
  );
};

ImallDetailPage.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutImall footerClassName="bg-neutral-50">{page}</LayoutImall>
      <ChatBoxLazy />
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id;
  if (!id) return { notFound: true };
  const [product, products] = await Promise.all([getProductById(Number(id)), getListProduct({ limit: 4 })]);
  const gifts: Model.Gift[] = [...generateGiftProducts()];
  const simGift = { type: 'sim', phone: '087.4553322', image: ImageService.random(), price: 880_000 };

  if (!product) return { notFound: true };
  const flashSaleExpiry = product.sale_expiry ? new Date(product.sale_expiry).getTime() : 0;
  return {
    props: {
      product,
      similarProducts: products,
      flashSaleExpiry,
      isFlashSale: flashSaleExpiry ? flashSaleExpiry > Date.now() : false,
      gifts,
      simGift
    }
  };
});
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }, { params: { id: '3' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}
export { getStaticProps };
export default ImallDetailPage;
