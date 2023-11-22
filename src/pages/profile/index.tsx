import Avatar from '@/components/avatar/avatar';
import LayoutProfile from '@/components/layout/layout-profile';
import { addDeliveryAddress } from '@/components/modal/modal-add-delivery-addres';
import ModalCropImage from '@/components/modal/modal-crop-image';
import ModalLogout from '@/components/modal/modal-logout';
import ModalUnlinkAccount from '@/components/modal/modal-unlink-account';
import ModalUpdatePassword from '@/components/modal/modal-update-password';
import ModalUpdateProfile from '@/components/modal/modal-update-profile';

// Không import ảnh kiểu này
import eSim from '@/components/pages/assets/e-sim.png';
import iconEdit from '@/components/pages/assets/icon-edit.png';
import itel from '@/components/pages/assets/itel.png';

import ModalSelectImage from '@/components/modal/modal-upload-avatar';
import { useGlobalContext } from '@/context/global';
import Modal, { modal } from '@/libs/modal';
import Routers from '@/routes/routers';
import { Address } from '@/services/address/model';
import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Profile: NextPage = () => {
  const { user, setUser, info, profile } = useGlobalContext();
  const isShowCrop = useBoolean();
  const [data, setSrc] = useState<null | { url: string; width: number; height: number }>(null);
  const showAddress = useBoolean(false);
  const handleUpdateProfile = useCallback(() => {
    modal.open({
      render: <ModalUpdateProfile />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[45rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, []);

  const handlerModalUpdatePassword = useCallback(() => {
    modal.open({
      render({ close }) {
        return <ModalUpdatePassword onClose={close} />;
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, []);
  const [numberTab, setNumberTab] = useState<number>(0);
  const [isOpenTolTip, setIsOpenTolTip] = useState<boolean>(false);

  useEffect(() => {
    setIsOpenTolTip((numberTab === 1 && window?.innerWidth < 1024) || window?.innerWidth > 1024);
  }, [numberTab]);

  const handlerUnLinkGoogle = useCallback(() => {
    if (window.innerWidth < 1250 && numberTab === 0) {
      return setNumberTab(1);
    }
    setNumberTab(0);
    modal.open({
      render({ close }) {
        return <ModalUnlinkAccount onClose={close} />;
      },
      className: 'modal-box modal-box-lg md:max-w-[35rem] z-50',
      closeButton: false
    });
  }, [numberTab]);

  const handlerLogout = useCallback(() => {
    modal.open({
      render({ close }) {
        return <ModalLogout onClose={close} />;
      },
      className: 'modal-box modal-box-lg md:max-w-[35rem]',
      closeButton: false
    });
  }, []);
  const handleSelectImage = useCallback(() => {
    modal.open<{ width: number; height: number; url: string }>({
      render({ close }) {
        return <ModalSelectImage onClose={close} />;
      },
      className: 'modal-box px-6 py-4 shadow-itel md:max-w-[35rem]',
      classNameOverwrite: true,
      classNameContainerOverwrite: true,
      classNameContainer: 'modal-bottom-sheet md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50',
      onDone(data) {
        setTimeout(() => {
          isShowCrop.setTrue();
          setSrc(data);
        }, 0);
      }
    });
  }, [isShowCrop]);

  const modalUploadAvatar = handleSelectImage;

  const handleAddress = (address?: Model.DeliveryAddress) => {
    return addDeliveryAddress(address ? { defaultValues: { deliveryInfomation: address } } : undefined, () =>
      address ? toast.success('Đã cập nhật Địa chỉ giao hàng') : toast.success('Đã thêm Địa chỉ giao hàng')
    );
  };
  const handleSetDefault = (id: number) => {
    return Address.setDefault(id).then(() => setUser({ ...user, address: user.address.map((v) => ({ ...v, is_default: id === v.id })) }));
  };

  const [isOtherNetwork, setIsOtherNetwork] = useState<boolean>(false);
  useEffect(() => {
    const data = localStorage.getItem('isOtherNetwork');
    if (data === 'true') {
      setIsOtherNetwork(true);
    }
  }, []);

  const addressList = user?.address || [];
  return (
    <>
      <Head>
        <title>Itel - Thông tin tài khoản</title>
      </Head>
      <section className="hidden md:flex bg-neutral-100 mb-[1rem]">
        <h2 className="font-itel text-h3 font-bold">Thông tin tài khoản</h2>
      </section>
      <section className="bg-base-100 py-4 pl-4 pr-4 mb-2 md:pr-[2rem] md:pl-[1.5rem] md:mb-[1rem] rounded-xl flex flex-row items-center">
        <div className="avatar relative w-20 cursor-pointer" onClick={modalUploadAvatar}>
          <Avatar alt="Avatar" img={'/images/avatar.png'} className="w-20 h-20 rounded-full bg-neutral-200" />
          <Image src={iconEdit} alt="edit" className="!w-6 !h-6 absolute bottom-0 right-0" />
        </div>
        <div className="name flex-1 pl-4">
          <p className="text-lg md:text-xl font-bold text-neutral-800">{profile.FULLNAME}</p>
          <div className="flex flex-row items-center">
            {/* <Image src={iconRank} alt="rank" className="w-6 h-6 [mix-blend-mode:luminosity]" /> */}
            <p className="text-neutral-500 text-sm font-medium pl-2">{info.rankName}</p>
          </div>
        </div>
        <div aria-hidden className="edit cursor-pointer" onClick={handleUpdateProfile}>
          <p className="hover:text-red-500 text-sm font-medium"> Chỉnh sửa</p>
        </div>
      </section>
      <section className="bg-base-100 mb-2 md:mb-[1rem] p-4 md:p-8 rounded-xl">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-xl font-bold">Thông tin thuê bao</p>
            <p className="text-neutral-500 text-sm font-normal">Thông tin chính chủ của Thuê bao sử dụng số điện thoại iTel</p>
          </div>
          <Link href="https://itel-web.vercel.app/subscriber-information" className="update cursor-pointer">
            <p className="hover:text-red-500 text-sm font-medium">Cập nhật</p>
          </Link>
        </div>
        <hr className="border-[#E6E7E8] mb-4 mt-4 md:mb-6 md:mt-6" />
        {isOtherNetwork ? (
          <div className="bg-neutral-100 p-4 rounded-xl flex flex-col">
            <span className="text-neutral-500 font-bold text-xs">SỐ ĐIỆN THOẠI</span>
            <span className="font-bold text-2xl font-itel">{formatPhoneNumber('')}</span>
          </div>
        ) : (
          <div className="bg-neutral-100 p-4 md:p-8 rounded-xl flex flex-col xl:flex-row">
            <div className="bg-gradient-sim mb-2 md:mb-6 min-h-[12rem] md:min-h-[16rem] xl:mb-0 md:w-full xl:w-1/2 rounded-2xl p-4 md:p-6 flex-1 flex flex-col justify-between">
              <div className="flex flex-row">
                <div className="flex-1">
                  <p className="text-neutral-0 text-[12px] md:text-xs font-bold pb-1">SIM VẬT LÝ</p>
                  <p className="text-neutral-0 text-2xl md:text-[32px] font-itel font-bold pb-1">
                    {formatPhoneNumber(profile.phone || '')}
                  </p>
                  <p className="text-neutral-0 text-[12px] md:text-xs font-normal pb-1">
                    Ngày hòa mạng: <span className="font-bold">{profile.ACTIVEDATE}</span>
                  </p>
                </div>
                <div>
                  <Image src={eSim} alt="chat-icon" className="w-18" />
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex-1">
                  {/* <Link
                    href={Routers.CHANGE_SIM}
                    className="btn btn-sm rounded-full text-sm border-solid border-[1px] border-[#FFFFFF] bg-transparent"
                  >
                    Đổi/Cấp lại SIM, eSIM
                  </Link> */}
                </div>
                <div className="w-18">
                  <Image src={itel} alt="itel" />
                </div>
              </div>
            </div>
            <div className="flex-1 xl:pl-8">
              <div className="flex flex-row bg-neutral-0 rounded-xl p-4 mb-2 ">
                <div className="flex-1">
                  <div className="pb-2">
                    <p className="text-neutral-500 text-sm font-normal">Tài khoản gốc</p>
                    <p className="text-base font-bold">{toCurrency(profile.BALANCE || 0)}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500 text-sm font-normal">Tài khoản khuyến mãi</p>
                    <p className="text-base font-bold">{toCurrency(profile.TKKM || 0)}</p>
                  </div>
                </div>
                <div className="w-[7.6rem] md:w-[7.1rem]">
                  <Link href={Routers.RECHARGE} className="transition-default btn-primary text-sm btn w-full rounded-full">
                    Nạp tiền
                  </Link>
                </div>
              </div>
              {profile.PACK && profile.PACK.length > 0 && (
                <div className="flex flex-col bg-neutral-0 rounded-xl p-4 ">
                  <div className="flex flex-row">
                    <div className="flex-1">
                      <div className="pb-2">
                        <p className="text-neutral-500 text-sm font-normal">Gói cước hiện tại</p>
                        <p className="text-base font-bold">Gói iTEL77 - 77k/tháng</p>
                      </div>
                      <div>
                        <p className="text-neutral-500 text-sm font-normal">Gói cước bổ sung</p>
                      </div>
                    </div>
                    <div className="w-[7.6rem] md:w-[7.1rem]">
                      <Link href={Routers.DATA} className="btn btn-secondary px-2 text-sm rounded-full w-full">
                        Mua gói cước
                      </Link>
                    </div>
                  </div>

                  <p className="text-sm md:text-base font-bold">Gói iTEL49 & 3 gói cước khác</p>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex flex-row mt-4 md:pt-6">
          <div className="w-[50%] md:w-1/2">
            <div className="flex flex-col">
              <p className="text-neutral-500 text-sm font-medium">Họ và tên</p>
              <p className="text-base md:text-xl font-medium">{profile.FULLNAME}</p>
            </div>
            <div className="flex flex-col pt-4 md:pt-6">
              <p className="text-neutral-500 text-sm font-medium">Giới tính</p>
              <p className="text-base md:text-xl font-medium">{profile.GENDER=='female'?'Nữ':'Nam'}</p>
            </div>
          </div>
          <div className="flex-1 md:pl-10">
            <div className="flex flex-col">
              <p className="text-neutral-500 text-sm font-medium">Ngày sinh</p>
              <p className="text-base md:text-xl font-medium">{profile.BIRTHDAY}</p>
            </div>
            {/* <div className="hidden md:flex flex-col pt-6">
              <p className="text-neutral-500 text-sm font-medium">Email</p>
              <p className="text-base md:text-xl font-medium">ngocbn0208@gmail.com</p>
            </div> */}
          </div>
        </div>
        <div className="flex md:hidden flex-col pt-4">
          <p className="text-neutral-500 text-sm font-medium">Email</p>
          <p className="text-base md:text-xl font-medium">ngocbn0208@gmail.com</p>
        </div>
      </section>
      {/* <SectionDetail title="Sổ địa chỉ" desc="Thông tin nhận hàng của bạn" className="mt-2 md:mt-4">
        <div className="pb-4">
          <div className="space-y-4">
            <div>
              <button
                className="w-full bg-neutral-100 rounded-lg border-px border-dashed border border-neutral-300 py-6 md:py-9"
                onClick={() => handleAddress()}
              >
                <div className="flex justify-center items-center">
                  <Image src={plus} alt="itel" className="w-5 h-5 md:w-6 md:h-6" />
                  <p className="text-sm md:text-md font-medium pl-2 md:pl-1">Thêm địa chỉ nhận hàng</p>
                </div>
              </button>
            </div>
            {(showAddress.value ? addressList : addressList.slice(0, 1)).map((address) => {
              return (
                <div
                  key={address.id}
                  className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-6 flex-1 border border-neutral-200 rounded-lg md:py-5 md:px-6 p-4"
                >
                  <div className="flex-1 flex">
                    <div className="flex-1">
                      <p className="flex gap-2 text-sm md:text-base">
                        <b>{address.name}</b>|<b>{address.phone}</b>
                      </p>
                      <p className="mt-1 text-xs md:text-sm text-neutral-500">{address.address}</p>
                    </div>
                    <div className="md:hidden">
                      <button className="font-bold text-sm" onClick={() => handleAddress(address)}>
                        Sửa
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-auto">
                    {address.is_default ? (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        type="button"
                        className="btn btn-xs md:btn-sm bg-transparent text-primary rounded-full flex text-sm gap-x-2 max-md:p-0 max-md:h-auto"
                      >
                        <Svg src="/icons/bold/location.svg" width={20} height={20} />
                        Địa chỉ mặc định
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        type="button"
                        className="btn btn-xs md:btn-sm btn-tertiary rounded-full text-sm"
                      >
                        Chọn làm mặc định
                      </button>
                    )}
                  </div>
                  <div className="max-md:hidden">
                    <button type="button" className="font-bold text-sm" onClick={() => handleAddress(address)}>
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {addressList.length > 1 && (
            <button
              aria-hidden
              className="flex justify-center text-center w-full flex-row items-center cursor-pointer mt-4"
              onClick={showAddress.toggle}
            >
              <div className="text-sm font-medium pr-2">
                {showAddress.value ? <div>Thu gọn</div> : <div>Xem thêm {Math.max((user ? user.address.length : 0) - 1, 0)} địa chỉ</div>}
              </div>
              <Svg src="/icons/line/chevron-down.svg" width={24} height={24} className={showAddress.value ? 'rotate-180' : ''} />
            </button>
          )}
        </div>
      </SectionDetail> */}
      {/* <section className="bg-base-100 mb-2 md:mb-[1rem] p-4 md:p-8 rounded-xl mt-2 md:mt-4">
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-base md:text-xl font-bold">Đăng nhập & bảo mật</p>
            <p className="text-neutral-500 text-[12px] md:text-sm font-normal">Cập nhật mật khẩu & liên kết tài khoản MXH</p>
          </div>
        </div>
        <hr className="border-[#E6E7E8] mb-4 mt-4 md:mb-6 md:mt-6" />
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1 bg-neutral-100 py-3 px-4 flex justify-between rounded-[12px]">
            <div>
              <p className="text-neutral-500 text-sm font-medium">Mật khẩu</p>
              <p className="text-base font-medium">Cập nhật lần cuối 1 tháng trước</p>
            </div>
            <div onClick={handlerModalUpdatePassword} className="cursor-pointer">
              <p className="text-[#EA0029] font-bold text-sm">Cập nhật</p>
            </div>
          </div>
          <div className="flex-1 flex-col justify-between">
            <p className="text-sm text-neutral-500 font-medium">Liên kết tài khoản MXH</p>

            <div className="flex flex-row gap-8 mt-4">
              <Tooltip content="Liên kết tài khoản Fabook ngay!">
                <Image src={iconFb} alt="fb" className="w-10 h-10 [filter:grayscale(1)] hover:filter-none cursor-pointer tooltip" />
              </Tooltip>
              <Tooltip content="Liên kết tài khoản Zalo ngay!">
                <Image src={iconZalo} alt="fb" className="w-10 h-10 [filter:grayscale(1)] hover:filter-none cursor-pointer" />
              </Tooltip>
              <Tooltip isOpen={isOpenTolTip} content="Hủy liên kết Google" className="relative z-50" onClick={handlerUnLinkGoogle}>
                <Image src={iconGoogle} alt="fb" className="w-10 h-10 cursor-pointer" />
                <Image src={iconHuy} alt="huy" className="w-4 h-4 absolute top-0 right-0" />
              </Tooltip>
            </div>
          </div>
        </div>
      </section> */}
      <section className="flex justify-center w-full pt-2 md:pt-0 max-md:pb-6">
        <div className="w-[12rem] md:w-[9rem]">
          <button onClick={handlerLogout} className="btn btn-secondary rounded-full w-full">
            Đăng xuất
          </button>
        </div>
      </section>
      <Modal
        open={isShowCrop.value}
        setOpen={isShowCrop.setValue}
        className="modal-full md:modal-middle"
        transition={false}
        classNameOverlay="bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50"
      >
        <ModalCropImage onClose={isShowCrop.setFalse} data={data} />
      </Modal>
    </>
  );
};
Profile.getLayout = function (page) {
  return (
    <>
      <LayoutProfile titleMobile="Thông tin tài khoản" footerClassName="bg-neutral-0">
        {page}
      </LayoutProfile>
    </>
  );
};
export default Profile;
