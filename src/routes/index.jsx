import React from "react";
import {
	BrowserRouter,
	Route,
	Navigate,
	Routes,
	Outlet,
} from "react-router-dom";
import Auth from "../pages/auth";
import Home from "../pages/home";
import Search from "../pages/search";

const PrivateRoute = () => {
	const token = localStorage.getItem("token");
	if (token) {
		return <Outlet />;
	} else {
		return <Navigate to="/" />;
	}
};

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route
						index
						element={<Auth />}
					/>
					<Route
						path="home"
						element={<PrivateRoute />}>
						<Route
							index
							element={<Home />}
						/>
					</Route>
					<Route
						path="search"
						element={<PrivateRoute />}>
						<Route
							index
							element={<Search />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
