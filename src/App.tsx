import React from 'react';
import './App.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <div>
      {/* Main heading and subheading */}
      {/* <h1>Welcome to CS5610 Fall - Kanbas Web App Dev</h1>
      <h2>Chieh-Yu (Joyce) Chen</h2> */}

      {/* Router Setup */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
