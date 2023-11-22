import { CheckoutType } from '@/constants/checkout.constants';
import type { Model } from '@/types/model';

export type PaymentResponse<T = unknown> = {
  order: Model.Order & T;
  message: string;
  status: 'success' | 'failed';
};
const MESSAGE_RECHARGE_SUCCESS =
  'Để kiểm tra số dư tài khoản chính, Bạn vui lòng bấm gọi *101#.\nCảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️.';
const MESSAGE_RECHARGE_FAILED =
  'Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng gọi đến Hotline 0877 087 087 (miễn cước iTel) để được Nhân viên tư vấn hỗ trợ giải đáp.';

const MESSAGE_BUY_CODE_SUCCESS =
  'Thông tin mã thẻ nạp sẽ được gửi vào email/ SĐT của bạn.\nCảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️.';
const MESSAGE_BUY_CODE_FAILED = MESSAGE_RECHARGE_FAILED;

const MESSAGE_DATA_PACK_SUCCESS =
  'Thông tin đơn hàng sẽ được gửi vào email/ SĐT của bạn. \nCảm ơn đã tin tưởng và sử dụng dịch vụ của iTel ♥️. ';
const MESSAGE_DATA_PACK_FAILED_1 =
  'Tài khoản thuê bao <b>087 123 456</b> của Quý Khách không đủ để thanh toán đơn hàng này.\nQuý khách vui lòng chọn phương thức thanh toán khác';
const MESSAGE_PRODUCT_SUCCESS = 'Đơn hàng sẽ được giao trước ngày 15/03/2023. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️. ';
const MESSAGE_PRODUCT_FAILED = 'Đã có lỗi xảy ra trong quá trình giao dịch.\nVui lòng gọi đến hotline 0877 087 087 để được hỗ trợ.';

// Message failed;
const MESSAGE_FAILED = 'Đã có lỗi xảy ra trong quá trình giao dịch.\nVui lòng gọi đến hotline 0877 087 087 để được hỗ trợ.';

export function getMessageByOrder(order: Model.Order) {
  switch (order.type) {
    case CheckoutType.BuyCode:
      if (order.status === 'success') return MESSAGE_BUY_CODE_SUCCESS;
      else return MESSAGE_BUY_CODE_FAILED;
    case CheckoutType.BuyData:
      if (order.status === 'success') return MESSAGE_DATA_PACK_SUCCESS;
      else return [MESSAGE_DATA_PACK_FAILED_1, MESSAGE_FAILED][Math.floor(Math.random() * 2)];
    case CheckoutType.Recharge:
      if (order.status === 'success') return MESSAGE_RECHARGE_SUCCESS;
      else return MESSAGE_RECHARGE_FAILED;
    case CheckoutType.Item:
      if (order.status === 'success') return MESSAGE_PRODUCT_SUCCESS;
      else return MESSAGE_PRODUCT_FAILED;
    case CheckoutType.Profile:
    case CheckoutType.Card:
      if (order.status === 'success') return MESSAGE_PRODUCT_SUCCESS;
      else return MESSAGE_FAILED;
    default:
      return MESSAGE_BUY_CODE_SUCCESS;
  }
}
