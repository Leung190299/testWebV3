import clsx from 'clsx';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<{
  img: string;
  title: string;
  desc: string;
  isLineClamp?: boolean;
  isLayoutTop?: boolean;
  classNameFrame?: string;
  classNameTitle?: string;
  id?: string;
  isHideDesc?: boolean;
  classRight?: string;
  classLeft?: string;
  classButton?: string;
  classNameDesc?: string;
}>;

const CardService = ({
  title,
  img,
  desc,
  className,
  isLineClamp,
  isLayoutTop,
  classNameFrame,
  classRight,
  classNameTitle,
  classNameDesc,
  id,
  isHideDesc,
  classLeft,
  classButton,
  ...rest
}: Props) => {
  if (isLayoutTop)
    return (
      <div className={clsx('group transition-default card overflow-hidden rounded-2xl', className)} {...rest}>
        <figure className={clsx(classNameFrame ? classNameFrame : 'aspect-video', 'overflow-hidden')}>
          <div className='h-full'>
            <img src={img} alt="promotion image" className="transition-default h-full w-full object-cover group-hover:scale-110" />
          </div>
        </figure>
        <div className="card-body gap-1 px-0 md:px-4 md:py-3 py-0 pt-3 lg:px-0">
          <div>
            <h5 className={clsx(classNameTitle, 'card-title justify-between gap-3 font-bold line-clamp-2 md:line-clamp-none')}>{title}</h5>
          </div>

          {!isHideDesc && (
            <div className="card-actions flex-col justify-between">
              <div className={clsx('card-desc md:mt-1 flex items-center gap-1 text-xs', classNameDesc)}>{desc}</div>
            </div>
          )}
        </div>
      </div>
    );
  return (
    <div className={clsx('flex rounded-2xl transition-default overflow-hidden group bg-neutral-0', className)} {...rest}>
      <figure className={clsx('w-full h-full aspect-photo overflow-hidden', isLineClamp && 'lg:min-w-0', classLeft)}>
        <img src={img} alt="" className="w-full h-full object-cover transition-default group-hover:scale-110" />
      </figure>

      <div className={clsx('flex flex-col gap-1 lg:p-10 px-4 py-6 lg:py-10', classRight, isLineClamp && 'lg:p-6 justify-between')}>
        <div className="flex flex-col gap-1">
          <b className={clsx(classNameTitle, isLineClamp ? 'line-clamp-2 lg:text-xl' : 'lg:text-2xl', 'md:text-xl text-neutral-800')}>
            {title}
          </b>
          <p className={clsx(classNameDesc, isLineClamp ? 'line-clamp-2 lg:text-sm' : 'lg:text-base', ' md:text-sm text-neutral-500')}>
            {desc}
          </p>
        </div>
        <div
          // href="#"
          className={clsx(
            classButton,
            isLineClamp ? 'lg:mt-0' : 'lg:btn-lg',
            'btn btn-secondary w-fit rounded-full mt-3 lg:mt-8 h-fit py-2 md:py-3 md:px-6 lg:px-10 lg:py-4'
          )}
        >
          Chi tiết
        </div>
      </div>
    </div>
  );
};

export default CardService;
