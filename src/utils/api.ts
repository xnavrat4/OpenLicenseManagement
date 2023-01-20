/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import {
	ApiControllerName,
	ChangePassword,
	HttpRequest,
	ProfileData,
	UserRegister
} from './types/UtilTypes';

const path = `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

// Sign up handler
export const signUpAsync = async (user: UserRegister) => {
	try {
		const res = await sendRequestAsync('POST', '/identity/register', false, {
			...user
		});
		return res?.data;
	} catch (error) {
		console.error(error);
		const errors = (error as any)?.response?.data?.errors;
		if (errors && Object.values(errors).length > 0) {
			throw Error(Object.values(errors).join('\n'));
		}
		const data = (error as any)?.response?.data;
		if (data) {
			throw Error(data);
		} else {
			throw error;
		}
	}
};

// Sign in handler
export const signInAsync = async (email: string, password: string) => {
	try {
		const res = await sendRequestAsync('POST', '/identity/login', false, {
			email,
			password
		});
		return res?.data;
	} catch (error) {
		console.error(error);
		const data = (error as any)?.response?.data;
		if (data) {
			throw Error(data);
		} else {
			throw error;
		}
	}
};

// Sign out handler
export const signOutAsync = async () => {
	try {
		await sendRequestAsync('POST', '/identity/logout');
	} catch (error) {
		console.error(error);
	}
};

// Update profile handler
export const updateProfile = async (profile: ProfileData) => {
	try {
		const res = await update('Identity/Profile', true, {
			...profile
		});
		return res?.data;
	} catch (error) {
		console.error(error);
		const errors = (error as any)?.response?.data?.errors;
		if (errors && Object.values(errors).length > 0) {
			throw Error(Object.values(errors).join('\n'));
		}
		const data = (error as any)?.response?.data;
		if (data) {
			throw Error(data);
		} else {
			throw error;
		}
	}
};

// Change password handler
export const changePassword = async (changePasswordBody: ChangePassword) => {
	try {
		const res = await update('Identity/Profile/Password', true, {
			...changePasswordBody
		});
		return res;
	} catch (error) {
		console.error(error);
		const errors = (error as any)?.response?.data?.errors;
		if (errors && Object.values(errors).length > 0) {
			throw Error(Object.values(errors).join('\n'));
		}
		const data = (error as any)?.response?.data;
		if (data) {
			throw Error(data);
		} else {
			throw error;
		}
	}
};

export const getById = async (
	id: number,
	collection: ApiControllerName,
	authRequired: boolean
) => {
	const res = await sendRequestAsync(
		'GET',
		`/${collection}/${id}`,
		authRequired
	);
	return res?.data;
};

export const get = async (
	collection: ApiControllerName,
	authRequired: boolean
) => {
	const res = await sendRequestAsync('GET', `/${collection}`, authRequired);
	return res?.data;
};

export const getAllFilter = async (
	collection: ApiControllerName,
	authRequired: boolean,
	queryParams: string
) => {
	const res = await sendRequestAsync(
		'GET',
		`/${collection}?${queryParams}`,
		authRequired
	);
	return res?.data;
};

export const update = async (
	collection: ApiControllerName,
	authRequired: boolean,
	body = {}
) => await sendRequestAsync('PUT', `/${collection}`, authRequired, body);

export const updateRole = async (
	email: string,
	collection: ApiControllerName,
	authRequired: boolean
) => await sendRequestAsync('PUT', `/${collection}/${email}`, authRequired);

export const updateById = async (
	id: number,
	collection: ApiControllerName,
	authRequired: boolean,
	body = {}
) => {
	const res = await sendRequestAsync(
		'PUT',
		`/${collection}/${id}`,
		authRequired,
		body
	);
	return res?.data;
};

export const create = async (
	collection: ApiControllerName,
	authRequired: boolean,
	body = {}
) => await sendRequestAsync('POST', `/${collection}`, authRequired, body);

export const deleteById = async (
	id: number,
	collection: ApiControllerName,
	authRequired: boolean
) => {
	const res = await sendRequestAsync(
		'DELETE',
		`/${collection}/${id}`,
		authRequired
	);
	return res?.data;
};

const sendRequestAsync = async (
	type: HttpRequest,
	url: string,
	withToken = true,
	body = {}
) => {
	if (withToken) {
		const token = localStorage.getItem('authToken');
		setAuthToken(token);
	}

	switch (type) {
		case 'GET':
			return await axios.get(path + url);
		case 'POST':
			return await axios.post(path + url, body);
		case 'PUT':
			return await axios.put(path + url, body);
		case 'DELETE':
			return await axios.delete(path + url);
		default:
			return;
	}
};

const setAuthToken = (token: string | null) => {
	if (token) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	} else delete axios.defaults.headers.common.Authorization;
};
