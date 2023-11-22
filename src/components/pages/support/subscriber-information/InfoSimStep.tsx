import InputField from '@/components/form/InputField';
import Svg from '@/components/icon/svg';
import { phoneItelValidator } from '@/constants/validator.constants';
import { useLoading } from '@/hooks/useLoading';
import { modal } from '@/libs/modal';
import subscriberInfoService from '@/services/subscriberInfoService';
import { addInfoEKYC } from '@/store/sim/actionSimSlice';
import { AppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

type FormValues = {
  phone: string;
};

const InitValue = {
  phone: ''
};

const SchemaValidation = yup
  .object({
    phone: phoneItelValidator
  })
  .required();

const InfoSimStep: FC<{ submit: Function }> = ({ submit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { openLoading, closeLoading } = useLoading();
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

  useEffect(() => {
    focusInput();
  }, [submit]);
  const checkSub = async (payload: FormValues) => {
    openLoading;
    await subscriberInfoService
      .checkSubRegistration(payload.phone)
      .then((res) => {
        if (res.code != 200) {
          modal.confirm({
            title: res.message?.split('/')[0],
            content: <div dangerouslySetInnerHTML={{ __html: res.message!.split('/')[1] }} />,
            rejectLable: 'Nhập lại thông tin',
            confirmLable: (
              <div className="flex items-center gap-2">
                <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
              </div>
            ),
            onDone() {},
            onReject: focusInput
          });
          return;
        }
        dispatch(addInfoEKYC(payload));
        submit(payload);
      })
      .catch((error) => {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        modal.confirm({
          title: dataError.message?.split('/')[0],
          content: <div dangerouslySetInnerHTML={{ __html: dataError.message!.split('/')[1] }} />,
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
    checkSub(payload);
    // if (payload.phone == '1') {
    //   return modal.confirm({
    //     title: 'Thông báo',
    //     content: (
    //       <>
    //         Thuê bao <b>{payload.phone}</b> thuộc danh sách số đẹp, bạn không thể tự cập nhật thông tin thuê bao.
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
    // // lock sim
    // if (payload.phone == '2') {
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
    // if (payload.phone == '3') {
    //   return modal.confirm({
    //     title: 'Không tìm thấy thông tin',
    //     content: (
    //       <>
    //         Số thuê bao <b>{payload.phone}</b> không có thông tin.
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
    // if (payload.phone == '4') {
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
  };

  return (
    <div>
      <div className="flex flex-col ">
        <InputField
          maxLength={10}
          inputLabel="Số thuê bao cần cập nhật thông tin"
          placeholder="Nhập số thuê bao iTel"
          control={control}
          name="phone"
        />
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
