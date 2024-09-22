import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />

      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {/* CS1234 React JS */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1234/Home">
              <img src="/images/Penguineng.jpg" width="100%" height={160} alt="React JS" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS1234 React JS
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Full Stack software developer
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS5610 Web Development */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/5610/Home">
              <img src="/images/Shirokumacharacter.jpg" width="100%" height={160} alt="Web Development" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS5610 Web Development
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Building dynamic web applications
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS5200 Database Management */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/5200/Home">
              <img src="/images/Tonkatsuintroenglish.jpg" width="100%" height={160} alt="Database Management" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS5200 Database Management
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Database design and management
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS5550 AI and Machine Learning */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/5550/Home">
              <img src="/images/Tokage.jpg" width="100%" height={160} alt="AI and Machine Learning" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS5550 AI and Machine Learning
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Introduction to AI and machine learning
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS6700 Data Science */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/6700/Home">
              <img src="/images/Ebifurai_No_Shippo.jpg" width="100%" height={160} alt="Data Science" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS6700 Data Science
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Data analysis, visualization, and modeling
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS7800 Software Architecture */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/7800/Home">
              <img src="/images/Furoshiki.jpg" width="100%" height={160} alt="Software Architecture" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS7800 Software Architecture
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Advanced software design principles
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS6400 Cybersecurity */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/6400/Home">
              <img src="/images/Nisetsumuri.jpg" width="100%" height={160} alt="Cybersecurity" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS6400 Cybersecurity
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Protecting data and systems
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>

        {/* CS7000 Cloud Computing */}
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
          <div className="card rounded-3 overflow-hidden">
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/7000/Home">
              <img src="/images/Suzume.jpg" width="100%" height={160} alt="Cloud Computing" />
              <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                  CS7000 Cloud Computing
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Introduction to cloud infrastructure and services
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
