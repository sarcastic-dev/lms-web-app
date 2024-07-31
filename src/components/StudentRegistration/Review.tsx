import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/context/store";

const Review = ({ onNext }: any) => {
	const registrationData = useSelector(
		(state: RootState) => state.studentRegistration
	);

	return (
		<div>
			<h2 className='text-2xl font-bold'>Review & Submit</h2>
			{/* Display registration data here */}
			<pre>{JSON.stringify(registrationData, null, 2)}</pre>
			{/* <button onClick={() => onNext({})}>Submit</button> */}
		</div>
	);
};

export default Review;
