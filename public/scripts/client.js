$(document).ready(function() {

  // This function loops through the tweet object
  // and adds tweets as html to our index.html file
  const renderTweets = function(tweets) {
    let $tweetHTML = "";
    //on page load, it loops through all tweets, to display them
    if (tweets.length > 1) {
      for (const tweet of tweets) {

        // calls createTweetElement() function for each tweet, which returns our data as HTML
        $tweetHTML = createTweetElement(tweet);

        // appends our new HTML data to the index.html file
        $('#tweet-container').append($tweetHTML);
      }
    }
    // no need to loop when only one tweet is submitted
    // so it just grabs the newest tweet
    else {
      $tweetHTML = createTweetElement(tweets);
      $('#tweet-container').append($tweetHTML);
    }
  };


  // this is a helper function called by renderTweets(), that turns the tweet data into html
  const createTweetElement = function(tweetData) {

    // use timeago to format render tweet date in readable format
    const formattedTweetDate = timeago.format(tweetData.created_at);

    // turn string literals into safe text
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `<p>${escape(tweetData.content.text)}</p>`;

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
            <h3 class="tweet-container-main-text">${safeHTML}</h3>
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
  

  // Ajax request to display tweets on page load
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (displayTweets) {
        renderTweets(displayTweets);
      });
  }

  // On tweet submit:
  $("#text-box").submit(function(event) {
    event.preventDefault();

    // convert our input text into a string, to check its length and value
    // found help from https://stackoverflow.com/questions/8648892/how-to-convert-url-parameters-to-a-javascript-object
    const $inputTextSerialized = $(this).serialize();
    const inputAsObject = JSON.parse('{"' + $inputTextSerialized.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    const inputTextAsString = inputAsObject.text;


    // Display error message if text is less than 1 or greater than 140 chars
    if (inputTextAsString === "" || inputTextAsString === null) {
      const errorMessage = document.getElementById('user-input-error-message');
      $("#user-input-error-message").slideUp("slow");
      if (!errorMessage.textContent.includes('Please')) {
        $("#user-input-error-message").append("Please write in the text box before clicking \"tweet\"");
      }
      $("#user-input-error-message").slideDown("slow");
      return false;
    }

    if (inputTextAsString.length > 140) {
      const errorMessage = document.getElementById('user-input-error-message');
      $("#user-input-error-message").slideUp("slow");
      if (!errorMessage.textContent.includes('Tweets')) {
        $("#user-input-error-message").append("Tweets can be a maximum of 140 characters");
      }
      $("#user-input-error-message").slideDown("slow");
      return false;
    }

    $("#user-input-error-message").slideUp("slow");

    //Create functions to call POST and GET the tweet with ajax
    const postTweet = () => {
      return $.ajax({
        url: "/tweets/",
        type: "POST",
        data: $inputTextSerialized
      });
    };
    
    const retrieveData = () => {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
        .then((data) => {
          const newestTweet = data[data.length - 1];
          renderTweets(newestTweet);
        })
        .catch((error) => {
          console.log('error', error);
        });
    };

    //Call POST function, then GET data when that's done
    postTweet().done(retrieveData);

    $("#text-box")[0].reset();

  });

  loadTweets();

});