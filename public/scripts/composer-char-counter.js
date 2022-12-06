// const testingFunction = () => {
//   console.log('the char counter file is linked!')
// };

// testingFunction();

$(document).ready(function() {
  // --- our code goes here ---

  // Target the textarea so we can update the character counter
  $('textarea').on('input propertychange', function() {

    // A function to calculate the number of characters remaining that can be inputted
    const charsRemaining = 140 - $(this).val().length;

    // Access the "counter" output element to change its value as a user types
    $(this).parent().children('.tweet-button-area').children('output').val(charsRemaining);

    // If the charcount becomes negative, apply new class to the output, so the number turns red on the page
    if (charsRemaining < 0) {
      $(this).parent().children('.tweet-button-area').children('output').addClass('negative-character-count');
    }; 
    // If charcount goes above -1, remove that class
    if (charsRemaining > -1 && $(this).parent().children('.tweet-button-area').children('output').hasClass('negative-character-count')) {
      $(this).parent().children('.tweet-button-area').children('output').removeClass('negative-character-count')
    }
  });
});


