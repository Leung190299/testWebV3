import { SimQuery } from '@/constants/sim.constants';
import Routers from '@/routes/routers';
import { withMobile } from '@/utilities/function';
import { validatePhone } from '@/utilities/validator';
import { useModal } from '@pit-ui/modules/modal';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ComboboxesSimple from '../comboboxes/comboboxes-simple';
import DatePicker, { InputDate } from '../common/date-picker';
import RadioInput from '../form/RadioInput';
import TextInput from '../form/TextInput';
import Svg from '../icon/svg';
import { toggleModalDatePicker } from '../modal/selection/modal-date-picker';
import { toggleModalSelectionList } from '../modal/selection/modal-selection-list';
import Tab from '../tabs/tabs';

export const bornTime = [
  { id: 1, shortName: 'Tý (23h - 1h)', name: 'Tý (23 giờ đêm - 1 giờ sáng)' },
  { id: 2, shortName: 'Sửu (1h - 3h)', name: 'Sửu (1 giờ sáng - 3 giờ sáng)' },
  { id: 3, shortName: 'Dần (3h - 5h)', name: 'Dần (3 giờ sáng - 5 giờ sáng)' },
  { id: 4, shortName: 'Mão (5h - 7h)', name: 'Mão (5 giờ sáng - 7 giờ sáng)' },
  { id: 5, shortName: 'Thìn (7h - 9h)', name: 'Thìn (7 giờ sáng - 9 giờ sáng)' },
  { id: 6, shortName: 'Tỵ (9h - 11h)', name: 'Tỵ (9 giờ sáng - 11 giờ sáng)' },
  { id: 7, shortName: 'Ngọ (11h - 13h)', name: 'Ngọ (11 giờ sáng - 13 giờ chiều)' },
  { id: 8, shortName: 'Mùi (13h - 15h)', name: 'Mùi (13 giờ chiều - 15 giờ chiều)' },
  { id: 9, shortName: 'Thân (15h - 17h)', name: 'Thân (15 giờ chiều - 17 giờ chiều)' },
  { id: 10, shortName: 'Dậu (17h - 19h)', name: 'Dậu (17 giờ chiều - 19 giờ tối)' },
  { id: 11, shortName: 'Tuất (19h - 21h)', name: 'Tuất (19 giờ tối - 21 giờ tối)' },
  { id: 12, shortName: 'Hợi (21h- 23h)', name: 'Hợi (21 giờ tối- 23 giờ đêm)' }
];

export type SearchFormTabItem = {
  id: SimQuery;
  label: string;
};

type SearchFormProps = {
  handleCloseModal?: () => void;
  isModal?: boolean;
  isSearchByNumerology?: boolean;
  tabs: SearchFormTabItem[];
  tabIndex: SimQuery;
};

