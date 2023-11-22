import React, { FC } from 'react';
import { useModal } from '@/libs/modal';
import Svg from '../icon/svg';

interface Props {}

const ModalSuccessTutorial: FC<Props> = ({}) => {
    const { close } = useModal();

    return (
        <div>
            <div className="flex items-center">
                <button
                    className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
                    type="button"
                    onClick={close}
                >
                    <Svg src="/icons/line/close.svg" width={24} height={24} />
                </button>
            </div>
            <div className="mt-6 md:mt-8">
                <div className="content-modal-success">
                    <div className='text-center'>
                        <div className="icon"><img src="/tutorial/success-form.svg" alt="" className='mr-2' /></div>
                        <h2 className="text-lg pt-8 pb-4 font-bold">Gửi yêu cầu thành công</h2>
                    </div>
                    <p className="text-neutral-500">
                        Cảm ơn bạn đã gửi Câu hỏi/Góp ý cho iTel. Chúng tôi đã tiếp nhận Câu hỏi/Góp ý của bạn để giúp dịch vụ trở lên tốt hơn.
                    </p>
                    <div className="flex gap-4 mt-6 md:mt-8">
                        <button type="button" className="md:w-[196px]  btn-primary btn rounded-full mx-auto" onClick={() => close()}>
                            Đã hiểu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalSuccessTutorial;
