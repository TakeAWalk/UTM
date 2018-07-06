$(document).ready(function() {
  // Time limit per question
  let timeLimit = 6;
  let answerDisplayTime = 5;

  var currentQuestion = 0;
  var paused = false;

  // Take a copy of the current DOM for reset
  var reset = $('#container').clone();

  var performance = {
    correct: 0,
    incorrect: 0,
    unanswered: 0
  };

  // Define trivia questions and answers
  let triviaQuestions = [
    {
      question: 'What character does Meghan Markle play in the show suits?',
      answers: [
        'Katrina Bennett',
        'Jessica Pearson',
        'Donna Paulsen',
        'Rachel Zane'
      ],
      rightAnswer: 4
    },
    {
      question: 'Luke Cage has what super power?',
      answers: [
        'Invisibility',
        'Bullet proof skin',
        'Laser beam eyes',
        'A shield'
      ],
      rightAnswer: 2
    }
  ];

  /* 
      Reusing the stopwatch code from our class activity
  */

  //  Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;

  // Our stopwatch object
  var stopwatch = {
    time: 0,

    reset: function() {
      stopwatch.time = timeLimit;

      // DONE: Change the "display" div "
      $('#display').text('Time Remaining: ' + stopwatch.time + ' Seconds');
    },
    start: function(elapsed) {
      // DONE: Use setInterval to start the count here and set the clock to running.
      stopwatch.time = elapsed;
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
    },
    stop: function() {
      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    count: function() {
      // DONE: increment time by 1, remember we cant use "this" here.
      stopwatch.time--;

      // DONE: Show the time in the "display" div.
      $('#display').text('Time Remaining: ' + stopwatch.time + ' Seconds');

      if (stopwatch.time === 0) {
        if (!paused) {
          alert('unanswered');
          performance.unanswered++;
        }
        stopwatch.stop();
        paused = false;
        $('#question').show();
        $('#question-result').hide();
        NextQuestion();
      }
    }
  };

  function NextQuestion() {
    stopwatch.start(timeLimit);

    if (currentQuestion < triviaQuestions.length) {
      $('#trivia_question').text(triviaQuestions[currentQuestion].question);
      $('#answer-1').text(triviaQuestions[currentQuestion].answers[0]);
      $('#answer-2').text(triviaQuestions[currentQuestion].answers[1]);
      $('#answer-3').text(triviaQuestions[currentQuestion].answers[2]);
      $('#answer-4').text(triviaQuestions[currentQuestion].answers[3]);

      $('#answer-1').unbind();
      $('#answer-2').unbind();
      $('#answer-3').unbind();
      $('#answer-4').unbind();

      if (triviaQuestions[currentQuestion].rightAnswer === 1) {
        $('#answer-1').click(Right);
        $('#answer-2').click(Wrong);
        $('#answer-3').click(Wrong);
        $('#answer-4').click(Wrong);
      } else if (triviaQuestions[currentQuestion].rightAnswer === 2) {
        $('#answer-1').click(Wrong);
        $('#answer-2').click(Right);
        $('#answer-3').click(Wrong);
        $('#answer-4').click(Wrong);
      } else if (triviaQuestions[currentQuestion].rightAnswer === 3) {
        $('#answer-1').click(Wrong);
        $('#answer-2').click(Wrong);
        $('#answer-3').click(Right);
        $('#answer-4').click(Wrong);
      } else {
        $('#answer-1').click(Wrong);
        $('#answer-2').click(Wrong);
        $('#answer-3').click(Wrong);
        $('#answer-4').click(Right);
      }
      currentQuestion++;
    } else {
      GameOver();
    }
  }

  function GameOver() {
    stopwatch.stop();
    $('#question').hide();

    $('#result').show();
    $('#correct').text('Correct Answers: ' + performance.correct);
    $('#incorrect').text('Incorrect Answers: ' + performance.incorrect);
    $('#unanswered').text('Unanswered: ' + performance.unanswered);
  }

  function Wrong() {
    $('#question').hide();
    $('#question-result').show();
    $('#right-wrong').text('Nope!');
    $('#right-wrong-text').text(
      'The Correct Answer was: ' +
        triviaQuestions[currentQuestion - 1].answers[
          triviaQuestions[currentQuestion - 1].rightAnswer - 1
        ]
    );

    stopwatch.stop();
    performance.incorrect++;

    paused = true;
    stopwatch.start(5);
  }

  function Right() {
    $('#question').hide();
    $('#question-result').show();
    $('#right-wrong').text('Correct!');
    $('#right-wrong-text').text('');

    stopwatch.stop();
    performance.correct++;

    paused = true;
    stopwatch.start(5);
  }

  $('#question').hide();
  $('#result').hide();

  $('#start').on('click', function() {
    $('#question').show();
    $('#start').hide();
    stopwatch.start();

    NextQuestion();
  });

  function Reset() {
    currentQuestion = 0;
    performance.correct = 0;
    performance.uncorrect = 0;
    performance.unanswered = 0;

    // Reset DOM to initial state
    $('#container').replaceWith(reset.clone());
    stopwatch.reset();
    $('#question').hide();
    $('#result').hide();

    $('#reset').click(Reset);

    $('#start').on('click', function() {
      $('#question').show();
      $('#start').hide();
      stopwatch.start(timeLimit);

      NextQuestion();
    });
  }

  $('#reset').click(Reset);
});
