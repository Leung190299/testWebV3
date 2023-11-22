import API from '@/network/API';

const itelClubService = {
  getInfo: (): Promise<itelClubModel.response & { result: itelClubModel.Info }> => API.instance.get('club/clients'),
  getUboxUser: (): Promise<itelClubModel.response & { result: itelClubModel.UboxUser }> =>
    API.instance.get('club/client?page=1&pageSize=15'),
  getBannerLoyalty: (params: itelClubModel.Params): Promise<imallModel.response & { result: itelClubModel.BannerRes }> =>
    API.instance.post('club/get-banner-loyalty', params),
  getCategories: (): Promise<imallModel.response & { result: itelClubModel.Category[] }> => API.instance.get('club/categories'),
  getFilterVoucher: (
    payload: itelClubModel.paramFilter,
    params: Pick<itelClubModel.Params, 'page' | 'pageSize'>
  ): Promise<itelClubModel.response & { result: itelClubModel.VoucherData<itelClubModel.VoucherResult> }> =>
    API.instance.post('club/filtered-voucher', payload, { params }),
  getCity: (params: itelClubModel.Params): Promise<imallModel.response & { result: itelClubModel.City }> =>
    API.instance.post('getMasterData/Cities', params),
  getVipVoucher: (
    params: Pick<itelClubModel.Params, 'page' | 'pageSize'>
  ): Promise<itelClubModel.response & { result: itelClubModel.VoucherData<itelClubModel.VoucherResult> }> =>
    API.instance.post('club/get-vip-voucher', {}, { params }),
  getCategoryNews: (params: itelClubModel.Params): Promise<itelClubModel.response & { result: itelClubModel.CategoryNews[] }> =>
    API.instance.post('/club/categories', params),
  getBlogLoyalty: (params: itelClubModel.BlogLoyaltyParams): Promise<itelClubModel.response & { result: itelClubModel.BlogLoyalty[] }> =>
    API.instance.post('/club/get-blogLoyalty-by-category1', params),

  getBlogLoyaltyBySlug: (
    params: itelClubModel.BlogLoyaltyBySlugParams
  ): Promise<itelClubModel.response & { result: itelClubModel.BlogLoyalty[] }> => API.instance.post('club/get-blogLoyalty-by-slug', params),

  getDetailVoucher: (params: string | number): Promise<itelClubModel.response & { result: itelClubModel.VoucherRes }> =>
    API.instance.get(`club/vouchers/${params}`),

  getVoucherClent: (
    param: itelClubModel.payloadVoucher
  ): Promise<itelClubModel.responseResult<itelClubModel.VoucherData<itelClubModel.voucherClient>>> =>
    API.instance.post('club/vouchers/client', param)
};

export default itelClubService;
