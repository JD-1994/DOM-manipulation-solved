/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
// Select the container that holds all the items
const cardsContainer = document.querySelector('.cardsContainer');

// Function to get favorites from localStorage
const getFavorites = () => JSON.parse(localStorage.getItem('favorites')) || [];

// Function to save favorites to localStorage
const saveFavorites = (favorites) => localStorage.setItem('favorites', JSON.stringify(favorites));

// Function to set the background to red for items listed in favorites LS
const setFavoritesBackground = () => {
  const favorites = getFavorites();
  favorites.forEach(id => {
    const item = document.getElementById(id);
    if (item) {
      item.style.backgroundColor = 'red';
    }
  });
};

// Run the function to set the background of favorites
setFavoritesBackground();

// Function to add an id to favorites LS
const addFavorite = (id) => {
  const favorites = getFavorites();
  if (!favorites.includes(id)) {
    favorites.push(id);
    saveFavorites(favorites);
  }
};

// Function to remove an id from favorites LS
const removeFavorite = (id) => {
  let favorites = getFavorites();
  favorites = favorites.filter(favId => favId !== id);
  saveFavorites(favorites);
};

// Callback function to update element background color and localStorage
const updateBackgroundColor = (event) => {
  const target = event.target;
  if (target.classList.contains('card')) {
    const id = target.id;
    const isFavorite = target.style.backgroundColor === 'red';
    if (isFavorite) {
      target.style.backgroundColor = 'white';
      removeFavorite(id);
    } else {
      target.style.backgroundColor = 'red';
      addFavorite(id);
    }
  }
};

// Add event listener to the container, pass the callback
cardsContainer.addEventListener('click', updateBackgroundColor);
