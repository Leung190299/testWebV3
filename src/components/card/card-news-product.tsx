import clsx from 'clsx';
import Link from 'next/link';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<newModal.Blog> & {
  iShowButton?: boolean;
  classNameFrame?: string;
  classNameTitle?: string;
  classNameDes?: string;
  href?: string;
  haveLink?: boolean;
  isShowButton?: boolean;
};

const CardNewsProduct = ({
  Slug,
  Thumbnail,
  className,
  iShowButton = true,
  classNameFrame,
  classNameTitle,
  classNameDes,
  href,
  haveLink = true,
  isShowButton,
  ...rest
}: Props) => {
  return (
    <>
      <div className={clsx('group transition-default card overflow-hidden rounded-2xl', className)} {...rest}>
        <figure className={clsx(classNameFrame ? classNameFrame : 'aspect-video', 'overflow-hidden')}>
          {haveLink ? (
            <Link href={{ pathname: href || `/news/detail/${Slug}` }}>
              <img
                src={Thumbnail}
                alt="promotion image"
                className={clsx(!iShowButton && 'rounded-2xl', 'transition-default h-full w-full object-cover group-hover:scale-110')}
              />
            </Link>
          ) : (
            <img
              src={Thumbnail}
              alt="promotion image"
              className={clsx(!iShowButton && 'rounded-2xl', 'transition-default h-full w-full object-cover group-hover:scale-110')}
            />
          )}
        </figure>
        <div className="flex flex-col justify-between flex-1 gap-1 px-0 md:py-3 py-0 pt-3">
          {haveLink ? (
            <Link href={{ pathname: href ||`/news/detail/${Slug}` }}>
              <h5
                className={clsx(
                  classNameTitle,
                  'card-title justify-between gap-3 font-bold max-md:text-base line-clamp-1 xl:line-clamp-2 md:line-clamp-none'
                )}
              >
                {rest.Title}
              </h5>
            </Link>
          ) : (
            <h5
              className={clsx(
                classNameTitle,
                'card-title justify-between gap-3 font-bold max-md:text-base line-clamp-1 xl:line-clamp-2 md:line-clamp-none'
              )}
            >
              {rest.Title}
            </h5>
          )}
          <div className="card-actions flex-col justify-between">
            <Link href={{ pathname: href || `/news/detail/${Slug}` }}>
              <div className={clsx(classNameDes, 'card-desc md:mt-1 items-center gap-1 text-sm line-clamp-2')}>{rest.Brief}</div>
            </Link>
            <div className="card-desc md:mt-1 flex items-center gap-1 max-md:text-xs text-sm">
              {isShowButton ? <button className="btn btn-secondary rounded-full">Khám phá ngay</button> : rest.ParentName + ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNewsProduct;
