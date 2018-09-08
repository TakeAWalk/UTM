var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

function Friend(name, photo, scores) {
  this.name = name;
  this.photo = photo;
  this.scores = scores;

  this.compareScores = friend => {
    var acc = 0;
    this.scores.forEach(
      (currentValue, currentIndex) =>
        (acc += Math.abs(currentValue - friend.scores[currentIndex]))
    );
    return acc;
  };
}

var friendA = new Friend('Charlie', 'no photo', [4, 3, 4]);
var friendB = new Friend('Donald', 'no photo', [10, 2, 3]);

console.log(friendA.compareScores(friendB));
