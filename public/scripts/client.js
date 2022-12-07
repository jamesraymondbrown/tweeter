/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

  
  
  // This function loops through an array of tweet objects
  // and adds them as html to our index.html file
  const renderTweets = function(tweets) {
    let $tweetHTML = "";
    for (const tweet of tweets) {

      // calls createTweetElement for each tweet, which returns our data as HTML
      $tweetHTML = createTweetElement(tweet);

      // appends our tweets to the index.html file, where they'll be displayed
      $('#tweet-container').append($tweetHTML);
    }
  };
  
  // this is a helper function called by renderTweets(), that turns the tweet data into html
  const createTweetElement = function(tweetData) {

    const $tweetInHTML = `
        <article class="individual-tweet">
          <header>
            <div name="username-container" class="username-container">
              <div>
                <img class="avatar-on-tweet" src="${tweetData.user.avatars}">
                <span class="username-on-tweet">${tweetData.user.name}</span>
              </div>
              <span class="handle-on-tweet">${tweetData.user.handle}</span>
            </div>
            <h3 class="tweet-container-main-text">${tweetData.content.text}</h3>
          </header>
          <footer>
            <p class="tweet-footer-text">${tweetData.created_at}</p>
            <div name="icon-container" class="icon-container">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
    `;

    return $tweetInHTML;
  };

  // Ajax request to display tweets on app main page
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (displayTweets) {
      renderTweets(displayTweets);
    });
  }

  loadTweets();

  // run the renderTweets function to display the stored data as tweets on our home page
  // renderTweets(data);
});