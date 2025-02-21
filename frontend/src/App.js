import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

const App = () => {

	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const user = localStorage.getItem("userName");
		if(user){
			setAuth(user);
		}
	},[]);

	return(
		<>
			<Header auth={auth} setAuth={setAuth} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login auth={auth} setAuth={setAuth} />} />
				<Route path="/register" element={<Register auth={auth} setAuth={setAuth} />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</>
	);
};

export default App;