import useControlled from '@pit-ui/modules/hooks/useControlled';
import clsx from 'clsx';
import React from 'react';

type Props = {
  active?: number;
  total: number;
  onClick?(index: number): void;
  theme?: 'dark' | 'light';
};

const PaginationBullets = ({ total = 3, active, theme, onClick }: Props) => {
  const [activeIndex, setActiveIndex] = useControlled(active, 0, onClick);
  const isLight = theme === 'light';
  return (
    <ul className="pag-ctrl">
      {Array(total)
        .fill(1)
        .map((_, index) => {
          return (
            <li key={index}>
              <button
                className={clsx('pag-bullet page-sm md:pag-md', isLight && 'bg-base-100', activeIndex === index ? 'pag-active' : '')}
                onClick={() => setActiveIndex(index)}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default PaginationBullets;
