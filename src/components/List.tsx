import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";

export const List = () => {
	const navigate = useNavigate();
	const { page } = useParams();
	const [listEncuestas, setListEncuestas] = useState([]);
	const [data, setData] = useState([{}]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/");
		}

		axios
			.get(`http://localhost:3333/api/v1/encuestas/${page}`, {
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
				console.log(err.response?.data[0]?.message);
			});
	}, [page]);

	const handleEditItem = () => {};

	const handleDeleteItem = () => {};

	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Id CLiente</th>
						<th scope="col">Modelo Automóvil</th>
						<th scope="col">Calificación de Manejo</th>
						<th scope="col">Calificación de Satisfacción</th>
						<th scope="col">Opciones</th>
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
									className="btn btn-warning btn-sm"
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
			<Pagination
				items={data.total}
				actualPage={data.page}
				totalPages={data.lastPage}
				pageLimit={data.perPage}
			/>
		</>
	);
};
