import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/action/user";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		username: "",
		password: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();

		const handleSuccess = (response) => {
			if (response.data.code === 200) {
				localStorage.setItem("token", response.data.data.token);
				localStorage.setItem("user", response.data.data.data.id_user);
				alert(response.data.message);
				return navigate("home");
			} else {
				alert(response.data.message);
			}
		};

		dispatch(loginUser(form, handleSuccess));
	};

	return (
		<div>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className="mb-3">
					<input
						type="text"
						className="form-control"
						id="username"
						aria-describedby="username"
						placeholder="Username"
						onChange={(e) => setForm({ ...form, username: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<input
						type="password"
						className="form-control"
						id="exampleInputPassword1"
						placeholder="Password"
						onChange={(e) => setForm({ ...form, password: e.target.value })}
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary col-12">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
