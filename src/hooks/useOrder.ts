import { Order } from '@/services/order/model';
import type { Model } from '@/types/model';
import useBoolean from '@pit-ui/modules/hooks/useBoolean';
import { useEffect, useState } from 'react';

const useOrder = (id?: number) => {
  const [order, setOrder] = useState<Model.Order>();
  const isLoading = useBoolean(false);
  useEffect(() => {
    async function getOrder() {
      try {
        if (!id) return;
        isLoading.setTrue();
        const order = await Order.find(id);
        if (order) setOrder(order);
        isLoading.setFalse();
      } catch (error) {
        console.log(error);
      }
    }
    getOrder();
  }, [id]);

  return { data: order, isLoading: isLoading.value };
};

export default useOrder;
