import React from 'react';
import "./index.css";
import Padding from './Padding';
import Colors from './Colors';
import Borders from './Borders';
import Margins from './Margins';
import RoundedCorners from './Corners';
import Dimensions from './Dimensions';
import Positions from './Positions';
import ZIndex from './ZIndex';
import Float from './Float';
import GridLayout from './GridLayout';
import Flex from './Flex';
import ReactIconsSampler from './ReactIcons';
import BootstrapGrid from './BootstrapGrids';
import ScreenSizeLabel from './ScreenSizeLabel';
import BootstrapTables from './BootstrapTables';
import BootstrapLists from './BootstrapLists';
import BootstrapForms from './BootstrapForms';
import BootstrapNavigation from './BootstrapNavigation'; 

export default function Lab2() {
  return (
    <div className="container">
      <div id="wd-lab2">
        <h2>Lab 2 - Cascading Style Sheets</h2>
        <h3>Styling with the STYLE attribute</h3>

        {/* Style Attribute Section */}
        <p>
          The style attribute allows configuring the look and feel right on the element.
          Although it's very convenient, it is considered bad practice and you should
          avoid using the style attribute.
        </p>

        {/* Class Selectors Section */}
        <div id="wd-css-class-selectors">
          <h3>Class selectors</h3>
          <p className="wd-class-selector">
            Instead of using IDs to refer to elements, you can use an element's CLASS attribute.
          </p>
          <h4 className="wd-class-selector">
            This heading has the same style as the paragraph above.
          </h4>
        </div>

        {/* ID Selectors Section */}
        <div id="wd-css-id-selectors">
          <h3>ID selectors</h3>
          <p id="wd-id-selector-1">
            Instead of changing the look and feel of all the elements of the same name, e.g., P,
            we can refer to a specific element by its ID.
          </p>
          <p id="wd-id-selector-2">
            Here's another paragraph using a different ID and a different look and feel.
          </p>
        </div>

        {/* Document Structure Selectors Section */}
        <div id="wd-css-document-structure">
          <div className="wd-selector-1">
            <h3>Document structure selectors</h3>
            <div className="wd-selector-2">
              Selectors can be combined to refer to elements in particular places in the document.
              <p className="wd-selector-3">
                This paragraph's red background is referenced as:
                <br />
                <code>.selector-2 .selector-3</code><br />
                meaning the descendant of some ancestor.
                <br />
                <span className="wd-selector-4">
                  Whereas this span is a direct child of its parent.
                </span><br />
                You can combine these relationships to create specific styles
                depending on the document structure.
              </p>
            </div>

            {/* Colors Section */}
            <Colors />

            {/* Borders Section */}
            <Borders />

            {/* Padding Section */}
            <Padding />

            {/* Margins Section */}
            <Margins />

            {/* Rounded Corners Section */}
            <RoundedCorners />

            {/* Dimension Section */}
            <Dimensions />

            {/* Positions Section (both relative absolute and fixed) */}
            <Positions />

            {/* Z Index Section */}
            <ZIndex />

            {/* Float Section */}
            <Float />

            {/* Grid Layout Section */}
            <GridLayout />

            {/* Flex Section */}
            <Flex />

            <ReactIconsSampler />

            <BootstrapGrid />

            <ScreenSizeLabel />

            <BootstrapTables />

            <BootstrapLists />

            <BootstrapForms />

            <BootstrapNavigation />
          </div>
        </div>
      </div>
    </div>
  );
}
