import React from 'react';
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams } from "react-router";

export default function Courses() {
  // Extract course code from the URL
  const { cid: courseCode } = useParams<{ cid: string }>();

  return (
    <div id="wd-courses">
      <h2>Course {courseCode}</h2> 
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <CoursesNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home/>} />
                <Route path="Modules" element={<Modules courseCode={""}/>} />
                <Route path="Assignments" element={<Assignments/>} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<h2>People</h2>} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
