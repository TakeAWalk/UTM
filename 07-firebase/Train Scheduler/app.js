// Setup Firebase config object
var config = {
  apiKey: 'AIzaSyCU8kFnyMRvuqQoUyqg9J4vIU_dtG5eMDU',
  authDomain: 'taylor54321-1e05d.firebaseapp.com',
  databaseURL: 'https://taylor54321-1e05d.firebaseio.com',
  projectId: 'taylor54321-1e05d',
  storageBucket: 'taylor54321-1e05d.appspot.com',
  messagingSenderId: '846098862236'
};

$(document).ready(function() {
  // Initialize Firebase
  firebase.initializeApp(config);
  var db = firebase.database();

  $('.btn').click(function(event) {
    event.preventDefault();
    var trainSchedule = {
      trainName: $('#formGroupTrainNameInput').val(),
      destination: $('#formGroupDestinationInput').val(),
      firstTrainTime: moment(
        $('#formGroupFirstTrainTimeInput')
          .val()
          .trim(),
        'HH:mm'
      ).format('X'),
      frequency: $('#formGroupFrequencyInput').val()
    };
    db.ref('trainSchedule').push(trainSchedule);
  });

  db.ref('trainSchedule').on('child_added', function(childSnapshot) {
    //--- CHEAT
    var trainNames = childSnapshot.val().trainName;
    var trainDest = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var now = moment();

    var timeRemainder =
      now.diff(moment.unix(firstTrainTime), 'minutes') % trainFrequency;

    var minutesAway = trainFrequency - timeRemainder;

    var nextArrival = moment()
      .add(minutesAway, 'm')
      .format('HH:mm');

    //-- CHEAT

    var trainScheduleRow = $('<tr>');
    trainScheduleRow.append(
      $('<th>')
        .attr('scope', 'col')
        .text(childSnapshot.val().trainName),
      $('<td>')
        .attr('scope', 'col')
        .text(childSnapshot.val().destination),
      $('<td>')
        .attr('scope', 'col')
        .text(childSnapshot.val().frequency),
      $('<td>')
        .attr('scope', 'col')
        .text(nextArrival),
      $('<td>')
        .attr('scope', 'col')
        .text(minutesAway)
    );
    $('#trainSchedule').append(trainScheduleRow);
  });
});
