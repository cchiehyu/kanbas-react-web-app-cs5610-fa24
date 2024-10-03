import React from 'react';

export default function TemplateLiterals() {
  // Basic arithmetic calculation
  const five = 2 + 3;
  
  // Using traditional string concatenation
  const result1 = "2 + 3 = " + five;
  
  // Using template literals for string interpolation
  const result2 = `2 + 3 = ${2 + 3}`;
  
  // Template literal with variable insertion
  const username = "alice";
  const greeting1 = `Welcome home ${username}`;
  
  // Template literal with conditional expression
  const loggedIn = false;
  const greeting2 = `Logged in: ${loggedIn ? "Yes" : "No"}`;
  
  // JSX output
  return (
    <div id="wd-template-literals">
      <h4>Template Literals</h4>
      result1 = {result1}     <br />
      result2 = {result2}     <br />
      greeting1 = {greeting1} <br />
      greeting2 = {greeting2} <hr />
    </div>
  );
}
