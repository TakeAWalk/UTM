// Dependencies
// =============================================================
var Friend = require("../data/friends.js");

/*  
    Your `apiRoutes.js` file should contain two routes:

   * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.  
*/

// Collection of friends
var friends = [];

// Pre-populate array with some friends
friends.push(
  new Friend(
    "Charlie",
    "https://parade.com/wp-content/uploads/2017/03/george-newbern-scandal-ftr.jpg",
    [4, 3, 4, 2, 4, 3, 1, 4, 4, 2]
  )
);
friends.push(
  new Friend(
    "Donald",
    "https://s.abcnews.com/images/US/donald-trump-gty-mt-180906_hpMain_16x9_992.jpg",
    [1, 2, 3, 4, 5, 1, 1, 3, 4, 1]
  )
);
friends.push(
  new Friend(
    "Sierra",
    "http://www.thisissierraleone.com/wp-content/uploads/2012/08/Desmond-Elliot.jpg",
    [4, 3, 3, 4, 3, 4, 2, 3, 4, 1]
  )
);
friends.push(
  new Friend(
    "Cia",
    "https://uznayvse.ru/images/content/2018/6/uzn_15281177605.jpg",
    [3, 3, 3, 4, 3, 4, 2, 3, 4, 1]
  )
);

module.exports = function(app) {
  // Displays all friends
  app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });

  // Create New Friends - takes in JSON input
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newFriend = req.body;

    friend = new Friend(newFriend.name, newFriend.photo, [
      parseInt(newFriend.scores[0]),
      parseInt(newFriend.scores[1]),
      parseInt(newFriend.scores[2]),
      parseInt(newFriend.scores[3]),
      parseInt(newFriend.scores[4]),
      parseInt(newFriend.scores[5]),
      parseInt(newFriend.scores[6]),
      parseInt(newFriend.scores[7]),
      parseInt(newFriend.scores[8]),
      parseInt(newFriend.scores[9])
    ]);

    // Add friend to array
    friends.unshift(friend);

    // Place holder variables to determine best friend
    var lowest = 100;
    var bestFriend = 1;

    // Inspect each friend for compatibility
    friends.forEach((val, currIndex) => {
      if (friends[0].compareScores(val) < lowest && currIndex != 0) {
        lowest = friends[0].compareScores(val);
        bestFriend = currIndex;
      }
    });

    // Return best friend
    res.json(friends[bestFriend]);
  });
};
