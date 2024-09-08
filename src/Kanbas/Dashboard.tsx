import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (14)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* CS1234 React JS */}
        <div className="wd-dashboard-course">
          <img src="/images/Penguineng.jpg" width={200} alt="React JS" />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/1234/Home">
              CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
              Full Stack software developer
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>

        {/* CS5610 Web Development */}
        <div className="wd-dashboard-course">
          <img src="/images/Shirokumacharacter.jpg" width={200} alt="Web Development" />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5610/Home">
              CS5610 Web Development
            </Link>
            <p className="wd-dashboard-course-title">
              Building dynamic web applications
            </p>
            <Link to="/Kanbas/Courses/5610/Home"> Go </Link>
          </div>
        </div>

        {/* CS5200 Database Management */}
        <div className="wd-dashboard-course">
          <img src="/images/Tonkatsuintroenglish.jpg" width={200} alt="Database Management" />
          <div>
            <Link className="wd-dashboard-course-link"
              to="/Kanbas/Courses/5200/Home">
              CS5200 Database Management
            </Link>
            <p className="wd-dashboard-course-title">
              Database design and management
            </p>
            <Link to="/Kanbas/Courses/5200/Home"> Go </Link>
          </div>
        </div>

        {/* Placeholder for other courses */}
        <div className="wd-dashboard-course"> ... </div>
        <div className="wd-dashboard-course"> ... </div>
      </div>
    </div>
  );
}
