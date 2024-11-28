// Variables for the game
let player1Deck, player2Deck;
let player1Score = 0, player2Score = 0;
let player1Card, player2Card;
const player1CardElement = document.getElementById('player1-card');
const player2CardElement = document.getElementById('player2-card');
const playButton = document.getElementById('playBtn');
const dealButton = document.getElementById('dealBtn');
const resetButton = document.getElementById('resetBtn');
const message = document.getElementById('message');

// Card deck setup
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Function to shuffle and deal cards
function shuffleAndDeal() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ rank, suit });
        }
    }

    // Shuffle the deck using Fisher-Yates algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    // Split deck between player 1 and player 2
    player1Deck = deck.slice(0, deck.length / 2);
    player2Deck = deck.slice(deck.length / 2);
}

// Deal cards on "Deal Cards" button click
dealButton.addEventListener('click', () => {
    shuffleAndDeal();
    message.textContent = "Game Started! Player 1, it's your turn.";
    playButton.disabled = false;
    dealButton.disabled = true;
    resetButton.style.display = 'none';
    updateScores();
});

// Play a turn
playButton.addEventListener('click', () => {
    if (player1Deck.length === 0 || player2Deck.length === 0) {
        // If any player's deck is empty, the game is over
        message.textContent = `Game Over! Player 1: ${player1Score} | Player 2: ${player2Score}`;
        playButton.disabled = true;
        resetButton.style.display = 'inline-block';
        return;
    }

    // Draw cards for both players
    player1Card = player1Deck.pop();
    player2Card = player2Deck.pop();

    player1CardElement.textContent = `${player1Card.rank} of ${player1Card.suit}`;
    player2CardElement.textContent = `${player2Card.rank} of ${player2Card.suit}`;

    // Check for a tie, and re-draw if necessary
    while (getCardValue(player1Card) === getCardValue(player2Card)) {
        message.textContent = "It's a tie! Drawing again...";
        // Re-draw the cards for both players until they are different
        player1Card = player1Deck.pop();
        player2Card = player2Deck.pop();

        player1CardElement.textContent = `${player1Card.rank} of ${player1Card.suit}`;
        player2CardElement.textContent = `${player2Card.rank} of ${player2Card.suit}`;
    }

    // Determine who wins the round
    if (getCardValue(player1Card) > getCardValue(player2Card)) {
        player1Score++;
        message.textContent = "Player 1 wins this round!";
    } else {
        player2Score++;
        message.textContent = "Player 2 wins this round!";
    }

    // Check if any player has won the game (reaches 5 points)
    if (player1Score === 5) {
        message.textContent = "Player 1 wins the game!"; // Announce Player 1 as the winner
        playButton.disabled = true;  // Disable play button when someone wins
        resetButton.style.display = 'inline-block'; // Show reset button
    } else if (player2Score === 5) {
        message.textContent = "Player 2 wins the game!"; // Announce Player 2 as the winner
        playButton.disabled = true;  // Disable play button when someone wins
        resetButton.style.display = 'inline-block'; // Show reset button
    }

    updateScores();
});

// Get the value of a card for comparison
function getCardValue(card) {
    if (typeof card.rank === 'number') {
        return card.rank;
    }
    switch (card.rank) {
        case 'J': return 11;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
        default: return parseInt(card.rank);
    }
}

// Update score display
function updateScores() {
    message.innerHTML = `Player 1: ${player1Score} | Player 2: ${player2Score}`;
}

// Reset game
resetButton.addEventListener('click', () => {
    player1Score = 0;
    player2Score = 0;
    message.textContent = "Click 'Deal Cards' to start a new game.";
    player1CardElement.textContent = "";
    player2CardElement.textContent = "";
    playButton.disabled = true;
    dealButton.disabled = false;
    resetButton.style.display = 'none';
});
