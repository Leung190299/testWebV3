import { getPointerPosition } from '@/utilities/position';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import useGlobalEventListener from '@pit-ui/modules/hooks/useGlobalEventListener';
import useIsomorphicLayoutEffect from '@pit-ui/modules/hooks/useIsomorphicLayoutEffect';
import { Modal } from '@pit-ui/modules/modal';

import { useGlobalContext } from '@/context/global';
import { clamp } from '@/utilities/number';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import InputSliderRange from '../input/input-slider';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import DebugUI from '../common/debug';

type Props = {
  onClose(): void;
  data: null | { url: string; width: number; height: number };
  maxZoom?: number;
};
function round(v: number) {
  return Number(v.toFixed(5));
}
function getScale(cropSize: number[], imageSize: number[], minCrop: number[]) {
  const minScale = Math.max(cropSize[0] / imageSize[0], cropSize[1] / imageSize[1]);
  const maxScale = Math.max(Math.min(cropSize[0] / minCrop[0], cropSize[1] / minCrop[1]), minScale);
  return [round(minScale), round(maxScale)];
}

function getStyle(center: number[], imageSize: number[], scale: number, rotate: number) {
  const x = (0.5 - center[0]) * imageSize[0] * scale;
  const y = (0.5 - center[1]) * imageSize[1] * scale;
  const newPos = [(0.5 - center[0]) * imageSize[0], (0.5 - center[1]) * imageSize[1]];
  const matrix = new DOMMatrix().rotate(rotate).scale(scale).translate(newPos[0], newPos[1]);

  return {
    // transform: 'translate3d(' + x + 'px, ' + y + 'px, 0) scale(' + scale + ') rotate(' + rotate + 'deg)'
    transform: matrix.toString()
  };
}
function clampCenter(center: number[], cropSize: number[], imageSize: number[], scale: number) {
  var halfWidth = cropSize[0] / 2 / (imageSize[0] * scale);
  const halfHeight = cropSize[1] / 2 / (imageSize[1] * scale);
  return [clamp(center[0], halfWidth, 1 - halfWidth), clamp(center[1], halfHeight, 1 - halfHeight)];
}
const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
const minCrop = 180;
interface ImageCropState {
  width: number;
  height: number;
  x: number;
  y: number;
}
const ModalCropImage = (props: Props) => {
  const { data, onClose } = props;
  const { user, setUser } = useGlobalContext();
  const cropSize = useMemo(() => [240, 240], []);
  const imageSize = useMemo(() => (data ? [data.width, data.height] : [0, 0]), [data]);
  const [minZoom, maxZoom] = getScale(cropSize, imageSize, [minCrop, minCrop]);
  const [zoom, setScale] = useState(minZoom);
  const [rotateS, setRotate] = useState(0);
  const [center, setCenter] = useState([0.5, 0.5]);
  const withRotate = useBoolean(false);
  const rotate = withRotate.value ? rotateS : 0;

  const imageRef = useRef<null | ImageCropState>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onChange = useCallback((e: ImageCropState) => {
    imageRef.current = e;
  }, []);
  const onSave = useCallback(() => {
    if (imageRef.current && canvasRef.current && data) {
      const img = new Image();
      const ctx = canvasRef.current.getContext('2d')!;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cropSize[0], cropSize[1]);
      const margin = 100;
      const scale = cropSize[0] / (imageSize[0] * imageRef.current.width);
      const marginImg = round(margin / scale);

      const sx = imageSize[0] * imageRef.current.x - marginImg;
      const sy = imageSize[1] * imageRef.current.y - marginImg;
      const sw = imageSize[0] * imageRef.current.width + marginImg * 2;
      const sh = imageSize[1] * imageRef.current.height + marginImg * 2;
      const imageSourceParams: [number, number, number, number] = [sx, sy, sw, sh];

      const dx = -cropSize[0] / 2 - margin;
      const dy = -cropSize[1] / 2 - margin;
      const dw = cropSize[0] + margin * 2;
      const dh = cropSize[1] + margin * 2;
      const cropParams: [number, number, number, number] = [dx, dy, dw, dh];
      img.onload = async (v) => {
        // two
        // ctx.drawImage(bit, ...cropParams);

        // one
        const angle = (rotate * Math.PI) / 180;
        ctx.setTransform(1, 0, 0, 1, cropSize[0] / 2, cropSize[1] / 2);
        ctx.rotate(angle);
        ctx.drawImage(img, ...imageSourceParams, ...cropParams);

        const base64 = canvasRef.current!.toDataURL('image/webp').split(',')[1];
        const url = URL.createObjectURL(b64toBlob(base64, 'image/webp'));

        toast.success('Đã cập nhật Ảnh đại diện');

        setUser(user ? { ...user, image: url } : null);
        onClose();
      };
      img.src = data.url;
    }
  }, [cropSize, data, imageSize, onClose, setUser, user, rotate]);

  return (
    <Modal.ModalBody className="modal-box shadow-itel md:max-w-lg flex flex-col" onClose={onClose}>
      <HeaderMiddleAndFull title="Cập nhật ảnh đại diện" mobileTitle="Ảnh đại diện" onClose={onClose} />
      <div className="mt-2 md:mt-8 mobile-container pt-4 pb-20 md:py-0 flex-1">
        <div className="block-img overflow-hidden block-square md:block-photo rounded-2xl">
          <PictureZoomCrop
            center={center}
            rotate={rotate}
            cropSize={cropSize}
            imageSize={imageSize}
            imageSrc={data?.url || ''}
            onMove={setCenter}
            zoom={zoom}
            onChange={onChange}
          />
        </div>
        <div className="flex gap-4 mt-3">
          <span className="text-neutral-500">0%</span>
          <InputSliderRange min={minZoom} max={maxZoom} step={0.01} value={zoom} onChange={(e) => setScale(e.target.value)} />
          <span className="text-neutral-500">100%</span>
        </div>
        {withRotate.value && (
          <div className="flex gap-4 mt-3">
            <span className="text-neutral-500">0</span>
            <InputSliderRange min={0} max={360} step={1} value={rotate} onChange={(e) => setRotate(e.target.value)} />
            <span className="text-neutral-500">360</span>
          </div>
        )}
        {/* <div className="block-img block-square"> */}
        <canvas className="absolute h-0 w-0" ref={canvasRef} width={cropSize[0]} height={cropSize[1]} />
        {/* </div> */}
        <div className="fixed md:static md:mt-8 left-0 bottom-0 bg-neutral-0 mobile-container py-2 md:py-0 w-full">
          <div className="w-full md:w-1/2 mx-auto">
            <button type="button" onClick={onSave} className="btn btn-primary rounded-full w-full">
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <DebugUI className="p-2 rounded-r-xl text-sm bg-neutral-0 shadow-itel" title="Hello">
        <button className="btn btn-xs rounded-full" onClick={withRotate.toggle}>
          Quay ảnh
        </button>
      </DebugUI>
    </Modal.ModalBody>
  );
};

