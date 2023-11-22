import React from 'react';

type Props = {
  image?: string;
  title: string;
  desc: string;
  onClick?(): void;
};

function CardServiceNew({ image, title, desc, onClick }: Props) {
  return (
    <div className="card card-side bg-base-100 py-3 md:py-0 md:rounded-2xl">
      <figure className="w-28 md:w-[18.375rem] xl:w-[23.625rem] shrink-0 overflow-hidden max-md:rounded-lg">
        <div className="h-full block-img block-square md:block-photo overflow-hidden relative">
          <img src={image} alt={title} className="absolute inset-0 object-cover h-full w-full" />
        </div>
      </figure>
      <div className="card-body justify-center px-4 py-0 md:py-4 md:px-6 xl:p-10">
        <div className="">
          <h5 className="card-title text-sm md:text-lg xl:text-s-sm font-bold">{title}</h5>
          <p className="max-md:hidden card-desc mt-1 line-clamp-2 text-xs md:text-sm">{desc}</p>
        </div>
        <div className="mt-4 xl:mt-8">
          <button type="button" onClick={onClick} className="btn-secondary btn btn-sm md:btn-md xl:btn-lg rounded-full xl:w-[8.5rem]">
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

function CardServiceSmall({ image, title, desc, onClick }: Props) {
  return (
    <div className="card card-side bg-base-100 py-3 md:py-0 md:rounded-2xl">
      <figure className="w-28 md:w-[18.375rem] xl:w-[19.625rem] shrink-0 overflow-hidden max-md:rounded-lg">
        <div className="h-full block-img block-square md:block-photo overflow-hidden relative">
          <img src={image} alt={title} className="absolute inset-0 object-cover h-full w-full" />
        </div>
      </figure>
      <div className="card-body justify-center px-4 py-0 md:py-4 md:px-6">
        <div className="">
          <h5 className="card-title text-sm md:text-lg font-bold line-clamp-2">{title}</h5>
          <p className="max-md:hidden card-desc mt-1 line-clamp-2 text-xs md:text-sm">{desc}</p>
        </div>
        <div className="mt-4 xl:mt-8">
          <button type="button" onClick={onClick} className="btn-secondary btn btn-sm md:btn-md xl:btn-sm rounded-full">
            Chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}
export { CardServiceSmall };
export default CardServiceNew;
