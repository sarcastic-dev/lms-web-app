import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Cookies from "js-cookie";

type WithAuthCheckProps = {
	// Define any props that the HOC should pass down, if necessary
	[key: string]: any;
};

const withAuthCheck = <P extends WithAuthCheckProps>(
	WrappedComponent: NextPage<P>
) => {
	const AuthCheckWrapper: NextPage<P> = (props: P) => {
		const router = useRouter();

		useEffect(() => {
			// Check and remove instituteId cookie
			checkAndRemoveInstituteId();

			// Redirect to login if refreshToken is missing
			if (!Cookies.get("refreshToken")) {
				router.push("/");
			}
		}, [router]);

		return <WrappedComponent {...props} />;
	};

	// Function to get a cookie by name
	const getCookie = (name: string): string | undefined => {
		return Cookies.get(name);
	};

	// Function to remove a cookie by name
	const removeCookie = (name: string): void => {
		Cookies.remove(name);
	};

	// Function to check and remove instituteId cookie if refreshToken is missing
	const checkAndRemoveInstituteId = (): void => {
		const refreshToken = getCookie("refreshToken");
		if (!refreshToken) {
			removeCookie("instituteId");
		}
	};

	return AuthCheckWrapper;
};

export default withAuthCheck;
