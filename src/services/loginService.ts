import { API } from "@/network";

const LoginService = {
	getOPt: (phone: string): Promise<loginModel.response> => API.instance.get(`otp/${phone}`),
	loginOTP: (param: loginModel.paramsOTP): Promise<loginModel.response & { result: loginModel.OTPLogin }> => API.instance.post('otp-login', param)
}

export default LoginService;