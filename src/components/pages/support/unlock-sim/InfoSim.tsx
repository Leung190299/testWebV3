import { FC } from 'react';
import InputField from '@/components/form/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { modal } from '@/libs/modal';
import Svg from '@/components/icon/svg';
import { phoneValidator } from '@/constants/validator.constants';
import { TestBtn } from '../TestBtn';

type FormValues = {
  phone: string;
};

const InitValue = {
  phone: ''
};

const SchemaValidation = yup
  .object({
    phone: phoneValidator
  })
  .required();

const InfoSim: FC<{ submit: Function }> = ({ submit }) => {
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<FormValues>({
    defaultValues: InitValue,
    resolver: yupResolver(SchemaValidation),
    mode: 'all'
  });
  const focusInput = () => setTimeout(() => setFocus('phone'), 100);

  const submitForm = (payload: FormValues) => {
    if (payload.phone == '1') {
      return modal.confirm({
        title: '',
        content: (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
              <Svg className="h-full w-full" src="/icons/others/payment-failed.svg" />
              {/* <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" /> */}
            </div>
            <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Thuê bao không hỗ trợ</h2>
            <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
              Số thuê bao không phải số thuộc Mạng di động iTel 087.
              <br />
              Bạn vui lòng kiểm tra lại nhé!
            </p>
          </div>
        ),
        confirmLable: 'Đã hiểu',
        onDone() {}
      });
    }
    if (payload.phone == '2') {
      return modal.confirm({
        title: 'Không tìm thấy thông tin',
        content: (
          <>
            <p className="text-left mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
              Số thuê bao <b>{payload.phone}</b> không có thông tin.
              <br />
              Bạn vui lòng kiểm tra lại hoặc liên hệ CSKH 0877 087 087 (miễn phí cho thuê bao iTel) để được hỗ trợ thêm nhé!
            </p>
          </>
        ),
        rejectLable: 'Nhập lại thông tin',
        confirmLable: (
          <div className="flex items-center gap-2">
            <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
          </div>
        ),
        onDone() {},
        onReject: focusInput
      });
    }
    if (payload.phone == '3') {
      return modal.confirm({
        title: 'Sim đang bị khóa 2 chiều',
        content: (
          <>
            Thuê bao <b>{payload.phone}</b> hiện đang bị khóa 2 chiều, không thể thực hiện tự mở khóa trên hệ thống. Bạn vui lòng kiểm tra
            lại hoặc liên hệ CSKH 0877 087 087 (miễn phí cho thuê bao iTel) để được hỗ trợ thêm nhé!
          </>
        ),
        rejectLable: 'Nhập lại thông tin',
        confirmLable: (
          <div className="flex items-center gap-2">
            <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
          </div>
        ),
        onDone() {},
        onReject: focusInput
      });
    }

    if (payload.phone === '0111111111') {
      submit({ type: '1way', ...payload });
    } else {
      submit({ type: '2way', ...payload });
    }
  };

  return (
    <div className="bg-neutral-0 p-4  md:px-8 md:pt-5 md:pb-6 md:rounded-lg -ml-4 -mr-4 md:ml-0 md:mr-0 md:mt-6 -mb-6 md:mb-0">

      <p className="md:text-xl font-bold">Vui lòng nhập thông tin thuê bao cần mở khóa</p>
      <div className="border-t border-t-neutral-200 mt-4 md:mt-5 mb-4 md:mb-6" />
      <InputField inputLabel="Số thuê bao cần mở khóa" placeholder="Nhập số thuê bao" control={control} name="phone" />

      <button
        disabled={!isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default InfoSim;
