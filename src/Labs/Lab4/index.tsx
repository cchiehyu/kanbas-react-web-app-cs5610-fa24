import PassingFunctions from "./PassingFunctions";
import PassingDataOnEvent from "./PassingDataOnEvent";
import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4">
      <h1>Lab 4</h1>

      <section>
        <h2>Passing Functions</h2>
        <PassingFunctions theFunction={sayHello} />
      </section>

      <section>
        <ClickEvent />
      </section>

      <section>
        <EventObject />
      </section>

      <section>
        <PassingDataOnEvent />
      </section>

      <section>
        <Counter />
      </section>

      <section>
        <BooleanStateVariables />
      </section>

      <section>
        <StringStateVariables />
      </section>

      <section>
        <DateStateVariable />
      </section>

      <section>
        <ObjectStateVariable />
      </section>

      <section>
        <ArrayStateVariable />
      </section>

      <section>
        <ParentStateComponent />
      </section>

      <section>
        <ReduxExamples />
      </section>
    </div>
  );
}