const SearchForm = ({ handleCloseModal, isModal, isSearchByNumerology, tabs, tabIndex }: SearchFormProps) => {
  const [tabId, setTabId] = useState<SimQuery>(tabIndex);
  const [gender, setGender] = useState<string>('Nam');
  const [selectedDate, setSelectDate] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<{ phone?: string; date?: string; time?: string }>({});
  const [selectedBornTime, setSelectedBornTime] = useState<any>(null);
  const router = useRouter();
  const { close } = useModal();

  const simRateMode = tabId === SimQuery.MarkPhone;
  const formatDate = dayjs(String(selectedDate)).format('DD/MM/YYYY');

  const getDateNow = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
  };
  const handleSelectTime = withMobile(async () => {
    toggleModalSelectionList({
      title: 'Chọn giờ sinh',
      defaultValue: selectedBornTime,
      options: bornTime,
      displayValue(option) {
        return option.name;
      }
    }).then((v) => v && setSelectedBornTime(v));
  });
  const handleDateOfBirth = withMobile(() => {
    toggleModalDatePicker({ title: 'Chọn ngày sinh', defaultValue: selectedDate ? selectedDate : undefined }).then(
      (v) => v && setSelectDate(v?.toString())
    );
  });
  const handleSearchGeoSim = () => {
    if (tabId === SimQuery.MarkPhone && !phoneNumber) {
      return setError({ ...error, phone: 'Vui lòng nhập số điện thoại' });
    }

    if (tabId === SimQuery.MarkPhone && !validatePhone(phoneNumber))
      return setError({ ...error, phone: 'Số điện thoại không đúng định dạng ' });

    if (!selectedDate) {
      return setError({ ...error, date: 'Vui lòng nhập ngày sinh dương lịch!' });
    }
    if (!selectedBornTime) {
      return setError({ ...error, time: 'Vui lòng nhập giờ sinh!' });
    }
    setError({});
    void router.push({
      pathname: Routers.SIM_FENG_SHUI_SEARCH,
      query: {
        phoneNumber: `${phoneNumber}`,
        gender: `${gender}`,
        option: `${selectedBornTime.name}`,
        date: `${selectedDate}`,
        mode: `${tabId}`
      }
    });
    if (isModal && handleCloseModal) {
      close();
      handleCloseModal();
    }
  };

  const handleSearchNumerologySim = () => {
    void router.push({
      pathname: Routers.SIM_NUMEROLOGY_SEARCH,
      query: {
        phone: phoneNumber,
        name: name,
        date: selectedDate ? new Date(selectedDate).getTime() : undefined,
        mode: tabId
      }
    });
    if (isModal && handleCloseModal) {
      handleCloseModal();
    }
  };
  useEffect(() => {
    setPhoneNumber('');
  }, [tabId]);

  return (
    <div className="relative h-full w-full rounded-t-2xl md:rounded-2xl bg-neutral-0 px-4 md:py-6 pt-2 pb-6">
      {/* {isModal && (
        <div
          className="btn-tertiary btn btn-sm btn-circle absolute right-4 top-4 bg-neutral-100 hover:bg-neutral-300"
          onClick={handleCloseModal}
        >
          <Svg src="/icons/bold/cancel.svg" className="inline h-3 w-3" />
        </div>
      )} */}
      <div className="flex items-center justify-start">
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.label} onClick={() => setTabId(tab.id)} isActive={tabId === tab.id} size="large" />
        ))}
      </div>
      <div className="mb-6 w-full border-b border-b-neutral-300" />
      <div className="text-base font-normal text-neutral-700">{`${
        tabId === SimQuery.Basic
          ? `${
              !isSearchByNumerology? 'Chia sẻ thông tin để iTel xem cho bạn một quẻ nào!'
              : 'Để tìm số đẹp, vui lòng điền đầy đủ các thông tin bên dưới'
          }`
        : 'Để chấm điểm sim, vui lòng điền đầy đủ các thông tin bên dưới'
    }`}</div>
    {!isSearchByNumerology && (
      <>
        <div className="mt-8 text-base font-medium text-neutral-700">
          Giới tính <span className="text-red-500">*</span>
        </div>
        <div className="mt-4 flex items-center justify-start gap-16">
          {['Nam', 'Nữ'].map((item, index) => (
            <RadioInput key={`item-${index}`} label={item} radioId={item} onChange={() => setGender(item)} isChecked={item === gender} />
          ))}
        </div>
      </>
    )}
    <div className="mt-6">
      {simRateMode && (
        <div>
          <TextInput
            inputLabel="Số điện thoại"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => {
              if (e.target.value) {
                setError({ ...error, phone: undefined });
              }
              setPhoneNumber(e.currentTarget.value);
            }}
            onBlur={(e) => {
              if (e.target.value) {
                setError({ ...error, phone: undefined });
              }
            }}
            errorMessage={error.phone}
          />
        </div>
      )}
      <div className="mt-6">
        {isSearchByNumerology && (
          <TextInput inputLabel="Họ và tên" placeholder="Nhập họ và tên" value={name} onChange={(e) => setName(e.currentTarget.value)} />
        )}
      </div>
    </div>
    <div
      className={`${
        simRateMode && !isSearchByNumerology ? 'grid md:grid-cols-2 grid-cols-1 gap-4' : 'flex flex-col items-start gap-6'
      } mt-6`}
    >
      <div className="w-full">
        <div className="label-text text-base" aria-required>
          Ngày sinh dương lịch
        </div>
        <div className="mt-2">
          <div className={'relative'}>
            <InputDate.Wrapper>
              <button
                className="relative flex w-full text-left"
                onClick={handleDateOfBirth}
                tabIndex={-1}
                type="button"
                onMouseDown={withMobile((e) => {
                  e.preventDefault();
                  e.stopPropagation();
                })}
              >
                <InputDate
                  className="input input-bordered w-full input-trailing-icon"
                  placeholder="dd/mm/yyyy"
                  value={selectedDate}
                  onChange={(d) => {
                    if (d) {
                      setError({ ...error, date: undefined });
                    }
                    setSelectDate(d?.toString()!);
                  }}onBlur={(e) => {
                    if (e.target.value) {
                      setError({ ...error, date: undefined });
                    }
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none pointer-events-none">
                  <Svg src="/icons/line/calendar.svg" width={24} height={24} />
                </div>
              </button>
              <InputDate.Content className="absolute mt-2 z-10">
                {({ hide }) => (
                  <div className="bg-neutral-0 rounded-2xl shadow-itel px-6 py-8">
                    <DatePicker
                      value={selectedDate}
                      onChange={(date) => {
                        if (date) {
                          setError({ ...error, date: undefined });
                        }
                        setSelectDate(date.toString());
                        hide();
                      }}
                    />
                  </div>
                )}
              </InputDate.Content>
            </InputDate.Wrapper>
          </div>
          {error.date && <div className="text-primary">{error.date}</div>}
        </div>
      </div>
      {!isSearchByNumerology && (
        <div className="w-full">
          <div className="label-text text-base" aria-required>
            Chọn giờ sinh
          </div>
          <div className="mt-2">
              <ComboboxesSimple
                className='pr-6'
              onChange={(e) => {
                setSelectedBornTime(e);
                if (e) {
                  setError({ ...error, time: undefined });
                }
              }}
              value={selectedBornTime}
              options={bornTime}
              displayValue={(data) => data.name}
              disableInput
              placeholder="Chọn giờ sinh"
              onClick={handleSelectTime}
              classNameOptions="right-0"
            />
          </div>
          {error.time && <div className="text-primary">{error.time}</div>}
        </div>
      )}
    </div>
    <div className="mt-8 flex justify-center gap-6">
      <button
        onClick={isSearchByNumerology ? handleSearchNumerologySim : handleSearchGeoSim}
        className="btn-primary btn md:btn-lg btn-md md:w-[15.5rem] w-full rounded-full"
      >
        {simRateMode ? 'Chấm điểm sim' : `${isModal ? 'Tra cứu' : 'Chọn Sim hợp tuổi'} `}
      </button>
    </div>
  </div>
);
};

export default SearchForm;