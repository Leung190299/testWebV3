import { API } from "@/network"
import { profileModel } from "@/types/profile"

type props = {
	getInfo:(phone:string)=>Promise<profileModel.responseResult<profileModel.Profile>>
}


const profileService: props = {
	getInfo:(phone:string)=>API.instance.get(`user/getInfoUser/${phone}`)
}

export default profileService;