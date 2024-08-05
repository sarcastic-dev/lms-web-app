import axiosInstance from "@/lib/axiosInstance";
import useCookie from "./useCookie";

const useOtpRequest = () => {
	const [token, setToken] = useCookie("token");

	const requestOtp = async (email: string) => {
		try {
			const { data } = await axiosInstance.post("/request-otp", {
				email,
			});
			setToken({
				value: data.token,
				expirationDate: new Date(
					new Date().getTime() + 24 * 60 * 60 * 1000
				).toISOString(),
			});
		} catch (error) {
			console.error("Failed Request OTP", error);
		}
	};

	return requestOtp;
};

export default useOtpRequest;