interface PictureZoomCropProps {
  center: number[];
  cropSize: number[];
  imageSize: number[];
  imageSrc: string;
  zoom: number;
  rotate: number;
  onMove(center: number[]): void;
  onChange(s: ImageCropState): void;
}
const PictureZoomCrop = (props: PictureZoomCropProps) => {
  const { center, cropSize, imageSize, imageSrc, zoom, rotate, onMove, onChange } = props;
  const isStart = useBoolean(false);

  const scaleRef = useRef(1);
  const rotateRef = useRef(0);

  const state = useRef({ moveable: false, initialPos: [0, 0], center: [0.5, 0.5] }).current;
  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent> | React.TouchEvent<HTMLElement>) => {
      state.moveable = true;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      isStart.setTrue();
      e.stopPropagation();

      const initialPos = getPointerPosition(e.nativeEvent);
      state.initialPos = initialPos;
      state.center = center;
    },
    [center, isStart, state]
  );
  const onMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isStart.value) return;
      const angle = -(rotateRef.current * Math.PI) / 180;
      const currentPos = getPointerPosition(e);
      const x = currentPos[0] - state.initialPos[0];
      const y = currentPos[1] - state.initialPos[1];
      const newX = angle ? x * Math.cos(angle) - y * Math.sin(angle) : x;
      const newY = angle ? x * Math.sin(angle) + y * Math.cos(angle) : y;
      const centerX = state.center[0] - newX / (imageSize[0] * scaleRef.current);
      const centerY = state.center[1] - newY / (imageSize[1] * scaleRef.current);
      const s = [centerX, centerY];
      requestAnimationFrame(() => {
        const newPos = clampCenter(s, cropSize, imageSize, scaleRef.current);
        onMove(newPos);
      });
    },
    [cropSize, imageSize, isStart.value, onMove, state]
  );
  const onMouseUp = (e: MouseEvent | TouchEvent) => {
    isStart.setFalse();
  };
  const options = { capture: !0 };
  useGlobalEventListener('mousemove', isStart.value ? onMouseMove : null, options);
  useGlobalEventListener('touchmove', isStart.value ? onMouseMove : null, options);
  useGlobalEventListener('mouseup', isStart.value ? onMouseUp : null, options);
  useGlobalEventListener('touchend', isStart.value ? onMouseUp : null, options);

  const transform = `translate(${-(imageSize[0] - cropSize[0]) / 2}px,${(cropSize[1] - imageSize[1]) / 2}px)`;
  useIsomorphicLayoutEffect(
    function () {
      zoom !== scaleRef.current && ((scaleRef.current = zoom), onMove(clampCenter(center, cropSize, imageSize, zoom)));
    },
    [center, cropSize, imageSize, onMove, zoom]
  );
  useIsomorphicLayoutEffect(() => {
    rotateRef.current = rotate;
  }, [rotate]);
  useEffect(
    function () {
      var height = cropSize[1] / (imageSize[1] * zoom),
        width = cropSize[0] / (imageSize[0] * zoom),
        x = center[0] - width / 2,
        y = center[1] - height / 2;
      height = round(clamp(height, 0, 1));
      width = round(clamp(width, 0, 1));
      onChange({ height, width, x: clamp(x, 0, 1 - width), y: clamp(y, 0, 1 - height) });
    },
    [center, cropSize, imageSize, onChange, zoom]
  );
  const styles = getStyle(center, imageSize, zoom, rotate);
  return (
    <div className="absolute inset-0">
      <div className="relative top-1/2 -translate-y-1/2 mx-auto" style={{ width: cropSize[0], height: cropSize[1] }}>
        <div className="relative overflow-hidden rounded-full z-10 pointer-events-none" style={{ width: cropSize[0], height: cropSize[1] }}>
          <div className="absolute" style={{ transform }}>
            <div className="cursor-move" style={styles}>
              <img src={imageSrc} alt="asdas" className="max-w-none" draggable={false} />
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0" style={{ transform }}>
          <div onMouseDown={onMouseDown} onTouchStart={onMouseDown} className="relative cursor-move" style={styles}>
            <img src={imageSrc} alt="asdas" className="max-w-none" draggable={false} />
            <div className="bg-neutral-900 bg-opacity-50 absolute inset-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCropImage;
