import React, { useEffect } from "react";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/lms-tabs";
import { TabConfig } from "@/config/tabConfigurations";
import { useDispatch, useSelector } from "react-redux";
import {
	setBasicInfoUserData,
	setBasicInfoStudentData,
	setParentInfoData,
	setAddressInfoData,
	setMedicalInfoData,
	resetRegistrationData as resetStudentData,
} from "@/context/studentRegistrationSlice";
import {
	setAddressInfoData as setStaffAddress,
	setAdditionalDetailsData,
	setPreviousExperienceData,
	setBankDetailsData,
	resetRegistrationData,
	setBasicInfoUserDetailData,
	setBasicInfoStaffData,
} from "@/context/staffRegistrationSlice";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/context/store";
import { Button } from "./ui/button";
import { CircleDashed } from "lucide-react";
import Image from "next/image";
import getUserData from "@/utils/getUserData";

type DynamicTabsProps = {
	config: TabConfig[];
	activeTab: string;
	onTabChange: (value: string) => void;
	step: number;
	setStep: (step: number) => void;
	userType: "student" | "staff" | string | null;
};

const DynamicTabs: React.FC<DynamicTabsProps> = ({
	config,
	activeTab,
	onTabChange,
	step,
	setStep,
	userType,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);
	const registrationData = useSelector(
		(state: RootState) => state.studentRegistration
	);
	const registrationStaffData = useSelector(
		(state: RootState) => state.staffRegistration
	);
	const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

	const handleTabChange = (value: string) => {
		onTabChange(value);
	};

	const formatLabel = (label: string) => label.replace(/^\d+\.\s*/, "");

	const searchParams = useSearchParams();
	const isEdit: string | null = searchParams.get("mode");
	const id: string | null = searchParams.get("id");

	const handleNext = async (data: any) => {
		if (userType === "student") {
			if (step === 1) {
				dispatch(setBasicInfoUserData(data));
			} else if (step === 2) {
				dispatch(setBasicInfoStudentData(data));
			} else if (step === 3) {
				dispatch(setParentInfoData(data));
			} else if (step === 4) {
				dispatch(setAddressInfoData(data));
			} else if (step === 5) {
				dispatch(setMedicalInfoData(data));
			} else if (step === 6) {
				setLoading(true);

				const modifiedRegistrationData = {
					...registrationData,
					basicInfo: {
						...registrationData?.basicInfo,
						student: {
							...registrationData?.basicInfo?.student,
							rollNumber: Number(
								registrationData?.basicInfo?.student?.rollNumber
							),
						},
					},
					medicalInfo: {
						...registrationData.medicalInfo,
						weightKg: Number(registrationData.medicalInfo.weightKg),
						heightCm: Number(registrationData.medicalInfo.heightCm),
						bmi: Number(registrationData.medicalInfo.bmi),
						pulseRate: Number(
							registrationData.medicalInfo.pulseRate
						),
						haemoglobin: Number(
							registrationData.medicalInfo.haemoglobin
						),
					},
				};

				try {
					const studentId = new URLSearchParams(
						window.location.search
					).get("id");
					if (studentId) {
						await axiosInstance.put(
							`/students/${studentId}`,
							modifiedRegistrationData
						);
					} else {
						await axiosInstance.post(
							"/students",
							modifiedRegistrationData
						);
					}
					dispatch(resetStudentData());
					router.push("/studentInfo");
				} catch (error) {
					console.error("Failed to submit registration data:", error);
				} finally {
					setLoading(false);
				}
				return;
			}
		} else if (userType === "staff") {
			if (step === 1) {
				dispatch(setBasicInfoUserDetailData(data));
				console.log(data);
			} else if (step === 2) {
				dispatch(setBasicInfoStaffData(data));
			} else if (step === 3) {
				dispatch(setStaffAddress(data));
			} else if (step === 4) {
				dispatch(setAdditionalDetailsData(data));
			} else if (step === 5) {
				dispatch(setPreviousExperienceData(data));
			} else if (step === 6) {
				dispatch(setBankDetailsData(data));
				console.log(data);
			} else if (step === 7) {
				setLoading(true);
				console.log("Here not!!");
				const modifiedRegistrationData = {
					...registrationStaffData,
					basicInfo: {
						...registrationStaffData.basicInfo,
						staff: {
							...registrationStaffData.basicInfo.staff,
							experienceYears: Number(
								registrationStaffData.basicInfo.staff
									?.experienceYears
							),
						},
					},
				};
				try {
					const teacherId = new URLSearchParams(
						window.location.search
					).get("id");
					if (teacherId) {
						await axiosInstance.put(
							`/staffs/${teacherId}`,
							modifiedRegistrationData
						);
					} else {
						console.log("Here!!!");
						await axiosInstance.post(
							"/staffs",
							modifiedRegistrationData
						);
					}
					dispatch(resetRegistrationData());
					router.push("/staffInfo");
				} catch (error) {
					console.error("Failed to submit registration data:", error);
				} finally {
					setLoading(false);
				}
				return;
			}
		}

		const currentIndex = config.findIndex((tab) => tab.value === activeTab);
		if (currentIndex < config.length - 1) {
			onTabChange(config[currentIndex + 1].value);
			setStep(step + 1);
			setCompletedSteps((prevSteps) => [...prevSteps, step]); // Mark current step as completed
		}
	};

	const handleBack = () => {
		const currentIndex = config.findIndex((tab) => tab.value === activeTab);
		if (currentIndex > 0) {
			onTabChange(config[currentIndex - 1].value);
			setStep(step - 1);
		}
	};

	const isTabCompleted = (index: number) =>
		completedSteps.includes(index + 1);

	useEffect(() => {
		if (userType === "student") {
			if (isEdit) {
				if (id && userType) {
					getUserData({ id, userType })
						.then((data) => {
							console.log(data);
							dispatch(setBasicInfoUserData(data.basicInfo.user));
							dispatch(
								setBasicInfoStudentData(data.basicInfo.student)
							);
							dispatch(setParentInfoData(data.parentInfo));
							dispatch(setAddressInfoData(data.addressInfo));
							dispatch(setMedicalInfoData(data.medicalInfo));
						})
						.catch((error) =>
							console.error("Error fetching user data:", error)
						);
				}
			}
		} else if (userType === "staff") {
			if (isEdit) {
				if (id && userType) {
					getUserData({ id, userType })
						.then((data) => {
							console.log(data);
							dispatch(
								setBasicInfoUserDetailData(data.basicInfo.user)
							);
							dispatch(
								setBasicInfoStaffData(data.basicInfo.staff)
							);
							dispatch(setStaffAddress(data.addressInfo));
							dispatch(
								setAdditionalDetailsData(data.additionalInfo)
							);
							dispatch(
								setPreviousExperienceData(
									data.previousExperienceInfo
								)
							);
							dispatch(setBankDetailsData(data.bankDetailInfo));
						})
						.catch((error) =>
							console.error("Error fetching user data:", error)
						);
				}
			}
		}
	}, [userType, isEdit]);

	return (
		<Tabs
			value={activeTab}
			className='2xl:px-20 2xl:py-12 xl:px-10 xl:py-8 lg:px-12 lg:py-4'
			onValueChange={handleTabChange}
		>
			<TabsList className='flex items-center'>
				{config.map((tab, index) => {
					const isActive = tab.value === activeTab;
					const isComplete = isTabCompleted(index);
					return (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className={`${
								isActive || isComplete
									? "border-t-lmsSuccess"
									: ""
							}`}
						>
							<span>
								{isComplete ? (
									<Image
										src={"/Complete.png"}
										alt='Complete'
										className='mr-2'
										width={20}
										height={20}
										style={{
											width: "auto",
											height: "auto",
										}}
									/>
								) : isActive ? (
									<Image
										src={"/Active.png"}
										alt='Active'
										className='mr-2'
										width={20}
										height={20}
										style={{
											width: "20px",
											height: "20px",
										}}
									/>
								) : (
									<CircleDashed className='h-5 w-5 mr-2' />
								)}
							</span>
							<span
								className={`${
									isActive ? "text-lmsAccent" : ""
								}`}
							>
								{tab.label}
							</span>
						</TabsTrigger>
					);
				})}
			</TabsList>
			{activeTab && (
				<div className='my-6 text-xl font-medium tracking-tight text-lmsPrimary'>
					{formatLabel(
						config.find((tab) => tab.value === activeTab)?.label ||
							""
					)}
				</div>
			)}
			{config.map((tab) => (
				<TabsContent
					key={tab.value}
					value={tab.value}
					className={`border rounded-[8px] xl:px-8 lg:px-5 ${
						tab.value === "review" ? "h-[650px]" : "h-[330px]"
					} overflow-y-scroll`}
				>
					<tab.component onNext={handleNext} />
				</TabsContent>
			))}
			<div className='flex justify-end items-end mt-6'>
				<Button
					variant={"lmsBack"}
					className='mr-6'
					onClick={handleBack}
					disabled={step === 1}
				>
					Back
				</Button>
				<Button
					variant={"lmsNext"}
					className='text-white'
					onClick={() => {
						if (userType === "student") {
							// If it's a student and the step is 6
							if (step === 6) {
								handleNext({});
							} else {
								// If it's a student but not on step 6, submit the form
								document.querySelector("form")?.dispatchEvent(
									new Event("submit", {
										cancelable: true,
										bubbles: true,
									})
								);
							}
						} else if (userType === "staff") {
							// If it's a staff and the step is 7
							if (step === 7) {
								handleNext({});
							} else {
								// If it's staff but not on step 7, submit the form
								document.querySelector("form")?.dispatchEvent(
									new Event("submit", {
										cancelable: true,
										bubbles: true,
									})
								);
							}
						} else {
							// If userType is neither student nor staff, submit the form
							document.querySelector("form")?.dispatchEvent(
								new Event("submit", {
									cancelable: true,
									bubbles: true,
								})
							);
						}
					}}
					disabled={step === config.length + 1}
				>
					{step === config.length ? "Submit" : "Next"}
				</Button>
			</div>
		</Tabs>
	);
};

export default DynamicTabs;
