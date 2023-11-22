/* eslint-disable react-hooks/exhaustive-deps */
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import CardPolicy from '@/components/card/card-policy';
import { variantsTranslateWithoutOpacity } from '@/components/carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '@/components/carousel/full-carousel';
import Comment from '@/components/comment/comment';
import DropdownShare from '@/components/dropdown/dropdown-share';
import HeaderWebDefault from '@/components/header/header-web-default';
import Svg from '@/components/icon/svg';
import LayoutImall from '@/components/layout/layout-imall';
import ListProduct from '@/components/list/list-product';
import ModalReview from '@/components/modal/modal-reviews';
import ModalSharePost from '@/components/modal/modal-share-post';
import PriceListProduct from '@/components/price/price-list-product';
import RatingProductDetail from '@/components/rating/rating-product-detail';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import Stepper from '@/components/stepper/stepper';
import TagSale from '@/components/tag-chip/tag-sale';
import styles from '@/styles/rich-text.module.scss';
import { Data, Model } from '@/types/model';

import { CheckoutType } from '@/constants/checkout.constants';
import useSlider from '@/hooks/useSlider';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';

import HeaderAppDefault from '@/components/header/header-app-default';
import VariantProduct from '@/components/product/variant-product';
import SkeletonDetailImall from '@/components/skeleton/skeletonDetailImall';
import HTMLContent from '@/components/text/html-content';
import useCartProduct from '@/hooks/useCartProduct';
import Modal, { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import imallService from '@/services/imallService';
import useProduct from '@/store/cart/hooks/product';
import useProductDetail from '@/store/cart/hooks/product-detail';
import { copyTextToClipboard } from '@/utilities/copy';
import { toCurrency } from '@/utilities/currency';
import { AxiosError } from 'axios';
import { useInView } from 'framer-motion';
import _ from 'lodash';
import { useRouter } from 'next/router';

type PageProps = {
  product: Data.ProductDetail;
  similarProducts: Data.Product[];
  flashSaleExpiry?: number;
  isFlashSale?: boolean;
  gifts: Array<Model.Gift>;
};

const tabs = [
  { id: 'content', title: 'Thông tin sản phẩm' },
  { id: 'system', title: 'Cấu hình' },
  // { id: 'rating', title: 'Đánh giá' },
  { id: 'policy', title: 'Mua hàng & bảo hành' }
];

const typeProduct = {
  SIM: 1,
  Package: 2,
  Gift: 3,
  VNPAY_Topup: 4,
  VNPAY_Card: 5,
  PJICO_MotorFree: 6,
  PJICO_CarFee: 7,
  oppo: 8,
  baseus: 9,
  SIM_GIFT: 10
};
const orderType = {
  oppo: 3,
  baseus: 4
};

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
function isVariantArray(arr: any[]): arr is imallModel.Variant[] {
  return arr.length > 0 && arr[0].variant_type;
}
const ImallDetailPage: NextPage<PageProps> = ({ product, similarProducts, flashSaleExpiry, isFlashSale }) => {
  const { likeItem, liked } = useProduct();
  const router = useRouter();
  const { slug } = router.query;
  const modalComment = useBoolean(false);
  const slider = useSlider({ totalSlide: 5 + 1 });
  const installmentAvaiable = useBoolean(false);
  const [selectedRate, setSelectedRate] = useState(rateDefault.id);
  const [selectedTab, setSelectedTab] = useState('content');
  const [detailProduct, setDetailProduct] = useState<imallModel.ProductDetail>({});
  const [images, setImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<imallModel.Variant[] | imallModel.VariantBaseus[]>([]);
  const [products, setProducts] = useState<imallModel.Product[]>([]);
  const [gifts, setGifts] = useState<imallModel.NewGift[]>([]);
  const [attributes, setAttributes] = useState<object>({});
  const [view, setView] = useState<number>(0);
  const [selectVariant, setSelectVariant] = useState<boolean>(false);
  const [simData, setSimData] = useState<imallModel.ResultSimSeach>({});
  const [priceProduct, setPriceProduct] = useState<{ price: number; base_price: number }>({
    price: 0,
    base_price: 0
  });
  const [isLoad, setIsLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { value: isShow, toggle } = useBoolean(false);
  const { addProduct } = useCartProduct();
  const [loadSim, setLoadSim] = useState<boolean>(false);
  const isInview = useInView(ref, { margin: '-64px 0px -64px 0px' });

  const [comments, setComments] = useState<Array<Model.Comment>>([]);
  const viewMoreComment = useBoolean(false);

  const [rateSelected, setRateSelected] = useState<Rate>(rateDefault);
  const methods = useForm<cartModel.ProductCart & { variant: any; gift: imallModel.ResultSimSeach }>();
  const { handleCheckoutItem } = useProductDetail();

  const convertJson = <T extends unknown>(json: string): T => {
    return JSON.parse(json) as T;
  };

  //   useEffect(() => {
  //     CommentService.list({ limit: 10, product_id: product.id, skip: 0, rating: rateSelected.rate }).then((p) => setComments(p));
  //   }, [product.id, rateSelected.rate]);

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

  // const selectedOptionValue = useWatch({
  //   name: product.options.map((option, index) => `options.${index}.option_value`) as `options.${number}.option_id`[],
  //   control: methods.control
  // });

  // Take variant from selectedOptionsValue
  // const variant = useMemo(() => {
  //   if (!product.options.length) return optimizedVariants.variants[0];
  //   if (selectedOptionValue && selectedOptionValue.every((v) => Boolean(v)))
  //     return optimizedVariants.variantByOption[selectedOptionValue.join('_')];
  // }, [selectedOptionValue, optimizedVariants.variantByOption]);

  const handleBuy = (type: CheckoutType = CheckoutType.Item) => {
    if (type === CheckoutType.BuyCode || type == CheckoutType.BuyData || type === CheckoutType.Recharge) return;
    methods.handleSubmit((values) => {
      const variantBaseus = getVariantBaseus(values.variant);
      if (values.gift && values.gift.Phone) {
        handleCheckoutItem(
          type,
          {
            ...values,
            name: detailProduct.product_name,
            origin_type: detailProduct.origin_type,
            originPrice: priceProduct.base_price,
            price: priceProduct.price,
            variant: detailProduct.origin_type == 'baseus' ? variantBaseus : values.variant,
            // @ts-expect-error
            gift: [{ productId: values.gift.Phone, price: Number(values.gift.PackPrice), id: values.gift.Phone }]
          },
          detailProduct.origin_type == 'baseus'
            ? undefined
            : [
                {
                  ...detailProduct,
                  config: convertJson<any>(detailProduct.config!),
                  categories: convertJson<any>(detailProduct.categories!),
                  meta: convertJson<any>(detailProduct.meta!),
                  attributes: convertJson<any>(detailProduct.attributes!),
                  images: convertJson<any>(detailProduct.images!),
                  variants: values.variant,
                  quantity: values.quantity
                },
                simData
              ]
        );
      } else {
        handleCheckoutItem(
          type,
          {
            ...values,
            name: detailProduct.product_name,
            origin_type: detailProduct.origin_type,
            originPrice: priceProduct.base_price,
            price: priceProduct.price,
            variant: detailProduct.origin_type == 'baseus' ? variantBaseus : values.variant,
            // @ts-expect-error
            gift: []
          },
          detailProduct.origin_type == 'baseus'
            ? undefined
            : [
                {
                  ...detailProduct,
                  config: convertJson<any>(detailProduct.config!),
                  categories: convertJson<any>(detailProduct.categories!),
                  meta: convertJson<any>(detailProduct.meta!),
                  attributes: convertJson<any>(detailProduct.attributes!),
                  images: convertJson<any>(detailProduct.images!),
                  variants: values.variant,
                  quantity: values.quantity
                }
              ]
        );
      }
      router.push(type === CheckoutType.Item ? Routers.CHECKOUT : Routers.CHECKOUT_INSTALLMENT);
    })();
  };

  const totalPrice: number = useMemo(
    () => methods.getValues('price')! * methods.getValues('quantity')!,
    [methods.watch('quantity'), methods.watch('productId')]
  );

  const getVariantBaseus = (id: string): imallModel.VariantBaseus => {
    if (!isVariantArray(variants)) {
      return variants.find((item) => item.barcode == id) || {};
    }
    return {};
  };

  const handleAddToCart: SubmitHandler<cartModel.ProductCart & { gift?: imallModel.ResultSimSeach }> = (values) => {
    const variantBaseus = getVariantBaseus(values.variant);

    addProduct([
      {
        orderType: orderType[detailProduct.origin_type || 'oppo'],
        cartDetails: values.gift?.Phone
          ? [
              {
                ...values,
                // @ts-expect-error
                gift: undefined,
                name: detailProduct.product_name,
                originPrice: priceProduct.base_price,
                price: priceProduct.price,
                origin_type: detailProduct.origin_type || '',
                variant: detailProduct.origin_type == 'baseus' ? variantBaseus : values.variant
              },
              {
                productType: 10,
                productId: values.gift.Phone
              }
            ]
          : [
              {
                ...values,
                gift: undefined,
                originPrice: priceProduct.base_price,
                price: priceProduct.price,
                name: detailProduct.product_name,
                origin_type: detailProduct.origin_type || '',
                variant: detailProduct.origin_type == 'baseus' ? variantBaseus : values.variant
              }
            ]
      }
    ]);
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
    var headerOffset = 150;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const variant: Array<imallModel.Variant & { selected: imallModel.VariantItem }> | string = useWatch({
    name: 'variant',
    control: methods.control
  });

  useEffect(() => {
    if (slug) {
      getDetail(slug.toString());
      getsimData();
    }
  }, [slug]);

  const getsimData = async () => {
    try {
      setLoadSim(true);
      const res = await imallService.getSimSearchData();
      if (res.code == 200) {
        setSimData(res.result[0]);
      }
    } catch (error) {
      const errorData = error as AxiosError;
      const dataError: imallModel.response = errorData.response?.data as imallModel.response;
      toast.error(dataError.message);
    } finally {
      setLoadSim(false);
    }
  };

  const getDetail = async (slug: string) => {
    setIsLoad(false);
    const res = await imallService.getProductDetail(slug);
    if (res.code == 200) {
      setIsLoad(true);
      methods.setValue('productId', slug);
      methods.setValue('originPrice', res.result?.base_price || 0);
      methods.setValue('price', res.result?.price || 0);
      methods.setValue('quantity', 1);
      methods.setValue('productType', typeProduct[res.result?.origin_type || 'oppo']);
      setView(Math.floor(Math.random() * 500));
      setDetailProduct(res.result);
      setPriceProduct({ price: res.result.price || 0, base_price: res.result.base_price || 0 });
      if (res.result.images) {
        const _images = convertJson<imallModel.ImageProduct[]>(res.result.images);
        setImages(
          _images.map((item) => {
            if (item.src) return item.src;
            return item.image_url!;
          })
        );
        methods.setValue('image', _images[0].src || _images[0].image_url);
      }
      if (res.result.variants) {
        const _variants = convertJson<imallModel.Variant[] | imallModel.VariantBaseus[]>(res.result.variants!);
        setVariants(_variants);
      }
      if (res.result.attributes) {
        const _attributes = convertJson<object>(res.result.attributes!);
        setAttributes(_attributes);
      }
      if (res.result.categories) {
        const _categories = convertJson<imallModel.CategoryProductDetail[]>(res.result.categories);
        getProductsList(_categories[0].slug || '');
      }
      if (res.result.new_gifts) {
        setGifts(res.result.new_gifts);
      }
    }
  };

  const getProductsList = async (Slug: string) => {
    const param: imallModel.IPramsProduct = {
      columnFilters: {
        Slug
      },
      sort: [
        {
          field: 'price',
          type: 'desc'
        }
      ],
      page: 1,
      pageSize: 10,
      lang: 1
    };
    const res = await imallService.getProducts(param);
    if (res.code == 200) {
      setProducts(res.result);
    }
  };

  let isVariant = useMemo(() => {
    let _isVariant = true;

    if (variants.length <= 0) {
      return false;
    }
    if (typeof variant == 'string') {
      return false;
    }

    if (!_.isEmpty(variant)) {
      variant.forEach((item) => {
        _isVariant = !item.selected;
      });
    }

    return _isVariant;
  }, [variants, variant]);

  return (
    <>
      <Head>
        <title>{`Imall - ${detailProduct.product_name}`}</title>
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
              <li className="text-neutral-800 line-clamp-1">
                <Link href={router.asPath}>{detailProduct.product_name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {!isLoad ? (
        <SkeletonDetailImall />
      ) : (
        <section className="md:bg-neutral-0">
          <div className="md:pt-6 max-md:px-0 container grid w-full gap-x-12 md:gap-y-10 text-subtle-content xl:grid-cols-[1fr,30.8125rem]">
            {/* Product images */}
            <div className="bg-neutral-0 md:bg-transparent overflow-hidden">
              <div className="order-1 flex w-auto flex-col gap-2 overflow-hidden md:-mx-10 xl:mx-0 xl:flex-row-reverse">
                <div className="mx-auto w-full flex-1 md:max-w-[33rem] xl:max-w-[39.75rem] xl:w-auto box-content md:px-10 xl:px-0">
                  <FullCarousel
                    index={slider.index}
                    onSlide={slider.onSlide}
                    numItems={images.length}
                    className="block-img block-square overflow-hidden md:rounded-xl"
                  >
                    <FullCarouselItem variants={variantsTranslateWithoutOpacity} index={slider.index} direction={-slider.direction}>
                      <img
                        key={images[slider.index]}
                        loading="lazy"
                        src={images[slider.index]}
                        draggable={false}
                        className="md:rounded-xl w-full h-full bg-base-200 object-contain center-by-grid"
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
                        {slider.index + 1}/{images.length}
                      </span>
                    </span>
                  </FullCarousel>
                </div>
                <div className="relative w-full xl:w-20">
                  <div className="inset-0 xl:absolute">
                    <div className="flex gap-3 overflow-auto px-4 scrollbar-hide xl:h-full md:px-10 xl:flex-col xl:px-0">
                      {images.map((attachment, index) => {
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
                      <div className="text-sm text-subtle-content uppercase">{detailProduct.origin_type}</div>
                      <h2 className="font-itel text-h-xs md:text-h3 font-bold md:font-medium text-base-content">
                        {detailProduct.product_name}
                      </h2>
                    </div>
                    <div className="hidden relative space-x-3">
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
                            itemImage={images[0]}
                            itemName={detailProduct.product_name!}
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
                    <RatingProductDetail rate={4.5} view={view} />
                    <div className="hidden text-base-content">
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
                    discountPrice={priceProduct.price}
                    price={priceProduct.base_price}
                    discountPercentage={Math.floor(((priceProduct.base_price - priceProduct.price) / priceProduct.base_price) * 100)}
                  />

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
                    {variants.length != 0 && (
                      <VariantProduct
                        setSelectVariant={setSelectVariant}
                        selectVariant={selectVariant}
                        changePrice={setPriceProduct}
                        methods={methods}
                        variants={variants}
                      />
                    )}

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
                    {gifts.length > 0 && <p>Quà tặng kèm</p>}
                    <ul className="space-y-2 md:space-y-4">
                      {gifts.map(
                        (gift, i) =>
                          !_.isEmpty(gift) && (
                            <li key={i}>
                              <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                                {/* <input type="radio" value={i} className="relative z-10 peer" {...methods.register('gift')} /> */}
                                <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                                <div className="ml-3 md:ml-4 relative w-14 flex justify-center items-center">
                                  <Svg src="/icons/others/gift.svg" width={30} height={30} />
                                </div>
                                <div className="ml-3 md:ml-4 relative card-body p-0">
                                  <h5 className="text-sm line-clamp-2 font-bold text-base-content">{gift.content}</h5>
                                </div>
                              </label>
                            </li>
                          )
                      )}
                      <li>
                        {/* {detailProduct.origin_type != 'baseus' && (
                          <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                            {Object.entries(simData).map(([key, value]) => {
                              if (key == 'Phone')
                                return (
                                  <input
                                    key={key}
                                    type="checkbox"
                                    value={value}
                                    className="relative peer z-10"
                                    {...methods.register(`gift.${key}`)}
                                  />
                                );

                              return (
                                <input
                                  key={key}
                                  type="hidden"
                                  value={value}
                                  className="relative peer z-10"
                                  // @ts-expect-error
                                  {...methods.register(`gift.${key}`)}
                                />
                              );
                            })}
                            <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                            <div className="ml-3 md:ml-4 relative w-14 flex-shrink-0">
                              <div className="card-image block-img block-square shrink-0 overflow-hidden rounded-lg md:rounded-2xl bg-base-200">
                                <img className="object-cover" src={'/icons/Sim.png'} alt={simData.Phone} />
                                <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                                  <Svg src="/icons/others/gift.svg" width={16} height={16} />
                                </div>
                              </div>
                            </div>
                            <div className="ml-3 md:ml-4 relative card-body p-0">
                              <h5 className="text-sm line-clamp-2 font-bold text-base-content">
                                Tặng Sim số {formatPhoneNumber(simData.Phone || '')}
                              </h5>
                              <p className="max-md:hidden card-desc text-xs">Gói cước iTel {simData.Pack}</p>
                            </div>
                            <div className="ml-2 md:ml-4 relative flex items-center md:flex-row-reverse gap-x-2 md:gap-x-3">
                              <div className="div text-right">
                                <p className="font-bold text-base-content">{toCurrency(simData.Price || 0)}</p>
                                <p className="text-xs">{toCurrency(simData.PackPrice || 0)}</p>
                              </div>
                              <button
                                type="button"
                                className={clsx('md:p-1', loadSim && 'animate-spin')}
                                style={{ animationDirection: 'reverse' }}
                                onClick={() => getsimData()}
                              >
                                <Svg src="/icons/line/feather-icon.svg" width={24} height={24} />
                              </button>
                            </div>
                          </label>
                        )} */}
                      </li>
                    </ul>
                  </div>
                  <div ref={ref} className="max-md:hidden pt-6">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-center">
                      <button
                        type="submit"
                        className="btn-secondary btn btn-lg rounded-full border-neutral-800 text-neutral-800"
                        disabled={isVariant}
                      >
                        Thêm vào giỏ
                      </button>
                      <button
                        type="button"
                        className="btn-primary btn btn-lg rounded-full"
                        onClick={() => handleBuy()}
                        disabled={isVariant}
                      >
                        Mua ngay
                      </button>

                      {/* {detailProduct.origin_type == 'oppo' &&
                        INSTALLMENT_METHODS.map((method) => (
                          <ButtonIntallment
                            key={method.method}
                            type="button"
                            disabled={isVariant}
                            data-payment={method.method}
                            onClick={() => handleBuy(method.method)}
                            title={method.tertiaryName || method.name}
                            desc={method.secondaryDesc || method.desc}
                          />
                        ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
            {/* Products info */}
            <div className="order-3 min-w-0 mt-2 md:mt-0">
              <div className="sticky top-[8%] px-4 md:p-0 bg-neutral-0  z-10">
                <div className="border-b border-neutral-200">
                  <div className="tabs -mb-px flex-nowrap gap-x-8 overflow-auto whitespace-nowrap scrollbar-hide">
                    {detailProduct.origin_type == 'baseus'
                      ? tabs
                          .filter((item) => item.id != 'system')
                          .map((tab) => (
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
                          ))
                      : tabs.map((tab) => (
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
                <HTMLContent data={detailProduct.description!} className={'md:mt-8'} />
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: `
									  {
										"@context": "https://schema.org/",
										"@type": "Product",
										"name": "${detailProduct.product_name}",
										"image": "${images[0]}",
										"description": "${detailProduct.description}",
										"brand": "${detailProduct.origin_type}",
										"sku": "${detailProduct.sku}",
										"offers": {
										  "@type": "Offer",
										  "url": "https://v3.itel.vn${router.asPath}",
										  "priceCurrency": "VND",
										  "price": "${detailProduct.price}",
										  "priceValidUntil": "31/12/2025",
										  "availability": "Thttps://schema.org/InStock",
										  "itemCondition": "https://schema.org/NewCondition"
										},
										"aggregateRating": {
										  "@type": "AggregateRating",
										  "ratingValue": "${detailProduct.rates}",
										  "bestRating": "${5}",
										  "worstRating": "${detailProduct.rates}",
										  "ratingCount": "${detailProduct.rates}",
										  "reviewCount": "${detailProduct.rates}"
										}
										}
									  `
                  }}
                />
              </div>
              {/* System */}
              {Object.entries(attributes).length > 0 && (
                <>
                  <div className={clsx(styles.rich, isShow ? '' : styles.hide)}>
                    <div id="system" className="pb-4 pt-6 px-4 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="system">
                      <h2 className="text-s-sm font-bold text-base-content">Cấu hình {detailProduct.product_name}</h2>
                      <table className="text-sm md:text-base mt-6 w-full">
                        <tbody>
                          {Object.entries(attributes).map((item: any) => (
                            <tr key={item[0]} className="-mx-2 odd:bg-neutral-100">
                              <td className="w-4/12 pl-4 pr-2 py-3 capitalize">{item[0].split('_').join(' ')}</td>
                              <td className="pl-2 pr-4 py-3 font-bold text-base-content">{item[1]}</td>
                            </tr>
                          ))}

                          {/* {attributes.map((attribute) => (
                  <tr key={attribute.id} className="-mx-2 odd:bg-neutral-100">
                    <td className="w-4/12 pl-4 pr-2 py-3">{attribute.name}</td>
                    <td className="pl-2 pr-4 py-3 font-bold text-base-content">{attribute.value}</td>
                  </tr>
                ))} */}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={toggle}
                      className="max-md:text-base-content btn-ghost btn-sm md:btn-md md:btn-secondary btn w-[12.5rem] rounded-full"
                    >
                      <span>{!isShow ? 'Xem thêm' : 'Thu gọn'}</span>
                      <span className="md:hidden">
                        <Svg src="/icons/line/chevron-down.svg" width={20} height={20} />
                      </span>
                    </button>
                  </div>
                </>
              )}

              {/* Rating */}
              {/* <div id="rating" className="px-4 py-6 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="rating">
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
              </div> */}
              {/* purchase policy */}
              <section id="policy" className="px-4 py-6 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="purchase policy">
                <h2 className="text-s-sm font-bold text-base-content">Chính sách mua hàng</h2>
                <div className="-mx-2 mt-6 flex">
                  <div className="w-full px-2">
                    <CardPolicy
                      phone="0877 087 087"
                      title="MUA HÀNG & VẬN CHUYỂN"
                      desc="Liên hệ ngay với iTel khi Bạn cần hỗ trợ các vấn đề phát sinh trong quá trình mua hàng và vận chuyển."
                      logo="/logo/logo-color.svg"
                    />
                  </div>
                  <div className="w-full px-2">
                    <CardPolicy
                      label={detailProduct.origin_type === 'baseus' ? 'Baseus' : 'OPPO'}
                      phone={detailProduct.origin_type === 'baseus' ? '0287 109 95 96' : '1800 577 776 '}
                      title="BẢO HÀNH CHÍNH HÃNG"
                      desc={
                        detailProduct.origin_type === 'baseus'
                          ? 'Baseus Vietnam áp dụng chính sách bảo hành 1 đổi 1 cho tất cả các sản phẩm của Baseus được phân phối chính hãng bởi Baseus Việt Nam. Thời gian bảo hành tùy theo từng loại sản phẩm.'
                          : 'Liên hệ ngay với OPPO khi Quý khách cần hỗ trợ các vấn đề khi mua hàng.'
                      }
                      logo={detailProduct.origin_type === 'baseus' ? '/logo/logo-baseus.png' : '/logo/logo-oppo.png'}
                      logoBg={detailProduct.origin_type === 'baseus' ? '#ffff00' : '#fff'}
                      url={
                        detailProduct.origin_type === 'baseus'
                          ? 'https://baseus.vn/pages/chinh-sach-bao-hanh/'
                          : 'https://support.oppo.com/vn/service-center/'
                      }
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
      <div
        className={clsx(isInview ? 'hidden' : undefined, 'fixed z-10 xl:hidden w-full bottom-0 bg-neutral-0 border-t border-neutral-200')}
      >
        <div className="container py-2 flex -mx-1.5">
          <div className="max-md:hidden flex-1">
            <p className="text-sm text-neutral-500">Tổng tiền</p>
            <p className="text-s-sm font-bold">{toCurrency(totalPrice)}</p>
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
                  //     variant,
                  //     data: detailProduct,
                  //     dataCart: methods.getValues(),
                  //     simGift: '',
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
              {/* <div className="relative px-1.5 max-md:hidden group">
                <button className="btn btn-secondary w-full rounded-full text-base-content border-base-content" type="button">
                  Trả góp
                  <Svg src="/icons/bold/down.svg" width={20} height={20} />
                </button>
                <div className="absolute left-0 bottom-full pointer-events-none opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto">
                  <ul className="mb-2 menu p-2 bg-neutral-0 rounded-[1.25rem] shadow-itel z-10">
                    {detailProduct.origin_type == 'oppo' &&
                      INSTALLMENT_METHODS.map((installment) => (
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
              </div> */}
              <div className="max-md:hidden px-1.5">
                <button
                  disabled={isVariant}
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
              <button
                className="btn btn-secondary w-full rounded-full"
                disabled={isVariant}
                type="button"
                onClick={methods.handleSubmit(handleAddToCart)}
              >
                Thêm vào giỏ
              </button>
            </div>
          )}
          <div className="flex-1 md:flex-none px-1.5">
            <button
              className="btn btn-primary w-full rounded-full"
              disabled={isVariant}
              type="button"
              onClick={
                () => handleBuy()
                // modalSelectProduct({
                //   gifts,
                //   variant:variants,
                //   data: detailProduct,
                //   setPriceProduct:setPriceProduct,
                //   dataCart: methods.getValues(),
                //   simGift: '',
                //   flashSaleExpiry,
                //   isFlashSale
                // })
              }
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      {/* Similar product */}
      <SectionProduct title="Sản phẩm tương tự" className=" container py-16">
        <ListProduct products={products.filter((item) => item.id !== detailProduct.id)} maxItem={{ tablet: 6 }} />
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
      {/* <DebugUI>
        <div className="bg-neutral-0 shadow-itel p-4 rounded-md">
          <label className="flex items-center gap-x-2">
            <input checked={installmentAvaiable.value} onChange={installmentAvaiable.toggle} type="checkbox" />
            Trả góp
          </label>
        </div>
      </DebugUI> */}
    </>
  );
};

ImallDetailPage.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutImall footerClassName="bg-neutral-50">{page}</LayoutImall>
    </>
  );
};

export default ImallDetailPage;
