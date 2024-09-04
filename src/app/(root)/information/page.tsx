"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StaffDetails from "@/components/StaffDetails";
import StudentDetails from "@/components/StudentDetails";
import getUserData from "@/utils/getUserData";

const Page: React.FC = () => {
	const searchParams = useSearchParams();
	const id: string | null = searchParams.get("id");
	const userType: string | null = searchParams.get("userType");
	const [userData, setUserData] = useState<any | null>(null);

	useEffect(() => {
		if (id && userType) {
			getUserData({ id, userType })
				.then((data) => setUserData(data))
				.catch((error) =>
					console.error("Error fetching user data:", error)
				);
		}
	}, [id, userType]);

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex flex-col'>
			{userType === "student" ? (
				<StudentDetails studentData={userData} />
			) : (
				<StaffDetails staffData={userData} />
			)}
		</div>
	);
};

export default Page;
