export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		return ""; // Return an empty string if the date is invalid
	}

	// Format the date as YYYY-MM-DD
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Add 1 because months are zero-based
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};
