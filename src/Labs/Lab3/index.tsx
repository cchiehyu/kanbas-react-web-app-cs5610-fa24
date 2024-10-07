import React from 'react';
import Add from "./Add";
import AddPathParameters from './AddPathParameters';
import AddingAndRemovingToFromArrays from './AddingAndRemovingToFromArrays';
import ArrayIndexAndLength from './ArrayIndexAndLength';
import ArrowFunctions from './ArrowFunctions';
import BooleanVariable from "./BooleanVariables";
import Classes from './Classes';
import ConditionalOutputIfElse from './ConditionalOutputIfElse';
import ConditionalOutputInline from './ConditionalOutputInline';
import Destructing from './Destructing';
import FilterFunction from './FilterFunction';
import FindFunction from './FindFunction';
import FindIndex from './FindIndex';
import ForLoops from './ForLoops';
import FunctionDestructing from './FunctionDestructing';
import Highlight from "./Highlight";
import House from './House';
import IfElse from './IfElse';
import ImpliedReturn from './ImpliedReturn';
import JsonStringify from './JsonStringify';
import LegacyFunctions from './LegacyFunctions';
import MapFunction from './MapFunction';
import Square from "./Square";
import Spreading from './Spreading';
import SimpleArrays from './SimpleArrays';
import TemplateLiterals from './TemplateLiterals';
import TernaryOperator from './TernaryOperator';
import TodoItem from './todos/TodoItem';
import TodoList from './todos/TodoList';
import VariablesAndConstants from "./VariablesAndConstants";


export default function Lab3() {
  console.log('Hello World!');
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
        <ImpliedReturn/>
        <TemplateLiterals/>
        <SimpleArrays/>
        <ArrayIndexAndLength/>
        <AddingAndRemovingToFromArrays/>
        <ArrayIndexAndLength/>
        <ForLoops/>
        <MapFunction/>
        <FindFunction/>
        <FindIndex/>
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
  