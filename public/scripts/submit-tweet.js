$(document).ready(function() {

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

    $.ajax({
      url: "/tweets/",
      type: "POST",
      data: $inputTextSerialized
    });
  });

});