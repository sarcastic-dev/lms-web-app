export function getFilteredStages(
	educationStages: any[],
	filteredStages: string[]
) {
	return educationStages.filter((stage) =>
		filteredStages.includes(stage.stage)
	);
}
export function getStagesArray(classData: any[]) {
	return classData.map((data) => data.stage);
}
