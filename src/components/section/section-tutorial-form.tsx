import clsx from 'clsx';
import React, { FC, useState } from 'react';
import { modal } from '@/libs/modal';
import ModalSuccessTutorial from '@/components/modal/modal-success-tutorial';
import feedBackService from '@/services/feecdbackService';
import { isEmpty } from 'lodash';

interface Props {
  className?: string;
}

const SectionTutorialForm: FC<Props> = ({ className }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ name: string; email: string; message: string }>({ name: '', email: '', message: '' });

  const validateForm = async () => {
    let newErrors: { name?: string; email?: string; message?: string } = {};

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên.';
    }
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
    }

    if (!formData.message) {
      newErrors.message = 'Vui lòng nhập phản hồi.';
    }

    setErrors((prevState) => ({
      ...prevState,
      ...newErrors
    }));

    try {
      if (isEmpty(newErrors.name) && isEmpty(newErrors.email) && isEmpty(newErrors.message)) {
        const params: feedBackModal.FeedbackParams = {
          FullName: formData.name,
          Phone: '',
          Email: formData.email,
          Address: '',
          Feedback: formData.message
        };

        const res = await feedBackService.postFeedback(params);

        if (Object.keys(newErrors).length === 0) {
          setFormData({
            name: '',
            email: '',
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
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  return (
    <div className={clsx('bg-neutral-0', className)}>
      <div className="container py-6 md:py-20 contentForm">
        <div className="flex flex-row flex-wrap">
          <div className="w-1/2 px-3">
            <div className="avarta pr-3">
              <img src="/tutorial/form.png" alt="" className="w-full" />
            </div>
          </div>
          <div className="w-1/2">
            <div className="txt-form text-left px-3 mb-6">
              <h3 className="text-xl md:text-h-md font-itel font-bold">Bạn có câu hỏi?</h3>
              <h6 className="text-xs md:text-sm text-neutral-500 mt-3">
                Vui lòng nhập câu hỏi, góp ý của bạn, chúng tôi sẽ gửi mail về cho bạn
              </h6>
            </div>
            <div className="formListField">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row  flex-wrap">
                  <div className="w-1/2 px-3 mb-5">
                    <div className="mb-2 text-base font-medium">
                      Họ và tên <span className="text-red-500"> *</span>
                    </div>
                    <div className="relative flex items-center flex-wrap">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ tên"
                        className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                      />
                      {errors.name && <p className="note-validate">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <div className="mb-2 text-base font-medium">
                      Email <span className="text-red-500"> *</span>
                    </div>
                    <div className="relative flex items-center flex-wrap">
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Nhập email"
                        onChange={handleInputChange}
                        value={formData.email}
                        className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                      />
                      {errors.email && <p className="note-validate">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="w-1 w-full px-3 mb-6">
                    <div className="mb-2 text-base font-medium">
                      Câu hỏi/ Góp ý <span className="text-red-500"> *</span>
                    </div>
                    <div className="relative flex items-center flex-wrap">
                      <textarea
                        rows={4}
                        name="message"
                        id="message"
                        onChange={handleInputChange}
                        value={formData.message}
                        placeholder="Vui lòng nhập câu hỏi..."
                        className="w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800 bg-transparent"
                      ></textarea>
                      {errors.message && <p className="note-validate">{errors.message}</p>}
                    </div>
                  </div>
                  <div className="w-1 w-full px-3">
                    <div>
                      <button type="submit" className="block w-full md:w-[196px]  btn-primary btn rounded-full">
                        Gửi ngay
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SectionTutorialForm;
