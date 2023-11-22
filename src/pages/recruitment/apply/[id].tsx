import { NextPage } from 'next';
import { Logger } from '@/utilities/logger';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import LayoutDefault from '@/components/layout/layout-default';
import Link from 'next/link';
import Routers from '@/routes';
import Head from 'next/head';
import recruitmentService, { IJob } from '@/services/recruitment/recruiment';
import Svg from '@/components/icon/svg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import TextInput from '@/components/form/TextInput';
import HeaderWebDefault from '@/components/header/header-web-default';
import useWindowDimensions from '@/hooks/useWindowDimention';

type PageProps = {
  job: IJob;
};

type IForm = {
  name: string;
  phoneNumber: string;
  email: string;
  jobName: string;
  profileLink: string;
  understand: boolean;
};

const logger = new Logger('ICareer Apply Page');
const ApplyJob: NextPage<PageProps> = ({ router, job }) => {
  const { width } = useWindowDimensions();

  const initData: IForm = {
    name: '',
    phoneNumber: '',
    email: '',
    jobName: job.jobTitle,
    profileLink: '',
    understand: false
  };
  const { handleSubmit, setValue, control } = useForm<IForm>({ defaultValues: initData });

  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(true);
  const onSubmit: SubmitHandler<IForm> = (values) => {
    window.scrollTo(0, 0);
    setIsShowPopup(true);
  };

  const isMobile = useMemo(() => {
    return !!width && width < 760;
  }, [width]);

  const handleRequestSupport = useCallback(() => {}, []);

  const title = isSuccess ? 'Ứng tuyển thành công' : 'Không thể gửi đơn ứng tuyển';

  return (
    <div className="apply-job">
      <HeaderWebDefault
        title={isShowPopup ? 'Chi tiết ứng tuyển' : 'Gia nhập iTel'}
        withMenu={!isShowPopup}
        withSearch={!isShowPopup}
        mode={isShowPopup ? 'close' : 'back'}
        classNameTitle={isShowPopup ? 'text-center' : ''}
        onClose={() => setIsShowPopup(false)}
      />
      <section className={`container flex py-2 max-md:px-0 md:py-10 gap-10 ${isShowPopup ? 'hidden' : ''}`}>
        <div className="form w-full xl:w-2/3 text-neutral-500 bg-neutral-0 max-md:rounded-none rounded-2xl py-6 px-4 md:p-8">
          <h3 className="text-[40px] leading-10 text-neutral-800 font-bold mb-2 max-md:hidden">Gia nhập iTel</h3>
          <p className="text-sm mb-8 max-md:hidden">Bạn đang ứng tuyển vào iTel. Vui lòng điền đầy đủ thông tin dưới đây.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:gap-7 grid-cols-1 md:grid-cols-2 mb-5 md:mb-10">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputLabel="Họ và tên"
                    placeholder="Nhập họ và tên"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                  />
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputLabel="Số điện thoại"
                    placeholder="Nhập Số điện thoại"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput inputLabel="Email" placeholder="Nhập Email" value={value} onChange={(e) => onChange(e.currentTarget.value)} />
                )}
              />
              <Controller
                control={control}
                name="jobName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputLabel="Vị trí tuyển dụng"
                    placeholder="Nhập Vị trí tuyển dụng"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="profileLink"
              render={({ field: { onChange, value } }) => (
                <div className="mb-6">
                  <div className="mb-2 text-base font-medium">
                    <span>CV của bạn</span>
                    <span className="text-red-500"> *</span>
                  </div>
                  <UploadZone />
                </div>
              )}
            />
            <div className="mb-5 md:mb-10">
              <Controller
                control={control}
                name="profileLink"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputLabel="Online profile and portfolio"
                    placeholder="Nhập đường dẫn URL đến hồ sơ của bạn"
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    required={false}
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name="understand"
              render={({ field: { onChange, value } }) => (
                <div className="flex w-auto cursor-pointer justify-start items-start mb-6 md:mb-10" onClick={() => onChange(!value)}>
                  <div className="mr-2 p-0.5">
                    <input type="checkbox" checked={value} onChange={() => {}} className="block" />
                  </div>
                  <span className="text-neutral-800 font-base">
                    Đồng ý với{' '}
                    <a href="#" className="text-primary font-bold hover:underline">
                      Điều khoản và Điều kiện
                    </a>{' '}
                    của iTel. Thông tin của bạn sẽ không được chia sẻ với bất kỳ bên nào khác ngoài iTel.
                  </span>
                </div>
              )}
            />
            <div className="flex justify-center">
              <button className="btn btn-primary btn-lg rounded-full">Nộp đơn ứng tuyển</button>
            </div>
          </form>
        </div>
        <div className="ads hidden xl:flex md:w-1/3 rounded-2xl overflow-hidden relative h-fit">
          <img src="/images/banner-numerology.png" alt="banner" className="w-full h-full cover" />
          <div className="absolute top-0 left-0 p-8 h-full">
            <h3 className="font-bold text-[32px] leading-10 text-neutral-800 mb-2">Cách để trở thành người nhà iTel</h3>
            <p className="text-sm xl:text-base text-neutral-500 mb-8">Cùng Anh iTel tìm hiểu liền thôi</p>

            <button type="button" className="btn btn-lg rounded-full btn-primary font-normal py-4 px-14">
              Khám phá
            </button>
          </div>
        </div>
      </section>
      {isShowPopup && (
        <PopupNotification>
          <div className="md:w-[560px] flex flex-col justify-between max-md:h-full max-md:pt-6 max-md:pb-16 md:justify-center items-center">
            <div className="flex max-md:px-6 flex-col justify-center items-center max-md:border-b-[1px] max-md:border-neutral-200">
              {/* <Svg
                src={isSuccess ? '/icons/others/payment-success.svg' : '/icons/others/payment-failed.svg'}
                className="inline-block w-12 h-12 md:w-20 md:h-20 mb-6"
              /> */}
              <img
                className="inline-block w-12 h-12 md:w-20 md:h-20 mb-6"
                src={
                  isSuccess
                    ? 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686821161/Recruitment/hoa%CC%A3t-%C4%91o%CC%A3%CC%82ng-tha%CC%80nh-co%CC%82ng_in5v81.png'
                    : 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1686821195/Recruitment/hoa%CC%A3t-%C4%91o%CC%A3%CC%82ng-tha%CC%82%CC%81t-ba%CC%A3i_zl2oi2.png'
                }
                alt=""
              />
              <p className="text-2xl text-neutral-800 mb-2 font-bold">{title}</p>
              <p className="text-center text-sm mb-6 text-neutral-500">
                {isSuccess ? (
                  <span>
                    Thông tin của bạn đã được gửi đến iTel. Bộ phận tuyển dụng sẽ xác nhận và gửi kết quả đến bạn qua Email{' '}
                    <a href="mailto:tuyendung@itel.vn" className="text-neutral-800 font-bold">
                      tuyendung@itel.vn
                    </a>
                    <br />
                    Cảm ơn bạn đã lựa chọn đồng hành cùng iTel!
                  </span>
                ) : (
                  <span>
                    Chúng tôi rất tiếc vì khiến bạn gặp sự cố này. Do hệ thống không ổn định, Bạn vui lòng bấm thử lại hoặc gửi đơn tuyển
                    dụng vào mail tuyển dụng của công ty: <br />
                    <a href="mailto:tuyendung@itel.vn" className="text-neutral-800 font-bold">
                      tuyendung@itel.vn
                    </a>
                  </span>
                )}
              </p>
            </div>
            <div className="px-4 md:px-0 bottom-0 static left-0 w-full bg-neutral-0 md:bg-transparent py-2 md:py-0">
              <div className="flex gap-4">
                {isSuccess ? (
                  <Link href={Routers.HOME} className="btn-secondary btn btn-lg w-full rounded-full">
                    Về trang chủ
                  </Link>
                ) : (
                  <button type="button" onClick={handleRequestSupport} className="btn-secondary btn btn-lg w-full rounded-full">
                    Hỗ trợ
                  </button>
                )}
                {isSuccess ? (
                  <Link href={Routers.RECRUITMENT_SEARCH} className="btn-primary btn btn-lg w-full rounded-full">
                    {isMobile ? 'Thử lại' : 'Xem thêm vị trí khác'}
                  </Link>
                ) : (
                  <button type="button" onClick={() => setIsShowPopup(false)} className="btn-primary btn btn-lg w-full rounded-full">
                    Thử lại
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="fixed left-0 top-1/2">
            <button className="btn-tertiary btn rounded-full" onClick={() => setIsSuccess(!isSuccess)}>
              Demo
            </button>
          </div>
        </PopupNotification>
      )}
    </div>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id as string;
  if (!id) return { notFound: true };

  const job = recruitmentService.getById(Number(id));
  if (!job) return { notFound: true };

  return {
    props: {
      job: job
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}

ApplyJob.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">
        <Head>
          <title>{`Apply - ${props.job.jobTitle}`}</title>
        </Head>
        {page}
      </LayoutDefault>
    </>
  );
};
export default ApplyJob;

export { getStaticProps };

interface IPopupNotification {
  children: ReactNode;
}

const PopupNotification = ({ children }: IPopupNotification) => {
  return (
    <div className="body-full-height-mobile max-md:my-2 xl:h-[600px] md:h-[456px] bg-neutral-0 flex justify-center items-center">
      {children}
    </div>
  );
};

const UploadZone = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-44 border border-neutral-400 border-dashed rounded-2xl cursor-pointer bg-neutral-50"
      >
        <div className="flex flex-col items-center justify-center p-8 text-neutral-500">
          <Svg className="w-14 h-14 mb-2" src={'/icons/bold/image.svg'} />
          <p className="text-base font-bold text-neutral-800">
            <span className="max-md:hidden">Kéo thả file vào khung này hoặc</span>{' '}
            <span className="font-bold text-primary">Tải file lên</span>
          </p>
          <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG Max size: 5MB</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};
