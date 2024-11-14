let num1, num2, correctAnswer, operator;
let difficulty = 'easy'; // Default difficulty

// Function to get the number range based on difficulty
function getRange() {
    switch (difficulty) {
        case 'medium':
            return [1, 20]; // Numbers between 1 and 20
        case 'hard':
            return [1, 50]; // Numbers between 1 and 50
        default:
            return [1, 5]; // Numbers between 1 and 5 for easy mode
    }
}

// Function to generate the problem
function generateNumbers() {
    const [min, max] = getRange();
    num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    num2 = Math.floor(Math.random() * (max - min + 1)) + min;

    // Only addition and subtraction for easy mode
    const operations = difficulty === 'easy' ? ['+', '-'] : ['+', '-', '*', '/'];
    operator = operations[Math.floor(Math.random() * operations.length)];

    // If division is chosen, ensure no fractions by checking divisibility
    if (operator === '/') {
        // Ensure num2 divides num1 exactly
        num1 = num2 * Math.floor(Math.random() * (max / num2 + 1));
    }

    document.getElementById('num1').innerHTML = num1;
    document.getElementById('num2').innerHTML = num2;
    document.getElementById('op').innerHTML = operator;

    // Calculate the correct answer based on the operator
    if (operator === '+') {
        correctAnswer = num1 + num2;
    } else if (operator === '-') {
        correctAnswer = num1 - num2;
    } else if (operator === '*') {
        correctAnswer = num1 * num2;
    } else if (operator === '/') {
        correctAnswer = num1 / num2;
    }

    document.getElementById('message').innerHTML = '';
    document.getElementById('sum').classList.remove('correct', 'error');
    document.getElementById('sum').value = '';  // Clear previous input
    document.getElementById('sum').focus();
    document.getElementById('container').classList.add('fade-in');
}

document.getElementById("check").addEventListener('click', checkAnswer);

function checkAnswer() {
    const userAnswer = document.getElementById('sum').value;
    const message = document.getElementById('message');

    if (userAnswer === '') {
        message.innerHTML = "Please enter an answer.";
        document.getElementById('sum').classList.add('error');
    } else if (isNaN(userAnswer)) {
        message.innerHTML = "Invalid answer. Please enter a number.";
        document.getElementById('sum').classList.add('error');
    } else if (parseFloat(userAnswer) === correctAnswer) {
        message.innerHTML = 'Good job! Correct answer.';
        message.classList.add('correct'); // Green color for correct answer
        document.getElementById('sum').classList.add('correct');
    } else {
        message.innerHTML = "Incorrect answer. Try again.";
        message.classList.add('error');
        document.getElementById('sum').classList.add('error');
    }
}

document.getElementById('next').addEventListener('click', nextProblem);

function nextProblem() {
    generateNumbers();
}

// Update difficulty based on selection
document.getElementById('difficulty').addEventListener('change', function () {
    difficulty = this.value;
    generateNumbers(); // Generate new problem when difficulty changes
});

generateNumbers();  // Generate the first problem when the page loads