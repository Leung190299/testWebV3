import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import ModalVerifyOtp, { ModalVerifyProps, ResponseVerifyOtp } from '@/components/modal/modal-verify-otp';
import BannerUpdateInfo from '@/components/update-info/Banner';
import FilterUpdateInfo from '@/components/update-info/filter';
import ListSim from '@/components/update-info/list-sim';
import SearchSimUpdateInfo from '@/components/update-info/search-sim';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import UpdateInfoService from '@/services/UpdateInfoService';
import { modal, useModal } from '@pit-ui/modules/modal';
import { AxiosError } from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export type TUpdateInfo = {
  phone: string;
};
type modalMess = {
  title: string;
  mess: string;
  type: 'error' | 'success';
  children?:ReactNode
};

const showModalOPT = (data: ModalVerifyProps) => {
  return modal.open({
    render: <ModalVerifyOtp {...data} />,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    onDone: (value) => {
      console.log(value);
    },
    onClose() {},
    onReject(err) {}
  });
};
const UpdataInfo: NextPage = () => {
  const method = useForm<TUpdateInfo>({
    defaultValues: {
      phone: ''
    }
  });

  const [isData, setIsData] = useState<boolean>(false);
  const [sims, setSims] = useState<UpdateInfoModel.resultSim[]>([]);
  const [sim, setSim] = useState<UpdateInfoModel.resultSim>({});
  const [totalPage, setTotalPage] = useState<number>(1);

  const onCheck = async (values: TUpdateInfo) => {
    try {
      const res = await UpdateInfoService.getOPT(values.phone);
      if (res.code == 200) {
        showModalOPT({
          phone: values.phone,
          guide: false,
          resend: function () {
            UpdateInfoService.getOPT(values.phone);
          },
          verify: (otp: string) => checkOPT({ ContactPhone: values.phone, OTP: otp })
        });
        return;
      }
      showPopup({ mess: res.message, title: 'Không thành công!', type: 'error' });
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      showPopup({ mess: dataError.message, title: 'Không thành công!', type: 'error' });
    }
  };

  const checkOPT = async (param: UpdateInfoModel.ParamCheckOTP) => {
    const res = await UpdateInfoService.checkOPT(param);
    if (res.code == 200) {
      setIsData(true);
      return true;
    }
    return { success: false, message: res.message } as ResponseVerifyOtp;
  };
  const getListSim = async (page: number = 1, search: string = '') => {
    const param: UpdateInfoModel.ParamsLitSim = {
      search,
      page,
      pageSize: 10,
      ContactPhone: method.getValues('phone')
    };
    const res = await UpdateInfoService.getListProduct(param);
    if (res.code == 200) {
      setSims(res.result);
      setTotalPage(Math.floor(res.totalRecords / 10));
    }
  };

  const getPhoneRandom = async () => {
    try {
      const res = await UpdateInfoService.getSimRandom();
      if (res.code == 200) {
        setSim(res.result);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isData) {
      getListSim();
    }
    getPhoneRandom();
  }, [isData]);

  return (
    <>
      <BannerUpdateInfo />
      <SearchSimUpdateInfo method={method} onCheck={onCheck} />
      {isData && (
        <>
          <FilterUpdateInfo searchSim={(search) => getListSim(1, search)} sim={sim} setRadomSim={getPhoneRandom} />
          <ListSim data={sims} page={totalPage} />
        </>
      )}
    </>
  );
};

export const showPopup = (props: modalMess) => {
  modal.open({
    render: <ModalMess {...props} />,
    closeButton: true,
    transition: false,
    className: 'modal-box shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-full md:modal-middle',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
  });
};

 const ModalMess = (props: modalMess) => {
  const { close } = useModal();
  return (
    <div className="flex flex-col justify-center items-center py-5 md:py-0">
      <Svg src={props.type == 'error' ? '/icons/phoneError.svg' : '/icons/phoneCheck.svg'} width={80} height={80} />
      <div className="flex flex-col items-center ">
        <p className="font-bold text-2xl md:text-3xl text-center ">{props.title}</p>
        <p className="mt-4 text-center">{props.mess}</p>
      </div>
      {props.children}
      <div className="mt-8 flex flex-col items-center">
        <button className="btn btn-primary rounded-full w-[70%]" onClick={close}>
          Ok
        </button>
        <p className="mt-6">
          Bạn chưa có Sim?{' '}
          <Link className="text-primary font-bold" href={Routers.SIM}>
            {' '}
            Mua Sim với gói cước
          </Link>{' '}
          ngay nhé.
        </p>
      </div>
    </div>
  );
};
UpdataInfo.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };
export default UpdataInfo;
