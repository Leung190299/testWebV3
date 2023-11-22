import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';

import ModalChangePack from '@/components/modal/modal-change-pack';
import ModalCheckPhone, { modalPhoneCheck } from '@/components/modal/modal-check-phone';
import { modalPackageDetail } from '@/components/modal/modal-data-package-detail';

import { modal } from '@/libs/modal';

import { CheckoutType } from '@/constants/checkout.constants';
import Routers from '@/routes/routers';

import { addToCheckout } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';

import ModalVerifyOtp, { ModalVerifyProps } from '@/components/modal/modal-verify-otp';
import { useLoading } from '@/hooks/useLoading';
import dataService from '@/services/dataService';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { AxiosError } from 'axios';
import { addPack } from '@/store/data/dataSlice';
import routers from '@/routes/routers';
export const ERROR_NULL = 'Hệ thống đang bảo trì. Bạn vui lòng quay lại sau nhé';
export const useDataModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const packRef = useRef<dataModel.Pack>();
  const {openLoading,closeLoading}= useLoading()

  const checkoutData = useCallback(
    (phone: string) => {
      const data = packRef.current!;
      if (!data) return;
      dispatch(
        addToCheckout({
          type: CheckoutType.BuyData,
          name: data.Name!,
          discount_price: data.Price,
          price: data.Price!,
          description: data.Cycle == 'M' ? 'Gói cước tháng' : 'Gói cước ngày',
          phone
        })
      );
      router.push(Routers.CHECKOUT_PACK);
    },
    [dispatch, router]
  );

  const showModalOTP = (data: ModalVerifyProps) => {
    return modal.open({
      render: <ModalVerifyOtp {...data} />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
      onDone: () => {},
      onClose() {},
      onReject(err) {}
    });
  };

  const registerPack = async (param: dataModel.paramRegister) => {
    try {
      openLoading()
      const res = await dataService.registerPack(param);
      if (res.code == 200) {
        modal.confirm({
          title: 'Thông báo',
          content: (
            <p>
              {' '}
              Đăng ký thành công gói <span className="font-bold">{param.pack}</span> cho thuê bao{' '}
              <span className="font-bold">{formatPhoneNumber(param.phone)}</span>
            </p>
          ),
          rejectLable: 'Đóng',
          onReject:()=>router.push(Routers.DATA),
        });
        return;
      }
      modal.confirm({
        title: 'Thông báo',
        content: res?.message || ERROR_NULL,
        rejectLable: 'Đóng',
        onDone: close
      });
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      modal.confirm({
        title: 'Thông báo',
        content: dataError?.message || ERROR_NULL,
        rejectLable: 'Đóng',
        onDone: close
      });
    } finally {
      closeLoading()
    }
  };
  // Open modal depend on type of phone, you may change enum of phone to response code
  const handleRegistrantionRenewal = useCallback((data: dataModel.Response<dataModel.resultPack> & { phone: string }) => {
    const { phone, result, message, ...dataCurrent } = data;
    switch (data.code) {
      // case ModalCheckPhone:
      //   modal.confirm({
      //     content: (
      //       <>
      //         Thuê bao <b className="text-base-content">{formatPhoneNumber(data.phone)}</b> hiện không đủ điều kiện đăng ký gói cước này.
      //         Vui lòng lựa chọn gói cước khác.
      //         <br />
      //         Tips: Sử dụng chức năng <b className="text-base-content">Tìm gói cước theo thuê bao </b>để tra cứu các gói cước thuê bao của
      //         bạn
      //       </>
      //     ),
      //     type: 'middle-sheet',
      //     title: 'Thuê bao không đủ điều kiện',
      //     rejectLable: 'Thay đổi số',
      //     confirmLable: 'Tìm gói cước theo thuê bao',
      //     confirmLableMobile: 'Tìm gói phù hợp',
      //     onReject() {
      //       handleModalPhoneCheckLocal();
      //     },
      //     onDone() {
      //       innerWidth < 768
      //         ? toggleSearchData((q) => router.push({ pathname: Routers.DATA, query: { q } }), 1)
      //         : router.push({ pathname: Routers.DATA });
      //     }
      //   });
      //   break;
      case ModalCheckPhone.PHONE_USING_SAME_DATA_PACK:
        modal.confirm({
          content: (
            <>
              Gói cước <b className="text-base-content">{result?.packageName}</b> đang được thuê bao{' '}
              <b className="text-base-content">{formatPhoneNumber(data.phone)}</b> sử dụng ({result?.timeEnd}). Bằng việc bấm “Tiếp tục”,
              bạn đồng ý gia hạn gói cước này.
            </>
          ),
          type: 'middle-sheet',
          title: 'Gia hạn đăng ký',
          rejectLable: 'Thay đổi số',
          confirmLable: 'Tiếp tục',
          onReject() {
            handleModalPhoneCheckLocal();
          },
          onDone: () => {
            checkoutData(data.phone)
          }
        });
        break;
      case ModalCheckPhone.PHONE_NOT_USING_DATA_PACK:
        modal.confirm({
          content: (
            <>
              Vui lòng bấm Tiếp tục để xác nhận đăng ký gói cước <b className="text-base-content">PARTY79</b> cho thuê bao
              <b className="text-base-content">{formatPhoneNumber(data.phone)}</b>
            </>
          ),
          type: 'middle-sheet',
          title: 'Xác nhận đăng ký gói cước',
          rejectLable: 'Thay đổi số',
          confirmLable: 'Tiếp tục',
          onReject() {
            handleModalPhoneCheckLocal();
          },
          onDone: () => checkoutData(data.phone)
        });
        break;
      case ModalCheckPhone.PHONE_USING_DIFFERENT_DATA_PACK:
        modal.open({
          render: <ModalChangePack dataCurrent={result} phone={phone} onChange={handleModalPhoneCheckLocal} data={packRef.current} />,
          closeButton: false,
          transition: false,
          className: 'modal-box shadow-itel md:max-w-[45rem]',
          classNameContainer: 'modal-full md:modal-middle',
          classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
          onDone: () => checkoutData(data.phone)
        });
        break;
      case ModalCheckPhone.SUCCESS:
        checkoutData(data.phone);
        break;
      default:
        modal.confirm({
          title: 'Thông báo',
          content: message,
          rejectLable: 'Đóng',
          onDone: close
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModalPhoneCheckLocal = useCallback(() => {
    modalPhoneCheck(packRef.current!, handleRegistrantionRenewal);
  }, [handleRegistrantionRenewal]);
  const handleModalPhoneCheck = useCallback(
    (data: dataModel.Pack) => {
      packRef.current = data;
      modalPhoneCheck(data, handleRegistrantionRenewal);
    },
    [handleRegistrantionRenewal]
  );

  // You may passing only id of packdata, then fetching it in modal after that,
  // Or more complicate, passing
  const handleViewDetail = useCallback(
    (data: dataModel.Pack) => {
      dispatch(addPack(data));
      router.push(`${routers.DATA}/${data.Code}`)
    },
    [handleModalPhoneCheck]
  );

  return {
    handleViewDetail,
    handleModalPhoneCheck,
    showModalOTP,
    registerPack
  };
};
