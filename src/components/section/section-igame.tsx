import React from 'react';

import type { CustomProps } from '@/types/element-type';

type SectionIGameGameHotProps = {
  title: React.ReactNode;
  href?: string | null;
  rightElement?: React.ReactNode;
  classNameTitle?: string | null;
};

const SectionIgame = ({ title, children, href, rightElement, classNameTitle = '', ...rest }: CustomProps<SectionIGameGameHotProps>) => {
  return (
    <section>
      <div {...rest}>
        <div className="flex items-center">
          <h2 className={`flex-1 font-itel text-xl md:text-h4 font-bold xl:text-h3 ${classNameTitle}`}>{title}</h2>
          {rightElement ? rightElement : null}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionIgame;
