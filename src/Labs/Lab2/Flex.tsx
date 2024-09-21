import React from 'react';
import './index.css';

export default function Flex() {
  return (
    <div id="wd-css-flex-container">
      {/* First Flex Example */}
      <div id="wd-css-flex">
        <h2>Flex Example 1</h2>
        <div className="wd-flex-row-container">
          <div className="wd-bg-color-yellow">Column 1</div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div className="wd-bg-color-red">Column 3</div>
        </div>
      </div>

      {/* Second Flex Example */}
      <div id="wd-css-flex">
        <h2>Flex Example 2</h2>
        <div className="wd-flex-row-container">
          <div className="wd-bg-color-yellow">Column 1</div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div className="wd-bg-color-red wd-flex-grow-1">Column 3 with Flex Grow</div>
        </div>
      </div>

      {/* Third Flex Example */}
      <div id="wd-css-flex">
        <h2>Flex Example 3</h2>
        <div className="wd-flex-row-container">
          <div className="wd-bg-color-yellow wd-width-75px">Column 1 (75px width)</div>
          <div className="wd-bg-color-blue">Column 2</div>
          <div className="wd-bg-color-red wd-flex-grow-1">Column 3 with Flex Grow</div>
        </div>
      </div>
    </div>
  );
}
