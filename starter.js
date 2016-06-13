// create library for words and their synonyms classed by closeness for each level
var level123 = {
  'Awesome (adj, amazing)' : {
    close : ["astonishing", "beautiful", "imposing", "impressive", "overwhelming", "fabulous", "stunning", "sublime", "wonderful"],
    related : ["grand", "moving", "striking", "mind-blowing", "majestic"]
  },
  'Easy (adj, not difficult)' : {
    close : ["accessible","clear","obvious","simple","smooth"],
    related : ["apparent","basic","elementary","evident","light","little","plain"]
  },
  'Baby (noun, infant)' : {
    close : ["child", "kid", "youngster", "toddler"],
    related : ["newborn", "little one"]
  },
  'True (adj, valid)' : {
    close : ["accurate", "appropriate", "correct", "legitimate", "sincere", "authentic", "truthful", "typical"],
    related : ["exact", "right", "actual", "precise", "staight", "fitting"]
  },
  'Wrong (adj, incorrect)' : {
    close : ["bad", "false", "mistaken", "inaccurate", "untrue"],
    related : ["faulty", "inexact", "defective", "fallacious"]
  },
  'Answer (noun, reply)' : {
    close : ["comment", "feedback", "report", "response", "return", "solution", "result"],
    related : ["repartee", "riposte", "comeback", "defense", "dsclosure"]
  },
  'Style (noun, manner)' : {
    close : ["genre", "kind", "typer", "way", "design", "form", "mode", "technique", "method", "trend", "pattern", "variety", "tone"],
    related : ["sort", "custom", "cuo of tea", "appearance"]
  },
  'Dangerous (adj, hasardous)' : {
    close : ["alarming", "bad", "critical", "deadly", "fatal", "risky", "serious", "terrible", "threating", "unsafe", "unstable"],
    related : ["insecure", "jeopardous", "menacing", "mortal", "pressing"]
  }
}

var level45 = {
  'Opinion (noun, belief)' : {
    close : ["conclusion", "idea", "impression", "judgment", "mind", "notion", "point of view", "reaction", "theory", "speculation", "thought", "view", "viewpoint", "assessment"],
    related : ["conception", "estimation", "guess", "hypothesis", "take", "supposition"]
  },
  'Common (adj, ordinary)' : {
    close : ["accepted", "commonplace", "everyday", "familiar", "frequent", "natural", "prevalent", "routine", "typical", "universal"],
    related : ["current", "daily", "general", "plain", "regular", "casual", "standart", "conventional", "usual", "stereotyped"]
  },
  'Happy (adj, high spirit)' : {
    close : ["cheerful", "contented", "delighted", "ecstatic", "glad", "joyful", "joyous", "lively", "merry", "pleasant", "pleased", "thrilled", "upbeat"],
    related : ["blissful", "content", "convivial", "exultant", "gratified", "jolly", "laughing", "light", "up", "playful"]
  },
  'Angry (adj, mad)' : {
    close : ["annoyed", "bitter", "enraged", "exasperated", "furious", "irritable", "irritated", "offended", "outraged", "resentful"],
    related : ["choleric", "displeased", "exacerbated", "ferocious", "fierce", "hateful", "infuriated", "provoked", "raging", "storming", "vexed", "tumultuous"]
  },
  'Develop (verb, expand)' : {
    close : ["advance", "broaden", "build up", "cultivate", "deepen", "evolve", "exploit", "improve", "intensify", "perfect", "refine", "spread", "strengthen"],
    related : ["actualize", "amplify", "augment", "dilate", "elaborate", "enlarge", "extend", "magnify", "stretch", "unfold", "widen"]
  },
  'Smart (adj, intelligent)' : {
    close : ["agile", "brainy", "bright", "brilliant", "canny", "crafty", "quick", "sharp", "resourceful", "wise", "good", "bold"],
    related : ["alert", "genius", "knowing", "pointed", "clever", "impertinent", "ingenious", "sassy", "quick-witted"]
  },
  'Funny (adj, comical' : {
    close : ["humorous", "amusing", "entertaining", "absurd", "hilarious", "ludicrous", "playful", "ridiculous", "silly"],
    related : ["jolly", "riot", "capricious", "diverting", "facetious", "hysterical", "joking", "laughable", "merry", "risible", "witty"]
  },
  'Weird (adj, bizarre)' : {
    close : ["odd", "creepy", "curious", "eccentric", "freaky", "funky", "peculiar", "spooky", "strange", "unnatural", "supernatural"],
    related : ["grotesque", "occult", "oddball", "singular", "dreadful"]
  },
  'Courageous (adg, brave)' : {
    close : ["bold", "adventurous", "daring", "fearless", "gallant", "heroic", "tenacious", "strong", "tough"],
    related : ["daredevil", "dauntless", "fiery", "gritty", "high-spirited", "intrepid", "martial", "spartan", "unafraid", "undaunted", "venturous"]
  },
  'Famous (adj, legendary)' : {
    close : ["acclaimed", "brilliant", "distinguished", "excellent", "grand", "great", "honored", "important", "influential", "notable", "outstanding", "prominent", "recognized", "remarkable", "well-known", "leading", "popular", "notorious"],
    related : ["celebrated", "extraordinary", "imposing", "mighty", "reputable"]
  }
}

