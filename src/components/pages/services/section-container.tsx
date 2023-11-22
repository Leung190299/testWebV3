import clsx from 'clsx';
import { PropsWithChildren } from 'react';

const SectionContainer = ({ className, childClassName, children }: PropsWithChildren<{ className?: string; childClassName?: string }>) => {
  return (
    <section className={className}>
      <div className={clsx('mobile-container py-4 md:py-0', childClassName)}>{children}</div>
    </section>
  );
};

export default SectionContainer;
