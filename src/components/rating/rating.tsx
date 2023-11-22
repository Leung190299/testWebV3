import Routers from '@/routes';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import Svg from '../icon/svg';
import { rechrageModel } from '@/types/recharge';
import rechargeService from '@/services/rechargeService';
import { useSelector } from 'react-redux';
import { getInfoEKYC } from '@/store/cart/selector';

type Props = {
  title: string;
  labelReject: string;
  onReject?: Function;
  labelAction?: string;
};
const Rating = ({ title, labelReject = ' Về trang chủ', onReject, labelAction }: Props) => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(6);
  const [content, setContent] = useState<string>('');
  const [isRating, setIsRating] = useState<boolean>(false);
  const infoState = useSelector(getInfoEKYC);
  
  const params: rechrageModel.ParamSurveyCes = {
    phone: infoState.phone,
    sourceType: typeof window != 'undefined' && innerWidth >= 768 ? 'WebPC' : 'Mobile',
    productType: 'Ekyc',
    orderId: infoState.phone,
    score: rating,
    content: content
  };
  const postSurveyCes = async () => {
    await rechargeService
      .postSurveyCes(params)
      .then((res) => {
        if (res.code == 200) {
          return router.push({ pathname: Routers.HOME });
        }
      })
      .catch((e) => {
        console.log(e);
      })
  };

	const onRating = () => {
		if (isRating) {
      postSurveyCes()
			return;
		}
    return router.push({ pathname: Routers.HOME });
	}
  return (
    <>
      <section className=" flex flex-col items-center justify-center md:px-32  px-4">
        <p className="my-6 text-sm font-normal text-neutral-800 text-center">{title}</p>
        <div className="w-full">
          <div className="flex justify-around ">
            {[1, 2, 3, 4, 5, 6, 7].map((_rating) => (
              <div
                key={_rating}
                className="h-8 w-8"
                onClick={() => {
                  setRating(_rating);
                  setIsRating(true);
                }}
              >
                <Svg
                  src="/icons/bold/star.svg"
                  className={`w-full h-full cursor-pointer ${_rating <= rating ? ' text-yellow-500' : 'text-neutral-300'}`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 md:mt-6">
            <p className="text-xs">Rất tệ</p>
            <p className="text-xs">Bình thường</p>
            <p className="text-xs">Rất hài lòng</p>
          </div>
        </div>
        <div className="w-full">
          <textarea
            className="mt-4 w-full rounded-lg border border-neutral-300 p-4 text-sm bg-transparent focus:border-neutral-800"
            name="feedback"
            id="feedback-tbx"
            rows={4}
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
            placeholder="Nhập nội dung phản hồi (nếu có)"
          />
        </div>
      </section>
      <div className="flex gap-4 mt-6">
        <div className="mt-5 flex w-full justify-between gap-4">
          <button
            onClick={() => {
              onReject ? onReject() : router.push(Routers.HOME);
            }}
            className="w-1/2 rounded-full border border-primary bg-neutral-0 py-4 text-base font-bold text-primary"
          >
            {labelReject}
          </button>
          <button onClick={() => onRating()} className="w-1/2 rounded-full bg-primary py-4 text-base font-bold text-neutral-0">
            {!isRating ? labelAction : 'Đánh giá'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Rating;
