var game = {
  word: '',
  guesses_left: 12,
  letters_guessed: [],
  wins: 0,
  assignWord: function() {
    var words = [
      'stranger things',
      'house of cards',
      'friends',
      'the crown',
      'jessica jones',
      'suits'
    ];
    this.word = words[Math.floor(Math.random() * words.length)];
  },

  resetGame: function() {
    this.guesses_left = 12;
    this.letters_guessed = [];
    this.assignWord();
  },

  gussedAlready: function(letter) {
    for (var i = 0; i < this.letters_guessed.length; i++) {
      /* console.log(game.letters_guessed);
      console.log(
        'Length of letters_guessed array: ' + game.letters_guessed.length
      );
      console.log('Current value of i: ' + i); */
      console.log(
        'Input Letter: ' +
          letter +
          ' Current Letter: ' +
          this.letters_guessed[i].toLocaleLowerCase()
      );
      if (letter === this.letters_guessed[i].toLowerCase()) {
        return true;
      }
    }
    this.letters_guessed.push(letter);
    this.guesses_left -= 1;
    console.log('Guesses left: ' + this.guesses_left);
    console.log('Current list of letters guessed: ' + this.letters_guessed);
    return false;
  },

  guessLetter: function(letter) {
    /* letters_guessed.push(letter); */
    document.getElementById('start').textContent = 'Letter Guessed: ' + letter;
    for (var i = 0; i < this.word.length; i++) {
      if (letter === this.word[i].toLowerCase()) {
        return true;
      }
    }
    return false;
  },

  currentWordState: function() {
    var currentWord = '';
    for (var i = 0; i < this.word.length; i++) {
      if (this.word[i] === ' ') {
        currentWord += ' ';
      } else if (this.letters_guessed.includes(this.word[i])) {
        currentWord += this.word[i];
      } else {
        currentWord += '_';
      }
    }
    document.getElementById('current-word').textContent =
      'Current Word: ' + currentWord;
    document.getElementById('remaning-guesses').textContent =
      'Number of guesses remaining: ' + this.guesses_left;
    document.getElementById('already-guessed').textContent =
      'Letters already guessed: ' + this.letters_guessed;
    return currentWord;
  },

  won: function() {
    this.resetGame();
    this.wins += 1;
    console.log('You win!');
    console.log('Current wins: ' + this.wins);
    document.getElementById('wins').textContent = 'Wins: ' + this.wins;
    document.getElementById('start').textContent =
      'You win! Press any key to start again.';
  },

  lost: function() {
    this.resetGame();
    console.log('You lose!');
    console.log('Current wins: ' + this.wins);
    document.getElementById('start').textContent =
      'You lose. Press any key to start again.';
  }
};

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

game.assignWord();

document.onkeyup = function(event) {
  document.getElementById('start').textContent = '';
  console.log(game.word);
  var userInput = event.key.toLowerCase();

  if (isLetter(userInput)) {
    console.log('User Input: ' + userInput);

    if (game.gussedAlready(userInput)) {
      document.getElementById('start').textContent =
        'You already guessed that letter. Try another.';
    } else {
      console.log(game.guessLetter(userInput));
      console.log(game.currentWordState());

      if (game.currentWordState() === game.word) {
        game.won();
      } else if (game.guesses_left === 0) {
        game.lost();
      }
    }
  } else {
    document.getElementById('start').textContent = 'Press a valid key. [a-z]';
  }
};
