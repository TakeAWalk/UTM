module.exports = function(name, photo, scores) {
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
};
