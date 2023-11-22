import { CheckoutType } from '@/constants/checkout.constants';
import { Data, Model } from '@/types/model';

export function isInstallmentOrder(
  data: Model.Order
): data is Exclude<Model.Order, Data.DataRecharge | Data.DataBuyCode | Data.DataBuyPack | Data.DataBuyItemOrSim> {
  return data && [CheckoutType.Card, CheckoutType.Profile].includes(data.type);
}

export function isValidCheckoutItem(type: CheckoutType): type is CheckoutType.Item | CheckoutType.Card | CheckoutType.Profile {
  return [CheckoutType.Item, CheckoutType.Card, CheckoutType.Profile].includes(type);
}

export function isNotInstallment(data: Model.Order) {
  return !isInstallmentOrder(data);
}
export function isBuyOtherItem(
  data: Model.Order
): data is Exclude<Model.Order, Data.DataBuyItemOrSim | Data.DataInstallmentCard | Data.DataInstallmentProfile> {
  return !isValidCheckoutItem(data.type);
}
