import clsx from 'clsx';
import React from 'react';

type Props = {
  title: string;
  desc?: React.ReactNode;
  rightHeader?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const SectionDetail = ({ title, rightHeader, children, className, desc }: Props) => {
  return (
    <section className={clsx('rounded-lg bg-neutral-0 px-4 md:px-8', className)}>
      <div className="py-4 md:py-5 flex items-center justify-between">
        <div>
          <h3 className="md:text-lg">
            <b>{title}</b>
          </h3>
          {desc && <div className="mt-1 text-xs md:text-sm text-subtle-content">{desc}</div>}
        </div>
        {rightHeader}
      </div>
      {children}
    </section>
  );
};

export default SectionDetail;
