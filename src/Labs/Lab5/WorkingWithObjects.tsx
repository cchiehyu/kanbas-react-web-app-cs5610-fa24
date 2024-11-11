import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "M101",
    name: "Web Development",
    description: "Introduction to Full Stack Development",
    course: "CS5610"
  });

  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      
      {/* Assignment Section */}
      <h4>Assignment</h4>
      <a id="wd-retrieve-assignments" 
         className="btn btn-primary me-2"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a>
      
      <h5>Title</h5>
      <input 
        className="form-control mb-2" 
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <a 
        className="btn btn-success mb-2"
        href={`${REMOTE_SERVER}/lab5/assignment/title/${assignment.title}`}>
        Update Title
      </a>

      <h5>Score</h5>
      <input 
        type="number"
        className="form-control mb-2"
        value={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value) })}
      />
      <a 
        className="btn btn-success mb-2"
        href={`${REMOTE_SERVER}/lab5/assignment/score/${assignment.score}`}>
        Update Score
      </a>

      <h5>Completed</h5>
      <input 
        type="checkbox"
        className="form-check-input mb-2"
        checked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
      />
      <a 
        className="btn btn-success mb-2 ms-2"
        href={`${REMOTE_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
        Update Completed
      </a>

      <hr/>

      {/* Module Section */}
      <h4>Module</h4>
      <a id="wd-retrieve-module" 
         className="btn btn-primary me-2"
         href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a>
      <a id="wd-retrieve-module-name" 
         className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a>

      <h5>Module Name</h5>
      <input 
        className="form-control mb-2"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a 
        className="btn btn-success mb-2"
        href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}>
        Update Module Name
      </a>

      <h5>Module Description</h5>
      <input 
        className="form-control mb-2"
        value={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a 
        className="btn btn-success mb-2"
        href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}>
        Update Module Description
      </a>
    </div>
  );
}