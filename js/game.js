const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,

  score: 0,
  life: 5,

  player: undefined,
  enemies: [],
  explosions: [],
  firstPower: [],
  clouds: [],

  init: function () {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.width = 512;
    this.height = 544;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start: function () {
    this.reset();
    this.musicGame.play();
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clearCanvas();
      this.drawAll();

      this.generate();

      if (this.isPlayerCollision(this.firstPower)) this.life++;
      if (this.isPlayerCollision(this.enemies)) {
        this.life--;
        this.explosions.push(
          new Explosion(
            this.ctx,
            this.player.width,
            this.player.height,
            this.player.x,
            this.player.y
          )
        );
      }
      this.isCollision(this.player.bullets, this.enemies);

      this.clear(this.enemies);
      this.clear(this.explosions);
      this.clear(this.firstPower);

      if (this.life < 1) this.gameOver();
      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  },

  reset() {
    this.life = 5;
    this.score = 0;
    Score.init(this.ctx, this.score);
    Lifes.init(this.ctx, this.life);

    this.desertBackground = new Background(this.ctx, 512, 544);

    this.player = new Player(this.ctx, this.width, this.height);

    this.musicGame = new Audio();
    this.musicGame.src = './audio/abandoned-hopes.mp3';

    this.endGame = new Audio();
    this.endGame.src = './audio/player-death.mp3';
  },

  generate() {
    if (this.framesCounter % 50 === 0) {
      this.enemies.push(new EnemyFactory(this.ctx, 'easy', this.width));
      this.firstPower.push(new Powerup(this.ctx, this.randomPosX()));
    }
    if (this.framesCounter % 100 === 0)
      this.enemies.push(new EnemyFactory(this.ctx, 'normal', this.width));
    if (this.framesCounter % 150 === 0) {
      this.clouds.push(new CloudFactory(this.ctx, 'mid'));
    }
    if (this.framesCounter % 200 === 0)
      this.enemies.push(new EnemyFactory(this.ctx, 'hard', this.width));
    if (this.framesCounter % 350 === 0)
      this.clouds.push(new CloudFactory(this.ctx, 'high'));
  },

  drawAll: function () {
    this.desertBackground.draw();
    this.firstPower.forEach((powerUp) => powerUp.draw(this.framesCounter));
    this.player.draw(this.framesCounter);
    this.enemies.forEach((enemy) => enemy.draw(this.framesCounter));
    this.explosions.forEach((explosion) => explosion.draw(this.framesCounter));
    this.clouds.forEach((cloud) => cloud.draw());
    Score.draw(this.score);
    Lifes.draw(this.life);
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  clear(arr) {
    arr = arr.filter((elem) => elem.y - elem.height <= this.height);
  },

  isPlayerCollision(arr) {
    return arr.some((cv) => {
      if (
        cv.x < this.player.x + this.player.width &&
        cv.x + cv.width > this.player.x &&
        cv.y < this.player.y + this.player.height &&
        cv.height + cv.y > this.player.y
      ) {
        arr.splice(cv, 1);
        cv.sound.play();
        return true;
      }
    });
  },

  isCollision(arr1, arr2) {
    return arr1.some((cv1) => {
      arr2.some((cv2) => {
        if (
          cv1.x < cv2.x + cv2.width &&
          cv1.x + cv1.width > cv2.x &&
          cv1.y < cv2.y + cv2.height &&
          cv1.height + cv1.y > cv2.y
        ) {
          arr1.splice(cv1, 1);
          arr2.splice(cv2, 1);
          cv2.sound.play();
          this.score += 10;
          this.explosions.push(
            new Explosion(this.ctx, cv2.width, cv2.height, cv2.x, cv2.y)
          );
        }
      });
    });
  },

  gameOver() {
    setTimeout(() => {
      clearInterval(this.interval);
      document.querySelector('#game-over').style.display = 'flex';
    }, 500);
    this.musicGame.pause();
    this.endGame.play();
  },

  randomPosX() {
    return Math.floor(Math.random() * (this.width - 0)) + 0;
  },
};
