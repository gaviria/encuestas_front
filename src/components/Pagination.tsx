import { Link } from "react-router-dom";

interface IPagination {
	items: number;
	actualPage: number;
	totalPages: number;
	pageLimit: number;
}
const Pagination = ({
	items,
	actualPage,
	totalPages,
	pageLimit,
}: IPagination) => {
	return (
		<nav
			className="d-flex flex-column align-items-center justify-content-center"
			aria-label="..."
		>
			<div className="small">Total Items: {items}</div>
			<ul className="pagination">
				{Array.from({ length: totalPages }, (_, i) => (
					<li key={i + 1} className="page-item">
						<Link className="page-link" to={`/lista/${i + 1}`}>
							{i + 1}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
