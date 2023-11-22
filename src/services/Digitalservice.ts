import { API } from '@/network';

const Digitalservice = {
  getlistPost: (params: digitalservice.params): Promise<digitalservice.response & { result: { BlockBlog: digitalservice.post[] } }> =>
    API.instance.post('/getMasterData/blockBlog', params),
  getLinkUrl: (link: string): Promise<digitalservice.response & { result: string }> => API.instance.get(link),
  getOTP: (phone: string): Promise<digitalservice.response> => API.instance.get(`/otp2/${phone}`),
  getLinkVietlot: (params: { phone: string, otp: string }): Promise<digitalservice.response & { result: string }> => API.instance.get('/vietlot/getlink', { params:{
    ...params,
    tran_id:`VL-${Date.now()}`
  }})
};

export default Digitalservice;
