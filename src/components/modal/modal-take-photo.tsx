import Svg from '@/components/icon/svg';
import { useModal } from '@/libs/modal';
import { createRef } from 'react';
import Webcam from 'react-webcam';

const FACING_MODE_ENVIRONMENT = 'environment';

const videoConstraints = {
  facingMode: FACING_MODE_ENVIRONMENT
};

const ModalTakePhoto = () => {
  const webcamRef = createRef<Webcam>();
  const { done, close } = useModal();

  const takePhoto = () => {
    const data = webcamRef?.current?.getScreenshot();
    if (data) done(data);
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-overlay-popup">
      <div
        className="w-10 h-10 md:w-14 md:h-14 fixed top-8 left-8 md:left-[initial] md:right-8 z-20 rounded-full bg-neutral-0 md:bg-neutral-600 flex justify-center items-center"
        onClick={close}
      >
        <Svg className="w-6 h-6 md:text-neutral-0" src="/icons/line/close.svg" />
      </div>
      <Webcam
        ref={webcamRef}
        className="w-[100vw] h-[100vh] object-cover"
        screenshotFormat="image/jpeg"
        audio={false}
        videoConstraints={{
          ...videoConstraints
        }}
      />
      <div className="absolute bottom-10 mx-auto translate-x-[50%] right-[50%]">
        <Svg className="w-[68px] h-[68px] mt-16" src="/icons/others/take-photo.svg" onClick={takePhoto} />
      </div>
    </div>
  );
};
export default ModalTakePhoto;
