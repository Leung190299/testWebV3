import { SimModel } from '@/types/pick-sim';
import { rechrageModel } from '@/types/recharge';
import API from '../network/API';
const rechargeService = {
  getListNetwork: (tab:string|number): Promise<SimModel.AuditDBType & { result: rechrageModel.network[] }> => API.instance.get(`topup/get-list-network/${tab}`),
  getListTopup: (tab: string | number,topup:number|string): Promise<SimModel.AuditDBType & { result: rechrageModel.topup[] }> =>
    API.instance.get(`topup/get-list-topup/${tab}/${topup}`),
  payment: (
    params: rechrageModel.payment
  ): Promise<
    SimModel.AuditDBType & {
      result: rechrageModel.resultPayment;
    }
  > => API.instance.post('topup/payment', params),
  getpayment: (params: string): Promise<SimModel.AuditDBType & { result: rechrageModel.paymentInfo[] }> =>
    API.instance.get(`order/get-status/${params}`),
  postSurveyCes: (params: rechrageModel.ParamSurveyCes): Promise<rechrageModel.ResponeSurveyCes> =>
    API.instance.post('createSurveyCes', params),
  getNetwork: (number: string): Promise<SimModel.AuditDBType & { result: rechrageModel.network }> => API.instance.get(`topup/get-netwwork/${number}`)
};

export default rechargeService;
