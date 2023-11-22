import CardTutorialPickSim from '@/components/card/card-tutorial-pick-sim';

const TEst = () => {
  return (
    <div className="flex md:flex-col xl:flex-row flex-wrap">
      <div className='w-full h-screen bg-[#F9F9F9] relative'>
      <img src='/images/header-card-sim-bg.png' alt='sim-bg' className='absolute top-0 right-0 left-0 w-full h-[5rem] bg-blend-overlay' />

      </div>
      <div className="xl:w-1/2 md:order-1">
        <div className="section-title-sub mb-1 xl:text-start">
          Cách tính <span className="text-red-500 "> thần số </span>
          <span className="text-red-500 ">học</span> số điện thoại
        </div>
        <p className="text-base font-normal text-neutral-500 md:mb-10 md:text-center xl:mb-36 xl:text-start">
          Để iTel chỉ bạn cách tính thầnh số học số điện thoại của bạn
        </p>
      </div>
      <div className="order-3 xl:w-1/2">
        <CardTutorialPickSim label="BƯỚC 2" title="Chọn Sim trong danh sách Sim" image="/images/sim-numerology-1.png">
          <ul className="mt-6 flex flex-col gap-2 text-base font-normal">
            <li>1. Tính năng lượng chủ đạo của SIM, xem xét mối quan hệ với con số chủ đạo, phân tích biểu đồ ngày sinh.</li>
            <li>
              2. Phân bố các số trong SIM vào biểu đồ ngày sinh, hình thành các trục mũi tên, Con số đơn lẻPhân bố các số trong SIM vào biểu
              đồ ngày sinh, hình thành các trục mũi tên, Con số đơn lẻ
            </li>
            <li>3. Từ các yếu tố trên quy đổi ra điểm</li>
          </ul>
        </CardTutorialPickSim>
      </div>
      <div className="md:order-2 xl:w-1/2">
        <CardTutorialPickSim label="BƯỚC 1" title="Nhập thông tin" image="/images/sim-numerology-3.png">
          <div className="text-base font-normal">
            <div>1. Phân bổ các số sim trong dãy số vào biểu đồ ngày sinh.</div>
            <div className="mt-2">2. Xem xét các số điền thêm vào biểu đồ ngày sinh có tác động như nào tới các trường năng lượng số</div>
            <div className="mt-2 text-neutral-500">
              Ví dụ, nếu biểu đồ ngày sinh bị trống ô 1, nếu trong sim số có từ một đến hai số 1 để điền vào biểu đồ ngày sinh thì rất tốt.
              Ngược lại nếu biểu đồ ngày sinh đã có số 1 rồi thì việc bổ sung thêm số 1 vào lại không hợp.
            </div>
          </div>
        </CardTutorialPickSim>
      </div>
      <div className="order-4 xl:w-1/2">
        <CardTutorialPickSim label="BƯỚC 3" title="Xem ý nghĩa và thanh toán" image="/images/sim-numerology-2.png">
          <div className="text-base font-normal">
            <div>1. Phân bổ các số sim trong dãy số vào biểu đồ ngày sinh.</div>
            <div className="mt-2">2. Xem xét các số điền thêm vào biểu đồ ngày sinh có tác động như nào tới các trường năng lượng số</div>
            <div className="mt-2 text-neutral-500">
              Ví dụ, nếu biểu đồ ngày sinh bị trống ô 1, nếu trong sim số có từ một đến hai số 1 để điền vào biểu đồ ngày sinh thì rất tốt.
              Ngược lại nếu biểu đồ ngày sinh đã có số 1 rồi thì việc bổ sung thêm số 1 vào lại không hợp.
            </div>
          </div>
        </CardTutorialPickSim>
      </div>
    </div>
  );
};

export default TEst;
