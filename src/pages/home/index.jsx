import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import {
	addItems,
	deleteItem,
	getAllItems,
	getSearchItems,
	updateImageItem,
	updateItem,
} from "../../redux/action/items";
import style from "./style.module.css";

const Home = () => {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const userId = localStorage.getItem("user");
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [addImage, setAddImage] = useState();
	const [image, setImage] = useState(null);
	const [page, setPage] = useState(1);
	const [sort, setSort] = useState("asc");
	const [delItems, setDElItems] = useState([]);
	const defaultPage = 1;
	const defaultSort = "asc";

	const items = useSelector((state) => {
		return state.items;
	});

	// Get all items
	useEffect(() => {
		dispatch(getAllItems(page, sort));
	}, [dispatch, page, sort]);

	// Search items
	const handleSearch = (e) => {
		e.preventDefault();
		const handleSuccess = () => {
			return navigate(`/search?namabarang=${search}`);
		};
		getSearchItems(search, defaultPage, defaultSort, handleSuccess);
	};

	// Pagination and sorting
	const prevPage = () => {
		if (page > 1) {
			setPage(page - 1);
			getAllItems(page - 1, sort);
		}
	};

	const nextPage = () => {
		setPage(page + 1);
		getAllItems(page + 1, sort);
	};

	const sorting = () => {
		sort === "asc" ? setSort("desc") : setSort("asc");
		getAllItems(page, sort);
	};

	// Add items
	const [form, setForm] = useState({
		nama_barang: "",
		harga_barang: 0,
		harga_jual: 0,
		stok: 0,
	});

	const handleChange = (event) => {
		const fileUploaded = event.target.files[0];
		document.getElementById("fotoBarang").innerHTML = fileUploaded.name;
		setAddImage(fileUploaded);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const handleSuccess = (response) => {
			dispatch(getAllItems(page, sort));
			alert(response.data.message);
		};
		let inputForm = new FormData();
		inputForm.append("nama_barang", form.nama_barang);
		inputForm.append("foto_barang", addImage);
		inputForm.append("harga_barang", form.harga_barang);
		inputForm.append("harga_jual", form.harga_jual);
		inputForm.append("stok", form.stok);

		addItems(inputForm, token, handleSuccess);
	};

	// Delete items

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

	// update items
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
			window.location.href = window.location.href;
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
			<div className="container-fluid row">
				<div className="my-3">
					<h3>Welcome user!</h3>
				</div>
				<h4 className="text-center">Search items</h4>
				<form onSubmit={(e) => handleSearch(e)}>
					<div className="d-flex">
						<input
							type="text"
							className="col-12 col-md-5 mx-auto rounded border border-secondary"
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</form>
				<div className="d-flex flex-row-reverse">
					<button
						type="button"
						className="btn btn-secondary"
						data-bs-toggle="modal"
						data-bs-target="#addItems">
						Add Items
					</button>
					<div
						className="modal fade"
						id="addItems"
						tabIndex="-1"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1
										className="modal-title fs-5"
										id="exampleModalLabel">
										Add Items
									</h1>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div>
								<form onSubmit={(e) => handleSubmit(e)}>
									<div className="modal-body">
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
													setForm({ ...form, nama_barang: e.target.value })
												}
											/>
										</div>
										<div className="mb-3">
											<label
												htmlFor="fotoBarang"
												className="form-label">
												Foto Barang
											</label>
											<input
												className="form-control"
												type="file"
												id="fotoBarang"
												onChange={handleChange}
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
													setForm({
														...form,
														harga_barang: parseInt(e.target.value),
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
													setForm({
														...form,
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
													setForm({ ...form, stok: parseInt(e.target.value) })
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
											Add Items
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
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
										className={`d-flex border border-secondary col-md-7 mx-auto p-1 ${style.links}`}>
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
																	<div className="mb-3">
																		<h1
																			className="modal-title fs-5 text-danger"
																			id="warning">
																			Harap isi semua form atau akan error
																		</h1>
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

export default Home;
