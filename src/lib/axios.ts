import Axios, { InternalAxiosRequestConfig } from 'axios';
import {
	deleteAuthCookies,
	getAccessTokenCookie,
	setAccessTokenCookie,
	setUserCookie,
} from '@/lib/utils';
import { API_URL } from '@/constans';

function authRequestInterceptor(
	config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
	const token = getAccessTokenCookie();

	if (token) {
		config.headers.authorization = `Bearer ${token}`;
	}

	config.headers.Accept = 'application/json';
	config.withCredentials = true;

	return config;
}

export const axios = Axios.create({ baseURL: API_URL });

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		// console.log('error', error);
		// const message = error.response?.data?.message || error.message;
		// console.log('message', message);

		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			error.response.data?.message === 'refresh-token' &&
			!originalRequest._retry
		) {
			const accessToken = error.response?.data?.data?.accessToken;
			const user = error.response?.data?.data?.user;
			setAccessTokenCookie(accessToken);
			setUserCookie(user);

			originalRequest._retry = true;
			Axios.defaults.headers.common[
				'authorization'
			] = `Bearer ${accessToken}`;
			return axios(originalRequest);
		}

		if (
			error.response.status === 403 &&
			error.response.data?.message === 'Invalid refresh token'
		) {
			deleteAuthCookies();
			return window.location.replace('/login');
		}

		if (
			error.response.status === 401 &&
			error.response.data?.message === 'Refresh token not exists'
		) {
			deleteAuthCookies();
			return window.location.replace('/login');
		}

		return Promise.reject(error);
	}
);
