import { API } from '@/network';

type props = {
  getOPT: (phone: string) => Promise<UpdateInfoModel.responseResult<any>>;
  getListProduct: (params: UpdateInfoModel.ParamsLitSim) => Promise<UpdateInfoModel.responseResult<UpdateInfoModel.resultSim[]>>;
  checkOPT: (params: UpdateInfoModel.ParamCheckOTP) => Promise<UpdateInfoModel.responseResult<any>>;
  getSimRandom: () => Promise<UpdateInfoModel.responseResult<UpdateInfoModel.resultSim>>;
  orderSim:(param:cartModel.PaymentInfo)=>Promise<UpdateInfoModel.responseResult<string>>
};
const UpdateInfoService: props = {
  getOPT: (phone) => API.instance.get(`order/send-otp/${phone}`),
  getListProduct: (params) => API.instance.post('order/sim_ob', params),
  checkOPT: (params) => API.instance.post('order/valid-otp', params),
  getSimRandom: () => API.instance.get('order/random-sim-ob'),
  orderSim:(params)=>API.instance.post('order/sim-bonus',params)
};
export default UpdateInfoService;
