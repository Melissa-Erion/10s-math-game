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
