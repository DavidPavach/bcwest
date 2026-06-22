import Cookies from "js-cookie";

// Set Cookie
export const setCookie = (name: string, value: string, days?: number) => {
	Cookies.set(name, value, {
		expires: days,
		sameSite: "lax",
	});
};

// Get Cookie
export const getCookie = (name: string) => {
	return Cookies.get(name);
};

// Remove Cookie
export const removeCookie = (name: string) => {
	Cookies.remove(name);
};

// Constants
export const cookie = "7fKq9zT_vL2xP0a";

// Is Logged In
export const isLoggedIn = (): boolean => {
	const cookieValue = getCookie("coretuim");
	return cookieValue === cookie;
};
