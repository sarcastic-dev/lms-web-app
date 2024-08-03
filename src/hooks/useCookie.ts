import { useState, useEffect } from "react";

interface SetCookieValue {
	value: string;
	expirationDate: string;
}

const useCookie = (
	cookieName: string
): [
	string,
	({ value, expirationDate }: SetCookieValue) => void,
	() => void
] => {
	const [cookieValue, setCookieValue] = useState("");

	useEffect(() => {
		const cookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith(`${cookieName}=`));
		setCookieValue(cookie ? cookie.split("=")[1] : "");
	}, [cookieName]);

	const setCookie = ({ value, expirationDate }: SetCookieValue) => {
		document.cookie = `${cookieName}=${value}; expires=${new Date(
			expirationDate
		).toUTCString()}; path=/`;
	};

	const deleteCookie = () => {
		document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
	};

	return [cookieValue, setCookie, deleteCookie];
};

export default useCookie;
