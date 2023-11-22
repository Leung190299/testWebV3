import CheckBox from '@/components/form/CheckBox';
import Svg from '@/components/icon/svg';
import ModalSignature from '@/components/modal/modal-signature';
import ViewPDF from '@/components/viewPdf';
import { useLoading } from '@/hooks/useLoading';
import { modal } from '@/libs/modal';
import activeSimService from '@/services/activeSimService';
import subscriberInfoService from '@/services/subscriberInfoService';
import { getInfoEKYC } from '@/store/cart/selector';
import { addInfoEKYC } from '@/store/sim/actionSimSlice';
import { AppDispatch } from '@/store/store';
import { AxiosError } from 'axios';
import router from 'next/router';
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ContractViewProps = {
  src: string;
  classNameSignature?: string;
  value: string;
  onChange: Function;
  pdfView?: string;
  setPdfView?: Dispatch<SetStateAction<string>>;
};

const ContractView: FC<ContractViewProps> = ({
  src,
  classNameSignature = 'left-6 sm:left-10 z-100 md:left-10 xl:left-10 bottom-7 sm:bottom-12 md:bottom-12 xl:bottom-12 w-[100px] sm:w-[154px] h-10 md:w-[200px] md:h-[88px] xl:w-[240px] xl:h-[90px]',
  value,
  onChange,
  pdfView,
  setPdfView
}) => {
  const refDiv: any = useRef(null);
  const refSign: any = useRef(null);
  const refBtn: any = useRef(null);
  const refOt: any = useRef(null);
  const refOb: any = useRef(null);

  // useEffect(() => {
  //   const _event = (e: any) => {
  //     const p1 = refDiv.current.scrollTop + refDiv.current.offsetHeight;
  //     const p2 = refSign.current.offsetTop;

  //     if (refDiv.current.scrollTop > 0) {
  //       refOt.current.style.display = 'block';
  //     } else {
  //       refOt.current.style.display = 'none';
  //     }

  //     if (p1 > p2) {
  //       refBtn.current.style.display = 'none';
  //       refOb.current.style.display = 'none';
  //     } else {
  //       refBtn.current.style.display = 'block';
  //       refOb.current.style.display = 'block';
  //     }
  //   };
  //   refDiv.current?.addEventListener?.('scroll', _event);

  //   return () => refDiv.current?.removeEventListener?.('scroll', _event);
  // }, []);

  const goSign = () => {
    modal.open({
      render: <ModalSignature />,
      classNameContainer: 'modal-full',
      onDone: (data) => {
        setPdfView && setPdfView('');
        onChange?.(data);
      }
    });
  };
  const goBottom = () => {
    refDiv.current.scrollTo({
      top: refSign.current?.offsetTop || 0
    });
  };

  return (
    <>
      {src ? (
        <div className="mt-6 md:mt-4 relative bg-neutral-100 flex">
          <div ref={refDiv} className="overflow-x-auto max-h-[500px] md:h-[500px] md:mx-4 py-4 flex-1">
            <div
              ref={refOt}
              className="w-full h-[79px] top-0 z-10 absolute hidden"
              style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0))' }}
            />
            <div
              ref={refOb}
              className="w-full h-[79px] hidden bottom-0 z-10 absolute"
              style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.1))' }}
            />
            <div className="relative h-full">
              <div className="space-y-3 h-full">
                <ViewPDF data={pdfView ? pdfView : src} className="flex  2 flex-col items-center relative " scale={1.4} />

                {/* <div
                      ref={refSign}
                      onClick={goSign}
                      className={clsx(
                        classNameSignature,
                        value ? 'bg-neutral-0 border-neutral-300' : 'bg-red-100 border-red-500',
                        'flex p-2 cursor-pointer z-50 justify-center items-center absolute border border-dashed rounded-lg'
                      )}
                    >
                      {!!value ? (
                        <img src={value} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <p className="text-red-500 text-center text-xs md:text-sm sm:whitespace-nowrap">Bấm vào khung để ký *</p>
                      )}
                    </div> */}
              </div>
            </div>
          </div>

          {/* <div className="w-[130px] mr-4 py-4 hidden xl:block space-y-3 max-h-[500px] ">
            {src && <ViewPDF data={src} scale={0.2} className=" w-full h-full flex flex-col items-center" />}
          </div> */}

          <button
            ref={refBtn}
            onClick={() => goSign()}
            type="button"
            className="block btn-sm md:btn-md btn-primary btn rounded-full absolute bottom-3 right-4 z-20"
          >
            <div className="flex gap-2">
              <Svg width={20} height={20} src="/icons/bold/edit.svg" />
              Đến chỗ ký
            </div>
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

