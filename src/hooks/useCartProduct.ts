import CartService from '@/services/cartService';
import { addCartProduct, getListProductAsync, removeCartProduct, setQuality } from '@/store/cart/cartApiSlice';

import { getCartProduct } from '@/store/cart/selector';
import { useAppDispatch } from '@/store/hooks';
import { modal } from '@pit-ui/modules/modal';
import { AxiosError } from 'axios';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const useCartProduct = () => {
  const products = useSelector(getCartProduct);
  const dispatch = useAppDispatch();

  const addToCart = async (param: cartModel.ParamAdd) => {
    try {
      const res = await CartService.addProduct(param);
      let cartId = localStorage.getItem('user') || '';
      if (res.code === 200) {
        if (_.isEmpty(cartId)) {
          localStorage.setItem('user', res.result);
        }
        dispatch(addCartProduct());
        length;
        toast.success('Đã thêm sản phẩm vào giỏ hàng');
        return;
      }
      modal.confirm({
        title: 'Thông báo',
        content: res.message,
        rejectLable: 'Đóng',
        onDone: close
      });
    } catch (error) {
      const err = error as AxiosError;
      const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
      modal.confirm({
        title: 'Thông báo',
        content: dataError.message,
        rejectLable: 'Đóng',
        onDone: close
      });
    }
  };
  const removeCart = (id: string | number) => {
    CartService.deleteProduct(id)
      .then((res) => {
        if (res.code == 200) {
          dispatch(removeCartProduct());
        }
      })
      .catch((error) => {
        const err = error as AxiosError;
        const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
        modal.confirm({
          title: 'Thông báo',
          content: dataError.message,
          rejectLable: 'Đóng',
          onDone: close
        });
      });
  };

  const addProduct = (carts: cartModel.Cart[]) => {
    if (typeof window !== 'undefined') {
      let cartId = localStorage.getItem('user') || '';
      const paramAdd: cartModel.ParamAdd = {
        userId: cartId,
        carts
      };
      addToCart(paramAdd);
    }
  };

  const changeQuantity = (param: Omit<cartModel.paramQuality, 'UserId'>) => {
    if (typeof window !== 'undefined') {
      let UserId = localStorage.getItem('user') || '';
      CartService.setQuality({ ...param, UserId })
        .then((res) => {
          if (res.code == 200) {
            dispatch(setQuality());
          }
        })
        .catch((error) => {
          const err = error as AxiosError;
          const dataError: cartModel.responseResult<null> = err.response?.data as cartModel.responseResult<null>;
          modal.confirm({
            title: 'Thông báo',
            content: dataError.message,
            rejectLable: 'Đóng',
            onDone: close
          });
        });
    }
  };
  const length: number = useMemo(() => {
    const list = _.uniqBy(products, (product) => product.cartId);

    return list.reduce((length, item) => (length += item.quantity || 1), 0);
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let cartId = localStorage.getItem('user') || '';
      dispatch(getListProductAsync(cartId));
    }
  }, [dispatch]);

  return {
    products,
    length,
    addProduct,
    removeCart,
    changeQuantity
  };
};

export default useCartProduct;
