import React from 'react';
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams } from "react-router";
import PeopleTable from './People/Table';

export default function Courses() {
  const { cid: courseCode } = useParams<{ cid: string }>();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">Course {courseCode}</h2> 
      <hr />

      <div className="d-flex">
      <div className="d-none d-md-block">
              <CoursesNavigation />
              </div>
              <div className="flex-fill">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home/>} />
                <Route path="Modules" element={<Modules courseCode={""}/>} />
                <Route path="Assignments" element={<Assignments/>} />
                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                <Route path="People" element={<PeopleTable courseCode={courseCode} />} />
              </Routes>
              </div></div>
    </div>
  );
}
