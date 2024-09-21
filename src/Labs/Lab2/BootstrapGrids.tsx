import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function BootstrapGrid() {
  return (
    <div id="wd-bs-grid-system">
      <h2>Bootstrap Grid System</h2>

      {/* First row: Two equal columns */}
      <div className="row">
        <div className="col bg-danger text-white">
          <h3>Left half</h3>
        </div>
        <div className="col bg-primary text-white">
          <h3>Right half</h3>
        </div>
      </div>

      {/* Second row: One third and two thirds */}
      <div className="row">
        <div className="col-4 bg-warning">
          <h3>One third</h3>
        </div>
        <div className="col-8 bg-success text-white">
          <h3>Two thirds</h3>
        </div>
      </div>

      {/* Third row: Sidebar and main content */}
      <div className="row">
        <div className="col-2 bg-dark text-white">
          <h3>Sidebar</h3>
        </div>
        <div className="col-8 bg-secondary text-white">
          <h3>Main content</h3>
        </div>
        <div className="col-2 bg-info">
          <h3>Sidebar</h3>
        </div>
      </div>

      {/* Responsive grid system */}
      <div id="wd-bs-responsive-grids">
        <h2>Responsive Grid System</h2>
        <div className="row">
          <div className="col-12 col-md-6 col-xl-3 bg-warning">
            <h3>Column A</h3>
          </div>
          <div className="col-12 col-md-6 col-xl-3 bg-primary text-white">
            <h3>Column B</h3>
          </div>
          <div className="col-12 col-md-6 col-xl-3 bg-danger text-white">
            <h3>Column C</h3>
          </div>
          <div className="col-12 col-md-6 col-xl-3 bg-success text-white">
            <h3>Column D</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
