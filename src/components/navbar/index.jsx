import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.clear();
		return navigate("/");
	};

	return (
		<nav className="navbar navbar-expand-lg bg-light">
			<div className="container-fluid">
				<div className="navbar-brand">Hi, User</div>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								className="nav-link active"
								aria-current="page"
								to="/home">
								Home
							</Link>
						</li>
					</ul>
					<div className="d-flex">
						<div className="nav-item dropdown">
							<div
								className="nav-link dropdown-toggle"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Menu
							</div>
							<ul className="dropdown-menu dropdown-menu-end">
								<li>
									<Link
										className="dropdown-item"
										to="/"
										onClick={() => onLogout()}>
										Logout
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
