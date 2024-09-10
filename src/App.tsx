import React from 'react';
import './App.css';
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate  } from "react-router-dom";

export default function App() {
  return (
      <div>
        {/* Main heading and subheading */}
        <h1>Welcome to CS5610 Fall - Kanbas Web App Dev</h1>
        <h2>Chieh-Yu (Joyce) Chen</h2>

        {/* Navigation Links */}
        {/* <ul>
          <li><a href="#Labs">Labs</a></li>
          <ul>
            <li><a href="#lab1">Lab 1</a></li>
            <li><a href="#lab2">Lab 2</a></li>
            <li><a href="#lab3">Lab 3</a></li>
          </ul>

          <li>
            <a 
              href="https://www.linkedin.com/in/joyce-chen-1686b3199/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn -- Click Me!
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/cchiehyu/kanbas-react-web-app-cs5610-fa24" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub -- Click Me!
            </a>
          </li>
        </ul> */}

          {/* Lab Components */}
          <HashRouter>
          <div>
          <Routes>
            <Route path="/" element={<Navigate to="Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
            
            
          </Routes>
          </div>
        </HashRouter>
        
        {/* Placeholder for other sections */}


      <h4>Anchor tag</h4>
      <a id="wd-linkedin"  href="https://www.linkedin.com/in/joyce-chen-1686b3199/"> Linkedin </a>
      to my Linkedin<br/>
      <a id="wd-github"  href="https://github.com/cchiehyu/kanbas-react-web-app-cs5610-fa24"> Github </a>
      to my Github<br/>
      </div>
  );
}
