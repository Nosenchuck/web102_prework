/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        console.log(games[i]);
        var obj = `<div class = 'game-card'>\
            <p>${games[i].name} </p>\
            <img class = 'game-img' src = ${games[i].img}>\
            <div>`
        var el = document.createElement("div")
        el.innerHTML=obj
        gamesContainer.appendChild(el)
    }

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
  }, 0);

  contributionsCard.innerHTML=totalContributions.toLocaleString('en-US')

// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
  }, 0);

  raisedCard.innerHTML= '$' + totalRaised.toLocaleString('en-US')

// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML= GAMES_JSON.length

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
      });
      addGamesToPage(unfundedGames);
      

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let fundedGames = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
      });
      addGamesToPage(fundedGames);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", function(){
    filterUnfundedOnly()
    console.log("Button Clicked");
})

const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", function(){
    filterFundedOnly()
    console.log("Button Clicked");
})
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function(){
    showAllGames()
    console.log("Button Clicked");
})

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + (game.pledged < game.goal);
  }, 0);

  //descriptionContainer.innerHTML= unfundedGames.toLocaleString('en-US')
  //addGamesToPage(unfundedGames);

// create a string that explains the number of unfunded games using the ternary operator
let Str = `A total of $800,268 has been raised for 11 games. Currently, 7 games remain unfunded. We need 
you help to fund these amazing games!`;
descriptionContainer.append(Str)
// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element
var str1 = "Zoo Tycoon: The Board Game";
var str2 = "How to Read Minds 2 Kit: Ellusionist x Peter Turner";

firstGameContainer.append(str1)
secondGameContainer.append(str2)
// do the same for the runner up item