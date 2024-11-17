import React from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";

import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments/Editor";
import AssignmentEditor from './Assignments/CreateAssignment';
import PeopleTable from './People/Table';
import { FaAlignJustify } from 'react-icons/fa';


export default function Courses({ courses }: { courses: any[]; }) {
  const { cid: courseId } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course && course.number} {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments">
              <Route index element={<Assignments />} />
              <Route path="new" element={<AssignmentEditor />} />
              <Route path=":aid" element={<AssignmentEditor />} />
            </Route>
            <Route path="People" element={<PeopleTable />} />
            <Route path="Grades" element={<h1>Grades</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}