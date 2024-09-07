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
    </div>
  );
}
