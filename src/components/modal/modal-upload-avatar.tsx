import Svg from '@/components/icon/svg';
import useDragAndDrop from '@/hooks/useDragAndDrop';
import { modal } from '@/libs/modal';
import { fileToBlob, getMeta } from '@/utilities/image';
import { useModal } from '@pit-ui/modules/modal';
import React, { useCallback } from 'react';
import HeaderMiddleAndBottom from './header/header-middle-and-bottom';
import ModalTakePhoto from './modal-take-photo';

const ModalSelectImage = ({ onClose }: { onClose?(): void }) => {
  const { close, done } = useModal();
  const [isDragOver, handler] = useDragAndDrop<HTMLLabelElement>({
    onDrop(files) {
      const url = fileToBlob(files)[0].src;
      getMeta(url).then(done);
    }
  });

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const url = fileToBlob(e.target.files)[0].src;
      getMeta(url).then(done);
    }
  }
  const handlerModalTakePhoto = useCallback(() => {
    modal.open<string>({
      render: ModalTakePhoto,
      onDone(data) {
        getMeta(data).then(done);
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[45rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, [done]);

  return (
    <div className="pb-10 md:pb-0">
      <HeaderMiddleAndBottom title="Cập nhật ảnh đại diện" />
      <div className="max-md:hidden">
        <div className="flex items-center justify-center w-full mt-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-[19.25rem] border border-neutral-400 border-dashed rounded-2xl cursor-pointer bg-neutral-50"
            {...handler}
          >
            <div className="flex flex-col items-center justify-center p-8 text-neutral-500">
              <Svg className="w-14 h-14 mb-2" src={'/icons/bold/image.svg'} />
              <p className="text-sm text-gray-500">
                Kéo thả ảnh vào khung này hoặc <span className="font-bold text-primary">Tải ảnh lên</span>
              </p>
              <p className="text-sm text-gray-500"> Kích thước ảnh tối đa 500KB</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" accept="image" onChange={onSelectFile} />
          </label>
        </div>
      </div>
      <ul className="md:hidden divide-y divide-neutral-200">
        <li>
          <div className="mt-8 mb-4">
            <label className="flex flex-row gap-4" htmlFor="dropzone-file">
              <img src="/icons/others/slect-image.svg" width={24} height={24} alt="123" />
              <span className="text-sm font-bold text-neutral-800">Chọn ảnh trên máy</span>
            </label>
            <input id="dropzone-file" type="file" onChange={onSelectFile} className="hidden" accept="image" />
          </div>
        </li>
        <li>
          <div className="pt-4" onClick={handlerModalTakePhoto}>
            <div className="flex flex-row gap-4">
              <img src="/icons/others/camera.svg" width={24} height={24} alt="123" />
              <span className="text-sm font-bold text-neutral-800">Chụp ảnh</span>
            </div>
          </div>
        </li>
      </ul>
      {/* <div className="md:flex hidden">
        <span className="md:text-s-md text-xl font-bold text-neutral-800">Cập nhật ảnh đại diện</span>
      </div>
      <button onClick={close}>
        <Svg
          src="/icons/line/close.svg"
          className="md:h-14 md:w-14 cursor-pointer rounded-full md:bg-neutral-100 md:p-4 z-10 left-2 top-3 w-10 h-10 p-2 fixed md:absolute md:top-4 md:right-4 md:left-auto"
        />
      </button>
      <div className="md:hidden flex justify-center -mt-1">
        <span className="md:text-s-md text-xl font-bold text-neutral-800">Cập nhật ảnh đại diện</span>
      </div>
      <div className="h-2 bg-neutral-100 flex md:hidden -ml-4 -mr-4 mt-4" />
      {!imgSrc && (
        <div className="flex items-center justify-center w-full mt-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col xl:min-h-[308px] items-center justify-center w-full h-[19.25rem] border border-neutral-400 border-dashed rounded-2xl cursor-pointer bg-neutral-50"
            {...handler}
          >
            <div className="flex flex-col items-center justify-center p-8 text-neutral-500">
              <Svg className="w-14 h-14 mb-2" src={'/icons/bold/image.svg'} />
              <p className="text-sm text-gray-500">
                Kéo thả ảnh vào khung này hoặc <span className="font-bold text-primary">Tải ảnh lên</span>
              </p>
              <p className="text-sm text-gray-500"> Kích thước ảnh tối đa 500KB</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" accept=".jpg, .jpeg, .png" onChange={onSelectFile} />
          </label>
        </div>
      )}
      {!!imgSrc && (
        <ReactCrop
          crop={{
            x: 30,
            y: 30,
            width: 50,
            height: 50,
            unit: '%'
          }}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={16 / 9}
          className="custom-image-crop rounded-xl mt-8 max-h-[350px] w-full justify-center items-center"
          keepSelection
          disabled
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            className="rounded-xl object-cover w-full"
            style={{ transform: `scale(${scale})` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!imgSrc && (
        <div className="flex flex-row items-center gap-8 mt-4">
          <span>0%</span>
          <input type="range" min="1" max="10" className="h-1 w-full cursor-pointer" value={scale} onChange={handleZoomChange} />

          <span>100%</span>
        </div>
      )}
      {!!imgSrc && (
        <div className="flex justify-center mt-8 max-md:absolute max-md:bottom-6 max-md:w-[90%]">
          <button onClick={onClickDone} type="button" className="transition-default btn-primary btn max-md:w-full md:w-56 rounded-full">
            Xác nhận
          </button>
        </div>
      )} */}
    </div>
  );
};
export default ModalSelectImage;
