import { Link } from "react-router-dom";
export default function TOC() {
    return (
      <ul>
        <li><Link to="/Labs">Labs</Link></li>
        <li><Link to="/Labs/Lab1">Lab 1</Link></li>
        <li><Link to="/Labs/Lab2">Lab 2</Link></li>
        <li><Link to="/Labs/Lab3">Lab 3</Link></li>
        <li><Link to="/Kanbas">Kanbas</Link></li>
        <li><Link id="wd-linkedin" to="https://www.linkedin.com/in/joyce-chen-1686b3199/">Linkedin</Link></li>
        <li><Link id="wd-github" to="https://github.com/cchiehyu/kanbas-react-web-app-cs5610-fa24">Github</Link></li>
      </ul>
      
    );
  }
  