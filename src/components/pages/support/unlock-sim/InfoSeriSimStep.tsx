import { modal } from '@/libs/modal';
import Svg from '@/components/icon/svg';
import { FC } from 'react';
import InputField from '@/components/form/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TestBtn } from '../TestBtn';
import { seriValidator } from '@/constants/validator.constants';

type FormValues = {
  seri: string;
};

const InitValue = {
  seri: ''
};

const SchemaValidation = yup.object({ seri: seriValidator }).required();

const InfoSeriSimStep: FC<{ submit: Function }> = ({ submit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isDirty, isValid }
  } = useForm<FormValues>({
    defaultValues: InitValue,
    resolver: yupResolver(SchemaValidation),
    mode: 'all'
  });

  const submitForm = (payload: FormValues) => {
    if (payload.seri == '1') {
      return modal.confirm({
        title: '',
        content: (
          <div className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
              {/* <Svg className="h-full w-full" src="/icons/others/phone-failed.svg" /> */}
              <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" />
            </div>
            <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Số serial chưa chính xác</h2>
            <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
              {'Thông tin Sim & số serial không khớp. \n Bạn vui lòng kiểm tra và thực hiện lại nhé!'}
            </p>
          </div>
        ),
        confirmLable: 'Đã hiểu',
        onDone() {}
      });
    }
    // lock sim

    submit(payload);
  };

  return (
    <div>
      <div className="flex flex-col xl:flex-row-reverse gap-y-4 md:gap-y-6 xl:gap-x-10">
        <div className="flex gap-x-4 gap-y-2 items-center xl:flex-col xl:w-[196px]">
          <div className="min-w-[98px] w-[98px] h-[59px] xl:w-[196px] xl:h-[117px]">
            <Svg className="w-full h-full" src="/icons/sim.svg" />
          </div>
          <p className="text-sm flex-1 xl:text-right">Số Serial nằm trên phôi Sim, bắt đầu bằng 087</p>
        </div>

        <div className="flex-1">
          <InputField inputLabel="Serial" placeholder="Nhập 11 số cuối serial Sim" control={control} name="seri" />
        </div>
      </div>

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

export default InfoSeriSimStep;
