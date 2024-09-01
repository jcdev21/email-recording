import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Cookies from 'js-cookie';
// import { UserType } from '@/contexts/authentication';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getAccessTokenCookie(): string | undefined {
	return Cookies.get('access-token');
}

export function setAccessTokenCookie(token: string): void {
	Cookies.set('access-token', token, { expires: 7 });
}

export function getUserCookie(): any | undefined {
	const user = Cookies.get('user-verified');

	if (!user) return undefined;

	return JSON.parse(user);
}

export function setUserCookie(user: any): void {
	const userStr = JSON.stringify(user);
	Cookies.set('user-verified', userStr, { expires: 7 });
}

export function deleteAuthCookies(): void {
	Cookies.remove('access-token');
	Cookies.remove('user-verified');
}
