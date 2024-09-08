interface ModulesProps {
    courseCode: string;
  }
  
export default function Modules() {
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Full Stack Development</li>
                  <li className="wd-content-item">Learn front-end and back-end technologies</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Understanding REST APIs</li>
                  <li className="wd-content-item">Setting up a Node.js server</li>
                  </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  );}
  