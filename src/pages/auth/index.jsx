import React, { Fragment, useState } from "react";
import style from "./style.module.css";
import { Login, Register } from "../../components";

const Auth = () => {
	const [activeTabs, setActiveTabs] = useState(1);

	return (
		<Fragment>
			<div className="container-fluid row vh-100">
				<div className="d-flex mb-3">
					<div className="mx-auto mt-auto text-center">
						<h2>Hello User</h2>
						{activeTabs === 1 ? (
							<p>Login to your existing account</p>
						) : (
							<p>Register new account!</p>
						)}
					</div>
				</div>
				<div className="d-flex">
					<div className="mx-auto">
						<button
							className={
								activeTabs === 1
									? `${style.authButtonActive}`
									: `${style.authButton}`
							}
							onClick={() => setActiveTabs(1)}>
							Login
						</button>
						<button
							className={
								activeTabs === 2
									? `${style.authButtonActive}`
									: `${style.authButton}`
							}
							onClick={() => setActiveTabs(2)}>
							Register
						</button>
						<div className="mt-3">
							{activeTabs === 1 ? <Login /> : <Register />}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Auth;
