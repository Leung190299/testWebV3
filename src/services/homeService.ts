import { SimModel } from '@/types/pick-sim';
import API from '../network/API';
import { DataPageDetail, MasterDataHomeParams } from './types';
import { AuditDBType, PageStaticResponseType, ProductResponseType, searchResult } from '@/types/home';
const homeService = {
  getProductHome: (params: MasterDataHomeParams): Promise<ProductResponseType> => API.instance.post('products', params),
  getRandomSim: (): Promise<SimModel.LuckySimResponseType> => API.instance.get('random-sim/10'),
  getPageDetail: (params: DataPageDetail): Promise<PageStaticResponseType> => API.instance.post('getMasterData/staticPageDetail', params),
  searchPage: (text: string): Promise<AuditDBType & { result: searchResult }> =>
    API.instance.get(`search-by-keyword/1/${encodeURIComponent(text)}`)
};

export default homeService;
