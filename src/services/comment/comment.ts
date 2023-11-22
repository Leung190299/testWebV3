import type { Model } from '@/types/model';
import { ImageService } from '../image/image';
import Time from '@/utilities/time';

interface GetParams {
  limit: number;
  skip: number;
  product_id: number;
  rating?: number;
}
export class CommentService {
  static get(id: number) {
    return {};
  }

  static list(params: GetParams): Promise<Model.Comment[]> {
    return Promise.resolve(
      Array.from({ length: params.limit }, (e, index) => {
        const date = Time.getRandomDay(new Date('2023-01-01'), new Date()).toISOString();
        return {
          id: index,
          user_name: 'Nguyễn Ánh Nguyệt',
          user_avatar: ImageService.thumbnail().thumbnail,
          user_rating: params.rating ? params.rating : Math.ceil(Math.random() * 5),
          content:
            'Máy sử dụng mượt sạc pin nhanh chơi game ổn định camera chụp cũng tạm ổn. Chỉ có quay video hơi tệ nó cứ mờ làm sao ấy. Nhưng mà nói chung là máy rất tốt,đã sử dụng hơn một tuần và cảm thấy sử dụng rất tốt!',
          attachments: ImageService.randomArray(Math.floor(Math.random() * 6)).map((e, index) => ({
            id: index,
            type: 'img',
            url: e
          })),
          created_at: date,
          updated_at: date
        };
      })
    );
  }
}
