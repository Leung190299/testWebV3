import React from 'react';
import SectionHeader from './section-header';
import clsx from 'clsx';

type Props = {
  className?: string;
  title: string;
  desc?: string;
  disableDivide?: boolean;
} & JSX.IntrinsicElements['section'];

const Section = ({ title, desc, disableDivide, children, className, ...rest }: Props) => {
  return (
    <section className={clsx('mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-4', className)} {...rest}>
      <div className="mobile-container">
        <SectionHeader title={title} desc={desc} />
      </div>
      {!disableDivide && <hr className="border-neutral-200" />}
      {children}
    </section>
  );
};

export default Section;
