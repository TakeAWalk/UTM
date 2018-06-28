$(document).ready(function() {
  // Time limit per question
  let timeLimi = 30;

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
});
