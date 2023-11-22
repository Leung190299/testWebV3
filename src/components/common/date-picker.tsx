import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useControlled from '@pit-ui/modules/hooks/useControlled';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { moveToLeft } from '@/utilities/array';
import { withoutMobile } from '@/utilities/function';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Direction } from '../carousel/full-carousel';
import Svg from '../icon/svg';

type Props = {
  value?: Date | string;
  onChange?(date: Date): void;
  disabledBefore?: Date | string;
};

function fetchMonthDates(currentMonth: number, currentYear: number, offset = 0) {
  // Lấy số ngày trong tháng hiện tại
  var daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Lấy ngày đầu tiên của tháng
  var firstDay = new Date(currentYear, currentMonth, 1).getDay();

  var days = [];

  for (var i = offset; i < daysInMonth + firstDay; i++) {
    // var day = document.createElement('div');
    let item = null;
    if (i >= firstDay) {
      item = i - firstDay + 1;
    }
    days.push(item);
  }
  return days;
}

const dayOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

const DatePicker = (props: Props) => {
  const [selectedDate, setDate] = useControlled(
    props.value ? (props.value instanceof Date ? props.value : new Date(props.value)) : undefined,
    new Date(),
    props.onChange
  );

  const [renderingYear, setRenderingYear] = useState(() => selectedDate.getFullYear());
  const [renderingMonth, setRenderingMonth] = useState(() => selectedDate.getMonth());

  const selectedDay = selectedDate.getDate();
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const offset = 1;

  const days = useMemo(() => fetchMonthDates(renderingMonth, renderingYear, offset), [renderingMonth, renderingYear]);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const { day, month, year } = e.currentTarget.dataset;
    const date = new Date(Number(year), Number(month), Number(day));
    setDate(date);
  };
  const onChangeMonth = (direction: Direction) => {
    const nextMonth = renderingMonth + direction;
    if (nextMonth > 11) {
      setRenderingMonth(0);
      setRenderingYear(renderingYear + 1);
    } else if (nextMonth < 0) {
      setRenderingMonth(11);
      setRenderingYear(renderingYear - 1);
    } else {
      setRenderingMonth(nextMonth);
    }
  };
  const onChangeYear = (direction: Direction) => {
    const nextYear = renderingYear + direction;
    setRenderingYear(nextYear);
  };

  useEffect(() => {
    if (props.value) {
      const date = props.value instanceof Date ? props.value : new Date(props.value);
      setRenderingMonth(date.getMonth());
      setRenderingYear(date.getFullYear());
    }
  }, [props.value]);

  return (
    <div className="w-[20.5rem]">
      <div className="flex gap-x-4 font-bold text-center">
        <div className="flex py-2 items-center rounded-full hover:bg-neutral-100 w-1/2">
          <button type="button" className="p-1 items-center" onClick={() => onChangeYear(Direction.PREV)}>
            <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
          </button>
          <span className="flex-1">Năm {renderingYear}</span>
          <button type="button" className="p-1 items-center" onClick={() => onChangeYear(Direction.NEXT)}>
            <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
          </button>
        </div>
        <div className="flex py-2 items-center rounded-full hover:bg-neutral-100 w-1/2">
          <button type="button" className="p-1 items-center" onClick={() => onChangeMonth(Direction.PREV)}>
            <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
          </button>
          <span className="flex-1">tháng {renderingMonth + 1}</span>
          <button type="button" className="p-1 items-center" onClick={() => onChangeMonth(Direction.NEXT)}>
            <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2 text-center font-medium">
        {moveToLeft(dayOfWeek, 1).map((day) => (
          <div key={day} className="text-[#6E797A]">
            {day}
          </div>
        ))}
        {days.map((dayOfMonth, index) => {
          return (
            <div key={index} className="">
              {dayOfMonth !== null ? (
                <button
                  data-month={renderingMonth}
                  data-year={renderingYear}
                  data-day={dayOfMonth}
                  type="button"
                  // disabled={
                  //   renderingYear < currentYear
                  //     ? true
                  //     : renderingYear == currentYear
                  //     ? renderingMonth < currentMonth
                  //       ? true
                  //       : renderingMonth == currentMonth
                  //       ? dayOfMonth < currentDay
                  //       : false
                  //     : false
                  // }
                  className={clsx(
                    'center-by-grid disabled:opacity-20 text-base-content rounded-full h-10 w-10',
                    renderingYear == selectedYear && renderingMonth == selectedMonth && dayOfMonth === selectedDay
                      ? 'text-neutral-0 bg-modern-red'
                      : 'bg-transparent hover:text-red-500 hover:border-red-500'
                  )}
                  onClick={onClick}
                >
                  {dayOfMonth}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const isValidDate = (dateString: string) => {
  if (dateString.includes('/')) {
    // Tách ngày, tháng, năm từ chuỗi
    const [day, month, year] = dateString.split('/');

    // Tạo đối tượng ngày từ ngày, tháng, năm
    const date = new Date(`${year}-${month}-${day}`);
    return date instanceof Date && !isNaN(date.valueOf());
  }
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.valueOf());
};

const InputDateContext = createContext<{ isShow: boolean; show(): void; hide(): void; ref: React.RefObject<HTMLInputElement> }>({
  isShow: false,
  ref: { current: null }
} as any);
type InputDateProps = {
  value?: string;
  onChange?(v: Date | null): void;
};
export const InputDate = ({ value, onChange, ...rest }: Omit<JSX.IntrinsicElements['input'], 'onChange' | 'value'> & InputDateProps) => {
  const { show, ref } = useContext(InputDateContext);
  const [stringDate, setStringDate] = useState('');
  useEffect(() => {
    if (value && isValidDate(value) && document.activeElement !== ref.current) {
      setStringDate(dayjs(value).format('DD/MM/YYYY'));
    }
  }, [ref, setStringDate, value]);

  function handleChange(dateString: string | null) {
    let newDate: Date | null = null;
    if (dateString) {
      // Tách ngày, tháng, năm từ chuỗi
      const [day, month, year] = dateString.split('/');

      // Tạo đối tượng ngày từ ngày, tháng, năm
      const date = new Date(`${year}-${month}-${day}`);
      if (date instanceof Date && !isNaN(date.valueOf())) {
        newDate = date;
      }
    }

    onChange?.(newDate);
  }

  function handleChangeText(e: React.ChangeEvent<HTMLInputElement>) {
    let currenValue = e.target.value;
    if (currenValue.length < stringDate.length) {
      if (currenValue.length === 2 || currenValue.length == 5) currenValue = currenValue.substring(0, currenValue.length - 1);
      if (!currenValue) handleChange(null);
      setStringDate(currenValue);
    }
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = Number(e.key);
    if (isNaN(key)) return;
    let v = stringDate;
    if (!stringDate.length && key > 3) v += '0';
    if ((v.length === 2 || v.length === 3) && key > 1) v += '0';
    if (v.length === 2) v += '/';
    if (v.length === 5) v += '/';
    v += key;
    if (v.length == 2) v += '/';
    if (v.length == 5) v += '/';
    if (v.length > 10) return;
    handleChange(v);
    setStringDate(v);
  }

  return (
    <input
      {...rest}
      ref={ref}
      value={stringDate}
      onFocus={withoutMobile(show, (e: any) => e.target.blur())}
      onChange={handleChangeText}
      onKeyDown={handleKeyDown}
    />
  );
};

InputDate.Wrapper = function InputDateWrapper({ children }: { children?: React.ReactNode }) {
  const isShow = useBoolean(false);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <InputDateContext.Provider value={{ ref, isShow: isShow.value, show: isShow.setTrue, hide: isShow.setFalse }}>
      {children}
    </InputDateContext.Provider>
  );
};
InputDate.Content = function DatePickerContainer({
  children,
  ...props
}: Omit<JSX.IntrinsicElements['div'], 'children'> & {
  value?: string | Date;
  onChange?(v: Date): void;
  children?: React.ReactNode | ((props: { hide: () => void }) => React.ReactNode);
}) {
  const { hide, isShow, show, ref } = useContext(InputDateContext);
  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside([ref, containerRef], hide);

  return isShow ? (
    <div {...props} ref={containerRef}>
      {typeof children === 'function' ? children({ hide }) : children}
    </div>
  ) : null;
};
export default DatePicker;
