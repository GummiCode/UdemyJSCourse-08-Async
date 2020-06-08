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

/*
const second = () => {
    setTimeout(() => {
        console.log("Well, I hope?")
    }, 1000)
    };

const first = () => {
    console.log("Heya!")
    second();
    console.log("How's it going?")
};

first ();
*/


//We're really just looking at this as an example of as asynchronous method. Promises ans Async/Await are much more relevant, and are used to requrest API data without blocking the JS script.

//////////////////////////////////////////////////////////////
//A model of an asynchronous method

//The function below gives data (recipes specifically) after a specific time period. Asynchronous JS methods allow this datat to be provided after the script has executed. We're using this to represent a request to a server, which would have a time delay; it would behave similarly and have similar structure, except the setTimeout function would be replaced with a promise or comparable method.

/*
function getRecipe() {
    setTimeout(() => {
        const recipeIDs = [1, 2, 3, 4];
        console.log(recipeIDs);
        setTimeout(id => {
            const recipe = {
                title: 'Spaghetti',
                publisher: 'Tseng'
            };
            console.log(`Recipe ${id}: ${recipe.title}.`);

            setTimeout(publisher => {
                const recipe2 = {
                    title: 'Pizza',
                    publisher: 'Tseng'
                };
                console.log(recipe);
            }, 1500, recpie.publisher);

        }, 1500, recipeIDs[2]);
    }, 2000);
};

getRecipe();
*/

//Observe the triangular shape. It's the
/*
 P
  Y
   R
    A
     M
      I
       D

      O
     F

   D
  O
 O
M
*/

// Nested asynchronous functions are notioriously tirkcy to manage. They get really confusing. Newer approaches have been developed that manage sequential conditional events without such ridiculous nesting. We'll look at thes enow.


///////////////////////////////////////////////////////////
// Promises

// To summarise, a Promise is an asynchronous method that:
//  1. Monitors whether a specified event has happened yet or not.
//  2. Determines what should happen after the event has happened.


// A Promise can have various states.
//  1. Pending : The event has not yet happened.
//  2. Resolved: The event has happened with one of two outcomes:
//          2A: Fulfilled: The requested data was reurned.
//          2B: Rejected:  The requested data waas not returned
//              (eg. because of an error). 

// The Promise resolves different callback functions depending on the Pormise's state/outcome. 

const getRecipeIDs = new Promise(() => {

})