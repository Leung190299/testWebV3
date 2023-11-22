import type { Model } from '@/types/model';

import { Model as BaseModel } from '@pit-ui/modules/database-ver2';

class AddressClass extends BaseModel<Model.DeliveryAddress> {
  public override async create(data: DiffObj<Model.DeliveryAddress, Model.BaseModel>) {
    const time = Math.floor(Date.now() / 1000);
    if (data.is_default) {
      const allAddress = await this.all();
      const myAddress = allAddress.filter((addr) => addr.user_id === data.user_id);
      for (const addr of myAddress) {
        if (addr.is_default === true) await this.save(addr.id, { is_default: false });
      }
    }
    return super.create({ ...data, created_at: time, updated_at: time, deleted_at: null });
  }

  public async setDefault(id: number) {
    const address = await this.find(id);
    if (!address) throw new Error('[Error]: address not found');
    const allAddress = await this.all();
    const myAddress = allAddress.filter((addr) => addr.user_id === address.user_id && addr.id !== id);
    for (const addr of myAddress) {
      if (addr.is_default === true) await this.save(addr.id, { is_default: false });
    }

    await this.save(id, { is_default: true });
  }
}
export const Address = new AddressClass('address');
