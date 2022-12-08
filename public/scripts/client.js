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
    if (tweets.length > 1) {
      for (const tweet of tweets) {

        // calls createTweetElement() function for each tweet, which returns our data as HTML
        $tweetHTML = createTweetElement(tweet);

        // appends our new HTML data to the index.html file
        $('#tweet-container').append($tweetHTML);
      } 
    }
    else {
        // no need to loop when only one tweet is passed through
        $tweetHTML = createTweetElement(tweets);

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

  // WHEN A TWEET IS SUBMITTED =>
  $( "#text-box" ).submit(function( event ) {
    event.preventDefault();

    alert( "tweet submitted");

    // convert our input text into a string, to check its length and value
    // found help from https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
    const $inputTextSerialized = $(this).serialize();    
    const inputAsObject = JSON.parse('{"' + $inputTextSerialized.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    const inputTextAsString = inputAsObject.text;

    if (inputTextAsString === "" || inputTextAsString === null) {
      alert( "Please write in the text box before clicking \"tweet\"");
      return false;
    }

    if (inputTextAsString.length > 140) {
      alert( "Tweets can be a maximum of 140 characters");
      return false;
    }

    //Get the new tweet using AJAX
    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $inputTextSerialized
    });

    // Display the new tweet using AJAX
    $.ajax({
      url: '/tweets',
      method: 'GET'
    })
    .then((data) => {
      let newestTweet = data[data.length-1]
      // console.log('getting my data', newestTweet.length);
      renderTweets(newestTweet)
    })
    // .catch((error) => {
    //   console.log('error', error);
    // });

    $("#text-box")[0].reset();

  });

  loadTweets();

});