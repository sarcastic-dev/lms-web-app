"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  BadgePlus,
  BriefcaseBusiness,
  ChevronRight,
  History,
  Info,
  Landmark,
  LocateFixed,
  NotebookTabs,
} from "lucide-react";
import { IconProps, Staff, StepProps, StepperProps } from "@/types";
import BasicInfo from "@/components/StaffRegistration/BasicInfo";
import AddressInfo from "@/components/StaffRegistration/AddressInfo";
import EmploymentDetails from "@/components/StaffRegistration/EmploymentDetails";
import AdditionalDetails from "@/components/StaffRegistration/AdditionalDetails";
import PreviousExperience from "@/components/StaffRegistration/PreviousExperience";
import BankDetails from "@/components/StaffRegistration/BankDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressInfoData,
  setAdditionalDetailsData,
  setPreviousExperienceData,
  setBankDetailsData,
  resetRegistrationData,
  setBasicInfoUserDetailData,
  setBasicInfoStaffData,
} from "@/context/staffRegistrationSlice";
import { AppDispatch, RootState } from "@/context/store";
import { useRouter, useSearchParams } from "next/navigation";
import { Switch } from "antd";
import { fetchStaffById, setViewState } from "@/context/staffSlice";
import axiosInstance from "@/lib/axiosInstance";

export default function Page() {
  const [formState, setFormState] = useState(() => {
    // Get the initial viewState from localStorage, default to 'view'
    return localStorage.getItem("viewState") || "view";
  });
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id: string | null = searchParams.get("id");
  const registrationStaffData = useSelector(
    (state: RootState) => state.staffRegistration
  );
  const { staffData, status, error, viewState } = useSelector(
    (state: RootState) => state.staff
  );

  const handleToggle = () => {
    const newState = viewState === "view" ? "edit" : "view";
    setFormState(newState);
    dispatch(setViewState(newState));
    localStorage.setItem("viewState", newState); // Save to localStorage
  };

  const setStaffData = useCallback(
    (staffData: Staff) => {
      dispatch(setBasicInfoUserDetailData(staffData.basicInfo.user));
      dispatch(setBasicInfoStaffData(staffData.basicInfo.staff));
      dispatch(setAddressInfoData(staffData.addressInfo));
      dispatch(setAdditionalDetailsData(staffData.additionalInfo));
      dispatch(setPreviousExperienceData(staffData.previousExperienceInfo));
      dispatch(setBankDetailsData(staffData.bankDetailInfo));
    },
    [dispatch]
  );
  useEffect(() => {
    if (id) {
      dispatch(fetchStaffById(id));
      dispatch(setViewState(formState));
    }
  }, [dispatch, id, formState]);

  useEffect(() => {
    if (staffData) {
      setStaffData(staffData);
    }
  }, [staffData, setStaffData]);

  const handleNext = async (data: any) => {
    if (step === 1) {
      dispatch(setBasicInfoUserDetailData(data));
    } else if (step === 2) {
      dispatch(setBasicInfoStaffData(data));
    } else if (step === 3) {
      dispatch(setAddressInfoData(data));
    } else if (step === 4) {
      dispatch(setAdditionalDetailsData(data));
    } else if (step === 5) {
      dispatch(setPreviousExperienceData(data));
    } else if (step === 6) {
      dispatch(setBankDetailsData(data));
    } else if (step === 7) {
      setLoading(true);
      const modifiedRegistrationData = {
        ...registrationStaffData,
        basicInfo: {
          ...registrationStaffData.basicInfo,
          staff: {
            ...registrationStaffData.basicInfo.staff,
            experienceYears: Number(
              registrationStaffData.basicInfo.staff?.experienceYears
            ),
          },
        },
      };
      try {
        if (viewState === "view" || viewState === "edit") {
          await axiosInstance.put(
            `http://16.170.155.154:3300/api/staffs/${searchParams.get("id")}`,
            modifiedRegistrationData
          );
        } else {
          await axiosInstance.post(
            "http://16.170.155.154:3300/api/staffs",
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
    setStep(step + 1);
  };

  return (
    <div className="flex flex-col min-h-screen items-start justify-start xl:max-w-6xl 2xl:max-w-7xl mx-auto pt-20">
      <div className="flex font-semibold text-blue-500 2xl:top-24 xl:top-6 gap-3">
        <NotebookTabs size={35} strokeWidth={2} />
        <h1 className="text-4xl">Add Staff</h1>
      </div>
      <div className="h-[590px] w-full rounded-2xl bg-white shadow-custom-dark 2xl:mt-12 xl:mt-6 flex flex-col">
        <div className="flex justify-between rounded py-8 px-10 flex-wrap">
          <Stepper step={step} />
        </div>
        <div className="flex-grow px-10 overflow-y-auto">
          {loading || status === "loading" ? (
            <div className="flex justify-center items-center h-96">
              <span className="text-2xl">Loading...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-96">
              <span className="text-2xl text-red-500">Error: {error}</span>
            </div>
          ) : (
            <>
              {step === 1 && <BasicInfo onNext={handleNext} />}
              {step === 2 && <EmploymentDetails onNext={handleNext} />}
              {step === 3 && <AddressInfo onNext={handleNext} />}
              {step === 4 && <AdditionalDetails onNext={handleNext} />}
              {step === 5 && <PreviousExperience onNext={handleNext} />}
              {step === 6 && <BankDetails onNext={handleNext} />}
              {step === 7 && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    All fields have been filled
                  </h2>
                  <p className="text-lg">
                    Review the information and click &quot;Create&quot; to
                    submit.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="px-10 pb-10 flex justify-between items-end">
          <button
            onClick={() => setStep(step < 2 ? step : step - 1)}
            className={`${
              step >= 8 ? "pointer-events-none opacity-50" : ""
            } rounded px-2 py-1 text-slate-400 hover:text-slate-700`}
          >
            Back
          </button>

          {viewState === "view" || viewState === "edit" ? (
            <Switch
              checkedChildren="edit"
              unCheckedChildren="view"
              onChange={handleToggle}
              defaultChecked={viewState === "edit"}
            />
          ) : null}

          <button
            onClick={() => {
              if (step === 7) {
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
            className={`${
              step >= 8 ? "pointer-events-none opacity-50" : ""
            } flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
          >
            {step === 7 ? "Create" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Stepper({ step }: StepperProps) {
	const steps = [
		{ number: 1, description: "Basic Info", icon: Info },
		{
			number: 2,
			description: "Employment Details",
			icon: BriefcaseBusiness,
		},
		{ number: 3, description: "Address Info", icon: LocateFixed },
		{ number: 4, description: "Additional Details", icon: BadgePlus },
		{ number: 5, description: "Previous Experience", icon: History },
		{ number: 6, description: "Bank Details", icon: Landmark },
	];

	return (
		<div className='flex w-full items-center flex-wrap 2xl:gap-y-10 2xl:gap-x-4 xl:gap-y-5 xl:gap-x-4'>
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
							className='text-slate-400 2xl:ml-2 xl:ml-3'
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
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M5 13l4 4L19 7'
			/>
		</svg>
	);
}
