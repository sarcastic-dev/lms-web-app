import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSchoolFlag,
	faGraduationCap,
	faBookOpenReader,
	faChalkboardUser,
	faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { educationStages } from "@/Constant";
import { getFilteredStages } from "@/utils/commonFunction";
import axiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";

interface SelectCardProps {
	id: number;
	icon: any;
	text: string;
	borderColor?: string;
	onSelect: (id: number, text: string) => void;
	isSelected: boolean;
	description: string;
}

interface SelectedCard {
	id: number;
	text: string;
}
interface Props {
	stages: string[];
	fetchData: () => void;
}

const SelectCard: React.FC<SelectCardProps> = ({
	id,
	icon,
	text,
	borderColor = "border-lmsAccent",
	onSelect,
	isSelected,
	description,
}) => {
	return (
		<Card
			onClick={() => onSelect(id, text)}
			className={cn(
				"p-6 cursor-pointer transition-all ",
				"border-2",
				isSelected ? `${borderColor} bg-lms-50` : "border-lms-50 ",
				"hover:shadow",
				"w-64 h-40 flex flex-col items-start relative"
			)}
		>
			<FontAwesomeIcon
				icon={icon}
				className='text-3xl mb-2 w-12 h-12 text-lmsAccent'
			/>
			<Checkbox
				checked={isSelected}
				onCheckedChange={() => onSelect(id, text)}
				className='absolute top-5 right-5 h-5 w-5 '
				style={{ strokeWidth: "3" }}
			/>

			<div className='mt-3'>
				<h6 className='text-lmsPrimary font-medium text-base'>
					{text}
				</h6>
				<p className='text-xs text-lms-600 mt-1 text'>{description}</p>
			</div>
		</Card>
	);
};

const MultiSelectCardGrid: React.FC<Props> = ({ stages, fetchData }) => {
	const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
	const instituteId = Cookies.get("instituteId");
	const handleSelect = (id: number, text: string) => {
		setSelectedCards((prevSelected) => {
			const isSelected = prevSelected.some((card) => card.id === id);
			if (isSelected) {
				// Remove the card if it's already selected
				return prevSelected.filter((card) => card.id !== id);
			} else {
				// Add the card if it's not selected
				return [...prevSelected, { id, text }];
			}
		});
	};

	const handleSubmitClasses = async () => {
		const textArray = selectedCards.map((card) => card.text);
		console.log(textArray);
		const filteredEducationStages = getFilteredStages(
			educationStages,
			textArray
		);
		console.log(filteredEducationStages);
		try {
			const response = await axiosInstance.post(
				"/classes/bulk/sections",
				{
					stages: filteredEducationStages,
					instituteId,
				}
			);
			console.log(response);
			fetchData();
		} catch (error) {
			console.log("Catch error", error);
		}
	};

	const cards = [
		{
			id: 1,
			icon: faSchoolFlag,
			text: "Pre Primary Stage",
			description: "Pre-Nursery, Nursery, UKG, LKG",
		},
		{
			id: 2,
			icon: faChalkboardUser,
			text: "Primary Stage",
			description: "Class-1, Class-2, Class-3, Class-4, Class-5",
		},
		{
			id: 3,
			icon: faBookOpenReader,
			text: "Middle Stage",
			description: "Class-6, Class-7, Class-8",
		},
		{
			id: 4,
			icon: faGraduationCap,
			text: "Secondary Stage",
			description: "Class-9, Class-10",
		},
		{
			id: 5,
			icon: faUserGraduate,
			text: "Senior Secondary Stage",
			description: "Class-11, Class-12",
		},
	];

	const filteredCards =
		stages.length > 0
			? cards.filter((card) => !stages.includes(card.text))
			: cards;

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant='lmsOutline'
						iconName='SquarePen'
					>
						Classroom Structure
					</Button>
				</DialogTrigger>
				<DialogContent className='sm:max-w-[900px]'>
					<DialogHeader>
						<DialogTitle className='text-lmsPrimary text-2xl'>
							Choose Stages
						</DialogTitle>
						<DialogDescription className='text-lmsSecondary'>
							Select stages to start organizing your classes.
						</DialogDescription>
					</DialogHeader>
					<div>
						<div className='flex flex-wrap gap-x-10 gap-y-6 mt-8'>
							{filteredCards.map((card) => (
								<SelectCard
									key={card.id}
									id={card.id}
									icon={card.icon}
									text={card.text}
									description={card.description}
									borderColor='border-lmsAccent'
									isSelected={selectedCards.some(
										(selectedCard) =>
											selectedCard.id === card.id
									)}
									onSelect={handleSelect}
								/>
							))}
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant={"lmsActive"}
								type='submit'
								onClick={handleSubmitClasses}
							>
								Save changes
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default MultiSelectCardGrid;
