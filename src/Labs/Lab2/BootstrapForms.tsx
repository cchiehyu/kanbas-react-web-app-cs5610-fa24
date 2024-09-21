import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-forms">
      <h2>Forms</h2>

      {/* Email Input */}
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="input1"
          placeholder="name@example.com"
        />
      </div>

      {/* Textarea */}
      <div className="mb-3">
        <label htmlFor="textarea1" className="form-label">
          Example textarea
        </label>
        <textarea
          className="form-control"
          id="textarea1"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
}
