import RadioInput from '@/components/form/RadioInput';
import { modal } from '@/libs/modal';
import { groupBy } from '@/utilities/array';
import clsx from 'clsx';
import { FC, useState } from 'react';

enum TypeSim {
  sim = 'sim vật lý',
  eSim = 'eSim'
}

const ModalEsimContent = () => {
  const data = [
    {
      name: 'Apple',
      devices: [
        { name: 'iPhone XR (mẫu A2105, từ 2018) ', type: 'Các dòng máy iPhone' },
        { name: 'iPhone XS (mẫu A2097, từ 2018)', type: 'Các dòng máy iPhone' },
        { name: 'iPhone XS Max (mẫu A2101, từ2018)', type: 'Các dòng máy iPhone' },
        { name: 'iPhone 11 (mẫu A2221, từ 2019)', type: 'Các dòng máy iPhone' },
        { name: 'iPhone 11 Pro (mẫu A2215, từ 2019)', type: 'Các dòng máy iPhone' },
        { name: 'iPhone 11 Pro Max - iPhone SE (mẫul 2020)', type: 'Các dòng máy iPhone' },
        { name: 'iPhone 12/ 12mini/ 12 Pro/ 12 Pro Max', type: 'Các dòng máy iPhone' },
        { name: 'iPhone 13/ 13 mini/ 13 Pro/ 13 Pro Max ', type: 'Các dòng máy iPhone' },
        { name: 'iPhone SE (2022)- iPhone 14/ 14 Plus/ 14 Pro/ 14 Pro Max', type: 'Các dòng máy iPhone' },

        { name: 'iPad Pro LTE (2018)', type: 'Các dòng máy iPad' },
        { name: 'iPad Pro 11″ (mẫu A2068, từ 2020)/ iPad Pro 11 (2021, 2020)', type: 'Các dòng máy iPad' },
        {
          name: 'iPad Pro 12.9″ (mẫu A2069, từ 2020)/ iPad Pro 12.9 (2021, 2020, 2017, 2015) / Apple iPad Pro 12.9 (2021, 2018) ',
          type: 'Các dòng máy iPad'
        },
        { name: 'iPad Air (mẫu A2123, từ 2019)/ iPad Air (2022, 2020)', type: 'Các dòng máy iPad' },
        { name: 'iPad (mẫu A2198, từ 2019)', type: 'Các dòng máy iPad' },
        { name: 'iPad Mini (mẫu A2124, từ 2019)/ iPad mini (2021, 2019)/ iPad mini 3', type: 'Các dòng máy iPad' },
        { name: 'iPad 10.2 (2021, 2020, 2019)', type: 'Các dòng máy iPad' },
        { name: 'iPad 9.7 (2016)', type: 'Các dòng máy iPad' }
      ]
    },
    {
      name: 'Google',
      devices: [
        { name: 'Google Pixel 7/ 7 Pro', type: '' },
        { name: 'Google Pixel 6/ 6a/ 6 Pro- Google Pixel 5/ 5a 5G', type: '' },
        { name: 'Google Pixel 4/ 4a/ 4a 5G/ 4 XL', type: '' },
        { name: 'Google Pixel 3/ 3a/ 3a XL/ 3 XL', type: '' }
      ]
    },
    {
      name: 'Oppo',
      devices: []
    },
    {
      name: 'Samsung',
      devices: []
    },
    {
      name: 'Khác',
      devices: []
    }
  ];

  const [tab, setTab] = useState(0);

  return (
    <div>
      <p className="text-neutral-500">Các dòng máy hỗ trợ esim</p>

      <div className="flex gap-4 border-b border-b-neutral-200">
        {data.map((item, index) => (
          <div
            className={clsx(
              'p-4 -mb-[1px] text-sm md:text-base cursor-pointer',
              tab == index ? 'border-b-2 border-b-red-500 font-bold' : 'font-medium'
            )}
            key={item.name}
            onClick={() => setTab(index)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="h-[320px] overflow-x-auto pt-4">
        {Object.entries(groupBy(data[tab].devices, 'type')).map(([type, items]) => (
          <div key={type}>
            {!!type && <p className="font-bold text-sm mb-1">{type}</p>}
            <ul className="list-disc text-sm md:text-base ml-5 mb-4">
              {items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const SelectTypeSimStep: FC<{ submit: Function }> = ({ submit }) => {
  const [typeSim, setTypeSim] = useState(TypeSim.sim);

  const handleSubmit = () => {
    if (typeSim === TypeSim.eSim) {
      modal.confirm({
        title: 'Xác nhận chọn eSim',
        desc: 'Bằng việc bấm xác nhận, bạn xác nhận đã hiểu đặc điểm và nắm được các dòng máy hỗ trợ sản phẩm eSim.',
        content: <ModalEsimContent />,
        rejectLable: 'Không chọn',
        confirmLable: 'Xác nhận',
        onDone() {
          submit({ typeSim });
        },
        onReject() {
          setTypeSim(TypeSim.sim);
        }
      });
    } else submit({ typeSim });
  };
  return (
    <div>
      <div className="py-4 px-6 bg-neutral-50 rounded-lg">
        <div className="flex flex-col xl:flex-row gap-4">
          <RadioInput
            radioId="sim"
            label="Sim vật lý (+0đ)"
            subLabel="Sim cứng lắp vào máy"
            isChecked={typeSim === TypeSim.sim}
            onClick={() => setTypeSim(TypeSim.sim)}
          />
          <div className="flex-1">
            <RadioInput
              radioId="esim"
              label="Sử dụng eSim (+65.000đ)"
              subLabel={
                <>
                  eSIM là SIM điện tử, không cần dùng Sim vật lý. <br className="xl:hidden" />
                  Chỉ dùng cho các dòng máy hỗ trợ eSIM.
                </>
              }
              isChecked={typeSim === TypeSim.eSim}
              onClick={() => setTypeSim(TypeSim.eSim)}
            />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="block btn-sm md:btn-md w-[206px] btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default SelectTypeSimStep;
