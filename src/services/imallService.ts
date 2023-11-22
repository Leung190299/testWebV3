import { IPramsProduct } from '@/types/imall/type';
import API from '../network/API';

type Props = {
  getProducts: (params: IPramsProduct) => Promise<imallModel.response & { result: imallModel.Product[] }>;
  getCategory: () => Promise<imallModel.response & { result: imallModel.Category[] }>;
  getProductDetail: (slug: string) => Promise<imallModel.response & { result: imallModel.ProductDetail }>;
  getSimSearchData: () => Promise<imallModel.response & { result: imallModel.ResultSimSeach[] }>;
  getResultSearch: (text: string) => Promise<imallModel.response & { result: { Products: imallModel.Product[] } }>;
};

const imallService: Props = {
  getProducts: (params) => API.instance.post('products', params),
  getCategory: () => API.instance.get('/categories'),
  getProductDetail: (slug) => API.instance.get(`/product-detail/${slug}`),
  getSimSearchData: () => API.instance.get(`sim_search_sim_data/1`),
  getResultSearch: (text) => API.instance.get(`search-by-keyword/1/${encodeURIComponent(text)}`)
};
export default imallService;
