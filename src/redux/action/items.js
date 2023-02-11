import axios from "axios";

export const getAllItems = (page, sortOrder) => {
	return {
		type: "GET_ALL_ITEMS",
		payload: new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.REACT_APP_BACKEND_URL}/items?sortOrder=${sortOrder}&page=${page}`
				)
				.then((response) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		}),
	};
};

export const getSearchItems = (nama_barang, page, sortOrder, handleSuccess) => {
	return {
		type: "GET_SEARCH_ITEMS",
		payload: new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.REACT_APP_BACKEND_URL}/search/items?namabarang=${nama_barang}&page=${page}&sortOrder=${sortOrder}`
				)
				.then((response) => {
					resolve(response);
					handleSuccess();
				})
				.catch((error) => {
					reject(error);
				});
		}),
	};
};

export const addItems = (form, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/additems`, form, {
				headers: {
					Token: token,
				},
			})
			.then((response) => {
				resolve(response);
				handleSuccess(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const updateItem = (id_barang, form, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_BACKEND_URL}/updateitems/${id_barang}`,
				form,
				{
					headers: {
						Token: token,
					},
				}
			)
			.then((response) => {
				resolve(response);
				handleSuccess(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const updateImageItem = (id_barang, form, token, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.put(
				`${process.env.REACT_APP_BACKEND_URL}/updateimages/${id_barang}`,
				form,
				{
					headers: {
						Token: token,
					},
				}
			)
			.then((response) => {
				resolve(response);
				handleSuccess(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export const deleteItem = (id_barang, handleSuccess) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteitems/${id_barang}`)
			.then((response) => {
				resolve(response);
				handleSuccess(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
