import { memo } from 'react';
import Svg from '../icon/svg';

export type TypeIdFailed = 1 | 2 | 3 | 4;

const listTypes = {
  member: 1,
  memberRank: 2,
  require: 3,
  maximum: 4
};

type PropsContentFailVoucher = {
  typeId?: TypeIdFailed;
};

const ContentFailVoucher = ({ typeId }: PropsContentFailVoucher) => {
  const renderContent = () => {
    switch (typeId) {
      case listTypes.member:
        return (
          <>
            <h1 className="text-center text-[32px]">
              <b>Tiếc quáaa!!! Bạn chưa phải là hội viên iTel</b>
            </h1>
            <p className="py-4 text-base">
              Số điện thoại của bạn <b>chưa đủ điều kiện</b> để trở thành hội viên iTel Club.
              <br />
              Sau 3 ngày kể từ ngày kích hoạt, số điện thoại của bạn sẽ được tham gia chương trình Hội viên thân thiết iTel Club.
              <br />
              Chi tiết liên hệ <b>087708787</b> (Miễn phí với Thuê bao iTel)
            </p>
          </>
        );
      case listTypes.memberRank:
        return (
          <>
            <h1 className="text-center text-[32px]">
              <b>Nhận ưu đãi không thành công</b>
            </h1>
            <p className="py-4 text-base">
              Tiếc quá!!! Ưu đãi không dành cho hạng hội viên của bạn <br />
              Mời bạn tham khảo ưu đãi khác nha ❤️
            </p>
          </>
        );
      case listTypes.require:
        return (
          <>
            <h1 className="text-center text-[32px]">
              <b>Nhận ưu đãi không thành công</b>
            </h1>
            <p className="py-4 text-base">
              Buồn quá!!! Bạn không đủ điểm để nhận ưu đãi này.
              <br />
              Mời bạn tham khảo ưu đãi khác nha ❤️ <br />
              Nếu bạn muốn nhận thêm điểm iTel, hãy đọc bài viết <a className="text-red-500 hover:text-red-600 transition-all cursor-pointer font-semibold" href="#" target="_blank">Hướng dẫn cách nhận điểm iTel này nhé!</a>
            </p>
          </>
        );
      case listTypes.maximum:
        return (
          <>
            <h1 className="text-center text-[32px]">
              <b>Nhận ưu đãi không thành công</b>
            </h1>
            <p className="py-4 text-base">
              Teng teng!!! Bạn đã sử dụng quá số lần nhận ưu đãi VIP trong tháng Mời bạn tham khảo ưu đãi khác nha ❤️
            </p>
          </>
        );
      default:
        return (
          <>
            <h1 className="text-center text-[32px]">
              <b>Tiếc quáaa!!! Đã có lỗi xảy ra</b>
            </h1>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Svg src="/images/iwow/warning.svg" className="h-20 w-20" />
      <div className="w-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default memo(ContentFailVoucher);
