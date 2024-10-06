import React from 'react';
import VariablesAndConstants from "./VariablesAndConstants";
import BooleanVariable from "./BooleanVariables";
import IfElse from './IfElse';
import TernaryOperator from './TernaryOperator';
import LegacyFunctions from './LegacyFunctions';
import ArrowFunctions from './ArrowFunctions';
import ConditionalOutputIfElse from './ConditionalOutputIfElse';
import ConditionalOutputInline from './ConditionalOutputInline';
import MyComponent from './ImpliedReturn';
import TemplateLiterals from './TemplateLiterals';
import ArrayIndexAndLength from './ArrayIndexAndLength';
import AddingAndRemovingToFromArrays from './AddingAndRemovingToFromArrays';
import ForLoops from './ForLoops';
import MapFunction from './MapFunction';
import FindFunction from './FindFunction';
import FilterFunction from './FilterFunction';
import JsonStringify from './JsonStringify';
import House from './House';
import TodoItem from './todos/TodoItem';
import TodoList from './todos/TodoList';
import Spreading from './Spreading';
import FindIndex from './FindIndex';
import Destructing from './Destructing';
import FunctionDestructing from './FunctionDestructing';
import Classes from './Classes';
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import AddPathParameters from './AddPathParameters';

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
        <MyComponent/>
        <TemplateLiterals/>
        <ArrayIndexAndLength/>
        <AddingAndRemovingToFromArrays/>
        <ArrayIndexAndLength/>
        <ForLoops/>
        <MapFunction/>
        <FindFunction/>
        <FilterFunction/>
        <JsonStringify/> 
        <House/>
        <TodoItem/>
        <TodoList/>
        <Spreading/>
        <FindIndex/>
        <Destructing/>
        <FunctionDestructing/>
        <Classes/>
        <Add a={3} b={4} />
        <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>

     <AddPathParameters/>
      </div>
    );
  }
  