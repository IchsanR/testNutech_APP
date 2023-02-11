import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../../components";
import {
	deleteItem,
	getSearchItems,
	updateItem,
} from "../../redux/action/items";
import style from "./style.module.css";

const Search = () => {
	const [search, setSearch] = useState("");
	const [queryParam] = useSearchParams();
	const namaBarang = queryParam.get("namabarang");
	const token = localStorage.getItem("token");
	const userId = localStorage.getItem("user");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState("asc");
	const [image, setImage] = useState(null);
	const defaultPage = 1;
	const defaultSort = "asc";

	const items = useSelector((state) => {
		return state.items;
	});

	useEffect(() => {
		dispatch(getSearchItems(namaBarang, page, sort));
	}, [namaBarang, page, sort]);

	const prevPage = () => {
		if (page > 1) {
			setPage(page - 1);
			getSearchItems(namaBarang, page - 1, sort);
		}
	};

	const nextPage = () => {
		setPage(page + 1);
		getSearchItems(namaBarang, page + 1, sort);
	};

	const sorting = () => {
		sort === "asc" ? setSort("desc") : setSort("asc");
		getSearchItems(namaBarang, page, sort);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		const handleSuccess = () => {
			return navigate(`/search?namabarang=${search}`);
		};
		getSearchItems(search, defaultPage, defaultSort, handleSuccess);
	};

	const [delItems, setDElItems] = useState([]);
	const handleDelete = (id_barang, iduser, name, e) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			const posts = delItems.filter((item) => item.id_barang !== id_barang);
			setDElItems({ data: posts });
			alert(response.data.message);
			window.location.href = window.location.href;
		};
		if (iduser !== userId) {
			alert(
				"Tidak bisa dihapus\nBarang ini dinput oleh " +
					name +
					"\nSilahkan hapus barang yang diinput sendiri"
			);
		} else {
			deleteItem(id_barang, handleSuccess);
		}
	};

	const [formUpdate, setFormUpdate] = useState({
		nama_barang: null,
		harga_barang: 0,
		harga_jual: 0,
		stok: 0,
	});

	const updateImage = (event) => {
		const fileUploaded = event.target.files[0];
		document.getElementById("updateFotoBarang").innerHTML = fileUploaded.name;
		setImage(fileUploaded);
	};

	const handleUpdate = (id_barang, e) => {
		console.log(image);
		e.preventDefault();
		const handleSuccess = (response) => {
			console.log(response);
			// window.location.href = window.location.href;
			alert(response.data.message);
		};
		let inputForm = new FormData();
		inputForm.append("nama_barang", formUpdate.nama_barang);
		inputForm.append("foto_barang", image);
		inputForm.append("harga_barang", formUpdate.harga_barang);
		inputForm.append("harga_jual", formUpdate.harga_jual);
		inputForm.append("stok", formUpdate.stok);

		updateItem(id_barang, inputForm, token, handleSuccess);
	};
	return (
		<Fragment>
			<Navbar />
			<div className="container-fluid row mt-5">
				<h4 className="text-center">Showing Results for: {namaBarang}</h4>
				<form onSubmit={(e) => handleSearch(e)}>
					<div className="d-flex">
						<input
							type="text"
							className="col-12 col-md-5 mx-auto rounded border border-secondary"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</form>
				<div className="my-3 row">
					{items.isLoading === true ? (
						<></>
					) : items.data.data.length === 0 ? (
						<div className="text-center">
							<h1>No Items Found</h1>
						</div>
					) : (
						items.data.data.map((item, index) => {
							return (
								<div key={index}>
									<div
										className={`d-flex border border-secondary col-md-7 mx-auto p-1`}>
										<div className="me-3">
											<img
												src={item.foto_barang}
												alt="Foto barang"
												className={`${style.itemImage}`}
											/>
										</div>
										<div className="d-block me-5">
											<p className="fs-3">{item.nama_barang}</p>
											<p className="text-dark">Input by: {item.name}</p>
										</div>
										<div className="d-block me-5">
											<p className="text-dark">
												Item price: {item.harga_barang}
											</p>
											<p className="text-dark">
												Selling price: {item.harga_jual}
											</p>
											<p className="text-dark">Stock: {item.stok}</p>
										</div>
										<div className="ms-auto my-auto">
											<div className="d-flex flex-row-reverse mb-3">
												<button
													type="button"
													className={`${style.itemButtons} rounded bg-secondary`}
													data-bs-toggle="modal"
													data-bs-target="#updateItem">
													Update Item
												</button>
												<div
													className="modal fade"
													id="updateItem"
													tabIndex="-1"
													aria-labelledby="updateModal"
													aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1
																	className="modal-title fs-5"
																	id="updateModal">
																	Update Item
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<form
																onSubmit={(e) =>
																	handleUpdate(item.id_barang, e)
																}>
																<div className="modal-body">
																	<h1
																		className="modal-title fs-5 text-danger"
																		id="warning">
																		Harap isi semua form atau akan error
																	</h1>
																	<div className="mb-3">
																		<label
																			htmlFor="namaBarang"
																			className="form-label">
																			Nama Barang
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			id="namaBarang"
																			onChange={(e) =>
																				setFormUpdate({
																					...formUpdate,
																					nama_barang: e.target.value,
																				})
																			}
																		/>
																	</div>
																	<div className="mb-3">
																		<label
																			htmlFor="updateFotoBarang"
																			className="form-label">
																			Foto Barang
																		</label>
																		<input
																			className="form-control"
																			type="file"
																			id="updateFotoBarang"
																			onChange={updateImage}
																		/>
																	</div>
																	<div className="mb-3">
																		<label
																			htmlFor="hargaBarang"
																			className="form-label">
																			Harga Barang
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			id="hargaBarang"
																			onChange={(e) =>
																				setFormUpdate({
																					...formUpdate,
																					harga_barang: parseInt(
																						e.target.value
																					),
																				})
																			}
																		/>
																	</div>
																	<div className="mb-3">
																		<label
																			htmlFor="hargaJual"
																			className="form-label">
																			Harga Jual
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			id="hargaJual"
																			onChange={(e) =>
																				setFormUpdate({
																					...formUpdate,
																					harga_jual: parseInt(e.target.value),
																				})
																			}
																		/>
																	</div>
																	<div className="mb-3">
																		<label
																			htmlFor="stok"
																			className="form-label">
																			Stok
																		</label>
																		<input
																			type="text"
																			className="form-control"
																			id="stok"
																			onChange={(e) =>
																				setFormUpdate({
																					...formUpdate,
																					stok: parseInt(e.target.value),
																				})
																			}
																		/>
																	</div>
																</div>
																<div className="modal-footer">
																	<button
																		type="button"
																		className="btn btn-secondary"
																		data-bs-dismiss="modal">
																		Close
																	</button>
																	<button
																		type="submit"
																		className="btn btn-primary">
																		Update Items
																	</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
											<div>
												<button
													type="button"
													data-bs-toggle="modal"
													data-bs-target="#deleteItems"
													className={`${style.itemButtons} rounded bg-danger`}>
													Delete
												</button>
												<div
													className="modal fade"
													id="deleteItems"
													tabIndex="-1"
													aria-labelledby="itemDelete"
													aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1
																	className="modal-title fs-5"
																	id="itemDelete">
																	Delete Items?
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body">
																Do you want to delete this item?
															</div>
															<div className="modal-footer">
																<button
																	type="button"
																	className="btn btn-secondary"
																	data-bs-dismiss="modal">
																	No
																</button>
																<button
																	type="button"
																	className="btn btn-danger"
																	onClick={(e) =>
																		handleDelete(
																			item.id_barang,
																			item.iduser,
																			item.name,
																			e
																		)
																	}>
																	Delete Items
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
				<div className="d-flex justify-content-center mt-4">
					<nav aria-label="Page navigation example">
						<ul className="pagination">
							<li className="page-item">
								<button
									className="page-link"
									onClick={() => prevPage()}>
									Previous
								</button>
							</li>
							<li className="page-item">
								<button className="page-link">{page}</button>
							</li>
							<li
								className="page-item"
								disabled={items.data.data <= 0}>
								<button
									className="page-link"
									disabled={items.data.data <= 0}
									onClick={() => nextPage()}>
									Next
								</button>
							</li>
							<li className="page-item">
								<button
									className="page-link"
									aria-label="Next"
									onClick={() => sorting()}>
									<span aria-hidden="true">sort</span>
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</Fragment>
	);
};

export default Search;
