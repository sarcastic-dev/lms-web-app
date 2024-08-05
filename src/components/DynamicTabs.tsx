import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/lms-tabs";
import { TabConfig } from "@/config/tabConfigurations";
import { useDispatch, useSelector } from "react-redux";
import {
	setBasicInfoUserData,
	setBasicInfoStudentData,
	setParentInfoData,
	setAddressInfoData,
	setMedicalInfoData,
	resetRegistrationData,
} from "@/context/studentRegistrationSlice";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { RootState } from "@/context/store";
import { Button } from "./ui/button";
// import activeIcon from "/active.png"; // Replace with actual path
// import completeIcon from "/Complete.png";
import { CircleDashed } from "lucide-react"; // Use default icon
import Image from "next/image";

type DynamicTabsProps = {
	config: TabConfig[];
	activeTab: string;
	onTabChange: (value: string) => void;
	step: number;
	setStep: (step: number) => void;
};

const DynamicTabs: React.FC<DynamicTabsProps> = ({
	config,
	activeTab,
	onTabChange,
	step,
	setStep,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loading, setLoading] = React.useState(false);
	const registrationData = useSelector(
		(state: RootState) => state.studentRegistration
	);
	const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

	const handleTabChange = (value: string) => {
		onTabChange(value);
	};

	const formatLabel = (label: string) => label.replace(/^\d+\.\s*/, "");

	const handleNext = async (data: any) => {
		// Dispatch appropriate actions based on the step
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
					pulseRate: Number(registrationData.medicalInfo.pulseRate),
					haemoglobin: Number(
						registrationData.medicalInfo.haemoglobin
					),
				},
			};

			try {
				console.log(
					"Submitting registration data:",
					modifiedRegistrationData
				);
				const studentId = new URLSearchParams(
					window.location.search
				).get("id");
				if (studentId) {
					await axiosInstance.put(
						`http://16.170.155.154:3300/api/students/${studentId}`,
						modifiedRegistrationData
					);
				} else {
					await axiosInstance.post(
						"http://16.170.155.154:3300/api/students",
						modifiedRegistrationData
					);
				}
				dispatch(resetRegistrationData());
				router.push("/studentInfo");
			} catch (error) {
				console.error("Failed to submit registration data:", error);
			} finally {
				setLoading(false);
			}
			return;
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
									/>
								) : isActive ? (
									<Image
										src={"/Active.png"}
										alt='Active'
										className='mr-2'
										width={20}
										height={20}
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
						if (step === 6) {
							handleNext({});
						} else {
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
