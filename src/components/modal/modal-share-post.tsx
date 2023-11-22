import { useModal } from '@/libs/modal';
import ShareInforItem from '../common/share-info-item';
import Svg from '../icon/svg';

type Props = {
  itemName: string;
  itemImage: string;
  itemDesc?: string;

  withLink?: boolean;
  href?: string;

  onCopy?(): void;
  onShare?(): void;
};

const ModalSharePost = (props: Props) => {
  const { close } = useModal();

  return (
    <div className="px-4 py-6 md:p-0">
      <div className="flex items-center">
        <h2 className="text-xl md:text-s-md font-bold">Chia sẻ</h2>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <p className="max-md:hidden mt-2 text-subtle-content">Vui lòng Đăng nhập/ Đăng ký để sử dụng chức năng này!</p>
      <div className="mt-4 md:mt-8">
        <ShareInforItem {...props} />
      </div>
    </div>
  );
};
export default ModalSharePost;
