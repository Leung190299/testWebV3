import type { Model } from '@/types/model';
import { generateRandomSKU } from '@/utilities/string';
import { Model as BaseModel } from '@pit-ui/modules/database-ver2';
import { User } from '../user/model';

class OrderClass extends BaseModel<Model.Order> {
  async createOrder(data: Pick<Model.Order, 'method' | 'type' | 'transaction_price' | 'status' | 'data'>, userProps: Model.User | null) {
    let userId: number | null = null;
    if (userProps) {
      userId = userProps.id;
      if (data.method === 'wallet') {
        const user = await User.find(userProps.id);
        if (user) {
          userId = user.id;

          await User.save(userId, { balance: Math.max((user.balance || 0) - data.transaction_price, 0) });
        }
      }
    }

    return this.create({
      code: 'iTel' + generateRandomSKU(10),
      created_at: new Date().toISOString(),
      payment_time: new Date().toISOString(),
      user_id: userId,
      ...data
    });
  }
}

const Order = new OrderClass('orders');
export { Order };
