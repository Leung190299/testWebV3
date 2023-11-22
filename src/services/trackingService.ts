import API from '@/network/API';

const trackingService = {
    getOrder: (params:string|number): Promise<trackingModal.Response & {result: trackingModal.Result}> => API.instance.get(`https://itel.vn/api/web/shipment-tracking/${params}`)
};

export default trackingService;
