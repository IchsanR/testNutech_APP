import axios from "axios";

export const registerUser = (form, handleSuccess) => {
	return {
		type: "REGISTER_USER",
		payload: new Promise((resolve, reject) => {
			axios
				.post(
					`${process.env.REACT_APP_BACKEND_URL}/register`,
					form,
					handleSuccess
				)
				.then((response) => {
					handleSuccess(response);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		}),
	};
};

export const loginUser = (form, handleSuccess) => {
	return {
		type: "LOGIN_USER",
		payload: new Promise((resolve, reject) => {
			axios
				.post(`${process.env.REACT_APP_BACKEND_URL}/login`, form, handleSuccess)
				.then((response) => {
					handleSuccess(response);
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		}),
	};
};
