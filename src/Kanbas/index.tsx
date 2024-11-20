import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import './styles.css';
import CourseList from './Courselist';
import {  useSelector } from "react-redux";
import ProtectedRoute from './Account/ProtectedRoute';
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    let courses = [];
    try {
      courses = await userClient.findMyCourses();
    } catch (error) {
      console.error(error);
    }
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      console.log("Total available courses:", allCourses.length);
      console.log("All courses data:", allCourses);
      setAllCourses(allCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);

    setCourses([...courses,newCourse]);
    fetchAllCourses();
  };

  const deleteCourse = async (courseId: string) => {
    //const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    fetchAllCourses();
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);

    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
    fetchAllCourses();
  };

  return (

      <Session>
        <div id="wd-kanbas">
          {/* Sidebar Navigation */}
          <KanbasNavigation />

          {/* Main Content */}
          <div className="wd-main-content-offset p-3">
            <Routes>
              <Route path="/" element={<Navigate to="Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route
                path="/Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard
                      courses={courses}
                      allCourses={allCourses} // Add this line
                      course={course}
                      setCourse={setCourse}
                      addNewCourse={addNewCourse}
                      deleteCourse={deleteCourse}
                      updateCourse={updateCourse}
                    />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/Courses" 
                element={
                  <ProtectedRoute>
                    <CourseList 
                      courses={courses} 
                      allCourses={allCourses}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Courses/:cid/*"
                element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>}
              />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </div>
        </div>
      </Session>
  );
}
