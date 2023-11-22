import brands from '@/mock/brands.json';
import option_combinations from '@/mock/option_combinations.json';
import option_value from '@/mock/option_value.json';
import options from '@/mock/options.json';
import product_attributes from '@/mock/product_attributes.json';
import variants from '@/mock/product_variants.json';
import products from '@/mock/products.json';

import { Data, Model } from '@/types/model';
import { randomBetween } from '@/utilities/number';
import { ImageService } from '../image/image';
import { omit } from '@/utilities/object';
import { giftProducts } from '../gift';

type ParamsGetList<T extends boolean> = {
  limit: number;
  skip?: number;
  q?: string;
  detail?: T;
};
export async function getListProduct<T extends boolean = false>({
  limit = 10,
  detail
}: ParamsGetList<T>): Promise<(T extends true ? Data.ProductDetail : Data.Product)[]> {
  const s = new Map<number, any>();

  while (s.size < limit) {
    const id = products[Math.floor(Math.random() * products.length)].id;
    const product = (await getProductById(id))!;
    product.installment = Math.random() > 0.5;
    if (detail) {
      s.set(product.id, product);
    } else {
      (product as any).variant = product.variants[0];
      s.set(product.id, omit(product, ['optionCombinations', 'attributes', 'options', 'variants', 'attachments']));
    }
  }
  return Array.from(s, ([, product]) => product);
}

export async function getProductById(id: number): Promise<Data.ProductDetail | null> {
  const product = products.find((prod: Model.Product) => prod.id == id);
  if (!product) return null;
  product.thumbnail = ImageService.random();
  // get linked product options
  const brand = getproductBrand(product.brand_id);
  let productOptions = getProductOptions(id);
  const price = randomBetween(40, 200); // 2 million to 10 million
  const discount_price = randomBetween(40, price);
  const productVariants = productOptions.length
    ? getProductVariants(id)
    : [
        {
          name: product.name,
          discount_percentage: Math.ceil((discount_price / price) * 100),
          sold: 888,
          discount_price: price * 50_000,
          price: price * 50_000,
          id: Math.ceil(Math.random() * 999),
          product_id: id,
          quantity: 333,
          sku: '123123',
          installment_options: []
        } as Model.Variant
      ]; // product always have atleast one variant
  const priceRange = { min: Infinity, max: 0, discount_min: Infinity, discount_max: 0 };

  // Get price range
  productVariants.forEach((variant) => {
    priceRange.min = Math.min(priceRange.min, variant.price);
    priceRange.max = Math.max(priceRange.max, variant.price);
    if (variant.discount_price) {
      priceRange.discount_min = Math.min(priceRange.min, variant.discount_price);
      priceRange.discount_max = Math.max(priceRange.min, variant.discount_price);
    }
  });

  const optionCombinations = productVariants.length
    ? option_combinations.filter((o) => productVariants.some((p) => p.id === o.variant_id))
    : [];

  const randomAttachments: Model.ProductAttachment[] = ImageService.randomArray(10).map((uri, index) => ({
    id: index,
    product_id: product.id,
    type: 'image',
    url: uri,
    thumbnail: uri
  }));

  return Object.assign({}, product, {
    variants: productVariants,
    options: productOptions,
    priceRange,
    brand,
    optionCombinations,
    attributes: product_attributes.filter((v) => v.product_id === 1),
    attachments: randomAttachments
  });
}

export function generateGiftProducts() {
  const gifts = new Map<number, Model.Gift>();

  while (gifts.size < 3) {
    const gift = giftProducts[Math.floor(Math.random() * giftProducts.length)];
    if (gifts.has(gift.id)) continue;
    else {
      gifts.set(gift.id, {
        id: gift.id,
        image: ImageService.random(),
        count: 1,
        name: gift.name,
        price: randomBetween(10, 20) * 50_000
      });
    }
  }
  return Array.from(gifts, ([_, v]) => v);
}

function getProductOptions(id: number) {
  let _options = options.filter((option) => option.product_id === id);

  const _options2 = _options.map((option) => {
    const values = option_value.filter((v) => v.option_id === option.id);
    return { ...option, options: values };
  });

  return _options2;
}
function getproductBrand(brand_id: number) {
  return brands.find((brand) => (brand.id = brand_id)) || null;
}
function getProductVariants(product_id: number) {
  return variants.filter((variant) => variant.product_id === product_id); // product always have atleast one variant
}
