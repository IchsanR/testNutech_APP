import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/action/user";

const Register = () => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		name: "",
		username: "",
		password: "",
	});

	const onSubmit = (e) => {
		e.preventDefault();

		if (form.name === "" || form.username === "" || form.password === "") {
			alert("Please fill all forms");
		} else {
			const handleSuccess = (response) => {
				if (response.code === 200) {
					alert(response.data.message);
				} else {
					alert(response.data.message);
				}
			};

			dispatch(registerUser(form, handleSuccess));
		}
	};

	return (
		<div>
			<form onSubmit={(e) => onSubmit(e)}>
				<div className="mb-3">
					<input
						type="text"
						className="form-control"
						id="name"
						aria-describedby="name"
						placeholder="Name"
						onChange={(e) => setForm({ ...form, name: e.target.value })}
					/>
				</div>
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
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
