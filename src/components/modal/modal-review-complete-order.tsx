import HeaderMiddleAndFull from '@/components/modal/header/header-middle-and-full';
import imageCard from '@/components/pages/assets/image-sim.png';

import { fileToBlob } from '@/utilities/image';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { useId, useMemo } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Svg from '../icon/svg';
import Modal, { useModal } from '@/libs/modal';

type Props = {
  open?: boolean;
  onClose?(): void;
};

type IForm = {
  rating: number;
  tags?: number;

  attachments?: File[] | FileList;

  name: string;
  phone: string;
};
const rates = [
  { value: 1, title: 'Rất tệ' },
  { value: 2, title: 'Tệ' },
  { value: 3, title: 'Bình thường' },
  { value: 4, title: 'Tốt' },
  { value: 5, title: 'Rất tốt' }
];
const quickTags = [
  { id: 1, title: 'Sản phẩm tốt' },
  { id: 2, title: 'Đúng mô tả' },
  { id: 3, title: 'Giá phải chăng' },
  { id: 4, title: 'Cấu hình mượt' },
  { id: 5, title: 'Ý kiến khác' }
];
const ModalReviewOrderComplete = ({ onClose }: Props) => {
  const fileId = useId();
  const methods = useForm<IForm>({});
  const { done } = useModal();

  const attachments = useWatch<IForm, 'attachments'>({ name: 'attachments', control: methods.control });
  const previews = useMemo(() => fileToBlob(attachments), [attachments]);

  const onSubmit: SubmitHandler<IForm> = (values) => {
    onClose?.();
    toast.success('Gửi đánh giá thành công');
    done(1);
  };
  const onRemoveImage = function (index: number) {
    const files = Array.from(methods.getValues('attachments') || []);

    files.splice(index, 1);
    methods.setValue('attachments', files);
  };
  const isValid = methods.formState.isValid;
  const valueStar = methods.watch('rating');
  //parseInt
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off" className="max-md:h-full">
      <HeaderMiddleAndFull title="Đánh giá Sản phẩm" />
      <div className="h-2 bg-neutral-100 w-full -pl-[1rem] -pr-[1rem] md:hidden" />
      <div className="container mt-4 md:pb-0 md:px-0 md:mt-8 space-y-6 md:space-y-4">
        <div className="card flex-row gap-x-3 bg-neutral-100 p-3 font-medium">
          <div className="w-12">
            <div className="card-image block-img block-square w-full">
              <Image src={imageCard} alt="ansns" className="rounded-lg object-cover" />
            </div>
          </div>
          <div>
            <p>Điện thoại Chính hãng OPPO - Reno8 T 5G</p>
            <p>3.690.000đ</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <div className="mx-auto mt-1 flex justify-center py-2">
            {rates.map(({ title, value }, i) => {
              return (
                <label key={value} className="block w-20 cursor-pointer whitespace-nowrap text-center text-xs font-medium">
                  <input type="radio" className="peer sr-only" value={value} {...methods.register('rating', { value, required: true })} />
                  <Svg
                    className={clsx(i < valueStar && 'text-yellow-500', 'inline text-neutral-100 peer-checked:text-yellow-500')}
                    src="/icons/bold/star.svg"
                    width={32}
                    height={32}
                  />
                  <p className="mt-1">{title}</p>
                </label>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <ul className="flex md:flex-wrap gap-2 min-w-0 w-auto overflow-auto scrollbar-hide">
              {quickTags.map((tag) => (
                <li key={tag.id} className="block whitespace-nowrap">
                  <label>
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      hidden
                      value={tag.id}
                      {...methods.register('tags', { valueAsNumber: true, required: true })}
                    />
                    <span className="btn-tertiary btn btn-xs md:btn-sm font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                      {tag.title}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <textarea
              className="h-27 text-sm w-full resize-none rounded-lg border border-neutral-200 bg-transparent p-4 outline-none"
              placeholder="Mời bạn chia sẻ cảm nhận về sản phẩm ..."
            />
            <input
              type="file"
              multiple
              id={fileId}
              {...methods.register('attachments')}
              onChange={(event) => {
                if (!event.target.files) return;
                const oldImages = Array.from(methods.getValues('attachments') || []);
                const newImages = Array.from(event.target.files);

                const files = oldImages.concat(newImages);
                methods.setValue('attachments', files);
              }}
              hidden
              className="sr-only"
            />
            <div className="mt-6 md:mt-4">
              {previews.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {previews.map((preview, idx) => (
                    <div key={preview.id} className="relative w-16">
                      <div className="block-img block-square">
                        <img alt={preview.name} src={preview.src} className="rounded-lg object-cover" loading="lazy" />
                      </div>
                      <button
                        type="button"
                        className="transition-default btn-tertiary btn btn-circle absolute -right-1 -top-1 h-5 w-5 hover:btn-primary"
                        onClick={() => onRemoveImage(idx)}
                      >
                        <Svg src="/icons/line/close.svg" width={16} height={16} />
                      </button>
                    </div>
                  ))}
                  <div>
                    <label
                      className="block h-16 w-16 rounded-lg border border-dashed border-neutral-300 bg-neutral-100 center-by-grid"
                      htmlFor={fileId}
                      role="button"
                    >
                      <Svg src="/icons/line/plus.svg" width={24} height={24} />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center mb-8">
                  <label htmlFor={fileId} className="btn-tertiary btn btn-sm gap-x-2 rounded-full">
                    <Svg src="/icons/line/image.svg" width={20} height={20} />
                    Thêm hình ảnh
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="mt-3 block md:hidden text-subtle-content">
            Để đánh giá được duyệt, bạn vui lòng tham khảo{' '}
            <Link href="/" className="text-red-500">
              <b>Quy định duyệt đánh giá</b>
            </Link>
          </p>
          <div className="max-md:absolute max-md:bottom-[4%] max-md:w-[91%]">
            <button type="submit" disabled={!isValid} className="btn-primary btn btn-lg max-md:w-full md:min-w-[14.5rem] rounded-full">
              Gửi đánh giá
            </button>
          </div>
          <p className="mt-3 hidden md:block text-subtle-content">
            Để đánh giá được duyệt, bạn vui lòng tham khảo{' '}
            <Link href="/" className="text-red-500">
              <b>Quy định duyệt đánh giá</b>
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ModalReviewOrderComplete;
