$(document).ready(function(){
    $(document).ready(function () {
        var currentQuestion;
        var interval;
        var timeLeft = 15;
        var score = 0;
        var highScore = 0;
      
        var updateTimeLeft = function (amount) {
          timeLeft += amount;
          $('#time-left').text(timeLeft);
        };
      
        var updateScore = function (amount) {
          score += amount;
          $('#score').text(score);
          if (score > highScore) {
            highScore = score;
            $('#high-score').text(highScore);
          }
        };
      
        var startGame = function () {
          if (!interval) {
            if (timeLeft === 0) {
              updateTimeLeft(15);
              updateScore(-score);
            }
            interval = setInterval(function () {
              updateTimeLeft(-1);
              if (timeLeft === 0) {
                clearInterval(interval);
                interval = undefined;
              }
            }, 1000);
          }
        };
      
        var randomNumberGenerator = function (size) {
          return Math.ceil(Math.random() * size);
        };
      
        var questionGenerator = function () {
          var question = {};
          var num1 = randomNumberGenerator(Number($('#number-limit').val()));
          var num2 = randomNumberGenerator(Number($('#number-limit').val()));
      
          var difficulty = $('#difficulty').val();
          if (difficulty === 'easy') {
            question.answer = num1 + num2;
            question.equation = String(num1) + " + " + String(num2);
          } else if (difficulty === 'medium') {
            question.answer = num1 - num2;
            question.equation = String(num1) + " - " + String(num2);
          } else if (difficulty === 'hard') {
            question.answer = num1 * num2;
            question.equation = String(num1) + " * " + String(num2);
          }
      
          console.log(question);
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
          startGame();
          checkAnswer(Number($(this).val()), currentQuestion.answer);
        });
      
        renderNewQuestion();
      });
    
  });