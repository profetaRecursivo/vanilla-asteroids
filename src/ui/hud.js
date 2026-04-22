export function updateLives() {
  const lives = document.getElementById("lives-value");

  let value = parseInt(lives.textContent);
  lives.textContent = value - 1;
}
export function updateAsteroids(size) {
  const asteroidsValue = document.getElementById("asteroids-value");
  let value = parseInt(asteroidsValue.textContent);
  asteroidsValue.textContent = size;
}
export function updateScore(delta) {
  const scoreValue = document.getElementById("score-value");
  let value = parseInt(scoreValue.textContent);
  scoreValue.textContent = fillWithCeros(value  + delta);
}

function fillWithCeros(value){
  let ans = value + "";
  while(ans.length < 6){
    ans = "0" + ans;
  }
  return ans;
}
