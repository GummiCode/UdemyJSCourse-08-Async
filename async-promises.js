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


///////////////////////////////////////////////////////////
// A Promise Example

// Below is a mock Promise. A rnadom number generator is used to simulate the resolution.rejection of a Promise.

// Two callback functions are passed into the promise.
//  1. Resolve is called if the promise is successfully fulfilled. It outputs the argument passed into it. In real life this would be the data we want returned when the promise is succesfully resolved.
//  2. Reject is  called if the promise is rejected It also outputs the argument passed into it, which in real life would be an error message or some other replacement for the promised data.

// In summary, these functions return appropriate data for resolved/rejected scenarios.

const getIDs = new Promise ((resolve, reject) => {
    setTimeout(() => {
        const outcome = Math.floor(Math.random() *10);
        console.log(`<Recipe value: ${outcome}>`);
        outcome >2 ? 
            resolve([1, 2, 3, 4, 'Benji'])
        : 
            reject(["Error"]);
    }, 1500);
});

//The promise then has a list of conditional statements which define what happens if the Promise is resolved or rejected. The output from the promise is passed to these methods and handled.
//  1. The .then method takes the output of the Resolved promise, which is entered as an argument ("IDs" in the example below), and processes it. 
//.then methods can be chained, each taking the output from the last.
//They can also use asynchronous methods; they can include promises themselves! The second .then below uses one (it's defined further down).
//  2. The .catch method takes the output of the Rejected promise and processes it. It also activates if the chain of .then methods fails at some point. 

getIDs
    .then(IDs => {
        console.log(IDs);
        return getRecipe(IDs[2]);
    })
    .then(recipe => {
        console.log(recipe.text);
        return getPublisher(recipe.publisher);
    })
    .then(publisherData => {
        console.log(publisherData)
    })
    .catch(error => {
        console.log(error);
    });

// As the .then and .catch methods are asynchronous we can define any callback functions that they'll employ lower down in the script. Below are the functions used by out .then and .catch methods. It would be better practice to define them above the .then and .catch methods; I've just popped them below for ease of reading these notes. Note that in this example, it's not too important that we scrutinise what the functions below are doing because we're focussing on promises. 

//NB: Some of this is a little confusing. At the end of the setTimeout we enter 'recipeID' after the time of 1500ms. This location of the setTimeout arguments is used to pass an argument into the callback function within setTimeout. To rephrase, the 'recipeID' argument is passed to the 'ID' argument at the start of the callback function.

const getRecipe = recipeID => {
     return new Promise((resolve, reject) => {
         setTimeout(ID => {
            const recipe = {
                title: "Swamp Peef with Cheese",
                publisher: "Tseng"
            };
            resolve({
                text: `${ID}: ${recipe.title}`,
                publisher: recipe.publisher
            });
        }, 1500, recipeID);
    });
};

const getPublisher = publisher =>  {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            resolve(`Published by ${pub}`);
        }, 1500, publisher)
    });
};



//Here's another promise for practice!

const gumballMachine = new Promise ((resolve, reject) => {
    setTimeout(() => {
        const outcome = Math.floor(Math.random() *10);
        console.log(`<Gumball Value: ${outcome}>`);
        outcome >1 ? 
            resolve(
                {
                    message: 'You got a gumball!',
                    colors: ["red", "blue", "green", "yellow", "pink"]
                }
            ) : reject("Error: The gumball machine jammed!");
    }, 6000);
});

gumballMachine
    .then(gumballData => {
        console.log(gumballData.message);
        console.log(`The gumball is ${gumballData.colors[Math.floor(Math.random() * 4) + 1]}!`);
    })
    .catch(error => console.log(error));


// Jonas: "I find promises to be one of the hardest, if not the hardest concept to grasp in JavaScript. And so please do not worry if you didn't understand it 100% at this point. what reeally matters is not how we produce but how we consume promises, because promises will often be provided by libraries we use later i the course."


/////////////////////////////////////////////////////
// Async/Await

