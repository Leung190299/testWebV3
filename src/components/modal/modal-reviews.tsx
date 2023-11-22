import { useId, useMemo } from 'react';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';

import { fileToBlob } from '@/utilities/image';

import { useGlobalContext } from '@/context/global';
import useIsClient from '@/hooks/useIsClient';
import Modal from '@/libs/modal';
import { toCurrency } from '@/utilities/currency';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Svg from '../icon/svg';
import LabelOut from '../input/label-out';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import clsx from 'clsx';

type Props = {
  open?: boolean;
  onClose?(): void;

  itemName: string;
  itemImage: string;
  itemDesc?: string;
  itemPrice: number;
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
const ModalReview = ({ onClose, itemName, itemPrice, itemImage, itemDesc }: Props) => {
  useIsClient();
  const { user } = useGlobalContext();
  const fileId = useId();
  const methods = useForm<IForm>({ defaultValues: { name: user?.name!, phone: user?.phone! } });

  const attachments = useWatch<IForm, 'attachments'>({ name: 'attachments', control: methods.control });
  const previews = useMemo(() => fileToBlob(attachments), [attachments]);

  const onSubmit: SubmitHandler<IForm> = (values) => {
    onClose?.();
    toast.success('Gửi đánh giá thành công');
  };

  const onRemoveImage = function (index: number) {
    const files = Array.from(methods.getValues('attachments') || []);

    files.splice(index, 1);
    methods.setValue('attachments', files);
  };

  const isValid = methods.formState.isDirty && methods.formState.isValid;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off">
      <HeaderMiddleAndFull title="Đánh giá Sản phẩm" />
      <Modal.ModalContent className="md:mt-8 overflow-hidden">
        <div className="flex md:rounded-lg flex-row gap-x-3 bg-neutral-0 md:bg-neutral-100 p-3 font-medium">
          <div className="w-12">
            <div className="card-image block-img block-square w-full">
              <img src={itemImage} alt={itemName} className="rounded-lg object-cover" />
            </div>
          </div>
          <div>
            <p className="font-bold md:font-medium">{itemName}</p>
            <p className="text-sm md:text-base text-neutral-500 md:text-base-content">{toCurrency(itemPrice)}</p>
          </div>
        </div>
        <div className="mt-2 md:mt-4 bg-neutral-0 md:bg-transparent mobile-container py-4 md:pt-0">
          <Controller
            control={methods.control}
            name="rating"
            render={({ field: { value: fieldValue, onChange } }) => (
              <div className="mx-auto mt-1 flex justify-between md:justify-center py-2">
                {rates.map(({ title, value }, i) => {
                  return (
                    <label
                      key={value}
                      onClick={() => onChange(value)}
                      className="block md:w-20 cursor-pointer whitespace-nowrap text-center text-xs font-medium"
                    >
                      <span className={fieldValue >= value ? 'text-yellow-500' : 'text-neutral-200'}>
                        <Svg className="inline" src="/icons/bold/star.svg" width={32} height={32} />
                      </span>
                      <p className={clsx(fieldValue == value ? '' : 'text-neutral-500 md:text-neutral-800', 'mt-1')}>{title}</p>
                    </label>
                  );
                })}
              </div>
            )}
          />
          <div className="mt-6 md:mt-4">
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
          <div className="mt-6 md:mt-4">
            <textarea
              className="h-27 w-full resize-none rounded-lg border border-neutral-200 bg-transparent p-4 outline-none"
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
              <div className="mt-4 text-center">
                <label htmlFor={fileId} className="btn-tertiary btn btn-sm gap-x-2 rounded-full">
                  <Svg src="/icons/line/image.svg" width={20} height={20} />
                  Thêm hình ảnh
                </label>
              </div>
            )}
          </div>
        </div>
        <hr className="max-md:hidden border-t border-neutral-200" />
        <div className="bg-neutral-0 md:bg-transparent mobile-container mt-2 md:mt-4 pt-6 md:pt-0">
          <div className="-mx-3 flex flex-wrap md:flex-nowrap">
            <LabelOut label="Họ và tên" className="w-full px-3 pt-2" required>
              <input
                type="text"
                placeholder="Nhập Họ và Tên"
                className="input-bordered input w-full outline-none autofill:shadow-neutral-0 mt-2"
                autoComplete="off"
                style={{
                  WebkitBoxShadow: '0 0 0px 1000px #ffffff inset'
                }}
                {...methods.register('name', { required: true })}
              />
              {methods.formState.errors.name && <p className="label-text text-red-500">{methods.formState.errors.name.message}</p>}
            </LabelOut>
            <LabelOut label="Số điện thoại" className="w-full px-3 mt-6 md:mt-0 pt-2" required>
              <input
                type="tel"
                placeholder="Nhập Số điện thoại"
                className="input-bordered input w-full outline-none mt-2"
                {...methods.register('phone', { required: true })}
                style={{
                  WebkitBoxShadow: '0 0 0px 1000px #ffffff inset'
                }}
              />
              {methods.formState.errors.phone && <p className="label-text text-red-500">{methods.formState.errors.phone.message}</p>}
            </LabelOut>
          </div>
          <label className="label mt-2 w-auto cursor-pointer justify-normal md:mt-0 py-1 md:py-3">
            <div className="mr-2 p-0.5">
              <input type="checkbox" className="block" />
            </div>
            <span className="label-text font-medium">Tôi sẽ giới thiệu sản phẩm này cho bạn bè người thân</span>
          </label>
        </div>
      </Modal.ModalContent>
      <Modal.ModalActions className="pt-4 md:mt-8 text-center bg-neutral-0 pb-8 md:pb-0">
        <div>
          <button type="submit" disabled={!isValid} className="btn-primary btn btn-lg min-w-[14.5rem] rounded-full">
            Gửi đánh giá
          </button>
        </div>
        <p className="text-sm md:text-base mt-4 md:mt-3 text-subtle-content">
          Để đánh giá được duyệt, bạn vui lòng tham khảo{' '}
          <Link href="/" className="mt-1 md:mt-0 max-md:block text-base-content md:text-red-500">
            <b>Quy định duyệt đánh giá</b>
          </Link>
        </p>
      </Modal.ModalActions>
    </form>
  );
};

export default ModalReview;
