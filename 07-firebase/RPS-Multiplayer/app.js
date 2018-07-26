// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCU8kFnyMRvuqQoUyqg9J4vIU_dtG5eMDU',
  authDomain: 'taylor54321-1e05d.firebaseapp.com',
  databaseURL: 'https://taylor54321-1e05d.firebaseio.com',
  projectId: 'taylor54321-1e05d',
  storageBucket: 'taylor54321-1e05d.appspot.com',
  messagingSenderId: '846098862236'
};

var playerNum;

function gameResult(p1Choice, p2Choice) {
  if (p1Choice === 'rock' && p2Choice === 'paper') {
    return 'p2';
  } else if (p1Choice === 'rock' && p2Choice === 'scissors') {
    return 'p1';
  } else if (p1Choice === 'paper' && p2Choice === 'rock') {
    return 'p1';
  } else if (p1Choice === 'paper' && p2Choice === 'scissors') {
    return 'p2';
  } else if (p1Choice === 'scissors' && p2Choice === 'paper') {
    return 'p1';
  } else if (p1Choice === 'scissors' && p2Choice === 'paper') {
    return 'p1';
  } else {
    return 'tied';
  }
}

// Setups database
function setupDatabase(db) {
  // Queries the database for player 1's name
  db.ref('players/1/name')
    .once('value')
    .then(function(snapshot) {
      if (snapshot.val().length > 0) {
        $('#left').text(snapshot.val());
      }
    });

  // Queries the database for player 2's name
  db.ref('players/2/name')
    .once('value')
    .then(function(snapshot) {
      // Checks to see if a 2nd player is assigned
      if (snapshot.val().length > 0) {
        // Reset the game to original settings
        db.ref('players/1/losses').set(0);
        db.ref('players/1/wins').set(0);
        db.ref('players/1/name').set('');
        db.ref('players/1/choice').set('');
        db.ref('players/2/losses').set(0);
        db.ref('players/2/wins').set(0);
        db.ref('players/2/name').set('');
        db.ref('players/2/choice').set('');
      }
    });
}

$(document).ready(function() {
  // Initialize Firebase
  firebase.initializeApp(config);
  var db = firebase.database();

  setupDatabase(db);

  // When player clicks submit button after entering name
  $('.btn').click(function(event) {
    event.preventDefault();

    // Gets the value of player 1's name
    db.ref('players/1/name')
      .once('value')
      .then(function(snapshot) {
        // Gets the player name entered by the user
        var playerName = $('.form-control').val();

        // If player 1's name i entered, instead record to player 2, otherwise record player 1's name.
        if (snapshot.val().length === 0) {
          playerNum = 1;
          db.ref('players/1/name').set(playerName);
        } else {
          playerNum = 2;
          db.ref('players/2/name').set(playerName);
        }
      });
  });

  // ----LISTENERS----------------------------

  // Listen to the value of player 1's name
  db.ref('players/1/name').on('value', function(snapshot) {
    var playerName = snapshot.val();

    // Ignores if the game is being reset
    if (playerName.length > 0) {
      // Updates play area for bother players
      $('#left').text(playerName);

      // Updates play area for player 1
      if (playerNum === 1) {
        $('#player').text('Hi ' + playerName + '! You are Player 1');

        // Updates play area for player 2
      } else if (playerNum === 2) {
      }
    }
  });

  // Listen to the value of player 2's name
  db.ref('players/2/name').on('value', function(snapshot) {
    var playerName = snapshot.val();

    // Ignores if the game is being reset
    if (playerName.length > 0) {
      // Updates play area
      $('#right').text(playerName);

      // Updates play area for player 1
      if (playerNum === 1) {
        // Create 3 buttons
        appendRPS('#left');

        // Updates the play area for player 2
      } else if (playerNum === 2) {
        $('#player').text(
          'Hi ' +
            playerName +
            '! You are Player 2. Waiting for player 1 to choose'
        );
      }
    }
  });

  // Listen to the choice valueof player 1
  db.ref('players/1/choice').on('value', function(snapshot) {
    if (snapshot.val().length > 0 && playerNum == 2) {
      appendRPS('#right');
    }
  });

  // Listen to the choice valueof player 2
  db.ref('players/2/choice').on('value', function(snapshot) {
    if (snapshot.val().length > 0) {
      var player2Choice = snapshot.val();
      var player1Choice;

      db.ref('players/1/choice')
        .once('value')
        .then(function(snapshot) {
          player1Choice = snapshot.val();
          console.log('INNER' + snapshot.val());

          console.log(player1Choice);
          console.log(player2Choice);

          var result = gameResult(player1Choice, player2Choice);

          if (result === 'tied') {
            $('#middle').text('Tied');
          } else if (result === 'p1') {
            $('#middle').text('Player 1 wins');

            db.ref('players/1/wins')
              .once('value')
              .then(function(snapshot) {
                db.ref('players/2/wins').set(snapshot.val() + 1);
              });
          } else if (result === 'p2') {
            $('#middle').text('Player 2 wins');

            db.ref('players/2/wins')
              .once('value')
              .then(function(snapshot) {
                db.ref('players/2/wins').set(snapshot.val() + 1);
              });
          }

          $('#middle')
            .append($('<button>').text('Next Round'))
            .click(function() {
              nextRound();
            });
        });
    }
  });

  // ----FUNCTIONS--------------------------
  function nextRound() {
    db.ref('players/1/choice').set('');
    db.ref('players/2/choice').set('');
  }

  function appendRPS(elementID) {
    $(elementID).append(
      $('<button>')
        .attr('id', 'rock')
        .text('Rock')
        .click(function() {
          alert('Rock');
          console.log(this.id);
          updateChoice(this.id);
        })
    );

    $(elementID).append(
      $('<button>')
        .attr('id', 'paper')
        .text('Paper')
        .click(function() {
          alert('Paper');
          console.log(this.id);
          updateChoice(this.id);
        })
    );

    $(elementID).append(
      $('<button>')
        .attr('id', 'scissors')
        .text('Scissors')
        .click(function() {
          alert('Scissors');
          console.log(this.id);
          updateChoice(this.id);
        })
    );
  }

  function updateLeft() {
    db.ref('players/1/choice')
      .once('value')
      .then(function(snapshot) {
        $('#left').append(snapshot.val());
      });
  }

  function updateRight() {
    db.ref('players/2/choice')
      .once('value')
      .then(function(snapshot) {
        $('#right').append(snapshot.val());
      });
  }

  function updateChoice(choice) {
    if (playerNum === 1) {
      db.ref('players/1/choice')
        .set(choice)
        .then(updateLeft());
    } else {
      db.ref('players/2/choice')
        .set(choice)
        .then(updateRight());
    }
  }
});
