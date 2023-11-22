import ComboboxesSimple from '@/components/comboboxes/comboboxes-simple';
import InputField from '@/components/form/InputField';
import Svg from '@/components/icon/svg';
import ModalCamera from '@/components/modal/modal-camera';
import { useLoading } from '@/hooks/useLoading';
import { modal } from '@/libs/modal';
import activeSimService from '@/services/activeSimService';
import subscriberInfoService from '@/services/subscriberInfoService';
import { getInfoEKYC } from '@/store/cart/selector';
import { addInfoEKYC } from '@/store/sim/actionSimSlice';
import { AppDispatch } from '@/store/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

function detectWebcam(callback: Function) {
  let md = navigator.mediaDevices;
  if (!md || !md.enumerateDevices) return callback(false);
  md.enumerateDevices().then((devices) => {
    callback(devices.some((device) => 'videoinput' === device.kind));
  });
}

const OptionsGender = [
  {
    text: 'nam'
  },
  {
    text: 'nữ'
  }
];

type FormValues = {
  fullName: string;
  cardNumber: string;
  birthDay: string;
  gender: string;
  createDate: string;
  issuedBy: string;
  address: string;
};

const SampleValue = {
  fullName: 'Nguyễn Văn A',
  cardNumber: '123 456 789',
  birthDay: '22/12/2000',
  gender: 'Nam',
  createDate: '22/12/2022',
  issuedBy: 'Công an Thành phố Hà Nội',
  address: '34 đường Quang Trung, Phường Quang Trung, Quận Hà Đông, Thành phố Hà Nội'
};

const InitValue = {
  fullName: '',
  cardNumber: '',
  birthDay: '',
  gender: '',
  createDate: '',
  issuedBy: '',
  address: ''
};

const SchemaValidation = yup
  .object({
    fullName: yup.string().required('Họ và tên không được để trống'),
    cardNumber: yup.string().required('Số CCCD không được để trống'),
    birthDay: yup.string().required('Ngày sinh không được để trống'),
    gender: yup.string().required('Giới tính không được để trống'),
    createDate: yup.string().required('Ngày cấp không được để trống'),
    issuedBy: yup.string().required('Nơi cấp không được để trống'),
    address: yup.string().required('Địa chỉ không được để trống')
  })
  .required();

const InputCard: FC<{
  title: string;
  icon: string;
  value: string;
  type: 'cardF' | 'cardB' | 'avatar';
  className?: string;
  classNameImage?: string;
  onChange?: Function;
  onNext?: Function;
  clearID?: Function;
}> = ({
  value,
  title,
  icon,
  className,
  classNameImage = 'aspect-[8/5] h-[140px] md:h-[175px] mx-auto max-w-full',
  onChange,
  type,
  onNext,
  clearID
}) => {
  const router = useRouter();
  const openCamera = () =>
    detectWebcam((enable: boolean) => {
      if (!enable)
        return modal.confirm({
          title: 'Thiết bị không hỗ trợ',
          content: (
            <>
              Thiết bị của bạn đang sử dụng không có chức năng chụp hình để thực hiện hành động.
              <br />
              Vui lòng tải App, hoặc sử dụng thiết bị điện tử khác có chức năng chụp hình để thực hiện Kích hoạt Sim.
            </>
          ),
          rejectLable: 'Đã hiểu',
          confirmLable: 'Tải App',
          onDone() {
            router.push('/download-itel');
          }
        });

      modal.open({
        modalId: 'modal-' + type,
        render: <ModalCamera type={type} onNext={(data: any) => onNext?.(data)} />,
        classNameContainer: 'modal-full',
        onDone: (data) => onChange?.(data)
      });
    });
  return (
    <div className={clsx('rounded-2xl border border-neutral-200 p-6 text-center flex flex-col', className)}>
      <p className="font-medium text-sm text-neutral-500">
        {title} <span className="text-red-500"> *</span>
      </p>

      <div className="flex-1 mt-4 items-center">
        <div className={clsx('rounded-xl overflow-hidden', classNameImage)}>
          {value ? <img alt="" src={value} className="w-full h-full object-cover" /> : <Svg className="w-full h-full" src={icon} />}
        </div>
      </div>

      <button
        type="button"
        className="block w-[130px] btn-sm md:btn-md btn btn-tertiary rounded-full mx-auto mt-4 md:mt-10"
        onClick={() => {
          openCamera();
          clearID && clearID();
        }}
      >
        {!!value ? 'Chụp lại' : 'Chụp ảnh'}
      </button>
    </div>
  );
};

