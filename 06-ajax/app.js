/* API Key: kVEh3AuPwGkBkRK9x540E5QC5E7RGekm */

var topics = [
  'Anne',
  'Alias Grace',
  'Travelers',
  'Peaky Blinders',
  'Mindhunter',
  'The People v. O.J. Simpson: American Crime Story',
  'Mad Men',
  'Breaking Bad',
  'Better Call Saul',
  'The West Wing',
  'The Returned'
];

function createButtons(elementID) {
  //Loop through the topics array
  for (var i = 0; i < topics.length; i++) {
    //Create buttons for each index
    $('#' + elementID).append(
      '<button id = ' + i + '>' + topics[i] + '</button>'
    );

    //Assign click function to each index
    $('#' + i).click(function(topics) {
      queryGiphy(this.id);

      //TODO: Display rating (PG, G, etc)
      //TODO: When the user click one of the still GIPHY images, the gif should animate. If the user click the gif again, it should stop playing
    });
  }
}

function populateImages(response) {
  //TODO: Grab 10 static non-animated gif images from the GIPHY API and place it on this page
  for (var i = 0; i < response.data.length; i++) {
    console.log(response.data[i].images.downsized_still.url);
    $('#images').append(
      '<p>Rating: ' +
        response.data[i].rating +
        '<br /><img src="' +
        response.data[i].images.downsized_still.url +
        '" class="img-fluid"></img></p>'
    );
  }
}

function queryGiphy(callingElement) {
  //Create giphy URL
  var queryURL =
    'http://api.giphy.com/v1/gifs/search?q=' +
    topics[callingElement] +
    '&api_key=kVEh3AuPwGkBkRK9x540E5QC5E7RGekm&limit=10';

  //Make API call to Giphy
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    populateImages(response);
  });
}

$(document).ready(function() {
  //TODO:
  createButtons('buttons');
});
