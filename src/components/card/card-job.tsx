import clsx from 'clsx';
import React from 'react';
import Svg from '../icon/svg';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<{
  tags: string[];
  title: string;
  desc: string;
}>;

const CardJob = ({ title, desc, tags, className, ...rest }: Props) => {
  return (
    <div className={clsx('card bg-base-100 shadow-md', className)}>
      <div className="card-body justify-center">
        <div className="flex flex-col gap-4">
          {tags.length ? (
            <div className="card-tags">
              {tags.map((tag) => (
                <span key={tag} className="tag tag-md tag-primary">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          <h5 className="card-title text-s-md font-bold">{title}</h5>
          <p className="text-md card-desc line-clamp-3">{desc}</p>
        </div>
        <div className="card-actions mt-6">
          <button className="btn-ghost btn gap-x-2 rounded-full">
            Trải nghiệm ngay
            <Svg className="h-5 w-5" src="/icons/bold/arrow-right.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardJob;
