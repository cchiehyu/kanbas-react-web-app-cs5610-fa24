import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import './styles.css';
import CourseList from './Courselist';
import { useSelector } from "react-redux";
import ProtectedRoute from './Account/ProtectedRoute';
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kanbas() {
  const [userCourses, setUserCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courseForm, setCourseForm] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const fetchAllCourses = async () => {
    try {
      const courses = await courseClient.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error("Error fetching all courses:", error);
    }
  };
  
  const findCoursesForUser = async () => {
    try {
      if (currentUser?._id) {
        const courses = await userClient.findCoursesForUser(currentUser._id);
        setUserCourses(courses);
      }
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
  
      // Get fresh data regardless of enrolling state
      const availableCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      
      // Update the correct list based on current view
      if (enrolling) {
        const filteredCourses = availableCourses.filter((course: any) =>
          !enrolledCourses.some((enrolled: any) => enrolled._id === course._id)
        );
        setAllCourses(filteredCourses);
      } else {
        setUserCourses(enrolledCourses);
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  const addNewCourse = async () => {
    try {
      if (!courseForm.name.trim()) {
        alert("Course name cannot be empty");
        return;
      }
      
      if (!courseForm.description.trim()) {
        alert("Course description cannot be empty");
        return;
      }

      const isDuplicate = allCourses.some(
        existingCourse => existingCourse.number.toLowerCase() === courseForm.number.toLowerCase()
      );

      if (isDuplicate) {
        alert(`Course with number ${courseForm.number} already exists`);
        return;
      }

      const newCourse = await courseClient.createCourse(courseForm);
      setUserCourses([...userCourses, newCourse]);
      await fetchAllCourses();

      setCourseForm({
        _id: "",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        description: "",
        image: ""
      });
    } catch (error) {
      alert("Failed to create course");
      console.error(error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setUserCourses(userCourses.filter((course) => course._id !== courseId));
      await fetchAllCourses();
    } catch (error) {
      alert("Failed to delete course");
      console.error(error);
    }
  };

  const updateCourse = async () => {
    try {
      if (!courseForm.name.trim()) {
        alert("Course name cannot be empty");
        return;
      }
      
      if (!courseForm.description.trim()) {
        alert("Course description cannot be empty");
        return;
      }

      const isDuplicate = allCourses.some(
        existingCourse => 
          existingCourse.number.toLowerCase() === courseForm.number.toLowerCase() && 
          existingCourse._id !== courseForm._id
      );

      if (isDuplicate) {
        alert(`Course with number ${courseForm.number} already exists`);
        return;
      }

      await courseClient.updateCourse(courseForm);
      setUserCourses(
        userCourses.map((c) => {
          if (c._id === courseForm._id) {
            return courseForm;
          }
          return c;
        })
      );
      await fetchAllCourses();

      setCourseForm({
        _id: "",
        name: "",
        number: "",
        startDate: "",
        endDate: "",
        description: "",
        image: ""
      });
    } catch (error) {
      alert("Failed to update course");
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchAllCourses();
    }
  }, [currentUser]); 
  
  useEffect(() => {
    if (currentUser?._id) {
      findCoursesForUser();
    }
  }, [enrolling]);

  useEffect(() => {
    const initializeCourses = async () => {
      if (currentUser?._id) {
        if (currentUser.role === 'STUDENT') {
          await findCoursesForUser();
          await fetchAllCourses(); // Still fetch all courses for reference
        } else {
          await fetchAllCourses();
        }
      }
    };
  
    initializeCourses();
  }, [currentUser]); 

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={userCourses}
                    allCourses={allCourses}
                    course={courseForm}
                    setCourse={setCourseForm}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/Courses" 
              element={
                <ProtectedRoute>
                  <CourseList 
                    courses={userCourses}
                    allCourses={allCourses}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={userCourses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}