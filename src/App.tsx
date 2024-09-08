import React from 'react';
import './App.css';
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

      <div id="wd-images">
      <h4>Image tag</h4>
      Loading an image from the internet:
      <br />
      <img id="wd-starship"
        width="400px"
      src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
      />
      <br />
      Loading a local image:
      <br />
      <img id="wd-1975albumn" src="images/The-1975.jpg" width="400px" />
    </div>

    <div id="wd-forms">
    <h4>Form Elements</h4>
    <form id="wd-text-fields">
    <h5>Text Fields</h5>
    <label htmlFor="wd-text-fields-username">Username:</label>
    <input id="wd-text-fields-username" placeholder="jdoe" /> <br />
    <label htmlFor="wd-text-fields-password">Password:</label>
    <input type="password" id="wd-text-fields-password" value="123@#$asd" />
    <br />
    <label htmlFor="wd-text-fields-first-name">First name:</label>
    <input type="text" id="wd-text-fields-first-name" title="John" /> <br />
    <label htmlFor="wd-text-fields-last-name">Last name:</label>
    <input type="text" id="wd-text-fields-last-name" placeholder="Doe"
      value="Wonderland" title="The last name" />
    {/* copy rest of form elements here  */}
    <h5>Text boxes</h5>
<label>Biography:</label><br/>
<textarea id="wd-textarea" cols={30} rows={10}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
  </form>
</div>



    </div>

    

  );
}