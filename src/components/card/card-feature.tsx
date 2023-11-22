import type { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import Image from 'next/image';
import Svg from '../icon/svg';

type Props = {
  icon?: string;
  title?: string;
  desc?: string;

  bg?: string;

  isActive?: boolean;
};

const CardFeature = ({ icon, title, desc, bg, isActive, className, ...rest }: CustomProps<Props>) => {
  return (
    <div className={clsx('group card card-feature', isActive && 'card-active', className)} {...rest}>
      {bg ? (
        <Image className="card-feature-overlay object-cover" fill  src={bg} alt={bg ? 'Image' : ''} />
      ) : (
        <div className="card-feature-overlay object-cover" />
      )}
      <div className="relative text-center my-auto">
        {icon && (
          <div>
            <Svg src={icon} className="inline h-8 w-8 xl:h-14 xl:w-14" />
          </div>
        )}
        <div className="mt-2 xl:mt-4">
          <div className="text-sm md:text-base xl:text-xl xl:font-bold">{title}</div>
          {desc && <div className="card-desc mt-1 group-hover:text-neutral-0 max-xl:hidden">{desc}</div>}
        </div>
      </div>
    </div>
  );
};

export default CardFeature;
