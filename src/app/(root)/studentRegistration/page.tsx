"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, CircleUser, CircleUserRoundIcon, ClipboardPlus, GraduationCap, Info, LocateFixed, LucideIcon, MapPin, Shield } from "lucide-react";
import { IconProps, StepProps, StepperProps } from "@/types";



export default function Page() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="flex min-h-screen items-start justify-center bg-gradient-to-br pt-40">
      <div className="mx-auto w-full max-w-7xl rounded-2xl bg-white shadow-lg">
        <div className="flex justify-between rounded p-8">
          <Stepper step={step} />
        </div>
        <div className="px-8 pb-8">
          {step === 1 && <div>
            <div className="mt-2 h-6 w-40 rounded bg-slate-100" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 rounded bg-slate-100" />
              <div className="h-4 w-4/6 rounded bg-slate-100" />
            </div>
          </div>}
          {step === 2 && <div>
            <div className="mt-2 h-6 w-40 rounded bg-red-100" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-5/6 rounded bg-red-100" />
              <div className="h-4 rounded bg-red-100" />
              <div className="h-4 w-4/6 rounded bg-red-100" />
            </div>
          </div>}
          {step === 3 && <div>
            <div className="mt-2 h-6 w-40 rounded bg-blue-100" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-5/6 rounded bg-blue-100" />
              <div className="h-4 rounded bg-blue-100" />
              <div className="h-4 w-4/6 rounded bg-blue-100" />
            </div>
          </div>}

          <div className="mt-10 flex justify-between">
            <button
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
            >
              Back
            </button>
            <button
              onClick={() => setStep(step >= 8 ? step : step + 1)}
              className={`${step >= 8 ? "pointer-events-none opacity-50" : ""
                } flex items-center justify-center rounded-full bg-blue-500 py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
            >
              {step === 8 ? "Finish" : "Next"}
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
	  { number: 2, description: "Address Info", icon: LocateFixed },
	  { number: 3, description: "Father’s Info", icon:  CircleUser },
	  { number: 4, description: "Mother’s Info", icon: CircleUserRoundIcon },
	  { number: 5, description: "Guardian’s Info", icon: Shield },
	  { number: 6, description: "Academic Info", icon: GraduationCap },
	  { number: 7, description: "Medical Info", icon: ClipboardPlus},
	];
  
	return (
	  <div className="flex w-full items-center space-x-4">
		{steps.map((s, index) => (
		  <div key={s.number} className="flex items-center">
			<Step step={s.number} currentStep={step} description={s.description} icon={s.icon} />
			{index < steps.length - 1 && (
			  <motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="mx-2 text-slate-400"
			  >
				<ChevronRight
				  color={step > s.number ? "var(--blue-500)" : "var(--slate-400)"}
				/>
			  </motion.div>
			)}
		  </div>
		))}
	  </div>
	);
  }
  

function Step({ step, currentStep, description, icon:Icon }: StepProps) {
	let status =
	  currentStep === step
		? "active"
		: currentStep < step
		  ? "inactive"
		  : "complete";
  
	return (
	  <motion.div animate={status} className="flex items-center space-x-2">
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
		  className="relative"
		>
		  <div className="absolute inset-0 rounded-full bg-blue-200"></div>
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
			<div className="flex items-center justify-center">
			  {status === "complete" ? (
				<CheckIcon className="h-3.5 w-3.5 text-white" />
			  ) : (
				<Icon/>
			  )}
			</div>
		  </motion.div>
		</motion.div>
  
		<div className="ml-2 text-sm font-medium">{description}</div>
	  </motion.div>
	);
  }
  

function CheckIcon({ className }: IconProps) {
	return (
	  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
		<motion.path
		  initial={{ pathLength: 0 }}
		  animate={{ pathLength: 1 }}
		  transition={{ delay: 0.2, type: "tween", ease: "easeOut", duration: 0.3 }}
		  strokeLinecap="round"
		  strokeLinejoin="round"
		  d="M5 13l4 4L19 7"
		/>
	  </svg>
	);
  }