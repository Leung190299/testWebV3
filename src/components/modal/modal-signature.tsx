import SignatureCanvas from 'react-signature-canvas';

import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/libs/modal';
import Svg from '../icon/svg';

const ModalSignature = () => {
  const { done, close } = useModal();
  const refC: any = useRef();
  const [isShow, setShow] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setShow(true);
  }, []);

  const onClear = () => {
    refC.current.clear();
    setDisabled(true);
  };

  const onDone = () => {
    const data = refC.current.getTrimmedCanvas().toDataURL('image/png');
    done(data);
  };

  return (
    <div className="bg-neutral-900 w-[100vw] h-[100vh] text-center flex flex-col justify-center items-center px-4">
      <div
        className="w-10 h-10 md:w-14 md:h-14 fixed top-8 left-8 md:left-[initial] md:right-8 z-20 rounded-full bg-neutral-0 md:bg-neutral-600 flex justify-center items-center"
        onClick={close}
      >
        <Svg className="w-6 h-6 md:text-neutral-0" src="/icons/line/close.svg" />
      </div>

      <p className="text-neutral-0 text-2xl md:text-h-md ">Ký vào khung phía dưới</p>

      <div className="w-[311px] h-[207px] md:w-[600px] md:h-[400px] xl:w-[720px] xl:h-[480px] rounded-2.5xl overflow-hidden mt-6 md:mt-12">
        {isShow && (
          <SignatureCanvas
            ref={refC}
            canvasProps={{ className: 'w-full h-full bg-neutral-0 rounded-2.5xl' }}
            onEnd={() => {
              setDisabled(false);
            }}
          />
        )}
      </div>

      <p className="text-neutral-200 text-sm md:text-xl mt-6">
        Các thông tin và chữ ký của bạn sẽ được tự động điền vào
        <br />
        Phiếu yêu cầu thay đổi thông tin dịch vụ di động
      </p>

      <div className="flex gap-4 mt-10 w-full justify-center">
        <button
          type="button"
          onClick={onClear}
          className="flex-1 block btn-secondary btn text-sm md:text-base md:btn-lg md:max-w-[232px] rounded-full"
        >
          Ký lại
        </button>

        <button
          disabled={disabled}
          type="button"
          onClick={onDone}
          className="flex-1 block btn-primary btn text-sm md:text-base md:btn-lg md:max-w-[232px] rounded-full"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default ModalSignature;
