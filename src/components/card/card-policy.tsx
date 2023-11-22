import Link from 'next/link';
import Svg from '../icon/svg';

type CardPolicyProps = {
  label?: string;
  logo?: string;
  img?: string;
  url?: string;
  title: string;
  desc?: string;
  logoBg?: string;
  phone?: string;
};

const CardPolicy = ({ title, desc, img, logo, url, logoBg, phone, label }: CardPolicyProps) => {
  const isSvg = logo?.includes('.svg');
  return (
    <article className="group card md:space-y-6 rounded-lg md:rounded-3xl border border-neutral-200 md:p-4 md:pb-6 h-full">
      <div className="card-image block-img block-photo md:block-cinema overflow-hidden rounded-t-lg md:rounded-2xl bg-base-200 center-by-grid">
        <img
          src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1684685434/itel/images/2267ecd3e1a5c7d8a9ed0a88498ce735_d9eow0.png"
          alt="policy"
          className="object-cover"
          style={{ objectPosition: '0 62%' }}
        />
        <div className="absolute text-center">
          <p className="text-xs md:text-sm text-neutral-200">Tổng đài CSKH {label}</p>
          <p className="text-lg md:text-s-sm text-neutral-0 font-bold">{phone}</p>
        </div>
        {logo && (
          <div className="absolute bottom-0 left-0">
            <span className="flex items-center tag-vector bg-red-500 px-3 h-7 md:h-9 text-neutral-0" style={{ backgroundColor: logoBg }}>
              {isSvg ? <Svg className="h-5 w-11" src={logo} /> : <img className="h-full object-contain" src={logo} alt={title} />}
            </span>
          </div>
        )}
      </div>
      <div className="card-body p-2 md:p-0">
        <h5 className="card-title md:text-xl font-bold text-base-content">{title}</h5>
        <p className="card-desc text-xs md:text-sm mt-1 md:mt-0">{desc}</p>
      </div>
      {url && (
        <div className=" card-actions mb-2 px-2">
          <Link href={url} className="btn-tertiary btn h-10 w-full rounded-full text-sm">
            Xem thêm
          </Link>
        </div>
      )}
    </article>
  );
};

export default CardPolicy;
