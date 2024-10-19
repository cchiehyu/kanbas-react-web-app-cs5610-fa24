import PassingFunctions from "./PassingFunctions";
import PassingDataOnEvent from "./PassingDataOnEvent";
import ClickEvent from "./ClickEvent";
import EventObject from "./EventObject";

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
      </div>
    );
  }