import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

function useAttendance(formatDate: string, id: string | undefined) {
	const { data, error, isLoading } = useSWR(
		`/attendances/records-by-date?date=${formatDate}&instituteId=${id}`,
		fetcher
	);

	return {
		attendanceData: data,
		isLoading,
		isError: error,
	};
}
export default useAttendance;
