class Player {
  constructor(
    ctx,
    width,
    height,
    image,
    posX,
    posY,
    keys,
    gameWidth,
    gameHeight
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.framesIndex = 0;
    this.frames = 2;

    this.posX = posX;
    this.posY = posY;
    this.speed = 30;

    this.keys = keys;
    this.bullets = [];

    this.setListeners();

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      0,
      this.framesIndex * Math.floor(this.image.height / this.frames),
      this.image.width,
      Math.floor(this.image.height / this.frames),
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.clearBullets();
    this.bullets.forEach(bullet => bullet.draw());
    this.animate(framesCounter);
  }

  move() {
    this.bullets.forEach(bullet => bullet.move());
  }

  animate(framesCounter) {
    if (framesCounter % 30 === 0) {
      this.framesIndex++;
      if (this.framesIndex > 1) this.framesIndex = 0;
    }
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.keys.ARROW_UP:
          this.posY -= this.speed;
          break;
        case this.keys.ARROW_RIGHT:
          this.posX += this.speed;
          break;
        case this.keys.ARROW_DOWN:
          this.posY += this.speed;
          break;
        case this.keys.ARROW_LEFT:
          this.posX -= this.speed;
          break;
        case this.keys.SPACE:
          this.shoot();
          break;
      }
    });
  }

  shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        10,
        this.posX,
        this.posY,
        this.width,
        this.height,
        this.posY0
      )
    );
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      bullet => bullet.posY <= this.gameHeight
    );
  }
}
