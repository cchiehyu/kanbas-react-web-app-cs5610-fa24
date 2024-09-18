import React from 'react';
import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <table id="wd-home" style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td valign="top" style={{ width: "70%" }}>
            {/* This will render the Modules component on the left */}
            <Modules courseCode={""} />
          </td>
          <td valign="top" style={{ width: "30%" }}>
            {/* This will render the CourseStatus component on the right */}
            <CourseStatus />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
