/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // This function loops through an array of tweet objects
  // and adds them as html to our index.html file
  const renderTweets = function(tweets) {
    let $tweetHTML = "";
    for (const tweet of tweets) {

      // calls createTweetElement() function for each tweet, which returns our data as HTML
      $tweetHTML = createTweetElement(tweet);

      // appends our new HTML data to the index.html file
      $('#tweet-container').append($tweetHTML);
    }
  };


  
  // this is a helper function called by renderTweets(), that turns the tweet data into html
  const createTweetElement = function(tweetData) {

    // use timeago to format render tweet date in readable format
    const formattedTweetDate = timeago.format(tweetData.created_at); 

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
            <p class="tweet-footer-text">${formattedTweetDate}</p>
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
  
});