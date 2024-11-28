
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameActive = true;
let gameBoard = ['', '', '', '', '', '', '', '', '']; 

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-cell-index');

    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }

    
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    
    checkWinner();


    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];

        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            statusDisplay.textContent = `Player ${gameBoard[a]} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        statusDisplay.textContent = "It's a draw!";
    }
}


function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; 
    currentPlayer = 'X'; 
    gameActive = true;
    statusDisplay.textContent = `Player X's turn`;

    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
