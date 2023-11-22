import type { Model } from '@/types/model';
import { Model as BaseModel } from '@pit-ui/modules/database-ver2';

type InsertIamge = Omit<Model.BaseImage, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>;
class ImageClass extends BaseModel<Model.BaseImage> {
  public override create(data: InsertIamge): Promise<Model.BaseImage> {
    const timestamp = Math.floor(Date.now() / 1000);
    return super.create({ ...data, created_at: timestamp, updated_at: timestamp, deleted_at: null });
  }

  public async insert(...items: InsertIamge[]): Promise<number> {
    let total = 0;
    for (const item of items) {
      try {
        await this.create(item);
        total++;
      } catch (error) {}
    }
    return total;
  }
}

const ImageModel = new ImageClass('images');
export { ImageModel };
