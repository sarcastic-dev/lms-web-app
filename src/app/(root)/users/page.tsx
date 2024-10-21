"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DynamicTabs from "@/components/DynamicTabs";
import { studentTabs, staffTabs, TabConfig } from "@/config/tabConfigurations";
import { Button } from "@/components/ui/button";

const Page: React.FC = () => {
	const searchParams = useSearchParams();
	const userType = searchParams.get("userType");

	const [tabsConfig, setTabsConfig] = useState<TabConfig[]>([]);
	const [activeTab, setActiveTab] = useState<string>("");
	const [step, setStep] = useState<number>(1);

	const router = useRouter();
	useEffect(() => {
		if (userType === "student") {
			setTabsConfig(studentTabs);
			setActiveTab(studentTabs[0].value);
		} else if (userType === "staff") {
			setTabsConfig(staffTabs);
			setActiveTab(staffTabs[0].value);
		}
	}, [userType]);

	return (
		<div className='flex flex-col min-h-screen'>
			<div className='2xl:px-20 2xl:py-6 xl:px-10 xl:py-2 lg:px-12 lg:py-4 border-b border-lms-100 flex items-center justify-between'>
				<h4 className='font-bold text-2xl'>
					Add {userType === "student" ? "Student" : "Staff"}
				</h4>

				<Button
					variant={"lmsOutline"}
					// size={"lg"}
					onClick={() => {
						{
							userType === "student"
								? router.push("/studentInfo")
								: router.push("/staffInfo");
						}
					}}
					className=''
					iconName='ArrowLeft'
				>
					Back
				</Button>
			</div>
			{tabsConfig.length > 0 && (
				<DynamicTabs
					config={tabsConfig}
					activeTab={activeTab}
					onTabChange={setActiveTab}
					step={step}
					setStep={setStep}
					userType={userType}
				/>
			)}
		</div>
	);
};

export default Page;
