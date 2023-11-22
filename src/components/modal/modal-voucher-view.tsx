import { modal } from '@/libs/modal';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { useModal } from '@pit-ui/modules/modal';
import { CardVoucherView } from '../card/card-voucher-view';
import HeaderMiddleAndBottom from './header/header-middle-and-bottom';
import { toggleModalVoucher } from './modal-voucher-detail';

type Props = {
  forceView?: boolean;
  dataVoucher: itelClubModel.voucherClient;
  voucher: itelClubModel.DetailVoucher;
};

const ModalVoucherView = ({ forceView: forceViewProp, voucher, dataVoucher }: Props) => {
  const forceView = useBoolean(forceViewProp);
  const { close, done } = useModal();
  const handleViewVoucher = () => {
    close();
    toggleModalVoucher({ data: voucher, isDetail: true, isReceived: true,dataVoucher });
  };
  return (
    <div className="pb-20 md:pb-0">
      <HeaderMiddleAndBottom
        title={forceView.value ? 'Thông tin Voucher' : 'Xác nhận dùng voucher'}
        desc={
          forceView.value ? undefined : (
            <>
              Bấm <b>“Xác nhận”</b> để dùng Voucher ngay. Sau khi Xác nhận, Voucher sẽ được hiện thông tin Barcode của Voucher.
            </>
          )
        }
      />
      <div className="mt-4 md:mt-8">
        <CardVoucherView
          banner={voucher.image!}
          brandLogo={voucher.brandImage!}
          brandName={voucher.brand!}
          dateEnd={dataVoucher.expiredDate || ''}
          price={Number(voucher.price) || 0}
          title={voucher.title||''}
        />
        {forceView.value ? (
          <div className="text-sm md:text-base text-neutral-500 space-y-3 md:space-y-4 mt-4 md:mt-10">
            <div className="text-center flex justify-center items-center">
              {/* <div className="w-min mx-auto">
                <Barcode displayValue={false} width={3.3} height={80} value="4456466774" margin={0} />
              </div>
              <p className="mt-1">4 4 5 6 4 6 6 7 7 4</p> */}
              <img src={dataVoucher.codeImage || ''} alt={dataVoucher.code} />
            </div>
            <p>Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán. Vui lòng không đưa ảnh chụp màn hình</p>
            <div>
              <p className="text-sm">Hiệu lực</p>
              <p className="mt-1 text-base-content">
                <b>{dataVoucher.expiredDate}</b>
              </p>
            </div>
            <div>
              <p className="text-sm">Hotline</p>
              <p className="mt-1 text-base-content">
                <b>1900299232</b>
              </p>
            </div>
          </div>
        ) : (
          <p className="md:hidden mt-4 text-sm text-neutral-500">
            Bấm <b className="text-base-content">“Xác nhận”</b> để dùng Voucher ngay. Sau khi Xác nhận, Voucher sẽ được hiện thông tin
            Barcode của Voucher.
          </p>
        )}
      </div>
      <div className="fixed bottom-0 md:relative bg-neutral-0 left-0 w-full mt-8">
        <div className="px-4 md:px-0 py-2 md:py-0 -mx-2 flex">
          {!forceView.value && (
            <div className="w-full md:w-1/2 mx-auto px-2">
              <button className="btn btn-secondary md:btn-lg rounded-full w-full" onClick={close}>
                Để sau
              </button>
            </div>
          )}
          <div className="w-full md:w-1/2 mx-auto px-2">
            <button
              className="btn btn-primary text-sm md:btn-lg rounded-full w-full"
              onClick={forceView.value ? handleViewVoucher : forceView.setTrue}
            >
              {forceView.value ? 'Xem Voucher' : 'Xác nhận dùng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const quickViewVoucher = (p: Props) => {
  return modal.open({
    render: <ModalVoucherView {...p} />,
    classNameOverwrite: true,
    transition: false,
    className: 'modal-box px-6 py-4 shadow-itel md:max-w-[35rem]',
    classNameContainer: 'modal-bottom-sheet md:modal-middle',
    classNameOverlay: 'bg-neutral-900 bg-opacity-50'
  });
};

export default ModalVoucherView;
