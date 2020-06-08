//////////////////////////////////////////////////////////////////////
// Async/Await


// Async/Await is another way of handling promises.
// They use promises written in the usual way. Here are some Promises. We'll set up Async/Await to handle them further down.

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


// Async and Await are keywords used with a function to make it asynchronous (Async) and to set up key points in the function where it will stop running until a specified promise returns its data (Await).

// So in combination, Async specifies that the function should be asynchronous and Await is used to program the function's waiting points.

// 1. Async is written before the function keyword.
// 2. Await is written at any point where we call a promise within the function.
//    This tells the function to wait until the promise data is returned.
//    It also represents the data returned by the promise,
//    so in the example below, 'const IDs' is assigned the value of the promise data
//    (and so forth)

async function getRecipesAW() {
  const IDs = await getIDs;
  console.log(IDs);
  const recipe = await getRecipe(IDs[2]);
  console.log(recipe);
  const pub = await getPublisher(recipe.publisher);
  console.log(pub);

}

getRecipesAW();

//async/await is a lot neater than the .then chains used in traditional promises.

// Here's another example using our gumball machine model.

const getGumball = new Promise ((resolve, reject) => {
  setTimeout(() => {
      const outcome = Math.floor(Math.random() *10);
      console.log(`<Gumball Value: ${outcome}>`);
      outcome >1 ? 
          resolve(
              {
                  message: 'You got a gumball!',
                  colors: ["red", "blue", "green", "yellow", "pink"],
                  selector: outcome
              }
          ) : reject("Error: The gumball machine jammed!");
  }, 6000);
});

const gumballSelector = (gumballSelectorData) => {
  return new Promise((resolve, reject) => {
    setTimeout((gumballSelectorData) => {
      console.log((`You got a ${gumballSelectorData.colors[gumballSelectorData.selector]} gumball!`));
    }, 1500, gumballSelectorData);
  });
};

async function gumballMachine() {
    const gumballData = await getGumball;
    console.log(gumballData.message);
    const gumballColor = await gumballSelector(gumballData);
    gumballColor();
}

gumballMachine();

