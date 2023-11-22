import clsx from 'clsx';
import Link from 'next/link';

type SectionFilmBannerItem = {
  id: number;
  label: string;
  href: string;
  onClick?(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
  image: string;
};

type SectionFilmBannerProps = {
  bannerData: SectionFilmBannerItem[];
};

const SectionFilmBanner = ({ bannerData }: SectionFilmBannerProps) => {
  return (
    <div className="grid md:grid-cols-4 md:gap-4 gap-3 grid-cols-2 ">
      {bannerData.map((banner) => (
        <Link href={banner.href} key={banner.id} onClick={banner.onClick}>
          <div
            className={clsx(
              'cursor-pointer overflow-hidden rounded-lg aspect-cinema flex items-center justify-center bg-center bg-cover relative'
            )}
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="absolute inset-0 bg-overlay-popup/[.5]" />
            <p className="font-itel font-bold text-xl text-neutral-0 relative z-10">{banner.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SectionFilmBanner;
