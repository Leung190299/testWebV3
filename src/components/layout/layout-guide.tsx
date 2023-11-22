import { PointGuideQuestion } from '@/components/pages/profiles/component/point-guide-question';
import { PropsWithChildren } from 'react';
import LayoutDefault from './layout-default';

type DefaultProps = {
  footerClassName?: string;
};
type Props = PropsWithChildren<DefaultProps & Omit<JSX.IntrinsicElements['main'], keyof DefaultProps>>;

const LayoutGuide = ({ children, footerClassName, ...rest }: Props) => {
  return (
    <LayoutDefault footerClassName={footerClassName} {...rest}>
      <section className="bg-neutral-0">
        <div className="container flex w-full gap-x-6 max-lg:px-0 pb-20 pt-4">
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </section>
      <PointGuideQuestion />
    </LayoutDefault>
  );
};

export default LayoutGuide;
