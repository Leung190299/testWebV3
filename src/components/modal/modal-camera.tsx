import { FC, useCallback, useRef, useState } from 'react';
import { modal, useModal } from '@/libs/modal';
import Webcam from 'react-webcam';
import Svg from '../icon/svg';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
import { TestBtn } from '../pages/support/TestBtn';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

const videoConstraints = {
  facingMode: FACING_MODE_USER
};

const config = {
  cardF: {
    frameClass: 'w-[311px] h-[207px] md:w-[600px] md:h-[400px] xl:w-[720px] xl:h-[480px]',
    title: 'Chụp ảnh mặt trước',
    desc: (
      <>
        Đặt giấy tờ nằm vừa khung hình chữ nhật màu trắng
        <br />
        Chụp đủ ánh sáng và RÕ NÉT, KHÔNG MỜ, KHÔNG MẤT GÓC, KHÔNG LÓA SÁNG
        <br />
        Dùng giấy tờ gốc, còn hiệu lực và chính chủ
      </>
    )
  },
  cardB: {
    frameClass: 'w-[311px] h-[207px] md:w-[600px] md:h-[400px] xl:w-[720px] xl:h-[480px]',
    title: 'Chụp ảnh mặt sau',
    desc: (
      <>
        Đặt giấy tờ nằm vừa khung hình chữ nhật màu trắng
        <br />
        Chụp đủ ánh sáng và RÕ NÉT, KHÔNG MỜ, KHÔNG MẤT GÓC, KHÔNG LÓA SÁNG
        <br />
        Dùng giấy tờ gốc, còn hiệu lực và chính chủ
      </>
    )
  },
  avatar: {
    frameClass: 'w-[311px] h-[415px] md:w-[450px] md:h-[600px] xl:w-[480px] xl:h-[640px]',
    title: 'Chụp ảnh khuôn mặt',
    desc: (
      <>
        Đảm bảo khuôn mặt vừa khung hình, chụp đủ ánh sáng.
        <br />
        KHÔNG MỜ, KHÔNG NHẮM MẮT, KHÔNG LÓA SÁNG.
        <br />
        Trang phục lịch sự
      </>
    )
  }
};

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

const ModalCamera: FC<{ type: 'cardF' | 'cardB' | 'avatar'; onNext: Function }> = ({ type = 'cardF', onNext }) => {
  const { done, close } = useModal();
  const refC: any = useRef();
  const refD: any = useRef();
  const [photo, setPhoto] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isLoading, setLoading] = useState(false);

  const [facingMode, setFacingMode] = useState(FACING_MODE_USER);

  const switchCamera = useCallback(() => {
    setFacingMode((prevState) => (prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER));
  }, []);

  const onClear = () => {
    setPhoto('');
  };

  const onDone = () => {
    if (type === 'avatar') setLoading(true);
    // html2canvas(refD.current).then((canvas) => {
    //   const data = canvas.toDataURL();
      onNext(photo, type);
      if (type === 'avatar') {
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            // if (true) return showError(0, onClear, close);
            done(photo);
          }, 1000);
        }, 3000);
      } else {
        done(photo);
      }
  };

  const takePhoto = () => {
    const data = refC.current.getScreenshot();
    setPhoto(data);
    const _position = refD.current?.getBoundingClientRect?.();
    setPosition(_position || {});
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-overlay-popup relative">
      {isLoading && (
        <div className="fixed z-50 p-4 bg-overlay-popup flex justify-center items-center w-full h-full bg-opacity-50">
          <div className="text-center bg-neutral-0 max-w-[560px] w-full px-4 pt-10 pb-6 md:px-10 md:pb-10 rounded-2.5xl">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-5">
              <img className="h-full w-full object-contain animate-spin" alt="" src="/images/loading.png" />
            </div>
            <h2 className="text-xl md:text-s-md font-bold text-neutral-800">Hệ thống đang xử lý</h2>
            <p className="mt-4 text-subtle-content whitespace-pre-line md:text-left">
              iTel đang tiến hành cập nhật thông tin tự động từ các hình ảnh bạn đã cung cấp. Vui lòng đợi trong giây lát!
            </p>
          </div>
        </div>
      )}
      <div
        className="w-10 h-10 md:w-14 md:h-14 fixed top-8 left-8 md:left-[initial] md:right-8 z-20 rounded-full bg-neutral-0 md:bg-neutral-600 flex justify-center items-center"
        onClick={close}
      >
        <Svg className="w-6 h-6 text-neutral-800 md:text-neutral-0" src="/icons/line/close.svg" />
      </div>
      <div
        className="w-10 h-10 fixed top-8 right-8 z-20 rounded-full bg-neutral-0 flex justify-center items-center md:hidden"
        onClick={switchCamera}
      >
        <Svg className="w-6 h-6 text-neutral-800" src="/icons/bold/refresh.svg" />
      </div>

      <div className="w-[100vw] h-[100vh] text-center flex flex-col justify-center items-center fixed z-10 top-0 p-4">
        <p className="text-neutral-0 text-2xl md:text-h-md z-10">{config[type].title}</p>

        <div
          ref={refD}
          style={{ outline: photo ? '#1F1F1F solid 1000vw' : 'rgba(0, 0, 0, 0.5) solid 1000vw' }}
          className={clsx(config[type].frameClass, 'border-4 border-neutral-0 rounded-2xl mt-4 md:mt-12 overflow-clip relative')}
        >
          {!photo && (
            <Webcam
              ref={refC}
              className={clsx(' m-auto rounded-2xl object-cover w-full h-full')}
              screenshotFormat="image/jpeg"
              screenshotQuality={1}
              forceScreenshotSourceSize={true}
              audio={false}
              videoConstraints={{
                ...videoConstraints,
                facingMode
              }}
            />
          )}
          <div className="w-full h-full">
            {photo && <img className={clsx(' m-auto rounded-2xl object-cover w-full h-full')} src={photo} alt="" />}
          </div>

          {type == 'avatar' && !photo && (
            <div className="absolute bottom-10 mx-auto translate-x-[50%] right-[50%]">
              <Svg className="w-[68px] h-[68px] mt-16" src="/icons/others/take-photo.svg" onClick={takePhoto} />
            </div>
          )}
        </div>

        <p className="text-neutral-0 mt-2 md:mt-4 text-sm z-10">{config[type].desc}</p>

        {type != 'avatar' && (
          <div className={photo ? 'invisible' : 'z-10'}>
            <Svg className="w-[68px] h-[68px] mt-16" src="/icons/others/take-photo.svg" onClick={takePhoto} />
          </div>
        )}
        {photo && (
          <div
            className={clsx('flex gap-3 md:gap-4 px-4 bottom-28 xl:bottom-20 max-w-[100vw] z-10', type == 'avatar' ? 'mt-6' : 'absolute')}
          >
            <button
              type="button"
              onClick={onClear}
              className="block btn-secondary btn text-sm md:text-base md:btn-lg w-[232px] rounded-full"
            >
              Chụp lại
            </button>

            <button type="button" onClick={onDone} className="block btn-primary btn text-sm md:text-base md:btn-lg w-[232px] rounded-full">
              Tiếp tục
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalCamera;
