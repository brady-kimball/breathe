createjs.Ticker.addEventListener("tick", handleTick);
function handleTick(event) {
  stage.update()
}
