import React from 'react';
import './App.css';
import Labs from "./Labs";

export default function App() {
  return (
    <div>
      <h1>Welcome to CS5610 Fall - Kanbas Web App Dev</h1>
      <h2>Chieh-Yu (Joyce) Chen</h2>
      <ul>
        <li><a href="#Labs">Labs</a></li>
        <ul>
          <li><a href="#lab1">Lab 1</a></li>
          <li><a href="#lab2">Lab 2</a></li>
          <li><a href="#lab3">Lab 3</a></li>
        </ul>
        <li><a href="#Kanbas">Kanbas</a></li>
        <li><a href="#Github">GitHub</a></li>
      </ul>
    </div>
  );
}