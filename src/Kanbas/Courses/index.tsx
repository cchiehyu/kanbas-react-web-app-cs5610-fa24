import React from 'react';
import { Navigate, Route, Routes, useParams, useLocation } from "react-router-dom";

import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments/Editor";
import AssignmentEditor from './Assignments/CreateAssignment';
import PeopleTable from './People/Table';
import { FaAlignJustify } from 'react-icons/fa';
import QuizList from './Quizzes/index';
import QuizEditor from './Quizzes/Editor';
import QuizDetails from './Quizzes/QuizDetails';
import QuizQuestions from './Quizzes/index';
import QuizStartScreen from './Quizzes/QuizPreview/QuizStart';
import QuizSubmission from './Quizzes/QuizPreview/QuizSubmission';
import QuizPreview from './Quizzes/QuizPreview/index';
import QuizReview from './Quizzes/QuizPreview/QuizReview/index';
import Grades from './Grades';

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid: courseId } = useParams<{ cid: string }>();
  const course = courses.find((course) => course._id === courseId);
  const { pathname } = useLocation();

  const isQuizPreview = pathname.includes("/Quizzes/") && pathname.includes("/preview");
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-3 fs-4 mb-1" />
        {course && course.number} {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        {!isQuizPreview && (
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>
        )}
        {/* Main Content Area */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments">
              <Route index element={<Assignments />} />
              <Route path="new" element={<AssignmentEditor />} />
              <Route path=":aid" element={<AssignmentEditor />} />
            </Route>
            <Route path="Quizzes">
              <Route index element={<QuizList />} />
              <Route path="new" element={<QuizEditor />} />
              <Route path=":qid" element={<QuizEditor />} />
              <Route path=":qid/details" element={<QuizDetails />} />
              <Route path=":qid/questions" element={<QuizQuestions />} />
              <Route path=":qid/preview" element={<QuizStartScreen />} /> 
              <Route path=":qid/preview/take" element={<QuizPreview />} />
              <Route path=":qid/preview/submitted" element={<QuizSubmission />} />
              <Route path=":qid/preview/review" element={<QuizReview />} />
            </Route>
            <Route path="People" element={<PeopleTable />} />
            <Route path="Grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}