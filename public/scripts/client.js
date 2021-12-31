/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const esc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const data = [];

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $("#tweet-container").html(" ");
    for (let tweet of tweets) {
      let createTweet = createTweetElement(tweet);
      // $("#tweet-container").append(createTweet);
      $("#tweet-container").prepend(createTweet);
    }
  };

  const createTweetElement = function (tweet) {
    const time = timeago.format(tweet.created_at);
    let $tweet = $(`
  <article>
        <header>
          <div class="displayName">
          <img src="${tweet.user.avatars}">
          <div>${tweet.user.name}</div>
          </div>
          <div class="tweeterHandle">${tweet.user.handle}</div>
        </header>
        <p>${esc(tweet.content.text)}</p>
        <footer>
          <div>${time}</div>
          <div class="socials">
            <a class="fas fa-flag"></a>
            <a class="fas fa-retweet"></a>
            <a class="fas fa-heart"></a>
          </div>
        </footer>
      </article>
      <br>
  `);
    return $tweet;
  };

  renderTweets(data);

  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: `/tweets`,
    })
      .then((response) => {
        console.log("response = ", response);
        renderTweets(response);
      })
      .catch((error) => {
        console.log("error =", error);
      });
  };

  loadTweets();

  $("form").on("submit", function (e) {
    e.preventDefault();
    const data = $("#tweet-text").val();
    if (data.trim() === "") {
      $(".message").html("⛔️ Error, field cannot be blank! ⛔️");
      $(".alert").slideDown();
      //  return "Error, field cannot be blank!";
    } else if (data.length > 140) {
      $(".message").html("⛔️ Character limit exceeded ⛔️");
      $(".alert").slideDown();
      //  return "Character limit exceeded";
    } else {
      const tweetUrl = "/tweets/";
      $(".message").html("");
      $(".alert").slideUp();
      $.ajax({
        method: "POST",
        url: tweetUrl,
        data: $(this).serialize(),
      })

        .then((response) => {
          loadTweets();
          $(".counter").val("140");
          $("#tweet-text").val("");
        })
        .catch((error) => {});
    }
  });
});
