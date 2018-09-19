// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  console.log("loaded");
  $(".devour").on("click", function(event) {
    var newBurger = {
      id: $(this).data("id"),
      burger_name: $(this).attr("burger_name"),
      devoured: 1,
      name: "David"
    };

    console.log(newBurger);

    // Send the PUT request.
    $.ajax("/", {
      type: "PUT",
      data: newBurger
    }).then(function() {
      console.log("Updated burger to", newBurger);
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".make-burger").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Send the POST request.
    $.ajax("/", {
      type: "POST",
      data: { burger_name: $("#burger_name").val() }
    }).then(function() {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
