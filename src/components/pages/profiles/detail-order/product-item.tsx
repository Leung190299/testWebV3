import Svg from '@/components/icon/svg';
import imageCard from '@/components/pages/assets/image-sim.png';
import gift2 from '@/components/pages/assets/price-1.png';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import iconConnect from '@/components/pages/assets/icon-connect.png';

type Product = {
  productName: string;
  productDescription: string;
  price: string;
  quantity?: number;
  image?: StaticImageData;
  productChild: {
    name: string;
    icon?: boolean;
    description: string;
    price: string;
    image?: StaticImageData;
  }[];
};
const ProductItem = ({ product }: { product: Product }) => {
  const lengthChild = product.productChild.length;
  const [isShowFull, setIsShowFull] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 flex-1">
          <div className="w-[72px] h-[72px] md:w-18 md:h-18">
            <Image src={product?.image || imageCard} alt="image" />
          </div>
          <div className="flex justify-between w-2/3 items-center ">
            <div>
              <p className="text-neutral-800 text-sm md:text-base font-bold">{product.productName} </p>
              <p className="text-neutral-500 text-xs md:text-sm font-normal">{product.productDescription}</p>
            </div>
            {product.quantity && (
              <p className="md:inline-block hidden text-neutral-500 text-sm font-normal">
                Số lượng: <span className="text-neutral-800 font-bold">2</span>
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-800 text-sm md:text-base font-bold">{product.price}</p>
        </div>
      </div>
      {product.productChild.slice(0, isShowFull ? lengthChild : 2).map((dataChild) => (
        <div key={dataChild.name} className="flex flex-row justify-between items-start mt-4 ml-8">
          <div className="flex flex-row gap-4">
            <div className="w-10 h-10 flex-row relative">
              <Image src={dataChild?.image || gift2} alt="image" className="w-full" />
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-800 flex flex-row">
                {dataChild.name} {dataChild.icon && <Image src={iconConnect} alt="connect" className="ml-2" />}
              </p>
              <p className="text-xs text-neutral-500 font-normal ">{dataChild.description}</p>
            </div>
          </div>
          <div>
            <p className="text-neutral-500 text-sm font-medium">{dataChild.price}</p>
          </div>
        </div>
      ))}

      {lengthChild > 2 && (
        <>
          <hr className="border-neutral-300 mb-6 mt-6" />
          <div
            aria-hidden
            className="flex justify-center text-center w-full flex-row items-center cursor-pointer"
            onClick={() => setIsShowFull((cur) => !cur)}
          >
            {isShowFull ? (
              <div className=" text-neutral-800 text-sm font-medium pr-2">Ẩn bớt sản phẩm</div>
            ) : (
              <div className=" text-neutral-800 text-sm font-medium pr-2">Xem thêm {lengthChild - 2} sản phẩm</div>
            )}
            <Svg src="/icons/line/arrow-left.svg" width={24} height={24} className={isShowFull ? 'rotate-90' : '-rotate-90'} />
          </div>
        </>
      )}
    </>
  );
};
export default ProductItem;