const InfoUserStep: FC<{ submit: Function }> = ({ submit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const infoState = useSelector(getInfoEKYC);
  const { openLoading, closeLoading } = useLoading();
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isDirty, isValid }
  } = useForm<FormValues>({
    defaultValues: InitValue,
    resolver: yupResolver(SchemaValidation),
    mode: 'all'
  });
  const router = useRouter();

  const submitForm = (payload: FormValues) => {
    if (payload.address == '1') {
      return modal.confirm({
        title: 'Thông báo',
        content: (
          <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">
            Giấy tờ tùy thân đã đăng kí quá số lượng thuê bao cho phép.
            <br />
            Bạn vui lòng kiểm tra lại hoặc liên hệ CSKH 0877 087 087 (miễn phí cho Thuê bao iTel) để được hỗ trợ thêm nhé!
          </p>
        ),
        rejectLable: 'Đã hiểu',
        confirmLable: (
          <div className="flex items-center gap-2">
            <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
          </div>
        ),
        onDone() {}
      });
    }
    if (payload.address == '2') {
      return modal.confirm({
        title: 'Thiết bị không hỗ trợ',
        content: (
          <>
            Thiết bị của bạn đang sử dụng không có chức năng chụp hình để thực hiện hành động.
            <br />
            Vui lòng tải App, hoặc sử dụng thiết bị điện tử khác có chức năng chụp hình để thực hiện Kích hoạt Sim.
          </>
        ),
        rejectLable: 'Đã hiểu',
        confirmLable: 'Tải App',
        onDone() {
          router.push('/download-itel');
        }
      });
    }
    getRegistrationForm();
    dispatch(
      addInfoEKYC({
        psdiachi: payload.address
      })
    );

    submit(payload);
  };

  const [cardF, setCardF] = useState('');
  const [cardB, setCardB] = useState('');
  const [avatar, setAvatar] = useState('');
  const [type, setType] = useState<Record<number, string>>({});
  const [infoEKYC, setInfoEKYC] = useState<activeModal.Info>({});
  const [infoEKYCback, setInfoEKYCback] = useState<activeModal.Info>({});
  const [isLoading, setLoading] = useState(false);
  const [typeCard, setTypeCard] = useState<string>('');
  const paramsForm: activeModal.ParamsForm = {
    subscribers:
      infoState.seri == ''
        ? [
            {
              phone: infoState.phone || '',
              checked: false,
              seriValid: true,
              seri: infoState.seri
            }
          ]
        : [{ phone: infoState.phone || '', checked: false, seriValid: true, seri: infoState.seri, serial: infoState.seri }],
    img1: infoState.img1,
    img2: infoState.img2,
    img3: infoState.img3,
    ploaigt: infoState.ploaigt,
    psCmnd: infoState.psCmnd,
    psContactPhone: infoState.psContactPhone,
    psGioiTinh: infoState.psGioiTinh == 'nam' ? 'male' : 'female',
    psHoten: infoState.psHoten,
    psdiachi: infoState.psdiachi,
    psnoicap: infoState.placeCode,
    psNgaysinh: infoState.psNgaysinh,
    psplacedate: infoState.psplacedate,
    psQuoctich: '232',
    signatureImage: ''
  };

  const getRegistrationForm = async () => {
    openLoading();
    let param = {
      ...paramsForm,
      psdiachi: getValues('address')
    };

    infoState.seri == ''
      ? await subscriberInfoService
          .updateInfoForm(param)
          .then((res) => {
            if (res.code == 200) {
              closeLoading();
              dispatch(addInfoEKYC({ img4: res.result?.img4 }));
            }
            return;
          })
          .catch((error) => {
            closeLoading();
            const err = error as AxiosError;
            const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
            modal.confirm({
              title: 'Thông báo',
              content: <>{dataError?.message}</>,
              rejectLable: 'Chụp lại thông tin',
              confirmLable: (
                <div className="flex items-center gap-2">
                  <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
                </div>
              ),
              onDone() {}
            });
          })
      : await activeSimService
          .registrationForm(param)
          .then((res) => {
            if (res.code == 200) {
              closeLoading();
              dispatch(addInfoEKYC({ img4: res.result?.img4 }));
            }
            return;
          })
          .catch((error) => {
            closeLoading();
            const err = error as AxiosError;
            const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
            modal.confirm({
              title: 'Thông báo',
              content: <>{dataError?.message}</>,
              rejectLable: 'Chụp lại thông tin',
              confirmLable: (
                <div className="flex items-center gap-2">
                  <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
                </div>
              ),
              onDone() {}
            });
          })
          .finally(() => closeLoading());
  };

  const params: activeModal.ParamsEKYC = {
    format_type: 'base64',
    get_thumb: 'false'
  };
  const payload: activeModal.PayloadEKYC = {
    img1: cardF.replace('data:image/jpeg;base64,', ''),
    img2: cardB.replace('data:image/jpeg;base64,', '')
  };
  const checkYear = (year: string) => {
    const date = new Date();
    return Number(year.split('-')[2]) + 15 < date.getFullYear();
  };
  useEffect(() => {
    const getCard = async () => {
      openLoading();
      await activeSimService
        .ekycCard(params, payload)
        .then((res) => {
          let checkType: Record<number, string> = {};
          let dispatchEkycFront: activeModal.Info = {};
          let dispatchEkycBack: activeModal.Info = {};
          let typeCard = res.result?.data![0].type;
          setTypeCard(res.result?.data![0].type || '');
          if (res.code == 200) {
            closeLoading();
            let checkIdentification = false;
            let checkIdBack = '';
            let checkIdFront = '';
            let checkTypeCardFront = '';
            let checkTypeCardBack = '';
            let checkInvaliCodeFront = '';
            let checkInvaliCodeBack = '';
            let checkIssueDate = '';
            res.result.data?.forEach((e, index) => {
              if (e.type?.includes('front')) {
                setInfoEKYC(e.info || {});
                checkIdFront = e.info?.id || '';
                checkTypeCardFront = e.type.replace('_front', '');
                checkInvaliCodeFront = e.invalidCode!;
                dispatchEkycFront = e.info || {};
              }
              if (e.type?.includes('back')) {
                setInfoEKYCback(e.info || {});
                checkIdBack = e.info?.person_number || '';
                checkTypeCardBack = e.type.replace('_back', '');
                checkIdentification = true;
                checkInvaliCodeBack = e.invalidCode!;
                checkIssueDate = e.info?.issue_date || '';
                dispatchEkycBack = e.info || {};
              }
              if (e.info?.id != e.info?.person_number) {
              }
              checkType[index] = e.type || '';
            });
            if (checkInvaliCodeFront != '0') {
              checkInvaliCodeOCR(checkInvaliCodeFront);
              return;
            }
            if (checkInvaliCodeBack != '0' && !_.isEmpty(checkInvaliCodeBack)) {
              checkInvaliCodeOCR(checkInvaliCodeBack);
              return;
            }
            if (payload.img2 && !checkIdentification) {
              return checkInvaliCodeOCR('');
            }
            if (checkTypeCardFront != checkTypeCardBack && payload.img2) {
              return checkInvaliCodeOCR('7');
            }
            if (checkIdFront != checkIdBack && payload.img2 && checkTypeCardFront == 'chip_id_card') {
              return checkInvaliCodeOCR('4');
            }
            if (checkTypeCardBack == '9_id_card' && checkYear(checkIssueDate)) {
              return checkInvaliCodeOCR('10');
            }

            dispatch(
              addInfoEKYC({
                psHoten: dispatchEkycFront.name,
                psCmnd: dispatchEkycFront.id,
                ploaigt: typeCard?.includes('chip') ? '45' : '1',
                psNgaysinh: dispatchEkycFront.dob?.replaceAll('-','/'),
                psQuoctich: dispatchEkycFront.nationality,
                psdiachi: dispatchEkycFront.address,
                psGioiTinh: dispatchEkycFront.gender,
                psplacedate: dispatchEkycBack.issue_date?.replaceAll('-','/')
              })
            );
          }
          setType(checkType);
        })
        .catch((error) => {
          closeLoading();
          const err = error as AxiosError;
          const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
          modal.confirm({
            title: 'Thông báo',
            content: <>{dataError?.message || 'Giấy tờ tùy thân không hợp lệ, Bạn vui lòng kiểm tra lại nhé!'}</>,
            rejectLable: 'Chụp lại thông tin',
            confirmLable: (
              <div className="flex items-center gap-2">
                <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
              </div>
            ),
            onDone() {}
          });
        })
        .finally(() => closeLoading());
    };
    if (_.isEmpty(cardF) && _.isEmpty(cardB)) {
      return;
    }
    getCard();
  }, [cardF, cardB]);

  const showError = (i: number, onClear: Function, close: Function) => {
    const err = [
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Giấy tờ tùy thân đã hết hạn sử dụng, Bạn vui lòng kiểm tra và thực hiện lại với giấy tờ còn hạn sử dụng nhé!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Ảnh chụp giấy tờ không hợp lệ do bản photocoppy. Bạn vui lòng thực hiện chụp ảnh từ giấy tờ tùy thân gốc nhé!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Ảnh chụp giấy tờ không hợp lệ do được chụp từ màn hình, thiết bị khác. Bạn vui lòng kiểm tra và thực hiện lại nhé!'
      },
      {
        title: 'Ảnh không đạt tiêu chuẩn',
        desc: 'Ảnh chụp giấy tờ tùy thân chưa rõ nét thông tin.\nBạn vui lòng thực hiện chụp lại nhé!'
      },
      {
        title: 'Ảnh không đạt tiêu chuẩn',
        desc: 'Ảnh chụp giấy tờ tùy thân bị cắt góc.\nBạn vui lòng thực hiện chụp lại nhé!'
      },
      {
        title: 'Ảnh không đạt tiêu chuẩn',
        desc: 'Giấy tờ tùy thân không nguyên vẹn, Bạn vui lòng kiểm tra lại nhé!'
      },
      {
        title: 'Ảnh không đạt tiêu chuẩn',
        desc: 'Ảnh chụp giấy tờ không tìm thấy khuôn mặt.\nBạn vui lòng kiểm tra và thực hiện lại nhé!'
      },
      {
        title: 'Ảnh không đạt tiêu chuẩn',
        desc: 'Sai ảnh giấy tờ mặt trước/ mặt sau.\nBạn vui lòng kiểm tra và thực hiện chụp lại nhé.'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không khớp với ảnh trong giấy tờ.\nBạn vui lòng thực hiện lại nhé!.'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung có nhiều hơn 1 khuôn mặt.\nBạn vui lòng thực hiện lại nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không hợp lệ.\nBạn vui lòng không đội mũ để chụp ảnh nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không hợp lệ.\nBạn vui lòng không đeo kính đen để chụp ảnh nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không hợp lệ.\nBạn vui lòng không đeo khẩu trang để chụp ảnh nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không hợp lệ.\nBạn vui lòng chụp khuôn mặt gần hơn nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không hợp lệ.\nBạn vui lòng chụp khuôn mặt xa hơn chút nhé!!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Giấy tờ tùy thân không hợp lệ, Bạn vui lòng kiểm tra lại nhé!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Ảnh chụp giấy tờ không hợp lệ do phải là CMND/CCCD, Bạn vui lòng kiểm tra và thực hiện lại nhé!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Ảnh chụp giấy tờ tùy thân nghi ngờ có dấu hiệu giả mạo, Bạn vui lòng thực hiện chụp lại nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chân dung không tìm thấy khuôn mặt, Bạn vui lòng kiểm tra và thực hiện lại nhé!'
      },
      {
        title: 'Chân dung không hợp lệ',
        desc: 'Ảnh chụp chân dung không hợp lệ do được chụp từ màn hình, thiết bị khác. Bạn vui lòng kiểm tra và thực hiện lại nhé!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Hai mặt giấy tờ được chụp không đồng nhất thông tin, Bạn vui lòng thực hiện chụp lại nhé!'
      },
      {
        title: 'Giấy tờ chưa hợp lệ',
        desc: 'Hai mặt giấy tờ được chụp không cùng một loại giấy tờ, Bạn vui lòng kiểm tra lại nhé!'
      }
    ][i];

    return modal.confirm({
      title: '',
      content: (
        <div className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
            {/* <Svg className="h-full w-full" src="/icons/others/phone-failed.svg" /> */}
            <img className="h-full w-full object-contain" alt="" src="/images/bill-failed.png" />
          </div>
          <h2 className="text-xl md:text-s-md font-bold text-neutral-800">{err.title}</h2>
          <p className="mt-2 md:mt-4 text-subtle-content whitespace-pre-line">{err.desc}</p>
        </div>
      ),
      rejectLable: 'Thoát chức năng',
      confirmLable: 'Chụp lại',
      onDone() {
        onClear();
      },
      onReject() {
        close();
      }
    });
  };

  const checkInvaliCodeOCR = (invalidCode: string) => {
    switch (invalidCode) {
      case '5':
        showError(
          4,
          () => {},
          () => {}
        );
        break;
      case '6':
        showError(
          4,
          () => {},
          () => {}
        );
        break;
      case '1':
        showError(
          2,
          () => {},
          () => {}
        );
        break;
      case '2':
        showError(
          1,
          () => {},
          () => {}
        );
        break;
      case '3':
        showError(
          3,
          () => {},
          () => {}
        );
        break;
      case '4':
        showError(
          20,
          () => {},
          () => {}
        );
        break;
      case '7':
        showError(
          21,
          () => {},
          () => {}
        );
        break;
      case '10':
        showError(
          0,
          () => {},
          () => {}
        );
        break;
      case '':
        showError(
          15,
          () => {},
          () => {}
        );
        break;

      default:
        return false;
    }
  };

  const clearID = () => {
    setInfoEKYC({});
  };

  useEffect(() => {
    if (_.isEmpty(infoEKYC.id)) {
      return;
    }
    const checkId = async () => {
      await activeSimService.checkId(infoState.phone || '', infoEKYC.id || '').catch((error) => {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        modal.confirm({
          title: 'Thông báo',
          content: <>{dataError?.message}</>,
          rejectLable: 'Đã hiểu',
          confirmLable: (
            <div className="flex items-center gap-2">
              <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
            </div>
          ),
          onDone() {}
        });
      });
    };
    checkId();

    if (_.isEmpty(cardF) || _.isEmpty(cardB) || _.isEmpty(infoEKYCback.issued_at)) {
      return;
    }
    const issuedPlace = async () => {
      const paramsIssued: activeModal.ParamsIssued = {
        type: type[0]?.includes('12') && type[1]?.includes('12') ? 'CCCD' : 'CMT',
        placeName: infoEKYCback.issued_at
      };
      await activeSimService
        .issuedPlace(paramsIssued)
        .then((res) => {
          dispatch(
            addInfoEKYC({
              psnoicap: res.data?.onSelect?.issuedPlaceName,
              placeCode: res.data?.onSelect?.issuedPlaceCode,
              img1: cardF,
              img2: cardB
            })
          );
        })
        .catch((error) => {
          const err = error as AxiosError;
          const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
          modal.confirm({
            title: 'Thông báo',
            content: <>{dataError.message}</>,
            rejectLable: '',
            confirmLable: (
              <div className="flex items-center gap-2">
                <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
              </div>
            ),
            onDone() {}
          });
        });
    };
    issuedPlace();
  }, [infoEKYC.id, cardF, cardB, infoEKYCback.issued_at]);

  const checkInvaliCodeFace = (invalidCode: number): void | boolean => {
    switch (invalidCode) {
      case 1:
        showError(
          17,
          () => {},
          () => {}
        );
        break;
      case 2:
        showError(
          1,
          () => {},
          () => {}
        );
        break;
      case 3:
        showError(
          19,
          () => {},
          () => {}
        );
        break;
      case 4:
        showError(
          6,
          () => {},
          () => {}
        );
        break;
      case 5:
        showError(
          18,
          () => {},
          () => {}
        );
        break;
      case 6:
        showError(
          9,
          () => {},
          () => {}
        );
        break;
      case 7:
        showError(
          11,
          () => {},
          () => {}
        );
        break;
      case 8:
        showError(
          10,
          () => {},
          () => {}
        );
        break;
      case 9:
        showError(
          12,
          () => {},
          () => {}
        );
        break;
      case 10:
        showError(
          19,
          () => {},
          () => {}
        );
        break;
      case 11:
        showError(
          13,
          () => {},
          () => {}
        );
        break;
      case 12:
        showError(
          14,
          () => {},
          () => {}
        );
        break;
      case 13:
        showError(
          8,
          () => {},
          () => {}
        );
        break;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (_.isEmpty(avatar)) {
      return;
    }
    const faceMatching = async () => {
      const params: activeModal.ParamsFace = {
        format_type: 'base64',
        type1: 'card'
      };
      const payload: activeModal.PayloadEKYC = {
        img1: cardF.replace('data:image/jpeg;base64,', ''),
        img2: avatar.replace('data:image/jpeg;base64,', '')
      };
      openLoading();
      await activeSimService
        .faceMatching(params, payload)
        .then((res) => {
          if (res.code == 200) {
            closeLoading();
            if (typeof checkInvaliCodeFace(res.result.data?.invalidCode!) == 'undefined') {
              checkInvaliCodeFace(res.result.data?.invalidCode!);
              return;
            } else if (Number(res.result.data?.matching) < 70) {
              checkInvaliCodeFace(13);
              return;
            } else {
              setLoading(true);
              dispatch(
                addInfoEKYC({
                  img3: avatar
                })
              );
            }
          }
        })
        .catch((error) => {
          closeLoading();
          const err = error as AxiosError;
          const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
          modal.confirm({
            title: 'Thông báo',
            content: <>Không nhận diện được khuôn mặt</>,
            rejectLable: 'Chụp lại thông tin',
            confirmLable: (
              <div className="flex items-center gap-2">
                <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
              </div>
            ),
            onDone() {}
          });
        });
    };
    faceMatching();
  }, [cardF, cardB, avatar]);

  useEffect(() => {
    reset(
      {
        fullName: infoState.psHoten,
        cardNumber: infoState.psCmnd,
        birthDay: infoState.psNgaysinh,
        gender: infoState.psGioiTinh,
        createDate: infoState.psplacedate,
        issuedBy: infoState.psnoicap,
        address: infoState.psdiachi
      },
      { keepDefaultValues: true }
    );
  }, [infoState]);

  // useEffect(() => {
  //   if (showInfo) reset(SampleValue, { keepDefaultValues: true });
  // }, [showInfo]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-6 gap-x-6  xl:grid-cols-8">
        <InputCard
          className="xl:col-span-3"
          title="Ảnh CCCD/CMND mặt trước"
          icon="/icons/others/card-front.svg"
          value={cardF}
          onChange={setCardF}
          type="cardF"
          clearID={() => {
            clearID();
          }}
          onNext={() => {}}
        />
        <InputCard
          className="xl:col-span-3"
          title="Ảnh CCCD/CMND mặt sau"
          icon="/icons/others/card-back.svg"
          value={cardB}
          onChange={setCardB}
          type="cardB"
          onNext={() => {}}
        />
        <InputCard
          className="xl:col-span-2"
          classNameImage="aspect-[6/7] h-[140px] md:h-[175px] mx-auto"
          title="Ảnh chân dung"
          icon="/icons/others/avatar.svg"
          value={avatar}
          onChange={setAvatar}
          type="avatar"
          onNext={() => {}}
        />
      </div>

      {!isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 xl:gap-x-10">
            <div className="col-span-1">
              <InputField disabled inputLabel="Họ và tên" placeholder="Họ và tên" control={control} name="fullName" />
            </div>
            <div className="col-span-1">
              <InputField
                disabled
                inputLabel="Số căn cước công dân"
                placeholder="Số căn cước công dân"
                control={control}
                name="cardNumber"
              />
            </div>
            <div className="col-span-1">
              <InputField disabled inputLabel="Ngày sinh" placeholder="Ngày sinh" control={control} name="birthDay" />
            </div>
            <div className="col-span-1">
              {typeCard.includes('9') ? (
                <div className="form-control w-full">
                  <span className="label-text font-medium text-sm md:text-base">Giới tính <span className=" text-primary">*</span></span>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { ref, value, onChange, ...field } }) => (
                      <ComboboxesSimple
                        {...field}
                        value={OptionsGender.find((item) => item.text == value) || { text: '' }}
                        onChange={(value: { text: string }) => {
                          console.log('abc', value);
                          onChange(value.text);
                        }}
                        options={OptionsGender}
                        btnClassName="mt-2"
                        placeholder="Chọn giới tính"
                        disabled={false}
                        // onClick={withMobile(() => handleChangeLocation(name))}
                        btnOnMobile
                      />
                    )}
                  />
                </div>
              ) : (
                <InputField disabled inputLabel="Giới tính" placeholder="Giới tính" control={control} name="gender" />
              )}
            </div>
            <div className="col-span-1">
              <InputField disabled inputLabel="Ngày cấp" placeholder="Ngày cấp" control={control} name="createDate" />
            </div>
            <div className="col-span-1">
              <InputField disabled inputLabel="Nơi cấp" placeholder="Nơi cấp" control={control} name="issuedBy" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <InputField
                inputLabel="Nơi thường trú (Bạn có thể sửa thông tin tại ô này nếu địa chỉ thay đổi)"
                placeholder="Nơi thường trú (Bạn có thể sửa thông tin tại ô này nếu địa chỉ thay đổi)"
                control={control}
                name="address"
              />
            </div>
          </div>
        </>
      )}

      <button
        disabled={!isLoading || !isDirty || !isValid}
        type="button"
        className="block w-[206px] btn-sm md:btn-md btn-primary btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={handleSubmit(submitForm)}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default InfoUserStep;
