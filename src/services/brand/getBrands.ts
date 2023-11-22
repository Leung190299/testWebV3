import brands from '@/mock/brands.json';

type ParamsGetList = {
  limit: number;
  skip: number;
};
export async function getBrands(params: Partial<ParamsGetList>) {
  return params.limit ? brands.slice(params.skip, params.limit) : brands;
}
