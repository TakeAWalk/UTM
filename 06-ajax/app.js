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
    $('#' + i).click(function() {
      //javascript, jQuery
      $.ajax({
        url:
          'http://api.giphy.com/v1/gifs/search?q=mad+men&api_key=kVEh3AuPwGkBkRK9x540E5QC5E7RGekm&limit=5',
        method: 'GET'
      }).then(function(response) {
        console.log(response);
        populateImages(response);
      });

      //TODO: Grab 10 static non-animated gif images from the GIPHY API and place it on this page

      //TODO: Display rating (PG, G, etc)

      //TODO: When the user click one of the still GIPHY images, the gif should animate. If the user click the gif again, it should stop playing
    });
  }
}

function populateImages(response) {
  for (var i = 0; i < response.data.length; i++) {
    console.log(response.data[i].images.downsized_still.url);
    $('#images').append(
      '<img src="' + response.data[i].images.downsized_still.url + '"></img>'
    );
  }
}

$(document).ready(function() {
  //TODO:
  createButtons('buttons');
});
