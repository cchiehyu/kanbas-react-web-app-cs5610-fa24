import React from 'react';
import './App.css';
import Labs from "./Labs";
import Lab1 from './Labs/Lab1';

export default function App() {
  return (
    <div>
      {/* Main heading and subheading */}
      <h1>Welcome to CS5610 Fall - Kanbas Web App Dev</h1>
      <h2>Chieh-Yu (Joyce) Chen</h2>

      {/* Navigation Links */}
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

      {/* Lab Components */}
      <div id="labs">
        <Lab1 />
      </div>
      
      {/* Placeholder for other sections */}
      <div id="kanbas">
        <h3>Kanbas</h3>
        <p>This is the Kanbas section.</p>
      </div>

      <div id="github">
        <h3>GitHub</h3>
        <p>This is the GitHub section.</p>
      </div>
    </div>


  );
}