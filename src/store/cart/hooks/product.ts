import { useGlobalContext } from '@/context/global';
import type { Model } from '@/types/model';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../hooks';
import { addToCart } from '../cartSlice';

const useProduct = () => {
  const [liked, setLiked] = useState(false);
  const dispatch = useAppDispatch();
  const { withAuth } = useGlobalContext();
  const onAddToCart = useCallback(
    (
      variant: Model.Variant,
      product: Model.Product,
      options?: {
        quantity?: number;
        gift?: {
          id?: number;
          options: Model.Gift[];
        };
      }
    ) => {
      const mergedOptions = Object.assign({ quantity: 1 }, options);
      if (!variant || !product) return toast.error('Không thể thêm sản phẩm này');
      dispatch(addToCart({ variant, product, quantity: mergedOptions.quantity, gift: mergedOptions.gift }));
      toast.success('Thêm giỏ hàng thành công');
    },
    [dispatch]
  );
  const onLikeItem = withAuth(() => {
    if (!liked) toast.success('Đã thêm vào yêu thích');
    setLiked(!liked);
  }, [liked, setLiked]);
  return { addToCart: onAddToCart, likeItem: onLikeItem, liked };
};

export default useProduct;
