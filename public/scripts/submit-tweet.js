$(document).ready(function() {

  console.log('submit-tweet.js file loaded');

  $( "#text-box" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();

    const $serializedTweetData = $( this ).serialize();

    console.log($serializedTweetData);

    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $serializedTweetData
    });
  });

});

