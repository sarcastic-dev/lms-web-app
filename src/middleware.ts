import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axiosInstance from "./lib/axiosInstance";

export async function middleware(request: NextRequest) {
	const cookieStore = cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const refreshToken = cookieStore.get("refreshToken")?.value;

	if (request.nextUrl.pathname === "/") {
		if (accessToken && refreshToken) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		} else {
			return NextResponse.next();
		}
	}

	if (accessToken) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		console.error("No refresh token found");
		return NextResponse.redirect(new URL("/", request.url));
	}

	try {
		const { data } = await axiosInstance.post("/users/refresh-token", {
			refreshToken,
		});

		const response = NextResponse.next();

		response.headers.append(
			"Set-Cookie",
			`accessToken=${data.accessToken}; HttpOnly; Secure; Max-Age=${
				60 * 60
			}; Path=/`
		);
		response.headers.append(
			"Set-Cookie",
			`refreshToken=${data.refreshToken}; HttpOnly; Secure; Max-Age=${
				60 * 60 * 24 * 7
			}; Path=/`
		);

		console.log("Tokens refreshed successfully");

		return response;
	} catch (error) {
		console.error("Failed to refresh token:", error);
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: [
		"/",
		"/dashboard/:path*",
		"/classroom/:path*",
		"/attendance/:path*",
		"/students/:path*",
		"/staffs/:path*",
		"/studentInfo/:path*",
		"/staffInfo/:path*",
		"/viewclass/:path*",
	],
};
