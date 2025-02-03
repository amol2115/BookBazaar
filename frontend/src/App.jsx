import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    );
}

export default App;
