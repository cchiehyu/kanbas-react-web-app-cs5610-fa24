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
      alt=""/>
      <br />
      Loading a local image:
      <br />
      <img id="wd-1975albumn" src="images/The-1975.jpg" width="400px" alt="The 1975 Album Cover" />
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

    <h5 id="wd-buttons">Buttons</h5>
    <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">
      Hello World!
    </button>

    <h5>File upload</h5>
    <input id="wd-upload" type="file"/>

    <h5 id="wd-radio-buttons">Radio buttons</h5>
    <label>Favorite music genre:</label><br />

    <input type="radio" name="radio-genre" id="wd-radio-classical"/>
    <label htmlFor="wd-radio-classical">Classical Music</label><br />

    <input type="radio" name="radio-genre" id="wd-radio-kpop"/>
    <label htmlFor="wd-radio-kpop">Kpop</label><br />

    <input type="radio" name="radio-genre" id="wd-radio-band"/>
    <label htmlFor="wd-radio-band">Band in Pop</label><br />

    <input type="radio" name="radio-genre" id="wd-radio-rock"/>
    <label htmlFor="wd-radio-rock">Rock</label>

    <h5 id="wd-checkboxes">Checkboxes</h5>
    <label>Favorite movie genre:</label><br/>

    <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
    <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>

    <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
    <label htmlFor="wd-chkbox-drama">Drama</label><br/>

    <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
    <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>

    <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
    <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
    
    <h4 id="wd-dropdowns">Dropdowns</h4>
    <h5>Select one</h5>
    <label htmlFor="wd-select-one-genre"> Favorite music genre: </label><br/>
    <select id="wd-select-one-genre">
      <option value="CLASSI">Classical Music</option>
      <option value="KPOP">Kpop</option>
      <option selected value="ROCK">
          Rock</option>
      <option value="BAND">Band in Pop</option>
    </select>

    <h5>Select many</h5>
    <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
    <select id="wd-select-many-genre" multiple>
      <option selected value="COMEDY">Comedy</option>
      <option value="DRAMA">Drama</option>
      <option selected value="SCIFI">
          Science Fiction</option>
      <option value="FANTASY">Fantasy</option>
    </select>
    
    <h4>Other HTML field types</h4>

  <label htmlFor="wd-text-fields-email"> Email: </label>
  <input type="email"
        placeholder="jdoe@somewhere.com"
        id="wd-text-fields-email"/><br/>

  <label htmlFor="wd-text-fields-salary-start"> Starting salary:
  </label>
  <input type="number"
        id="wd-text-fields-salary-start"
        placeholder="1000"
        value="100000"/><br/>

  <label htmlFor="wd-text-fields-rating"> Rating: </label>
  <input type="range" id="wd-text-fields-rating"
        placeholder="Doe"
        max="5"
        value="4"/><br/>

  <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
  <input type="date"
        id="wd-text-fields-dob"
        value="2000-01-21"/><br/>

    <h4>Anchor tag</h4>
    Please
    <a id="wd-lipsum" href="https://www.lipsum.com">click here</a>
    to get dummy text<br/>
    </div>
  );
}