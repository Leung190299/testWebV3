
import { rechrageModel } from "@/types/recharge";
import { toCurrency } from "@/utilities/currency";
import { useModal } from "@pit-ui/modules/modal";
import { FC } from "react";
import toast from "react-hot-toast";

const RenderOR: FC<{ resultPayment: rechrageModel.resultPayment }> = ({ resultPayment }) => {
    const { close, done } = useModal();

    const copyMessage=(val: string)=>{
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      toast.success('copy')
    }
    return (
      <div className="w-full p-4">
        <h2 className='text-lg font-bold uppercase'>Thanh toán với VietQR</h2>
        <div className="flex flex-col lg:flex-row  p-5 border-2 border-red-300 rounded-lg mt-4">
          <div className="w-full lg:w-[40%] px-0 pb-5 lg:pb-0 lg:px-5 ">
            <h3 className="text-lg">
              <span className="font-bold">Cách 1: </span>
              Chuyển khoản bằng cách quét QRCode
            </h3>
            <div className='p-5 flex justify-center items-center'>
              <img src={resultPayment.qrUrl||''} alt={resultPayment.info||''} />
            </div>
            <div className="text-sm mt-5 font-semibold italic text-red-500">
              Lưu ý: Hỗ trợ thanh toán quét mã QR của các App ngân hàng, ví điện tử.
            </div>
          </div>
          <div className="lg:h-auto h-[1px] w-auto lg:w-[1px]  border-dashed border border-red-400" />
          <div className="flex-1 px-0  lg:px-5  mt-5 lg:mt-0">
            <h3 className="text-lg">
              <span className="font-bold">Cách 2: </span>
              Chuyển khoản Thủ Công theo thông tin.
            </h3>
            <div className="mt-4">
              <div className="flex justify-between mt-5 items-center">
                <div className="text-sm lg:text-base w-1/3">Ngân hàng:</div>
                <div className="text-sm  flex-1 lg:text-base font-bold">{resultPayment.bankName}</div>
              </div>
              <div className="flex justify-between mt-5 items-center">
                <div className="text-sm lg:text-base w-1/3">Chủ tài khoản:</div>
                <div className="text-sm flex-1 lg:text-base font-bold">{resultPayment.bankAccountName}</div>
              </div>
              <div className="flex mt-5 items-center">
                <div className="text-sm lg:text-base w-1/3">Số tài khoản</div>
                <div className="text-sm lg:text-base font-bold flex flex-1 justify-between items-center">
                  <span>{resultPayment.bankAccountNo}</span>
                  <button className="btn btn-xs btn-primary rounded-full bg-red-400" onClick={()=>copyMessage(resultPayment.bankAccountNo||'')}> Sao chép</button>
                </div>
              </div>
              <div className="flex  mt-5 items-center">
                <div className="text-sm lg:text-base w-1/3">Số tiền:</div>
                <div className="text-sm lg:text-base font-bold flex flex-1 justify-between items-center">
                  <span>{toCurrency(Number( resultPayment.amount)||0)}</span>
                  <button className="btn btn-primary btn-xs rounded-full bg-red-400" onClick={()=>copyMessage(resultPayment.amount||'')}> Sao chép</button>
                </div>
              </div>
              <div className="flex mt-5 items-center">
                <div className=" text-sm lg:text-base w-1/3">Nội dung:</div>
                <div className="text-sm lg:text-base font-bold flex flex-1 justify-between items-center">
                  <span>{resultPayment.info}</span>
                  <button className="btn btn-primary btn-xs rounded-full bg-red-400" onClick={()=>copyMessage(resultPayment.info||'')}> Sao chép</button>
                </div>
              </div>
            </div>
            <div className="text-sm mt-5">
              Lưu ý: Nhập chính xác nội dung <span className='text-red-400 font-bold'>{resultPayment.info}</span>  khi chuyển khoản. Bạn sẽ nhận được email ( hoặc SMS ) xác nhận khi giao dịch thành công
            </div>
          </div>

        </div>
        <button className='btn btn-primary px-7 rounded-full mt-4 ml-auto flex w-full lg:w-auto' onClick={done} >Tôi đã thanh toán</button>
      </div>
    );
  };