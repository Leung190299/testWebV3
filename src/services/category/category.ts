import categories from '@/mock/categories.json';
import type { Model } from '@/types/model';

type ParamsGetList = {
  limit: number;
  skip: number;
  parent_id?: number;
};
export async function getCategories(params: Partial<ParamsGetList>) {
  let data: Model.Category[] = [];

  if (params.parent_id) {
    for (let i = 0; i < (params.limit || categories.length); i++) {
      const category = categories[i];
      if (category.parent_id === params.parent_id) {
        data.push(category);
      }
    }
  } else data = categories;

  return data;
}
