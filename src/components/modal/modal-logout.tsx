import Svg from '@/components/icon/svg';
import { useGlobalContext } from '@/context/global';
import Modal from '@/libs/modal';
import { useRouter } from 'next/router';

const ModalLogout = ({ onClose }: { onClose?(): void }) => {
  const router = useRouter();
  const {logout}= useGlobalContext()
  const handlerLogout = () => {
    if (onClose) {
      logout();
      void onClose();
    }
    localStorage.removeItem('status');
    router.push('/');
  };

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex">
        <Modal.Heading title="Bạn muốn đăng xuất?" />
        <Svg
          src="/icons/line/close.svg"
          className="absolute right-2 top-2 md:right-4 md:top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
          onClick={onClose}
        />
      </div>
      <Modal.ModalContent className="">
        <p className="text-base font-normal text-neutral-500">
          Bạn chắc chắn muốn rời khỏi? iTel tuy buồn nhưng sẽ nuốt nước mắt vào trong và đợi bạn trở về. Sớm quay lại nhé!
        </p>
      </Modal.ModalContent>
      <Modal.ModalActions className="text-center">
        <div className="flex flex-row justify-center gap-4 ">
          <button onClick={onClose} className="btn btn-secondary rounded-full h-[44px] md:h-[56px]  btn-lg w-full md:min-w-[14.5rem]">
            Không
          </button>
          <button
            onClick={handlerLogout}
            type="submit"
            className="btn-primary h-[44px] md:h-[56px] btn btn-lg w-full md:min-w-[14.5rem] rounded-full"
          >
            Xác nhận
          </button>
        </div>
      </Modal.ModalActions>
    </div>
  );
};
export default ModalLogout;
