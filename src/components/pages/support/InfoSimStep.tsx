import { modal } from '@/libs/modal';
import Svg from '@/components/icon/svg';
import { FC, useEffect } from 'react';
import InputField from '@/components/form/InputField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { phoneItelValidator, phoneValidator, seriValidator } from '@/constants/validator.constants';
import { TestBtn } from './TestBtn';
import activeSimService from '@/services/activeSimService';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { addInfoEKYC } from '@/store/sim/actionSimSlice';

type FormValues = {
  phone: string;
  seri: string;
};

const InitValue = {
  phone: '',
  seri: ''
};

const SchemaValidation = yup
  .object({
    phone: phoneItelValidator,
    seri: seriValidator
  })
  .required();

const InfoSimStep: FC<{ submit: Function }> = ({ submit }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isDirty, isValid }
  } = useForm<FormValues>({
    defaultValues: InitValue,
    resolver: yupResolver(SchemaValidation),
    mode: 'all'
  });

  const focusInput = () => setTimeout(() => setFocus('phone'), 100);

  useEffect(() => {
    focusInput();
  }, [submit]);

  const checkMsisdn = async (payload: FormValues) => {
    await activeSimService
      .checkSeri([{ phone: payload.phone, seri: payload.seri }])
      .then((res) => {
        if (res.code != 200) {
          modal.confirm({
            title: res.message?.split('/')[0],
            content: <div dangerouslySetInnerHTML={{__html:res.message!.split('/')[1]}}/>,
            rejectLable: 'Nhập lại thông tin',
            confirmLable: (
              <div className="flex items-center gap-2">
                <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
              </div>
            ),
            onDone() {},
            onReject: focusInput
          });
          return
        }
        submit(payload);
      })
      .catch((error) => {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        modal.confirm({
          title: dataError?.message.split('/')[0],
          content: <div dangerouslySetInnerHTML={{__html:dataError?.message.split('/')[1]}}/>,
          rejectLable: 'Nhập lại thông tin',
          confirmLable: (
            <div className="flex items-center gap-2">
              <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
            </div>
          ),
          onDone() {},
          onReject: focusInput
        });
      });
  };

  const submitForm = (payload: FormValues) => {
    dispatch(addInfoEKYC(payload));
    checkMsisdn(payload);
    // if (payload.phone == '0111111111') {
    //   return modal.confirm({
    //     title: '',
    //     content: (
    //       <div className="text-center">
    //         <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
    //           <Svg className="h-full w-full" src="/icons/others/payment-failed.svg" />
    //           {/* <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" /> */}
    //         </div>
    //         <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Thuê bao không hỗ trợ</h2>
    //         <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
    //           Số thuê bao không phải số thuộc Mạng di động iTel 087.
    //           <br />
    //           Bạn vui lòng kiểm tra lại nhé!
    //         </p>
    //       </div>
    //     ),
    //     confirmLable: 'Đã hiểu',
    //     onDone() {}
    //   });
    // }
    // if (payload.phone == '0111111112') {
    //   return modal.confirm({
    //     title: '',
    //     content: (
    //       <div className="text-center">
    //         <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
    //           {/* <Svg className="h-full w-full" src="/icons/others/phone-failed.svg" /> */}
    //           <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" />
    //         </div>
    //         <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Số serial chưa chính xác</h2>
    //         <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
    //           {'Thông tin Sim & số serial không khớp. \n Bạn vui lòng kiểm tra và thực hiện lại nhé!'}
    //         </p>
    //       </div>
    //     ),
    //     confirmLable: 'Đã hiểu',
    //     onDone() {}
    //   });
    // }
    // if (payload.phone == '0111111113') {
    //   return modal.confirm({
    //     title: '',
    //     content: (
    //       <div className="text-center">
    //         <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
    //           {/* <Svg className="h-full w-full" src="/icons/others/phone-failed.svg" /> */}
    //           <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" />
    //         </div>
    //         <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Sim đang được sử dụng</h2>
    //         <p className="text-left mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
    //           Số <b>{payload.phone}</b> đã được kích hoạt & đăng ký thông tin thuê bao chính chủ trước đây.
    //           <br />
    //           Bạn vui lòng kiểm tra lại số điện thoại đã nhập hoặc lựa chọn chức năng cập nhật thông tin thuê bao.
    //         </p>
    //       </div>
    //     ),
    //     rejectLable: 'Cập nhật thông tin',
    //     confirmLable: 'Sửa số điện thoại',
    //     onDone: focusInput,
    //     onReject: () => router.push('/subscriber-information')
    //   });
    // }
    // if (payload.phone == '0111111114') {
    //   return modal.confirm({
    //     title: 'Không tìm thấy thông tin',
    //     content: (
    //       <>
    //         <p className="text-left mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
    //           Số thuê bao <b>{payload.phone}</b> không có thông tin.
    //           <br />
    //           Bạn vui lòng kiểm tra lại hoặc liên hệ CSKH 0877 087 087 (miễn phí cho thuê bao iTel) để được hỗ trợ thêm nhé!
    //         </p>
    //       </>
    //     ),
    //     rejectLable: 'Đã hiểu',
    //     confirmLable: (
    //       <div className="flex items-center gap-2">
    //         <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
    //       </div>
    //     ),
    //     onDone() {}
    //   });
    // }
    // // lock sim
    // if (payload.phone == '0111111115') {
    //   return modal.confirm({
    //     title: 'Sim đang bị khóa',
    //     content: (
    //       <>
    //         Số thuê bao <b>{payload.phone}</b> đang bị khóa 1 chiều. Vui lòng nhập lại hoặc chuyển hướng sang màn hình Mở khóa Sim.
    //       </>
    //     ),
    //     rejectLable: 'Nhập lại thông tin',
    //     confirmLable: 'Mở khóa Sim',
    //     onDone() {
    //       return router.push('/unlock-sim');
    //     },
    //     onReject: focusInput
    //   });
    // }
    // if (payload.phone == '0111111116') {
    //   return modal.confirm({
    //     title: 'Sim đang bị khóa',
    //     content: (
    //       <>
    //         Số thuê bao <b>{payload.phone}</b> đang bị khóa.
    //         <br />
    //         Bạn vui lòng kiểm tra lại hoặc liên hệ CSKH 0877 087 087 (miễn phí cho thuê bao iTel) để được hỗ trợ thêm nhé!
    //       </>
    //     ),
    //     rejectLable: 'Nhập lại thông tin',
    //     confirmLable: (
    //       <div className="flex items-center gap-2">
    //         <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
    //       </div>
    //     ),
    //     onDone() {},
    //     onReject: focusInput
    //   });
    // }
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

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 xl:gap-x-10">
          <div className="col-span-1">
            <InputField
              maxLength={10}
              inputLabel="Số thuê bao cần kích hoạt"
              placeholder="Nhập số thuê bao iTel"
              control={control}
              name="phone"
            />
          </div>
          <div className="col-span-1">
            <InputField inputLabel="Serial" maxLength={11} placeholder="Nhập 11 số cuối serial Sim" control={control} name="seri" />
          </div>
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

export default InfoSimStep;
