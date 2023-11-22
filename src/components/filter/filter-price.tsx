import { clamp } from '@/utilities/number';
import useControlled from '@pit-ui/modules/hooks/useControlled';
import { isUndefined } from 'lodash';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import InputSliderRange from '../input/input-slider';

type Props = {
  min: number;
  max: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?(value: [number, number]): void;

  className?: string;

  children?: React.ReactNode;
};

function FilterPrice({ min, max, step = 1, value, defaultValue, onChange, className, children }: Props) {
  const [price, setPrice] = useControlled(value, defaultValue, onChange);

  return (
    <div className={className}>
      <p className="font-bold">Mức giá</p>
      {children}
      <div className="pb-6 md:pb-8 xl:pb-0">
        <div className="form-control">
          <div className="input-bordered input-group input rounded-lg p-0">
            <NumericFormat
              className="input w-1/2 border-none outline-none px-2 disabled:text-neutral-600"
              placeholder="50.000đ"
              size={1}
              thousandSeparator=","
              suffix={' đ'}
              value={price[0]}
              onValueChange={({ floatValue }) => {
                if (isUndefined(floatValue)) return;
                setPrice([clamp(floatValue, 0, price[1]), price[1]]);
              }}
            />
            <hr className="my-auto border-r border-neutral-400 py-4" />
            <NumericFormat
              className="input w-1/2 border-none outline-none px-2 disabled:text-neutral-600"
              placeholder="1.000.000đ"
              size={1}
              thousandSeparator=","
              suffix={' đ'}
              value={price[1]}
              onValueChange={({floatValue}) => {

                if (isUndefined(floatValue)) return;
                setPrice([price[0], clamp(floatValue, price[0], 20_000_000)]);
              }}
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <InputSliderRange min={min} max={max} step={step} value={price} defaultValue={price} onChange={(e, value) => setPrice(value)} />
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
