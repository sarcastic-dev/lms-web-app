// import axiosInstance from "@/lib/axiosInstance";
// import { useState, useEffect } from "react";
// interface FetchDataProps {
//   url: string;
// }
// const useFetchData = <T,>({ url }: FetchDataProps): [T | null, boolean, Error | null] => {
// 	const [data, setData] = useState<T | null>(null);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState<Error | null>(null);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			setIsLoading(true);

// 			try {
// 				const { data } = await axiosInstance.get(url);
// 				setData(data);
// 				setIsLoading(false);
// 			} catch (error: any) {
// 				setError(error);
// 				setIsLoading(false);
// 				console.error(`Error From ClassroomAccordion.tsx ${error}`);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};
// 		fetchData();
// 	}, [url]);

// 	return [data, isLoading, error];
// };
// export default useFetchData;