interface Props {
  submit: Function;
  src: string;
  classNameSignature?: string;
}

const SignStep: FC<Props> = ({ submit, ...props }) => {
  const [accept, setAccept] = useState(false);
  const [signature, setSignature] = useState('');
  const infoState = useSelector(getInfoEKYC);
  const [pdf, setPdf] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { openLoading, closeLoading } = useLoading();

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
    psQuoctich: "232",
    signatureImage: signature
  };
  const getRegistration = async () => {
    openLoading();
    if (!signature) {
      return;
    }
    infoState.seri == ''
      ? await subscriberInfoService
          .getOTP(infoState.phone || '')
          .then((res) => {
            if (res.code == 200) {
              closeLoading();
            }
          })
          .catch((error) => {
            closeLoading();
            const err = error as AxiosError;
            const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
            modal.confirm({
              title: 'Thông báo',
              content: <>{dataError?.message}</>,
              rejectLable: '',
              confirmLable: (
                <div className="flex items-center gap-2">
                  <Svg src="/icons/bold/live-chat.svg" className="w-6 h-6" /> <span>Chat với CSKH</span>
                </div>
              ),
              onDone() {}
            });
          })
      : await activeSimService
          .subRegistration(paramsForm)
          .then((res) => {
            if (res.code == 200) {
              closeLoading();
              dispatch(
                addInfoEKYC({
                  seri: ''
                })
              );
              router.push('/active-sim/success');
            }
          })
          .catch((error) => {
            closeLoading();
            const err = error as AxiosError;
            const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
            modal.confirm({
              title: 'Thông báo',
              content: <>{dataError?.message}</>,
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
  const getRegistrationForm = async (signatureImage: string) => {
    openLoading();
    let param = {
      ...paramsForm,
      signatureImage
    };

    infoState.seri == ''
      ? await subscriberInfoService
          .updateInfoForm(param)
          .then((res) => {
            if (res.code == 200) {
              setPdf(res.result?.img4!);
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
          }).finally(() => closeLoading())
      : await activeSimService
          .registrationForm(param)
          .then((res) => {
            if (res.code == 200) {
              setPdf(res.result?.img4!);
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

  return (
    <div>
      <div>
        <div className="flex items-center gap-2.5 md:gap-3.5">
          <CheckBox value={accept} onChange={setAccept} />
          <p className="text-sm flex-1 md:text-base">Tôi hiểu và đồng ý với các điều kiện dưới đây:</p>
        </div>

        <ul className="list-disc ml-4 text-xs mt-3  md:mt-4">
          <li>
            Việc thay đăng ký thông tin thuê bao trên hệ thống sẽ chỉ được thực hiện sau khi cung cấp đầy đủ các giấy tờ, thông tin theo quy
            định của pháp luật.
          </li>
          <li>
            Trong quá trình chờ và sau khi hoàn thành đăng ký thông tin trên hệ thống, nếu có xảy ra bất kỳ khiếu kiện, tranh chấp nào liên
            quan đến số thuê bao trên, tôi đồng ý để iTel thu hồi số thuê bao để giải quyết khiếu nại, đồng thời tôi cam kết sẽ phối hợp
            iTel để giải quyết và chịu hoàn toàn trách nhiệm trước pháp luật.
          </li>
          <li> Các thông tin và chữ ký của bạn sẽ được tự đồng điền vào Phiếu xác nhận thông tin thuê bao dưới đây.</li>
        </ul>

        <p className="text-sm flex-1 md:text-base mt-6 md:mt-4">Vui lòng đọc hợp đồng và ký tên của bạn tại phía dưới cùng của hợp đồng!</p>

        <ContractView
          {...props}
          src={infoState.img4 || ''}
          value={signature}
          onChange={(data: string) => {
            setSignature(data), dispatch(addInfoEKYC({ signatureImage: data }));
            getRegistrationForm(data);
          }}
          pdfView={pdf}
          setPdfView={setPdf}
        />
      </div>
      <button
        disabled={!accept || !signature}
        type="button"
        className="block btn-primary btn-sm md:btn-md btn rounded-full mx-auto mt-4 md:mt-10"
        onClick={() => {
          submit({ signature }), getRegistration();
        }}
      >
        Xác nhận & gửi yêu cầu
      </button>
    </div>
  );
};

export default SignStep;
