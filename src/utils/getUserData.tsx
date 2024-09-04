import axiosInstance from "@/lib/axiosInstance";

const getUserData = async ({
	id,
	userType,
}: {
	id: string;
	userType: string;
}) => {
	const getStaffData = async (id: string) => {
		const { data } = await axiosInstance.get(`/staffs/${id}`);
		const modifiedData = {
			...data,
			basicInfo: {
				...data.basicInfo,
				staff: {
					...data.basicInfo.staff,
					experienceYears: String(
						data.basicInfo.staff?.experienceYears
					),
				},
			},
		};
		return modifiedData;
	};

	const getStudentData = async (id: string) => {
		const { data } = await axiosInstance.get(`/students/${id}`);
		const modifiedRegistrationData = {
			...data,
			basicInfo: {
				...data?.basicInfo,
				student: {
					...data?.basicInfo?.student,
					rollNumber: String(data?.basicInfo?.student?.rollNumber),
				},
			},
			medicalInfo: {
				...data?.medicalInfo,
				weightKg: String(data?.medicalInfo?.weightKg),
				heightCm: String(data?.medicalInfo?.heightCm),
				bmi: String(data?.medicalInfo?.bmi),
				pulseRate: String(data?.medicalInfo?.pulseRate),
				haemoglobin: String(data?.medicalInfo?.haemoglobin),
			},
		};
		return modifiedRegistrationData;
	};
	return userType === "student" ? getStudentData(id) : getStaffData(id);
};

export default getUserData;
