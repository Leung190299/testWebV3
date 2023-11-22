import { TUpdateInfo } from '@/pages/update-info';
import { phoneNumberRegex } from '@/utilities/validator';
import { ErrorMessage } from '@hookform/error-message';
import { UseFormReturn } from 'react-hook-form';
import Svg from '../icon/svg';

type props = {
  method: UseFormReturn<TUpdateInfo>;
  onCheck: (values: TUpdateInfo) => void;
};
const SearchSimUpdateInfo = (props: props) => {
  const { onCheck, method } = props;

  return (
    <section className="my-8">
      <div className="container md:pt-14 md:pr-14 relative">
        <div className="bg-modern-red rounded-lg p-7 ">
          <div className=" md:max-w-[85%]">
            <h2 className="text-neutral-0 font-bold uppercase section-title !text-2xl md:!text-4xl !text-start">HOT: CHƯƠNG TRÌNH TẶNG SIM SỐ ĐẸP</h2>
            <p className="text-neutral-0 uppercase !text-xs  md:!text-[15px] !text-start mt-1 relative z-10">
              {' '}
              ÁP DỤNG CHO CÁC TB TRONG DANH SÁCH ĐÃ THỰC HIỆN CẬP NHẬT TTTB THUÊ BAO THÀNH CÔNG TRONG THỜI GIAN QUY ĐỊNH.
            </p>
          </div>
          <div className="bg-neutral-0 flex md:flex-row flex-col p-4 md:p-8 justify-around items-center rounded-xl mt-4 relative z-10">
            <span className="text-lg font-bold">Nhập số TB của Bạn</span>
            <div className="bg-neutral-200 flex p-2 md:p-3 rounded-xl mt-3 md:mt-auto  md:basis-[400px] w-full">
              <Svg src="/icons/bold/vector.svg" className="w-5 h-5 md:h-6 md:w-6 ml-3" />
              <input
                type="text"
                className="bg-transparent flex-1 text-center  focus-visible:outline-none "
                placeholder="0877 087 087"
                {...method.register('phone', {
                  required: 'SĐT không được để trống',
                  pattern: { value: phoneNumberRegex, message: 'SĐT không đúng định dạng' }
                })}
              />
              {method.watch('phone') && (
                <button onClick={() => method.reset({
                  phone:''
                })}>
                  <Svg src="/icons/line/close.svg" className="w-5 h-5 md:h-6 md:w-6" />
                </button>
              )}
            </div>
            <button
              className="btn btn-primary rounded-full md:px-10 py-1 md:py-0 w-full md:w-auto h-auto md:h-12 mt-3 "
              disabled={!method.formState.isValid}
              onClick={method.handleSubmit(onCheck)}
            >
              {' '}
              Kiểm tra
            </button>
          </div>
          {method.watch('phone') && (
            <ErrorMessage
              errors={method.formState.errors}
              name="phone"
              render={({ message }) => (
                <p className="label">
                  <span className="label-text-alt flex items-center text-red-500 first-letter:capitalize">
                    <Svg className="mr-1 h-4 w-4 inline" src="/icons/line/danger-circle.svg" />
                    {message}
                  </span>
                </p>
              )}
            />
          )}
          <div className="block-img  absolute md:top-0 md:right-0 md:w-[290px] md:h-[200px] w-[150px] h-[120px]  md:z-10 top-[20%] right-0">
            <img src="/images/chat-icon2.png" alt="chat-icon" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSimUpdateInfo;
