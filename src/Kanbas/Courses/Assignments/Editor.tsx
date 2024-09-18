import React from 'react';
export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name </label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />

      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
        The landing page should include the following: 
        - Your full name and section 
        - Links to each of the lab assignments 
        - Link to the Kanbas application 
        - Links to all relevant source code repositories 
        The Kanbas application should include a link to navigate back to the landing page.
      </textarea>
      <br />


      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-assignment-group">
                <option value="assignments">Assignments</option>
                
                {/* Add other assignment groups as needed */}
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade">
                <option value="percentage">Percentage</option>
                <option value="points">Points</option>
                <option value="complete/incomplete">Complete/Incomplete</option>
                
                {/* Add other grade display options */}
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="paper">Paper</option>
                <option value="external">External Tool</option>
              </select>
              <br />
              <div id="wd-online-entry-options">
                <label>Online Entry Options</label><br />
                <input type="checkbox" id="text-entry" /> Text Entry<br />
                <input type="checkbox" id="website-url" /> Website URL<br />
                <input type="checkbox" id="media-recordings" /> Media Recordings<br />
                <input type="checkbox" id="student-annotation" /> Student Annotation<br />
                <input type="checkbox" id="file-uploads" /> File Uploads<br />
              </div>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign To</label>
            </td>
            <td>
              <input id="wd-assign-to" value="Everyone" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input type="date" id="wd-due-date" value="2024-05-13" />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-date">Available From</label>
            </td>
            <td>
              <input type="date" id="wd-available-from" value="2024-05-06" />
              <label htmlFor="wd-available-until"> Until </label>
              <input type="date" id="wd-available-until" value="2024-05-20" />
            </td>
          </tr>
        </tbody>
      </table>

      <br />
      <button id="wd-cancel">Cancel</button>
      <button id="wd-save">Save</button>

    </div>
  );
}