import { DeliveryMethod } from '@/constants/checkout.constants';
import { Location } from './location';
import { Model } from './model';

export declare namespace IForm {
  interface SignIn {
    phone: number;
    email:string
  }
  interface CheckoutBase {
    paymentMethod: string;
    notification?: boolean;
    deliveryMethod: DeliveryMethod;
    phoneAccumulatePoints?: string;

    deliveryInfomation: {
      id?: number;
      phone: string;
      name: string;
      province: Location.BaseLocation?;
      district: Location.BaseLocation?;
      ward: Location.BaseLocation?;
      village?: Location.BaseLocation?;
      address: string;
      email?: string;
      is_default?: boolean;
    };
    other?: any;
    deliveryOption: { id: string | number; name: string; desc: string; price: number }?;
    storeLocation: Location.Store;
  }
  interface Checkout extends CheckoutBase {}
  interface CheckoutAnonymous extends CheckoutBase {
    phone: string;
    email: string;
    name: string;
  }
  interface FormSelectItem {
    product_id: number;
    options: Array<{ option_id: number; option_value: number }>;
    quantity: number;

    gift?: number;
  }

  interface CheckoutInstallment {
    deliveryOption: { id: string | number; name: string; desc: string; price: number }?;
    bank: { id: number | string; full_name?: string; short_name?: string; name: string; img: string; rate: number[] };
    card: { id: number | string; name: string; img: string };
    installment: Model.Installment;
    name: string;
    phone: string;
    email: string;
    identity: string;

    deliveryInfomation: {
      id?: number;
      phone: string;
      name: string;
      province: Location.BaseLocation?;
      district: Location.BaseLocation?;
      ward: Location.BaseLocation?;
      village?: Location.BaseLocation?;
      address: string;
    };
  }

  interface CheckoutRecharge {
    phone: string;
    paymentMethod: string;
    email:string
    // name: string;
  }

  interface AddAddress extends Pick<IForm.Checkout, 'deliveryInfomation'> {
    isDefault?: boolean;
  }


}
