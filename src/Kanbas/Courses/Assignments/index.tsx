import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { BsGripVertical, BsPlus } from 'react-icons/bs'; 
import { FaSearch } from 'react-icons/fa'; 
import * as db from '../../Database'; 

// Define the type for assignments and courses
interface Assignment {
  _id: string;
  title: string;
  course: string;
}

interface Course {
  _id: string;
  name: string;
  number: string;
}

export default function Assignments() {
  const { cid } = useParams(); // Get course ID from URL
  const [assignments, setAssignments] = useState<Assignment[]>([]); 
  const [course, setCourse] = useState<Course | null>(null); 

  useEffect(() => {
    // Log all assignments and cid for debugging
    console.log('All Assignments:', db.assignments);
    console.log('Course ID (cid):', cid);

    // Filter assignments based on course ID
    const courseAssignments = db.assignments.filter((assignment: Assignment) => assignment.course === cid);
    setAssignments(courseAssignments); 

    // Find the corresponding course based on cid
    const foundCourse = db.courses.find((course: Course) => course._id === cid) || null;
    setCourse(foundCourse); 

    console.log('Found Course:', foundCourse);
  }, [cid]);

  return (
    <div id="wd-assignments" className="container mt-4">
      {/* Search Bar and Filter Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ width: '250px' }}>
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input 
            id="wd-search-assignment"
            className="form-control"
            placeholder="Search for Assignments" 
          />
        </div>
        <div>
          <button className="btn btn-secondary me-2">SHOW BY DATE</button>
          <button className="btn btn-secondary">SHOW BY TYPE</button>
          <button className="btn btn-danger ms-3">
            <BsPlus className="me-1" /> Assignment
          </button>
        </div>
      </div>

      {/* Assignments List Header */}
      <h4 className="mb-3">
        {course ? `Assignments for ${course.number} - ${course.name}` : 'Loading course details...'}
      </h4>

      {/* Assignments List */}
      <ul id="wd-assignments-list" className="list-group rounded-0">
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <li 
              key={assignment._id}
              className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray"
              style={{ borderLeft: '5px solid green' }}
            >
              <BsGripVertical className="me-2 fs-3" />
              <div className="wd-title p-3 ps-2 bg-light">{assignment.title}</div>
              <ul className="wd-assignments-list list-group rounded-0">
                <li className="wd-assignment-item list-group-item p-3 ps-1">
                  <div className="d-flex justify-content-between">
                    <a className="wd-assignment-link text-decoration-none" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                      {assignment.title}
                    </a>
                    <span className="text-muted"> (Due date placeholder) </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div><strong>Points:</strong> (Points placeholder)</div>
                  </div>
                </li>
              </ul>
            </li>
          ))
        ) : (
          <p>No assignments found for this course.</p>
        )}
      </ul>
    </div>
  );
}
