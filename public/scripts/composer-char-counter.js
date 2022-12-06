// const testingFunction = () => {
//   console.log('the char counter file is linked!')
// };

// testingFunction();

$(document).ready(function() {
  // --- our code goes here ---

  $('textarea').on('input propertychange', function() {
    //console.log(140 - $(this).val().length);
  
    //A function to calculate the number of characters remaining that can be inputted
    const charsRemaining = 140 - $(this).val().length

    //Access the "counter" output element to change its value as a user types
    $(this).parent().children('.tweet-button-area').children('output').val(charsRemaining);


  })

  console.log('the char counter file is linked! And the document ready function is working')
  console.log()
});


