import { PageStaticResponseType } from '@/types/home';
import API from '../network/API';
import { DataPageDetail } from './types';
const pageDetailService = {
  getPageDetail: (params: DataPageDetail): Promise<PageStaticResponseType> => API.instance.post('getMasterData/staticPageDetail', params)
};

export default pageDetailService;
