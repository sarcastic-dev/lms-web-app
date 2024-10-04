import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

function useUser(user: string, id: string | undefined) {
	const { data, error, isLoading } = useSWR(
		`/${user}/institute/${id}`,
		fetcher
	);

	return {
		userData: data,
		isLoading,
		isError: error,
	};
}
export default useUser;