// create an object for the game

var Game = {
  currentPlayer : '',
  currentWord : '',
  currentLevel : 1,
  currentScore : 0,
  lives : 1,
//   startGame : startGame,
//   getAnswer : getAnswer,
//   continueGame : continueGame,
//   tryAgain : tryAgain,
//   gameOver : gameOver,
//   overMessage : overMessage,
}

// load page with default score 00, level 1 and player Name

$(window).load(function(){
  Game.countdown = $("#countdown").countdown360({
    radius      : 60,
    seconds     : 5,
    fontColor   : '#FFFFFF',
    autostart   : false
  });
  // prompt for player Name
  Game.currentPlayer = prompt("Choose a player name, in synonymory you can be whoever you want!");
  // prompt if ready then game starts
  alert("Start game ?");
  $("#tryAgainButton").on('click', tryAgain);
  updateWindow();
  getAnswerEvent();
  startGame();
});

function updateWindow () {
  $('#playerName').text(Game.currentPlayer);
  $('#wordToRemember').html(Game.currentWord);
  $('#level').text('Level '+Game.currentLevel);
  $('#score').text(Game.currentScore);
}

// create a function to generate a word to remember from the object
function startGame() {
  Game.currentWord = getWord();
  setTimeout(function(){
    $('#wordToRemember').text("");
  }, 5000);
  Game.countdown.start();
  updateWindow ();
}

function getAnswerEvent() {
  var $answerForm = $('#answerForm');
  $answerForm.on('submit', getAnswer);
}

function randomWord(level) {
  return Object.keys(level)[Math.floor(Math.random()*Object.keys(level).length)];
}

function getWord() {
  var level = getLevel();
  if (Game.currentLevel<=3) {
    return randomWord(level);
  } else {
    return randomWord(level)+"<br>"+randomWord(level);
  }
}

function getLevel(){
  if(Game.currentLevel<=3){
    return level123;
  } else {
    return level45;
  }
}

function getAnswer(event) {
  event.preventDefault();

  var $input = $('#playerAnswer');
  var playerAnswers = $input.val().split(" ");
  $input.val("");

  var countGoodAnswers = 0;
  var currentWords = Game.currentWord.split("<br>");

  currentWords.forEach(function(item, index) {
    var playerAnswer = playerAnswers[index].toLowerCase().trim();
    var possibleAnswers = getLevel()[item];
    if(possibleAnswers.close.indexOf(playerAnswer)!=-1 ) {
      Game.currentScore+=5;
      countGoodAnswers+=1;
    } else if (possibleAnswers.related.indexOf(playerAnswer)!=-1 ) {
      Game.currentScore+=10;
      countGoodAnswers+=1;
    }
  });

  if(countGoodAnswers==currentWords.length) {
    continueGame();
  } else {
    tryAgain();
  }
}

function tryAgain() {
  if(Game.lives>0){
    Game.lives-=1;
    alert('Try again!');
    startGame();
  } else {
    gameOver();
  }
}

function continueGame() {
  if (Game.currentLevel<=5) {
    Game.currentLevel+=1;
    startGame();
  } else {
    overMessage();
  }
}

function gameOver() {
  alert('Game Over '+Game.currentPlayer+'\nYou got to level '+Game.currentLevel+' with '+Game.currentScore+' points');
  window.location.reload();
}

function overMessage() {
  alert('Bravo! you won '+Game.currentPlayer+'!\nYou got to level '+Game.currentLevel+' with '+Game.currentScore+' points');
  window.location.reload();
}




