import { modal, useModal } from '@/libs/modal';
import clsx from 'clsx';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import Svg from '../icon/svg';

const social = [
  { id: 1, logo: '/logo/facebook.svg', href: 'https://www.facebook.com/' },
  { id: 2, logo: '/logo/instagram.svg', href: 'https://www.instagram.com/' },
  { id: 3, logo: '/logo/twitter.svg', href: 'https://twitter.com/?lang=vi' },
  { id: 4, logo: '/logo/messenger.svg', href: 'https://www.messenger.com/' }
];

const ButtonShare = () => {
  const handleShowShareContainer = () => {
    modal.open({
      render: (
        <div className="block xl:hidden px-4 py-6 md:px-0 md:py-0">
          <ButtonShareContent isModal />
        </div>
      ),
      className: 'modal-box overflow-visible h-max md:max-w-[35rem] xl:hidden',
      classNameContainer: 'modal-bottom-sheet h-max md:modal-middle xl:hidden flex flex-col justify-end md:justify-center',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50 xl:hidden',
      closeButton: false
    });
  };

  return (
    <div className="group">
      <button
        className="btn btn-tertiary btn-circle md:w-14 md:h-14 w-10 h-10 bg-transparent hover:bg-neutral-300/[0.2] xl:pointer-events-none"
        onClick={() => handleShowShareContainer()}
      >
        <Svg src="/icons/line/share.svg" className="md:w-6 md:h-6 w-5 h-5 inline text-neutral-0" />
      </button>
      <div className="w-[27.5rem] py-4 px-6 bg-neutral-700 rounded-lg absolute bottom-[4.75rem] hidden xl:group-hover:block ">
        <ButtonShareContent />
      </div>
    </div>
  );
};

type ButtonShareContentProps = {
  isModal?: boolean;
};

const ButtonShareContent = ({ isModal = false }: ButtonShareContentProps) => {
  const { close } = useModal();
  const handleCopy = () => {
    navigator.clipboard.writeText('https://itel.vn/shop/san-pham/oppo/dien-thoai/Reno-8-5G');
    toast.success('Copied to clipboard.');
  };
  return (
    <div className="relative flex flex-col gap-4 xl:after:contents('') xl:after:w-full xl:after:h-6 xl:after:bg-transparent xl:after:absolute xl:after:-bottom-9 xl:after:-left-1">
      <button className="btn btn-md md:btn-tertiary btn-ghost btn-circle absolute -right-3 -top-3 xl:hidden" onClick={close}>
        <Svg src="/icons/line/close.svg" className="inline w-6 h-6 text-neutral-800" />
      </button>
      <p className={clsx('text-xl font-bold ', isModal ? 'text-neutral-800' : 'text-neutral-0')}>Chia sẻ ngay</p>
      {isModal && <p className="text-base font-normal text-neutral-500 mt-2 mb-4">Vui lòng Đăng nhập/ Đăng ký để sử dụng chức năng này!</p>}
      <div className={clsx('p-3 rounded-lg', isModal ? 'bg-neutral-100' : 'bg-neutral-800')}>
        <div className="flex justify-start items-center gap-3">
          <img
            src="https://res.cloudinary.com/dgkrchato/image/upload/v1685505814/itel-web/fc8c5e564102ce37cbb0496bfe60b85b_idvtoj.png"
            alt="img"
            className="aspect-square w-12 rounded"
          />
          <div>
            <p className={clsx(' text-sm font-normal', isModal ? 'text-neutral-800' : 'text-neutral-0')}>Phim bộ</p>
            <p className={clsx('text-sm font-medium', isModal ? 'text-neutral-800' : 'text-neutral-0')}>Quý ngài Ánh Dương</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className={clsx('text-base font-bold ', isModal ? 'text-neutral-800' : 'text-neutral-0')}>Đường dẫn</p>
        <div
          className={clsx(
            'p-4 flex justify-between items-center border rounded-lg gap-2',
            isModal ? 'border-neutral-300' : 'border-neutral-600'
          )}
        >
          <p className={clsx('text-base font-medium flex-1 truncate', isModal ? 'text-neutral-500' : 'text-neutral-200')}>
            https://itel.vn/shop/san-pham/oppo/dien-thoai/Reno-8-5G
          </p>
          <button onClick={handleCopy}>
            <Svg
              src="/icons/bold/copy.svg"
              className={clsx('inline w-6 h-6  cursor-pointer', isModal ? 'text-neutral-800' : 'text-neutral-0')}
            />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className={clsx('text-base font-bold', isModal ? 'text-neutral-800' : 'text-neutral-0')}>Chia sẻ đến</p>
        <div className="flex justify-start items-center gap-5">
          {social.map((item) => (
            <a key={item.id} href={item.href} >
              <Svg src={item.logo} className="inline w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ButtonShare;
