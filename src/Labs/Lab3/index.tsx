import React from 'react';
import VariablesAndConstants from "./VariablesAndConstants";

import BooleanVariable from "./BooleanVariables";
import IfElse from './IfElse';
import TernaryOperator from './TernaryOperator';
import LegacyFunctions from './LegacyFunctions';
import ArrowFunctions from './ArrowFunctions';
import ConditionalOutputIfElse from './ConditionalOutputIfElse';
import ConditionalOutputInline from './ConditionalOutputInline';
export default function Lab3() {
    return (
      <div id="wd-lab3" className="container-fluid">
        <h3>Lab 3</h3>
        <VariablesAndConstants/>
        <BooleanVariable/>
        <IfElse/>
        <ConditionalOutputIfElse/>
        <ConditionalOutputInline/>
        <TernaryOperator/>
        <LegacyFunctions/>
        <ArrowFunctions/>
      </div>
    );
  }
  