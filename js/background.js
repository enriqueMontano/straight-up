class Background {
  constructor(ctx, width, height, image, posX, posY, vY) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.posX = posX;
    this.posY = posY;

    this.vY = vY;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY - this.height,
      this.width,
      this.height
    );
  }

  move() {
    this.posY += this.vY;
    if (this.posY === this.height) this.posY = 0;
  }
}
