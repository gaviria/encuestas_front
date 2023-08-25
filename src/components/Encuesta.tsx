import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Encuesta = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		identificacion_cliente: "",
		modelo_automovil: "",
		factores_compra: "",
		calificacion_prueba: "",
		calificacion_satisfaccion: "",
	});

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/");
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				"http://127.0.0.1:3333/api/v1/encuesta",
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				}
			);

			setMessage(response.data.message);

			setFormData({
				identificacion_cliente: "",
				modelo_automovil: "",
				factores_compra: "",
				calificacion_prueba: "",
				calificacion_satisfaccion: "",
			});
		} catch (error: Error | any) {
			setError(error.response.data.error.message);
			console.error(
				"Error al enviar los datos:",
				error.response.data.error.message
			);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<>
			<h1 className="text-center mb-5">Encuesta a Diligenciar</h1>
			{message !== null && error === null && (
				<div className="alert alert-primary" role="alert">
					{message}
				</div>
			)}
			{error !== null && message === null && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
			<form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
				<div className="col-md-6">
					<label
						htmlFor="identificacion_cliente"
						className="form-label"
					>
						Identificación del cliente
					</label>
					<input
						type="text"
						name="identificacion_cliente"
						className="form-control"
						id="identificacion_cliente"
						value={formData.identificacion_cliente}
						required
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="modelo_automovil" className="form-label">
						Modelo del Auto
					</label>
					<input
						type="text"
						className="form-control"
						id="modelo_automovil"
						name="modelo_automovil"
						value={formData.modelo_automovil}
						required
						onChange={(e) => handleChange(e)}
					/>
				</div>
				<div className="col-md-6">
					<label htmlFor="factores_compra" className="form-label">
						Factores de Compra
					</label>
					<select
						id="factores_compra"
						name="factores_compra"
						className="form-select"
						value={formData.factores_compra}
						onChange={(e) => handleChange(e)}
						required
					>
						<option value={"0"}>Elegir</option>
						<option value={"1"}>La reputación de la marca</option>
						<option value={"2"}>
							Las opciones de financiamiento
						</option>
						<option value={"3"}>El desempeño al manejarlo</option>
						<option value={"4"}>
							Recomendaciones de amigos o familiares
						</option>
						<option value={"5"}>otro</option>
					</select>
				</div>
				<div className="col-md-6">
					<label htmlFor="calificacion_prueba" className="form-label">
						Calificación de prueba de manejo
					</label>
					<select
						id="calificacion_prueba"
						name="calificacion_prueba"
						className="form-select"
						value={formData.calificacion_prueba}
						onChange={(e) => handleChange(e)}
						required
					>
						<option value={"0"}>Elegir</option>
						<option value={"1"}>1</option>
						<option value={"2"}>2</option>
						<option value={"3"}>3</option>
						<option value={"4"}>4</option>
						<option value={"5"}>5</option>
					</select>
				</div>
				<div className="col-md-6">
					<label
						htmlFor="calificacion_satisfaccion"
						className="form-label"
					>
						Calificación de satisfacción
					</label>
					<select
						id="calificacion_satisfaccion"
						name="calificacion_satisfaccion"
						className="form-select"
						value={formData.calificacion_satisfaccion}
						onChange={(e) => handleChange(e)}
						required
					>
						<option value={"0"}>Elegir</option>
						<option value={"1"}>1</option>
						<option value={"2"}>2</option>
						<option value={"3"}>3</option>
						<option value={"4"}>4</option>
						<option value={"5"}>5</option>
					</select>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">
						Enviar
					</button>
				</div>
			</form>
		</>
	);
};

export default Encuesta;
