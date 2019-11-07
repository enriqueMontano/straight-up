class Enemy {
  constructor(ctx, width, height, image, posX, posY, speed, enemyType, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.frames = 2;
    this.framesIndex = 0;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.posX = posX;
    this.posY = posY;

    this.vY = speed;

    this.enemyType = enemyType;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.posX,
      this.posY - this.height,
      this.width,
      this.height
    );
    this.animate(framesCounter);
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++;
    if (this.framesIndex > 1) this.framesIndex = 0;
  }

  move() {
    this.posY += this.vY;
  }

  chasePlayerMovement(playerX) {
    if(this.enemyType === "big") {
      this.posY += this.vY;
      this.posX = playerX-1;
    }
  }
}