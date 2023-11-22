import { useModal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import Link from 'next/link';
import CardDataSelect from '../card/card-data-select';
import HeaderAppDefault from '../header/header-app-default';
import Svg from '../icon/svg';
import HeaderMiddle from './header/header-middle';

type Props = {
  data?: dataModel.Pack;
  onChange?(): void;
  dataCurrent?: dataModel.resultPack,
  phone:string
};

const ModalChangePack = ({ data, onChange,phone,dataCurrent }: Props) => {
  const { close, done } = useModal();
  return (
    <div>
      {/* <HeaderAppDefault title={title} /> */}
      <HeaderAppDefault title="Xác nhận thay đổi gói cước" type="fixed" buttonStyle="dark" mode="close" />
      {/* Header tablet and pc */}
      <HeaderMiddle
        title="Xác nhận thay đổi gói cước"
        desc={
          <>
            <div className="text-subtle-content">
              Thuê bao <b className="text-base-content md:text-xl">{formatPhoneNumber(phone)}</b> đang sử dụng gói cước{' '}
              <b className="md:text-xl">{dataCurrent?.packageName}</b>, hạn sử dụng đến ngày {dataCurrent?.timeEnd}. Nếu xác nhận đăng ký thay đổi thành gói{' '}
              <b className="md:text-xl">{data?.Name}</b>, các ưu đãi còn lại của gói <b className="md:text-xl">{dataCurrent?.packageName}</b> sẽ hết hiệu lực.
              <br />
              Vui lòng bấm <b className="text-red-500">Tiếp tục</b> để xác nhận thay đổi.
            </div>
          </>
        }
      />
      <div className="mobile-container pt-16 md:py-0 pb-32">
        <div className="md:hidden">
          <div className="font-bold text-s-sm">Xác nhận thay đổi gói cước</div>
          <div className="mt-2 text-subtle-content">
            Thuê bao <b className="text-base-content md:text-xl">{formatPhoneNumber(phone)}</b> đang sử dụng gói cước{' '}
            <b className="md:text-xl">{dataCurrent!.packageName}</b>, hạn sử dụng đến ngày 18/04/2023. Nếu xác nhận đăng ký thay đổi thành gói{' '}
            <b className="md:text-xl">{data!.Name}</b>, các ưu đãi còn lại của gói <b className="md:text-xl">{dataCurrent!.packageName}</b> sẽ hết hiệu lực.
            <br />
            Vui lòng bấm <b className="text-red-500">Tiếp tục</b> để xác nhận thay đổi.
          </div>
        </div>
        <div className="mt-8 flex flex-wrap md:flex-nowrap items-center justify-center gap-x-4 gap-y-3">
          <div className="w-full">
            <p className="font-medium">Gói cước hiện tại (cần hủy)</p>
            <div className="mt-2">
              <CardDataSelect strongFirstInfo={false} title={dataCurrent?.packageName} price={dataCurrent?.price!} discountPrice={dataCurrent?.price!} />
            </div>
          </div>
          <div className="rotate-90 md:rotate-0">
            <Svg src="/icons/line/arrow-right.svg" height={32} width={32} />
          </div>
          <div className="w-full">
            <p className="font-medium">Gói cước mới</p>
            <div className="mt-2">
              <CardDataSelect strongFirstInfo={false} title={data?.Name} price={data?.Price!} discountPrice={data?.Price!} />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed left-0 bottom-0 md:relative w-full py-2 md:py-0 bg-neutral-0 mt-0 md:mt-8">
        <div className="flex -mx-1.5 px-4 md:px-0 justify-center">
          <div className="w-1/2 md:w-[14.5rem] px-1.5">
            <button
              type="button"
              onClick={() => {
                onChange?.();
                close();
              }}
              className="transition-default h-11 btn-secondary btn md:btn-lg w-full rounded-full"
            >
              Thay đổi số
            </button>
          </div>
          <div className="w-1/2 md:w-[14.5rem] px-1.5">
            <button type="button" onClick={done} className="transition-default h-11 btn-primary btn md:btn-lg w-full rounded-full">
              Tiếp tục
            </button>
          </div>
        </div>
        <p className="mt-4 md:mt-6 text-subtle-content text-center">
          <span className="max-md:block">Bạn chưa có Sim?</span>
          <Link href={Routers.SIM} className="text-base-content md:text-red-500">
            <b> Mua Sim với gói cước </b>
          </Link>
          <span className="max-md:hidden">ngay nhé.</span>
        </p>
      </div>
    </div>
  );
};

export default ModalChangePack;
