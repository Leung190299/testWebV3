import API from "@/network/API";
import { SimModel } from "@/types/pick-sim";

const financeService = {
    getURL: (params: {url:string; code?:string}): Promise<SimModel.AuditDBType & { result: string }> => API.instance.get(`dagoras/getlink`,{params}),
};

export default financeService;