import React, { CSSProperties, useMemo } from 'react';
import Svg from '../icon/svg';
import clsx from 'clsx';

type RateOjbect = { value: number; rate: number };
type CardRatingProps<R extends number> = {
  maxRating: R;
  ratings: Array<{ value: number; rate: number }>;
};
function CardRating<R extends number = number>({ maxRating, ratings }: CardRatingProps<R>) {
  const { avg, sum, count } = useMemo(() => {
    const { sum, count } = (ratings as Array<RateOjbect>).reduce(
      (obj, { value, rate }, idx) => {
        obj.sum += value * rate;
        obj.count += value;
        return obj;
      },
      { sum: 0, count: 0 }
    );
    const avg = sum / count;
    return {
      sum,
      count,
      avg: Math.round(avg * 100) / 100 // round to 1 decimal place
    };
  }, [ratings]);

  const ratingMinusOne = avg - 1;
  return (
    <div className="flex rounded-xl border border-neutral-300 p-6 text-base-content">
      <div className="flex flex-1 flex-col items-center justify-center" property="reviewRating" typeof="Rating">
        <div className="flex text-yellow-500" data-rating={avg}>
          {Array.from({ length: maxRating }, (e, i) => (
            <i
              key={i}
              style={i > ratingMinusOne ? ({ '--point': Math.max(0, ratingMinusOne - i + 1) * 100 + '%' } as CSSProperties) : undefined}
              className={clsx('icon-rating h-6 w-6', i > ratingMinusOne ? 'bg-neutral-100' : 'bg-yellow-500')}
            />
          ))}
        </div>
        <div className="mt-3 text-s-l font-bold" property="ratingValue">
          {avg}
        </div>
      </div>
      <div className="mx-12 my-5 border-r border-neutral-200"></div>
      <div className="flex-1 space-y-1 font-semibold">
        {(ratings as Array<RateOjbect>).map(({ value, rate }, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <div className="flex items-center">
              <span className="w-4 text-center tabular-nums">{rate}</span>
              <Svg src="/icons/bold/star-2.svg" width={16} height={16} className="inline-block text-yellow-500" />
            </div>
            <progress className="progress text-yellow-500" max={count} value={value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardRating;
