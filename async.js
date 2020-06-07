// Asynchronous JS /////////////////////////////////////////////

// Theory //////////////////////////////////////////////////////

//Synchronous JS runs sequentially. If a piece of synchronous JS takes a while to resolve then it blocks the rest of the script from executing.

//Asynchronous JS runs asynchronously. Once invoked, it reolves at some specified time. It does not block the rest of the script; it continues to execute while we wait for the asynch event to resolve.

//Asynchronous JS actually runs outside of the JS engine, in a space called the Web APIs. The Web APIs contains a number of features such as timers (which setTimeout uses), geolocation, DOM event handlers and many other things, which the JS engine can access. Asynchronous JS functions invoke features such as these, which then run in the Web APIs; the JS script then proceeds to the next line uninterrupted. Once the method running in the Web APIs completes it returns the required data to a space called the Message Queue =>

//The Message Queue is a space that holds data returned from the Web APIs. Once an asynchronous method resolves the response enters the Message Queue.

//The Enevt Loop is a feature that constantly monitors the JS's execution stack and the Message Queue. By default, the JS script will run line by line, and execution contexts swill stack and resolve in the usdual way. While this happens the Event Loop monitors the Message Queue. If a response is sent to to the Message Queue the the Event Loop detects this, and once the current execution stack is cleared it executes the response in the Message Queue before any more of the JS script executes.

//If multiple responses reach the Message Queue while the Execution Stack is occupied then they queue (as the name implies). When the Execution Stack eventually empties the Event Loop then loads these responses in the order that they were received.


// Methods /////////////////////////////////////////////////////

//01. setTimeout method.
//Executes a function a set time (in ms) after it's called.
//Once setTimeout is called the script after it will continue to execute. After the timeout the setTimeout's passed in function will execute.

const second = () => {
    setTimeout(() => {
        console.log("Well, I hope?")
    }, 5000)
    };

const first = () => {
    console.log("Heya!")
    second();
    console.log("How's it going?")
};

first ();

//We're really just looking at this as an example of as asynchronous method. Promises ans Async/Await are much more relevant, and are used to requrest API data without blocking the JS script.
