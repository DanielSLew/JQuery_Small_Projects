const Game = function() {
  const zCode  = 122;
  const aCode  = 97;
  let $letters = $('#spaces');
  let $guesses = $('#guesses');
  let $apples  = $('#apples');
  let $message = $('#message');
  let $replay  = $('#replay');
  let $body    = $('body');
  

  function displayMessage(text) {
    $message.text(text);
  }

  let randomWord = function() {
    let words = ['apple', 'banana', 'orange', 'pear'];

    return function() {
      let maxIdx = words.length;
      let word   = words.splice(Math.floor(Math.random() * maxIdx), 1)[0];
      return word;
    }
  }();

  function createBlanks(length) {
    $("span").remove();
    
    for (let i = 0; i < length; i++) {
      $letters.append($('<span />'));
    }

    Game.$spaces = $("#spaces span");
  }

  function addGuess(letter) {
    Game.letters.push(letter);
    let guess = $('<span />');

    $guesses.append(guess.text(letter));

    if (addCorrectGuesses(letter) === false) {
      Game.incorrectGuesses += 1;
      $apples.removeClass().addClass('guess_' + Game.incorrectGuesses);
    }
  }

  function addCorrectGuesses(letter, startIdx = 0) {
    let idx = Game.word.indexOf(letter, startIdx);
    if (idx === -1) return false;

    Game.$spaces.eq(idx).text(letter);
    Game.correctSpaces += 1;

    addCorrectGuesses(letter, idx + 1);
  }

  function invalidGuess(letter) {
    let keyCode    = letter.charCodeAt(0);
    let invalidKey = letter.length === 1 && keyCode <= zCode && keyCode >= aCode;

    return Game.letters.includes(letter) && invalidKey;
  }

  function gameOver(message, state) {
    displayMessage(message);
    $body.addClass(state);
    $replay.toggle();
    $(document).off('keypress'); 
  }

  function checkGameOver() {
    if (Game.incorrectGuesses === Game.maxGuesses) {
      gameOver("Sorry! You're out of guesses!", 'lose');
    } else if (Game.correctSpaces === Game.word.length) {
      gameOver('You win!', 'win')
    }
  }

  function startGame() {
    $message.text('');
    $replay.toggle();
    $body.removeClass();
    $apples.removeClass();
    createBlanks(Game.word.length);

    $(document).on('keypress', function(e) {
      let letter = e.key;
      if (invalidGuess(letter)) return;
      addGuess(letter);
      checkGameOver();
    });
  }

  $replay.click(function(e) {
    e.preventDefault();
    Game.init();
  });

  return {
    init: function() {
      this.word = randomWord();

      if (!this.word) {
        displayMessage("Sorry, I've run out of words!");
        return;
      } 

      this.incorrectGuesses = 0;
      this.correctSpaces    = 0;
      this.maxGuesses       = 6;
      this.letters          = [];

      startGame();
    },
  };
}();

Game.init();
