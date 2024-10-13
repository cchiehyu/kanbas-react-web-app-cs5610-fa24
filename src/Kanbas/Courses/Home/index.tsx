import React from 'react';
import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
<div className="d-flex" id="wd-home">
<div className="flex-fill">
            {/* This will render the Modules component on the left */}
            <Modules/>
            </div>
            <div className="d-none d-md-block">
            {/* This will render the CourseStatus component on the right */}
            <CourseStatus />
            </div>
</div>

  );
}
