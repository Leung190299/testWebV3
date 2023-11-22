import Svg from '../icon/svg';

type Props = {
  scores: number;
  reward: boolean;
  rewardCoin: number;
};

const ModalScoreGame = ({ scores, reward, rewardCoin }: Props) => {
  return (
    <div className="sm:space-y-2 [&_p]:text-sm sm:[&_p]:text-base p-4 sm:p-10">
      <div>
        <svg
          className="mx-auto h-12 w-12 sm:w-20 sm:h-20"
          width="49"
          height="48"
          viewBox="0 0 49 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.49962 9H42.4996L47.0643 31.8233C47.8068 35.5361 44.9671 39 41.1808 39H32.4996L31.4996 33H17.4996L16.4996 39H7.81845C4.03217 39 1.19241 35.5361 1.93496 31.8233L6.49962 9ZM34.4996 18.5C34.4996 19.8807 33.3803 21 31.9996 21C30.6189 21 29.4996 19.8807 29.4996 18.5C29.4996 17.1193 30.6189 16 31.9996 16C33.3803 16 34.4996 17.1193 34.4996 18.5ZM37.9996 27C39.3803 27 40.4996 25.8807 40.4996 24.5C40.4996 23.1193 39.3803 22 37.9996 22C36.6189 22 35.4996 23.1193 35.4996 24.5C35.4996 25.8807 36.6189 27 37.9996 27ZM15.9997 23.5V28H12.9997V23.5H8.49974V20.5H12.9997V16H15.9997V20.5H20.4997V23.5H15.9997Z"
            fill="#EA0029"
          />
        </svg>
      </div>
      <h2 className="text-center text-xl sm:text-3xl font-bold py-4">{reward ? 'Bạn chơi siêu đỉnh!' : 'Ui Tiếc quá!'}</h2>
      {reward ? (
        <p>
          Bất ngờ quá! Bạn đã đạt được <strong>{scores} điểm</strong> trong lần chơi này. iTel gửi bạn <strong>{rewardCoin} xu</strong> cho
          thành tích của bạn.
        </p>
      ) : (
        <p>
          Bạn đã đạt được <strong>{scores} điểm</strong> trong lần chơi này. Chỉ cần thêm <strong>100 điểm</strong> nữa thôi là bạn có thể
          nhận được <strong>{rewardCoin}</strong> xu rồi.
        </p>
      )}
      <p>Cố gắng nữa hơn nào!</p>
    </div>
  );
};
export default ModalScoreGame;
