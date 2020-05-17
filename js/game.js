const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;


function round() {
  if ($(".game-field").hasClass("target")) {
    $(".game-field").removeClass("target");
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  $(divSelector).text(hits+1);


  if (firstHitTime == 0) {
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}


function endGame() {
  $(".game-field").addClass("display");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}


function handleClick(event) {

  $(event.target).text("");

  if ($(event.target).hasClass("target")) {
    $(".game-field").removeClass("miss");
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).addClass("miss");
  }
  }


function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}


$(document).ready(init);
