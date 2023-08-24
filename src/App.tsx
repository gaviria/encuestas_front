import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import { List } from "./components/List";
import NavBar from "./components/NavBar";
import Encuesta from "./components/Encuesta";

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/lista" element={<List />} />
				<Route path="/encuesta" element={<Encuesta />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
