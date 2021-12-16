/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (let tweet of tweets) {
    let createTweet = createTweetElement(tweet);
    $("#tweet-container").append(createTweet);
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
        <p>${tweet.content.text}</p>
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

$("form").on("submit", function (e){
  e.preventDefault();

  const data = $('#tweet-text').val();
   if (data.trim() === "") {
     return "Error, field cannot be blank!";
   } else if (data.length > 140) {
     return "Character limit exceeded"
   } else {
     const tweetUrl = '/tweets/';
     $.ajax({
       method: 'POST',
       url: tweetUrl,
       data:  $(this).serialize(),
       success(data){
          console.log('success');
       }
     });
   }
});