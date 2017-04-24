/* It's a Match, (Concentration, Match Match, Pairs) is a card game in which a deck of cards is laid face down on a surface, and two cards are flipped over each turn. The object of the game is to turn over pairs of matching cards. Demonstrates manipulation of DOM, Event Handlers, Callback functions */

// Global Variables
// An array with the cards we'll be working with 
var cards = ['queen', 'queen', 'king', 'king'];
var cardsInPlay = [];
var numberOfMoves = 0;
var matches = 0;

// Shuffle function
function shuffleCards() {

    // While there remain elements to shuffle... 
    for (var i = cards.length - 1; i > 0; i--) {
        // Generate a random index 
        var randomIndex = Math.floor(Math.random() * (i + 1));
        // Swap the card at the current index with the card at the random index
        var tempCard = cards[i];
        cards[i] = cards[randomIndex];
        cards[randomIndex] = tempCard;
    }
}

function createBoard() {
  shuffleCards();

  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('div');
    cardElement.setAttribute('class', cards[i]);
    document.getElementById('game-board').appendChild(cardElement);
  cardElement.addEventListener('click', flipOverCard);
  }
}
/* Create function createBoard. It calls shufflesCards function; loops through the cards array, creates card elements for the board. For each card; creates div with name of the current item; adds the card to the end of the element with id #game-board; adds an event listener to each card after it has been appended to the #game-board. When card is clicked run function flipOverCard. */

function flipOverCard() {
  if (cardsInPlay.length === 2){
    turnFaceDown();
    cardsInPlay = [];
  }
  
  this.innerHTML = '<img src= https://res.cloudinary.com/hucvviwxz/image/upload/v1469628601/code_challenge/jsc/unit_5/' + this.getAttribute('class') + '.png>';
  cardsInPlay.push(this);
  if (cardsInPlay.length === 2){
    numberOfMoves ++;
    document.getElementById('attempts').innerHTML = numberOfMoves; 
    isMatch();
} 
}
/* Create flipOverCard function. Function finds the element clicked and updates html of that element to img file. When user clicks card, card is pushed to cardsInPlay array.

If statement checks if user has played two cards. When the cardsInPlay array has two items, user has attempted a match; ++ to the numberOfMoves; Find the element #attempts; update html to the number of matches user attempted; run isMatch function.

If statement; if user has clicked two cards with no match, then clicks third card, call turnFaceDown; empty cardsInPlay array. */


function isMatch() {
  var success = document.getElementById('success');

  if (cardsInPlay[0].getAttribute('class') === cardsInPlay[1].getAttribute('class')) {
    success.innerHTML = 'You found a match!';
    cardsInPlay = [];
    matches++;

    if (matches === cards.length / 2) {
      handleEndOfGame();
    }
  } else {
    success.innerHTML = 'Try again.';
  }
}
/* Create function isMatch. Check if cards match.
If the cards match; Find element #success, change html to success statmement; Reset the cardsInPlay; Add ++ to matches. 
If all cards matched, call handleEndOfGame function.
If no match, find element #success, update html to try again. */


function turnFaceDown() {
  for(var b = 0; b < cardsInPlay.length; b++)
    cardsInPlay[b].innerHTML = "";
}
/* Create function turnFaceDown; turn any cards in cardsInPlay array that were unmatched. Loop through elements in cardsInPlay array; for each card, empty HTML. */


function resetGame() {
  cardsInPlay = [];
  numberOfMoves = 0;
  matches = 0;
  document.getElementById('game-board').innerHTML = "";
  document.getElementById('attempts').innerHTML = numberOfMoves;
  document.getElementById('success').innerHTML = "Click two cards to start.";
  turnFaceDown();
  createBoard();
}
/* Create function resetGame; Reset value of the cardsInPlay; Set numberOfMoves to 0; Set number of matches to 0; Find #game-board, empty HTML; Set value of #attempts to 0; Change html of #success; Call  turnFaceDown function, turn all cards over; Call createBoard function. */

document.getElementById('reset').addEventListener('click', resetGame);
//called when user clicks button with id #reset.

function handleEndOfGame() {
    document.getElementById('success').innerHTML = "Congratulations! You matched all cards in " + numberOfMoves + " moves.";
}
/* Create function handleEndOfGame. Find element with id #success, update HTML to Congratulations! */

createBoard();