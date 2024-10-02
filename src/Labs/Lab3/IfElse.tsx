import React from 'react';

const IfElse = () => {
  // Define boolean variables
  let true1 = true, false1 = false;

  return (
    <div id="wd-if-else">
      <h4>If Else</h4>
      {/* Conditionally render paragraphs based on boolean values */}
      {true1 && <p>true1</p>}
      {!false1 ? <p>!false1</p> : <p>false1</p>}
      <hr />
    </div>
  );
};

export default IfElse;
