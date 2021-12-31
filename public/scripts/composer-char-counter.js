//char counter if tweet exceeds 140 char then counter turns red and shows neg nums
$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let counter = $(".counter");
    counter.text(140 - $(this).val().length);

    if (counter.text() < 0) {
      counter.css("color", "red");

      console.log($(".counter"));
    } else {
      counter.css("color", "black");
    }
  });
});
