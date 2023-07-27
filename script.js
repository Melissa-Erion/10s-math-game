// - The game starts when the user enters an answer in the input field and hits Enter.
// - A countdown of 10 seconds begins, and the user has to answer as many questions as possible within this time.
// - If the user enters the correct answer, the score increments by 1, and a new question is displayed.
// - If the user's answer is incorrect or if the time is up, the game ends, and the score is shown.
// - The user can keep playing by entering new answers, and the game will automatically reset if the time is up.
// - The user can also restart the game by manually refreshing the page.
// - The game keeps track of the time left and score and displays them on the screen.

// --------------------------------------------------------------------------------------------



$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    
    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);
    };
    
    var updateScore = function (amount) {
        score += amount;
        $('#score').text(score);
    };
    
    var startGame = function () {
        // Reset game state
        clearInterval(interval);
        timeLeft = parseInt($('#timer-limit').val());
        score = 0;
        updateScore(0);
        updateTimeLeft(0);
        renderNewQuestion();

        // Start timer
        interval = setInterval(function () {
            updateTimeLeft(-1);
            if (timeLeft === 0) {
                clearInterval(interval);
                interval = undefined;
            }
        }, 1000);
    };
    
    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    };
    
    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(parseInt($('#number-limit').val()));
        var num2 = randomNumberGenerator(parseInt($('#number-limit').val()));
        var operators = [];
        if ($('#addition').is(':checked')) operators.push('+');
        if ($('#subtraction').is(':checked')) operators.push('-');
        if ($('#multiplication').is(':checked')) operators.push('*');
        if ($('#division').is(':checked')) operators.push('/');
        var operator = operators[Math.floor(Math.random() * operators.length)];
        
        if (operator === '+') {
            question.answer = num1 + num2;
            question.equation = String(num1) + " + " + String(num2);
        } else if (operator === '-') {
            question.answer = num1 - num2;
            question.equation = String(num1) + " - " + String(num2);
        } else if (operator === '*') {
            question.answer = num1 * num2;
            question.equation = String(num1) + " * " + String(num2);
        } else if (operator === '/') {
            question.answer = num1 / num2;
            question.equation = String(num1) + " / " + String(num2);
        }
        
        return question;
    };
    
    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#equation').text(currentQuestion.equation);  
    };
    
    var checkAnswer = function (userInput, answer) {
        if (userInput === answer) {
            renderNewQuestion();
            $('#user-input').val('');
            updateTimeLeft(+1);
            updateScore(+1);
        }
    };
    
    $('#user-input').on('keyup', function () {
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });

    $('#start-game').on('click', function () {
        startGame();
    });
    
    renderNewQuestion();
});
