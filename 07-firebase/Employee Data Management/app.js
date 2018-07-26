$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyCU8kFnyMRvuqQoUyqg9J4vIU_dtG5eMDU',
    authDomain: 'taylor54321-1e05d.firebaseapp.com',
    databaseURL: 'https://taylor54321-1e05d.firebaseio.com',
    projectId: 'taylor54321-1e05d',
    storageBucket: 'taylor54321-1e05d.appspot.com',
    messagingSenderId: '846098862236'
  };

  firebase.initializeApp(config);

  // Get reference to default database
  var db = firebase.database();

  // Event handler for submit-btn, when clicked
  $('#submit-btn').on('click', function(event) {
    // Prevent page from refreshing
    event.preventDefault();

    // Create employee object
    var employee = {
      Name: $('#empName')
        .val()
        .trim(),
      Role: $('#empRole')
        .val()
        .trim(),
      StartDate: $('#empStartDate')
        .val()
        .trim(),
      MonthlyRate: $('#empMthRate')
        .val()
        .trim()
    };

    // Push empoyee object to database
    db.ref().push({ employee });
  });

  // Listen for when a child is added
  db.ref()
    .limitToLast(100)
    .orderByChild('employee/Name')
    .on(
      'child_added',
      function(snapshot) {
        var empRow = $('<tr>');

        var empDataName = $('<td>');
        empDataName.text(snapshot.val().employee.Name);
        empRow.append(empDataName);

        var empDataRole = $('<td>');
        empDataRole.text(snapshot.val().employee.Role);
        empRow.append(empDataRole);

        var empDataStartDate = $('<td>');
        empDataStartDate.text(snapshot.val().employee.StartDate);
        empRow.append(empDataStartDate);

        // Months Worked
        var startDate = moment('12/25/1995', 'MM-DD-YYYY');
        var endDate = moment(Date);
        empRow.append($('<td>').text('12345'));

        var empDataMonthlyRate = $('<td>');
        empDataMonthlyRate.text(snapshot.val().employee.MonthlyRate);
        empRow.append(empDataMonthlyRate);

        // Total Billed ($)
        empRow.append($('<td>').text('54321'));

        $('#table-body').append(empRow);
      },
      function(error) {
        console.log(error);
      }
    );
});
