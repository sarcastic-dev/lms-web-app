"use client";
import React, { useState } from "react";
import CreateClassroomModal from "@/components/CreateClassroomModal";
import ClassroomAccordion from "@/components/ClassroomAccordion";

const Page = () => {
	const [initialState, setInitialState] = useState(false);
	return (
		<div >
			{initialState ? <CreateClassroomModal /> : <ClassroomAccordion />}
		</div>
	);
};

export default Page;
