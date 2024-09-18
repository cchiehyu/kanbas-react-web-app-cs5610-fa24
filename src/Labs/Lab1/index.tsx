import React from 'react';
export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1 - DEV ENV + HTML</h2>
      <h3>HTML Examples</h3>

      {/* Heading Tags Section */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        <p>
          Text documents are often broken up into several sections and subsections. Each section is usually prefaced with a short title or heading that attempts to summarize the topic of the section it precedes.
        </p>
        <p>
          For instance, this paragraph is preceded by the heading "Heading Tags".
        </p>
        <p>
          The font of section headings is usually larger and bolder than their subsection headings. This document uses headings to introduce topics such as HTML Documents, HTML Tags, and Heading Tags.
        </p>
        <p>
          HTML heading tags can be used to format plain text so that it renders in a browser as large headings. There are six heading tags for different sizes: <strong>h1</strong>, <strong>h2</strong>, <strong>h3</strong>, <strong>h4</strong>, <strong>h5</strong>, and <strong>h6</strong>. Tag <strong>h1</strong> is the largest heading, and <strong>h6</strong> is the smallest heading.
        </p>
      </div>

      {/* Paragraph Tags Section */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is a paragraph. Text is often separated by vertical spaces to make it easier to read. Browsers, by default, ignore vertical white spaces and render all the text as one single block. To force the browser to recognize and create vertical spacing, the <strong>&lt;p&gt;</strong> tag is used to wrap individual paragraphs.
        </p>
        <p id="wd-p-2">
          This is the second paragraph. Even though there may be visual white space between this paragraph and the one above it in the code, browsers treat them as contiguous blocks unless the paragraphs are wrapped with <strong>&lt;p&gt;</strong> tags.
        </p>
        <p id="wd-p-3">
          This is the third paragraph. Using the <strong>&lt;p&gt;</strong> tag ensures that the browser adds proper vertical spacing between blocks of text.
        </p>
      </div>


      {/* Ordered List Elements Section */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        <p>How to make pancakes:</p>
        <ol>
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>
        <h5>Unordered List Tag</h5>
        <p>My Favorite Songs && Artists(in no particular order) -- Linked to Youtube!</p>
        <ul>
        <li><a href="https://www.youtube.com/results?search_query=To.X+Taeyong" target="_blank" rel="noopener noreferrer">To.X -- Taeyong</a></li>
          <li><a href="https://www.youtube.com/results?search_query=A+Change+Of+Heart+The+1975" target="_blank" rel="noopener noreferrer">A Change Of Heart -- The 1975</a></li>
          <li><a href="https://www.youtube.com/results?search_query=Yellow+Coldplay" target="_blank" rel="noopener noreferrer">Yellow -- Coldplay</a></li>
          <li><a href="https://www.youtube.com/results?search_query=The+Scientist+Coldplay" target="_blank" rel="noopener noreferrer">The Scientist -- Coldplay</a></li>
          <li><a href="https://www.youtube.com/results?search_query=Golden+Hour+JVKE" target="_blank" rel="noopener noreferrer">Golden Hour -- JVKE</a></li>
        </ul>
      </div>
      
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>95</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
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
    <label htmlFor="wd-radio-kpop">Kpop Music</label><br />

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
        defaultValue="100000"/><br/>

  <label htmlFor="wd-text-fields-rating"> Rating: </label>
  <input type="range" id="wd-text-fields-rating"
        placeholder="Doe"
        max="5"
        defaultValue="4"/><br/>

  <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
  <input type="date"
        id="wd-text-fields-dob"
        defaultValue="2000-01-21"/><br/>
        
    </div>

  );
}