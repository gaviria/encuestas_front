import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const List = () => {
	const [listEncuestas, setListEncuestas] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const token = localStorage.getItem("token");

		axios
			.get("http://localhost:3333/api/v1/encuestas/1", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				console.log(res.data);
				setListEncuestas(res.data.data);
				setData(res.data);
			})
			.catch((err) => {
				console.log(err.response.data[0].message);
			});
	}, []);

	const handleEditItem = () => {};

	const handleDeleteItem = () => {};

	return (
		<table className="table table-hover">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Id CLiente</th>
					<th scope="col">Modelo Automovil</th>
					<th scope="col">Calificacion de Manejo</th>
					<th scope="col">Calificacion de Satisfaccion</th>
					<th scope="col">opciones</th>
				</tr>
			</thead>
			<tbody>
				{listEncuestas.map((item) => (
					<tr key={item.id}>
						<td>{item.id}</td>
						<td>{item.identificacion_cliente}</td>
						<td>{item.modelo_automovil}</td>
						<td>{item.calificacion_prueba}</td>
						<td>{item.calificacion_satisfaccion}</td>
						<td>
							<button
								onClick={handleEditItem}
								type="button"
								className="btn btn-warning"
							>
								Editar
							</button>
							<button
								onClick={handleDeleteItem}
								type="button"
								className="btn btn-danger btn-sm"
							>
								eliminar
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
