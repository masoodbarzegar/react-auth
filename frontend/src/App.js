import React from "react";
import Navbar from './components/Navbar';
import AppRoutes from './routes';
import './App.css';


import { useSelector } from 'react-redux';


const App = () => {
	const authState = useSelector((state) => state.auth);

	return(
		<>
			<Navbar />
			<AppRoutes />
		</>
	);
};

export default App;