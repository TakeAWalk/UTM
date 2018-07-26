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
      firstTrainTime: $('#formGroupFirstTrainTimeInput').val(),
      frequency: $('#formGroupFrequencyInput').val()
    };
    db.ref('trainSchedule').push(trainSchedule);
  });

  db.ref('trainSchedule').on('child_added', function(childSnapshot) {
    console.log(childSnapshot.val());
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
        .text(childSnapshot.val().firstTrainTime)
    );
    $('#trainSchedule').append(trainScheduleRow);
  });
});
