import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Auth(props) {
	const navigate = useNavigate();
	const [authMode, setAuthMode] = useState("signin");
	const [datos, setDatos] = useState({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	const changeAuthMode = () => {
		setAuthMode(authMode === "signin" ? "signup" : "signin");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newDatos = { ...datos, [name]: value };
		setDatos(newDatos);
	};

	const handleSubmit = async (
		mode: string,
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		const patch =
			mode === "signin"
				? "http://localhost:3333/api/v1/login"
				: "http://localhost:3333/api/v1/signup";

		await axios
			.post(patch, datos)
			.then((res) => {
				const token = res.data.token.token;
				localStorage.setItem("token", token);
				console.log(res.data.token.token);
				navigate("/lista");
			})
			.catch((err) => {
				console.log(err.response.data[0].message);
			});
	};

	if (authMode === "signin") {
		return (
			<div className="Auth-form-container">
				<form
					onSubmit={(e) => handleSubmit("signin", e)}
					className="Auth-form"
				>
					<div className="Auth-form-content">
						<h3 className="Auth-form-title">Sign In</h3>
						<div className="text-center">
							No estas registrado?{" "}
							<span
								className="link-primary"
								onClick={changeAuthMode}
							>
								Sign Up
							</span>
						</div>
						<div className="form-group mt-3">
							<label>Email address</label>
							<input
								type="email"
								className="form-control mt-1"
								placeholder="Enter email"
								onChange={(e) =>
									setDatos({
										...datos,
										email: e.target.value,
									})
								}
								value={datos.email}
								required
								minLength={7}
							/>
						</div>
						<div className="form-group mt-3">
							<label>Password</label>
							<input
								type="password"
								className="form-control mt-1"
								placeholder="Enter password"
								onChange={(e) =>
									setDatos({
										...datos,
										password: e.target.value,
									})
								}
								value={datos.password}
								required
								minLength={6}
							/>
						</div>
						<div className="d-grid gap-2 mt-3">
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}

	return (
		<div className="Auth-form-container">
			<form
				onSubmit={(e) => handleSubmit("signup", e)}
				className="Auth-form"
			>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign Up</h3>
					<div className="text-center">
						Ya estas registrado?{" "}
						<span className="link-primary" onClick={changeAuthMode}>
							Sign In
						</span>
					</div>
					<div className="form-group mt-3">
						<label>Email</label>
						<input
							type="email"
							className="form-control mt-1"
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							className="form-control mt-1"
							placeholder="Password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Enviar
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Auth;
