import { isValidData } from '@/pages/checkout/update-info';
import CartService from '@/services/cartService';
import { getUpdateInfo } from '@/store/cart/selector';
import { addFee, clearFee } from '@/store/fees/feesSlice';
import { useAppSelector } from '@/store/hooks';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useDeliveryOptions = (props: cartModel.paramFee, IsBaseus: boolean, isSim: boolean, isProduct: boolean) => {
  const [deliveryOptions, setDeliveryOptions] = useState<Array<{ id: number; desc: string; name: string }>>([
    {
      id: 0,
      name: 'Giao hàng tiêu chuẩn',
      desc: ''
    }
  ]);
  const [description, setDescription] = useState<{ fast: string; noFast: string }>({
    fast: '',
    noFast: ''
  });
  const [datasim] = useState(useAppSelector(getUpdateInfo));
  const dispatch = useDispatch();
  const isValue = isValidData(datasim);
  const check = (object: object) => Object.entries(object).every(([key, value]) => !['', 'null', 'undefined'].includes(key) && value);

  const getfeeAll = async (param: cartModel.paramFee, fees: Required<cartModel.Fee & { type: 'oppo' | 'baseus' | 'sim' }>[]) => {
    let desc: string = '';
    try {
      if (!_.isEmpty(param) && check(param)) {
        const res = await CartService.getFee(param);
        if (res.code == 200) {
          dispatch(
            addFee([
              {
                fee: res.result.fee || 0,
                discountedFee: res.result.discountedFee || 0,
                delivery_time: res.result.delivery_time || '',
                type: 'sim'
              },
              ...fees
            ])
          );

          desc = res.result.delivery_time || '';
        }
      }
    } catch (error) {
      console.log(error);
    }
    return desc;
  };

  useEffect(() => {
    if (!props.province || !props.district || !props.ward) {
      dispatch(clearFee());
      return setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc: 'Nhận hàng từ 1 tới 3 ngày kể từ thời điểm đặt đơn hàng' }]);
    }

    if (isProduct && isSim) {
      getfeeAll(props, [
        {
          fee: 0,
          discountedFee: 0,
          delivery_time: '',
          type: 'oppo'
        }
      ]).then((desc) => {
        setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc }]);
      });
      return;
    }
    if (isSim && IsBaseus) {
      getfeeAll(props, [
        {
          fee: 30000,
          discountedFee: 30000,
          delivery_time: '',
          type: 'baseus'
        }
      ]).then((desc) => setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc }]));
      return;
    }
    if (isProduct && isSim && IsBaseus) {
      getfeeAll(props, [
        {
          fee: 0,
          discountedFee: 0,
          delivery_time: '',
          type: 'oppo'
        },
        {
          fee: 30000,
          discountedFee: 30000,
          delivery_time: '',
          type: 'baseus'
        }
      ]).then((desc) => setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc }]));
      return;
    }
    if ((isSim && props.province == 1) || props.province == 126 || props.province == 129) {
      getfeeAll(props, []).then((desc) =>
        setDeliveryOptions([
          { id: 0, name: 'Giao hàng tiêu chuẩn', desc: props.fast == 0 ? desc : '' },
          {
            id: 1,
            name: 'Giao hàng hoả tốc',
            desc: props.fast == 1 ? desc : ''
          }
        ])
      );
      return;
    }
    if (isValue) {
      return setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc: 'Nhận hàng từ 1 tới 3 ngày kể từ thời điểm đặt đơn hàng' }]);
    }
    if (IsBaseus) {
      dispatch(
        addFee([
          {
            fee: 30000,
            discountedFee: 30000,
            delivery_time: '',
            type: 'baseus'
          }
        ])
      );
      return setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc: 'Nhận hàng từ 1 tới 3 ngày kể từ thời điểm đặt đơn hàng' }]);
    }
    if (isProduct && IsBaseus) {
      dispatch(
        addFee([
          {
            fee: 0,
            discountedFee: 0,
            delivery_time: '',
            type: 'oppo'
          },
          {
            fee: 30000,
            discountedFee: 30000,
            delivery_time: '',
            type: 'baseus'
          }
        ])
      );
      return setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc: 'Nhận hàng từ 1 tới 3 ngày kể từ thời điểm đặt đơn hàng' }]);
    }

    if (isSim) {
      getfeeAll(props, []).then((desc) => setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc }]));
      return ;
    }

    if (isProduct) {
      dispatch(
        addFee([
          {
            fee: 0,
            discountedFee: 0,
            delivery_time: '',
            type: 'oppo'
          }
        ])
      );
      return setDeliveryOptions([{ id: 0, name: 'Giao hàng tiêu chuẩn', desc: 'Nhận hàng từ 1 tới 3 ngày kể từ thời điểm đặt đơn hàng' }]);
    }
  }, [props, isValue, isSim, isProduct, IsBaseus]);
  return { deliveryOptions };
};

export default useDeliveryOptions;
