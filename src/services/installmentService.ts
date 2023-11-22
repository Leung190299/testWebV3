import { API } from "@/network"

type props = {
	getBanks:(total:string)=>Promise<installmentModel.responseResult<installmentModel.Bank[]>>
}
const InstallmentService: props = {
	getBanks:(total)=>API.instance.get(`vnpay-isp/installment-info/${total}`)
}

export default InstallmentService