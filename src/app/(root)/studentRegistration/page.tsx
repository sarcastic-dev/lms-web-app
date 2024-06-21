"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	ChevronRight,
	CircleUser,
	CircleUserRoundIcon,
	ClipboardPlus,
	GraduationCap,
	Info,
	LocateFixed,
	Shield,
	Users,
} from "lucide-react";
import { IconProps, StepProps, StepperProps } from "@/types";
import BasicInfo from "@/components/StudentRegistration/BasicInfo";
import AddressInfo from "@/components/StudentRegistration/AddressInfo";
import ParentInfo from "@/components/StudentRegistration/ParentInfo";
import AcademicInfo from "@/components/StudentRegistration/AcademicInfo";
import MedicalInfo from "@/components/StudentRegistration/MedicalInfo";
import { useDispatch, useSelector } from "react-redux";
import {
	setAddressInfoData,
	setBasicInfoStudentData,
	setBasicInfoUserData,
	setParentInfoData,
	setMedicalInfoData,
	resetRegistrationData,
} from "@/context/studentRegistrationSlice";
import { RootState } from "@/context/store";
import { useRouter } from "next/navigation";

export default function Page() {
	const router = useRouter();
	const [step, setStep] = useState<number>(1);
	const dispatch = useDispatch();
	const registrationData = useSelector(
		(state: RootState) => state.studentRegistration
	);

	const handleNext = (data: any) => {
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
			dispatch(resetRegistrationData());
			console.log(registrationData);
			router.push("/studentInfo");
			return;
		}
		
		setStep(step + 1);
	};

	return (
		<div className='flex min-h-screen items-start justify-center bg-gradient-to-br 2xl:pt-40 xl:pt-20 relative '>
			<div className='flex font-semibold items-center text-blue-500 absolute 2xl:top-24 xl:top-6 gap-3'>
				<Users
					size={35}
					strokeWidth='3'
				/>
				<h1 className='text-4xl'>Student Registration</h1>
			</div>
			<div className='mx-auto w-full max-w-7xl rounded-2xl bg-white shadow-custom-dark 2xl:mt-12 xl:mt-6'>
				<div className='flex justify-between rounded py-8 px-10 flex-wrap'>
					<Stepper step={step} />
				</div>
				<div className='px-10 pb-8 '>
					{step === 1 && <BasicInfo onNext={handleNext} />}
					{step === 2 && <AcademicInfo onNext={handleNext} />}
					{step === 3 && <ParentInfo onNext={handleNext} />}
					{step === 4 && <AddressInfo onNext={handleNext} />}
					{step === 5 && <MedicalInfo onNext={handleNext} />}

					<div className='2xl:mt-10 xl:mt-6 flex justify-between'>
						<button
							onClick={() => setStep(step < 2 ? step : step - 1)}
							className={`${
								step >= 6
									? "pointer-events-none opacity-50"
									: ""
							} rounded px-2 py-1 text-slate-400 hover:text-slate-700`}
						>
							Back
						</button>
						<button
							onClick={() => {
								// Manually trigger the form submission of the current step
								document.querySelector("form")?.dispatchEvent(
									new Event("submit", {
										cancelable: true,
										bubbles: true,
									})
								);
							}}
							className={`${
								step >= 6
									? "pointer-events-none opacity-50"
									: ""
							} flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
						>
							{step === 5 ? "Create" : "Next"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function Stepper({ step }: StepperProps) {
	const steps = [
		{ number: 1, description: "Basic Info", icon: Info },
		{ number: 2, description: "Academic Info", icon: LocateFixed },
		{ number: 3, description: "Parent's Info", icon: CircleUser },
		{ number: 4, description: "Address Info", icon: GraduationCap },
		{ number: 5, description: "Medical Info", icon: ClipboardPlus },
	];

	return (
		<div className='flex w-full items-center flex-wrap 2xl:gap-y-10 2xl:gap-x-4  xl:gap-y-5 xl:gap-x-4 '>
			{steps.map((s, index) => (
				<div
					key={s.number}
					className='flex items-center'
				>
					<Step
						step={s.number}
						currentStep={step}
						description={s.description}
						icon={s.icon}
					/>
					{index < steps.length - 1 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
							className=' text-slate-400 ml-2'
						>
							<ChevronRight
								color={
									step > s.number
										? "var(--blue-500)"
										: "var(--slate-400)"
								}
							/>
						</motion.div>
					)}
				</div>
			))}
		</div>
	);
}

function Step({ step, currentStep, description, icon: Icon }: StepProps) {
	let status =
		currentStep === step
			? "active"
			: currentStep < step
			? "inactive"
			: "complete";

	return (
		<motion.div
			animate={status}
			className='flex items-center space-x-2'
		>
			<motion.div
				variants={{
					active: {
						scale: 1,
						transition: {
							delay: 0,
							duration: 0.2,
						},
					},
					complete: {
						scale: 1.25,
					},
				}}
				transition={{
					duration: 0.6,
					delay: 0.2,
					type: "tween",
					ease: "circOut",
				}}
				className='relative'
			>
				<div className='absolute inset-0 rounded-full bg-blue-200'></div>
				<motion.div
					initial={false}
					variants={{
						inactive: {
							backgroundColor: "var(--white)",
							borderColor: "var(--slate-200)",
							color: "var(--slate-400)",
						},
						active: {
							backgroundColor: "var(--white)",
							borderColor: "var(--blue-500)",
							color: "var(--blue-500)",
						},
						complete: {
							backgroundColor: "var(--blue-500)",
							borderColor: "var(--blue-500)",
							color: "var(--blue-500)",
						},
					}}
					transition={{ duration: 0.2 }}
					className={`relative flex h-6 w-6 items-center justify-center rounded-full border-1 font-semibold`}
				>
					<div className='flex items-center justify-center'>
						{status === "complete" ? (
							<CheckIcon className='h-3.5 w-3.5 text-white' />
						) : (
							<Icon />
						)}
					</div>
				</motion.div>
			</motion.div>

			<motion.div
				variants={{
					complete: {
						color: "var(--blue-500)",
					},
				}}
				className={`ml-2 text-sm font-medium complete`}
			>
				{description}
			</motion.div>
		</motion.div>
	);
}

function CheckIcon({ className }: IconProps) {
	return (
		<svg
			className={className}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={3}
		>
			<motion.path
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{
					delay: 0.2,
					type: "tween",
					ease: "easeOut",
					duration: 0.3,
				}}
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M5 13l4 4L19 7'
			/>
		</svg>
	);
}
