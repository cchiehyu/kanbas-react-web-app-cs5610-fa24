export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
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

    </div>

  );
}