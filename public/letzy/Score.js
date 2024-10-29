class Score {

  constructor(x) {
    this.x = x;
    this.y = height - 20;
  }


  display(score) {
    fill('#00ffe1');
    textAlign(CENTER);
    textSize(60);
    text(score, this.x, this.y);
  }


}