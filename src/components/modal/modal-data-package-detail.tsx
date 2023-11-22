import useIsClient from '@/hooks/useIsClient';
import { modal, useModal } from '@/libs/modal';
import { toCurrency } from '@/utilities/currency';
import { getTypePack } from '../card/card-data-pack';
import HeaderAppDefault from '../header/header-app-default';
import Svg from '../icon/svg';
import { useDataModal } from '../pages/pack-data/hooks';

const ModalDataPackageDetail = ({ onRegister, data }: { onRegister?(): void; data: dataModel.Pack }) => {
  useIsClient();
  const { close, done } = useModal<any>();
  const {  handleModalPhoneCheck,registerPack } = useDataModal();
  return (
    <div >
      <HeaderAppDefault type="fixed" mode="close" title={`Gói cước ${data.Name}`} />
      <div className="max-md:hidden absolute top-8 right-8">
        <button
          className="btn-tertiary btn btn-circle fixed right-8 z-50 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <div className="container max-md:px-0 md:pb-24 md:pt-12 xl:py-8 md:px-10 flex flex-wrap xl:flex-nowrap">
        <div className="flex-1">
          <div className="w-full pr-0 xl:pr-4">
            <div className="block-img block-video">
              <img
                src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1686059238/itel/images/0f70c8c8c78f6d55af9a7a7749ab4f90_keutjk.png"
                className="object-cover md:rounded-2xl"
                alt="123123"
              />
            </div>
          </div>

          {/* {Responsive for mobile and tablet} */}
          <div className="xl:hidden">
            <div className="px-4 md:px-0 bg-neutral-0 py-4 md:py-6">
              <div>
                <div>Gói cước </div>
                <div className="mt-1 font-itel text-h-sm font-bold">{data.Name}</div>
              </div>
              <div className="mt-6 flex flex-row justify-around text-center md:text-left">
                {data.FreeDataPerDay && (
                  <div className="md:flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mx-auto">
                      <Svg src="/icons/bold/data-pack/data.svg" className="w-8 h-8" />
                    </div>
                    <div className="md:ml-4 mt-3 md:mt-0">
                      <div className="text-sm text-neutral-500">Miễn phí</div>
                      <div className="font-medium">
                        {data.FreeDataPerDay >= 1 ? data.FreeDataPerDay + ' GB' : data.FreeDataPerDay * 1000 + ' MB'}/ngày
                      </div>
                    </div>
                  </div>
                )}
                {data.FreeDataPerMonth && (
                  <div className="md:flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mx-auto">
                      <Svg src="/icons/bold/data-pack/data.svg" className="w-8 h-8" />
                    </div>
                    <div className="md:ml-4 mt-3 md:mt-0">
                      <div className="text-sm text-neutral-500">Miễn phí</div>
                      <div className="font-medium">
                        {data.FreeDataPerMonth >= 1 ? data.FreeDataPerMonth + ' GB' : data.FreeDataPerMonth * 1000 + ' MB'}/tháng
                      </div>
                    </div>
                  </div>
                )}
                {data.FreeInternalSMS && (
                  <div className="md:flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mx-auto">
                      <Svg src="/icons/bold/data-pack/sms.svg" className="w-8 h-8" />
                    </div>
                    <div className="md:ml-4 mt-3 md:mt-0">
                      <div className="text-sm text-neutral-500">Miễn phí tin nhắn nội mạng</div>
                      <div className="font-medium">{data.FreeInternalSMS} SMS/tháng</div>
                    </div>
                  </div>
                )}
                {data.FreeExternalSMS && (
                  <div className="md:flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mx-auto">
                      <Svg src="/icons/bold/data-pack/sms.svg" className="w-8 h-8" />
                    </div>
                    <div className="md:ml-4 mt-3 md:mt-0">
                      <div className="text-sm text-neutral-500">Miễn phí</div>
                      <div className="font-medium">{data.FreeExternalSMS} SMS/tháng</div>
                    </div>
                  </div>
                )}
                {data.FreeExternalCall && (
                  <div className="md:flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mx-auto">
                      <Svg src="/icons/bold/data-pack/call.svg" className="w-8 h-8" />
                    </div>
                    <div className="md:ml-4 mt-3 md:mt-0">
                      <div className="text-sm text-neutral-500">Miễn phí gọi</div>
                      <div className="font-medium">{data.FreeExternalCall} SMS/tháng</div>
                    </div>
                  </div>
                )}
                {data.FreeInternalCall && (
                  <div className="md:flex flex-row items-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-neutral-200 rounded-full mx-auto">
                      <Svg src="/icons/bold/data-pack/call.svg" className="w-8 h-8" />
                    </div>
                    <div className="md:ml-4 mt-3 md:mt-0">
                      <div className="text-sm text-neutral-500">Miễn phí gọi nội mạng</div>
                      <div className="font-medium">{data.FreeInternalCall} SMS/tháng</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <hr className="max-md:hidden border-neutral-200" />
            {/* <div className="mt-2 md:mt-0 pt-6 px-4 md:px-0 bg-neutral-0">
              <div className="font-medium text-xl">Chính sách gói cước</div>
              <ul className="list-disc px-4 mt-2">
                <li>Miễn phí tất cả cuộc gọi nội mạng iTel & VinaPhone dưới 10 phút, tối đa 1.000 phút.</li>
                <li>
                  Miễn phí Data 3GB/ngày
                  <br />
                  (hết 3GB ngừng truy cập).
                </li>
                <li>Miễn phí 300SMS/tháng</li>
                <li>Tự động gia hạn sau 30 ngày</li>
              </ul>
              <div className="font-medium text-xl mt-6">Hướng dẫn sử dụng</div>
              <ul className="list-disc px-4 mt-2">
                <li>
                  Để đăng ký bấm <b>Đăng ký ngay</b> hoặc <br /> soạn <b>PARTY149</b> gửi <b>8968</b>
                </li>
              </ul>
            </div> */}
          </div>

          {/* {Responsive for PC} */}
          <div className="pt-6  px-2 xl:pr-4 md:pl-0 bg-neutral-0 md:bg-transparent pb-24 flex-1 h-full">
            <div className="font-medium">Thông tin khác</div>
            <div className="mt-4 ">
              <div className="font-medium">Hỗ trợ:</div>
              <ul className="list-disc px-4">
                <li>
                  Hotline iTel:{' '}
                  <a className="font-medium cursor-pointer text-blue-500" href="tel:0877087087">
                    0877 087 087
                  </a>{' '}
                  (từ 8h-22h hàng ngày, bao gồm lễ tết) để được hỗ trợ.
                </li>
              </ul>
            </div>
            <div className="mt-4 font-medium">Chính sách gói cước:</div>
            <div dangerouslySetInnerHTML={{ __html: data.Brief! }}></div>
            <img
                src="/images/table-data-package-info.png"
                alt="123123"
              />
            {/* <div className="mt-8">
              <div className="font-medium">Gói cước nền I690</div>
              <div className="text-neutral-500">Sau khi ngừng truy cập, chi phí sẽ tính</div>
            </div>
            <div className="mt-6 md:mt-4 mb-24 md:mb-0">
              <img src="/images/table-data-package-info.png" alt="123123123" />
            </div> */}

          </div>
        </div>
        <div className="max-xl:hidden w-full xl:w-[25.5rem] flex-shrink-0 pb-16 xl:pb-0">
          <div className="bg-neutral-100 rounded-2xl p-8">
            <div>Gói cước </div>
            <div className="font-itel text-3xl font-semibold uppercase">{data.Name}</div>
            <div className="border-b border-neutral-200 pt-6 pb-8">
              {data.FreeDataPerDay && (
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-200 rounded-full">
                    <Svg src="/icons/bold/data-pack/data.svg" className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-neutral-500">Miễn phí</div>
                    <div className="font-semibold">
                      {data.FreeDataPerDay >= 1 ? data.FreeDataPerDay + ' GB' : data.FreeDataPerDay * 1000 + ' MB'}/ngày
                    </div>
                  </div>
                </div>
              )}
              {data.FreeDataPerMonth && (
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-200 rounded-full">
                    <Svg src="/icons/bold/data-pack/data.svg" className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-neutral-500">Miễn phí</div>
                    <div className="font-semibold">
                      {data.FreeDataPerMonth >= 1 ? data.FreeDataPerMonth + ' GB' : data.FreeDataPerMonth * 1000 + ' MB'}/tháng
                    </div>
                  </div>
                </div>
              )}
              {data.FreeInternalSMS && (
                <div className="flex flex-row items-center mt-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-200 rounded-full">
                    <Svg src="/icons/bold/data-pack/sms.svg" className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-neutral-500">Miễn phí tin nhắn nội mạng</div>
                    <div className="font-semibold">{data.FreeInternalSMS} SMS/tháng</div>
                  </div>
                </div>
              )}
              {data.FreeExternalSMS && (
                <div className="flex flex-row items-center mt-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-200 rounded-full">
                    <Svg src="/icons/bold/data-pack/sms.svg" className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-neutral-500">Miễn phí </div>
                    <div className="font-semibold">{data.FreeExternalSMS} SMS/tháng</div>
                  </div>
                </div>
              )}
              {data.FreeExternalCall && (
                <div className="flex flex-row items-center mt-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-200 rounded-full">
                    <Svg src="/icons/bold/data-pack/call.svg" className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-neutral-500">Miễn phí gọi </div>
                    <div className="font-semibold">{data.FreeExternalCall} phút/tháng</div>
                  </div>
                </div>
              )}
              {data.FreeInternalCall && (
                <div className="flex flex-row items-center mt-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-neutral-200 rounded-full">
                    <Svg src="/icons/bold/data-pack/call.svg" className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <div className="text-neutral-500">Miễn phí gọi nội mạng (iTel & VinaPhone)</div>
                    <div className="font-semibold">{data.FreeInternalCall} phút/tháng </div>
                  </div>
                </div>
              )}
            </div>
            <div className="border-b border-neutral-200 pt-6 pb-8">
              <div className="font-semibold text-xl ">Hướng dẫn sử dụng</div>
              <ul className="list-disc px-4 mt-2">
                <li>
                  Để đăng ký bấm <b>Đăng ký ngay</b> {data.SMSSyntax && <> hoặc {data.SMSSyntax}</>}
                </li>
              </ul>
            </div>
            <div className="mt-6 flex flex-row items-center justify-between">
              <div className="flex flex-row items-end">
                <div className="font-semibold text-2xl mr-1">{toCurrency(data.Price||0)}</div>
                <div>/{getTypePack(data.Cycle!,data.IsAddon!)}</div>
              </div>
              <button className="btn btn-primary btn-sm rounded-full max-md:py-2 transition-all" onClick={()=>handleModalPhoneCheck(data)}>
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>

        {/* {Responsive for mobile and tablet} */}
        <div className="fixed bottom-0 right-0 left-0 xl:hidden bg-neutral-0 border-t border-neutral-200">
          <div className="px-4 pt-3 pb-4 w-full">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-end">
                <div className="font-semibold text-2xl mr-1">{toCurrency(data.Price||0)}</div>
                <div>/{getTypePack(data.Cycle!,data.IsAddon!)}</div>
              </div>
              <button className="btn btn-primary rounded-full transition-all" onClick={()=>handleModalPhoneCheck(data)}>
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export function modalPackageDetail(data: dataModel.Pack, onRegister?: (data: dataModel.Pack) => void) {
  modal.open({
    render: <ModalDataPackageDetail data={data}  />,
    closeButton: false,
    transition: false,
    className: 'modal-box shadow-itel',
    classNameContainer: 'modal-full md:modal-bottom-sheet',
    classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
    // Call back when click submit in modal,
    onDone: () => onRegister?.(data)
  });
}
export default ModalDataPackageDetail;
