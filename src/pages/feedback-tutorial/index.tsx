import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutDefault from '@/components/layout/layout-default';
import LayoutTutorialQuess from '@/components/layout/layout-tutorial-quess';
import ModalSuccessTutorial from '@/components/modal/modal-success-tutorial';
import { useGlobalContext } from '@/context/global';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { modal } from '@/libs/modal';
import feedBackService from '@/services/feecdbackService';
import { isEmpty } from 'lodash';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export type Social = {
  title: string;
  logo: string;
  link: string;
  icon: string;
};
interface IFormFeedback {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  message: string;
}
interface PageProps {
  social: Social[];
}
// Chuyển routing liên quan đến hướng dẫn này vào subfolder /pages/guide nhé
const FeedbackTutorialPage = (props: PageProps) => {
  const { social } = props;
  const { status, user, profile } = useGlobalContext();
  const [formData, setFormData] = useState<IFormFeedback>(
    user
      ? {
          name: profile.FULLNAME || '',
          address: user.address?.[0]?.address,
          email: user.email || '',
          phoneNumber: user.phone,
          message: ''
        }
      : { name: '', address: '', email: '', phoneNumber: '', message: '' }
  );
  // When user login in currentPage, merge with current state
  useEffect(() => {
    if (status === 'authenticated') {
      setFormData((current) => {
        const data: any = {};
        if (!current.name) data.name = profile.FULLNAME || '';
        if (!current.address && user.address?.[0]) data.address = user.address[0].address;
        if (!current.email) data.email = user.email || '';
        if (!current.phoneNumber) data.phoneNumber = user.phone || '';

        return Object.assign({}, current, data);
      });
    }
  }, [status, user,profile]);
  const [errors, setErrors] = useState<IFormFeedback>({ name: '', email: '', phoneNumber: '', address: '', message: '' });

  const validateForm = async () => {
    let newErrors: { name?: string; email?: string; message?: string; phoneNumber?: string; address?: string } = {};

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên.';
    }
    // if (!formData.address) {
    //   newErrors.address = 'Vui lòng nhập địa chỉ.';
    // }
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại.';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ.';
    }
    if (!formData.message) {
      newErrors.message = 'Vui lòng nhập phản hồi.';
    }

    setErrors((prevState) => ({
      ...prevState,
      ...newErrors
    }));
    if (
      isEmpty(newErrors.address) &&
      isEmpty(newErrors.email) &&
      isEmpty(newErrors.message) &&
      isEmpty(newErrors.name) &&
      isEmpty(newErrors.phoneNumber)
    ) {
      const params: feedBackModal.FeedbackParams = {
        FullName: formData.name,
        Phone: formData.phoneNumber,
        Email: formData.email,
        Address: formData.address,
        Feedback: formData.message
      };
      try {
        const res = await feedBackService.postFeedback(params);

        if (res.code == 200) {
          if (Object.keys(newErrors).length === 0) {
            setFormData({
              name: '',
              address: '',
              email: '',
              phoneNumber: '',
              message: ''
            });
            modal.open({
              render: <ModalSuccessTutorial />,
              transition: false,
              className: 'modal-box shadow-itel max-w-[80vw] md:max-w-[35rem] px-4 py-6 md:px-10 md:py-10 ',
              classNameContainer: 'modal-middle',
              classNameOverlay: 'bg-neutral-900 bg-opacity-50'
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name in errors) {
      const newErrors = { ...errors };
      if (!value) {
        newErrors[name as keyof typeof errors] = 'Vui lòng không bỏ trống trường này.';
      } else {
        newErrors[name as keyof typeof errors] = '';
      }
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    validateForm();
  };

  const isLoggedIn = status === 'authenticated';

  return (
    <>
      <Head>
        <title>Phản hồi, góp ý</title>
      </Head>
      <HeaderMobileWeb title="Phản hồi, góp ý" />
      <LayoutTutorialQuess>
        <h4 className="text-h-sm hidden md:block font-itel mb-4">
          <b>Phản hồi, góp ý</b>
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="formListField bg-neutral-0 mb-4 p-8 px-3 rounded-md">
            <div className="flex flex-row flex-wrap">
              <div className="w-full col-ms-12 px-5">
                <div className="title-field-form mb-5 pb-5">
                  <h5 className="mb-1 font-bold">Vui lòng nhập các thông tin</h5>
                  <p>Cảm ơn Bạn đã sử dụng dịch vụ của iTel.</p>
                </div>
              </div>
              <div className="w-1/2 col-ms-12 px-5 mb-6">
                <div className="mb-2 text-base font-medium">
                  Họ và tên <span className="text-red-500"> *</span>
                </div>
                <div className="relative flex items-center flex-wrap">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nhập họ tên"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                  />
                  {errors.name && <p className="note-validate">{errors.name}</p>}
                </div>
              </div>
              <div className="w-1/2 col-ms-12 px-5 mb-6">
                <div className="mb-2 text-base font-medium">
                  Số điện thoại <span className="text-red-500"> *</span>
                </div>
                <div className="relative flex items-center flex-wrap">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    value={formData.phoneNumber}
                    disabled={isLoggedIn}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                  />
                  {errors.phoneNumber && <p className="note-validate">{errors.phoneNumber}</p>}
                </div>
              </div>
              <div className="w-1/2 col-ms-12 px-5 mb-6">
                <div className="mb-2 text-base font-medium">
                  Email <span className="text-red-500"> *</span>
                </div>
                <div className="relative flex items-center flex-wrap">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập địa chỉ email"
                    className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                  />
                  {errors.email && <p className="note-validate">{errors.email}</p>}
                </div>
              </div>
              <div className="w-1/2 col-ms-12 px-5 mb-6">
                <div className="mb-2 text-base font-medium">Địa chỉ</div>
                <div className="relative col-ms-12 flex items-center flex-wrap">
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Nhập địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                  />
                  {errors.address && <p className="note-validate">{errors.address}</p>}
                </div>
              </div>
              <div className="w-full col-ms-12 px-5 mb-6">
                <div className="mb-2 text-base font-medium">
                  Phản hồi/ Góp ý <span className="text-red-500"> *</span>
                </div>
                <div className="relative col-ms-12 flex items-center flex-wrap">
                  <textarea
                    rows={4}
                    name="message"
                    id="message"
                    placeholder="Vui lòng nhập phản hồi/ góp ý"
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                  ></textarea>
                  {errors.message && <p className="note-validate">{errors.message}</p>}
                </div>
              </div>
              <div className="w-full col-ms-12">
                <div className="relative flex items-center text-center">
                  <button type="submit" className="block w-full md:w-[196px]  btn-primary btn rounded-full mx-auto">
                    Gửi ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="content-info-contact bg-neutral-0 p-8">
          <div className="show-contact-info">
            <h4 className="mb-4 font-bold">Bạn cần liên hệ với iTel?</h4>
            <div className="livechat-contact flex p-3 px-4 mb-4">
              <div className="left">
                <p>Hỗ trợ 24/24</p>
                <h4 className="font-bold">Live Chat</h4>
              </div>
              <div className="btn-chat">
                <a href="" className="btn-primary btn rounded-full">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.875 3.375H22.125V6.75H19.875V5.625H4.125V6.75H1.875V3.375Z" fill="white" />
                    <path
                      d="M4.125 15.375C4.125 16.2034 4.79657 16.875 5.625 16.875H19.875V15.375H22.125V19.125H15.7286L13.9287 21.75H12V19.125H5.625C3.55393 19.125 1.875 17.4461 1.875 15.375H4.125Z"
                      fill="white"
                    />
                    <path d="M4.5 8.25V12.75C4.5 13.5784 5.17157 14.25 6 14.25H8.25V12.75H6V8.25H4.5Z" fill="white" />
                    <path
                      d="M18 8.25C16.9645 8.25 16.125 9.08947 16.125 10.125C16.125 10.5471 16.2645 10.9366 16.4999 11.25C16.2645 11.5634 16.125 11.9529 16.125 12.375C16.125 13.4105 16.9645 14.25 18 14.25H19.875V12.75H18C17.7929 12.75 17.625 12.5821 17.625 12.375C17.625 12.1679 17.7929 12 18 12H19.5V10.5H18C17.7929 10.5 17.625 10.3321 17.625 10.125C17.625 9.91789 17.7929 9.75 18 9.75H19.875V8.25H18Z"
                      fill="white"
                    />
                    <path d="M9 8.25V14.25H10.5V8.25H9Z" fill="white" />
                    <path
                      d="M10.9488 8.25L12.3037 13.3309C12.4482 13.8729 12.9391 14.25 13.5 14.25C14.0609 14.25 14.5518 13.8729 14.6963 13.3309L16.0512 8.25H14.4988L13.5 11.9955L12.5012 8.25H10.9488Z"
                      fill="white"
                    />
                  </svg>
                  <span className="pl-2">Chat ngay</span>
                </a>
              </div>
            </div>
            <div className="social">
              <p className="mb-2">Hoặc liên hệ với iTel qua</p>
              <ul className="flex">
                {social.map((item, index) => (
                  <li key={index} className="mr-3">
                    <a href={item.link} className="flex font-bold">
                      <img src={item.icon} alt={item.title} className="mr-2" />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </LayoutTutorialQuess>
    </>
  );
};

FeedbackTutorialPage.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0 btop-tutorial">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  const social = [
    { title: 'Zalo', icon: '/tutorial/social-1.png', link: 'https://zalo.me/3281327437324952111' },
    { title: 'Facebook', icon: '/tutorial/social-2.png', link: 'https://m.me/itel.fan' },
    { title: '0877 087 087', icon: '/tutorial/social-4.png', link: 'tel:0877087087' }
  ];
  return {
    props: {
      social: social
    }
  };
});
export { getStaticProps };

export default FeedbackTutorialPage;
