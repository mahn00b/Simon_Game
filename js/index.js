/*

Simon Sound Links:

https://s3.amazonaws.com/freecodecamp/simonSound1.mp3, https://s3.amazonaws.com/freecodecamp/simonSound2.mp3, https://s3.amazonaws.com/freecodecamp/simonSound3.mp3, https://s3.amazonaws.com/freecodecamp/simonSound4.mp3.

*/

var playerMove;
var sequence, playList, guess;
var gameStart;
var timerRef;
//variable refrences to unique color properties**************************************************************************
var lred = '#ff6666';
var orRed = '#cc0000';
var redSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';

var lgreen = '#66ff66';
var orGreen = '#29cd1a';
var greenSound = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';

var lyellow = '#ffff66';
var orYellow = '#edeb0b';
var yellowSound = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';

var lblue = '#8080ff';
var orBlue = '#1a2bcd';
var blueSound = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';

//***************************************************************

//start sequence animation*****************************





//*****************


$("#start").on('click', function() {
  console.log('game has started');

   
  sequence = new Array();
  guess = new Array();
  addToSequence();
  console.log(sequence);
  playerMove = false;
  playList = sequence.slice();
  timerRef = setTimeout(playSequence, 1000);

});

$("#stop").on('click', function() {

  playerMove = false;
  $('#counter').text('00');
});

function playColor(color, sound, lcolor, orColor) {
  var aud = new Audio(sound);
  var element = $('#' + color);

  element.css('border-color', lcolor);

  aud.addEventListener('ended', function() {
    element.css('border-color', orColor);
  });

  aud.play();

}

$(".entry").on('click', function() {
  if (playerMove) {
    var id = $(this).attr('id');
    guess.push(id);

    if (validateGuess()) {
      if (id == 'red')
        playColor(id, redSound, lred, orRed);
      else if (id == 'green')
        playColor(id, greenSound, lgreen, orGreen);
      else if (id == 'yellow')
        playColor(id, yellowSound, lyellow, orYellow);
      else if (id == 'blue')
        playColor(id, blueSound, lblue, orBlue);
    }

  }
});

function addToSequence() {
  var rand = Math.floor(Math.random() * 4) + 1;
  var id;

  switch (rand) {
    case 1:
      id = 'red';
      break;
    case 2:
      id = 'green';
      break;
    case 3:
      id = 'blue';
      break;
    case 4:
      id = 'yellow';
      break;
  }

  sequence.push(id);
  var count = $('#counter').text();
  count++;
  $('#counter').text(pad(count));

}

function playSequence() {

  var id = playList.shift();
  console.log(playList);
  console.log(sequence);

  if (id == 'red')
    playColor(id, redSound, lred, orRed);
  else if (id == 'green')
    playColor(id, greenSound, lgreen, orGreen);
  else if (id == 'yellow')
    playColor(id, yellowSound, lyellow, orYellow);
  else if (id == 'blue')
    playColor(id, blueSound, lblue, orBlue);

  if (playList.length !== 0)
    timerRef = setTimeout(playSequence, 1500);
  else {
    clearTimeout(timerRef);
    playerMove = true;
  }
}

function validateGuess() {
  var isValid = true;

  console.log('sequence: ' + sequence.length + '\nGuess: ' + guess.length);
  console.log(sequence);

  for (var i = 0; i < guess.length; i++)
    if (guess[i] != sequence[i])
      isValid = false;

  if (isValid && (guess.length == sequence.length)) {
    playerMove = false;
    addToSequence();
    playList = sequence.slice();
    guess = new Array();
    timerRef = setTimeout(playSequence, 1000);
    return true;
  } else if (isValid) {
    playerMove = true;
    return true;
  } else if (!isValid) {
    alert('wrong Guess');
    guess = new Array();
    playList = sequence.slice();
    timerRef = setTimeout(playSequence, 1000);
    return false;
  }

}

function pad(num) {
  return ('0000' + num).substr(-2);
}