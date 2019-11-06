class Enemy {
  constructor(ctx, width, height, image, posX, posY, speed, enemyType) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.frames = 2;
    this.framesIndex = 0;

    this.posX = posX;
    this.posY = posY;

    this.vY = speed;

    this.enemyType = enemyType;

    // this.sBullets = [];
    // this.mBullets = [];
    // this.bBullets = [];
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
    // this.clearBullets();
    // this.sBullets.forEach(bullet => bullet.draw(framesCounter));
    // this.mBullets.forEach(bullet => bullet.draw(framesCounter));
    // this.bBullets.forEach(bullet => bullet.draw(framesCounter));
    this.animate(framesCounter);
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++;
    if (this.framesIndex > 1) this.framesIndex = 0;
  }

  move() {
    this.posY += this.vY;
    // console.log(this.posX)
    // console.log(this.posY)

    // this.sBullets.forEach(bullet => bullet.move());
    // this.mBullets.forEach(bullet => bullet.move());
    // this.bBullets.forEach(bullet => bullet.move());
  }

  // generateBullets() {
  //   if (this.framesCounter % 50 === 0 && this.enemyType === "small")
  //     this.sBullets.push(
  //       new Bullet(
  //         this.ctx,
  //         5,
  //         13,
  //         "./img/laser-bolt-1.png",
  //         this.posX,
  //         this.posY,
  //         this.width,
  //         this.height,
  //         1,
  //         "enemy"
  //       )
  //     );
  //   if (this.framesCounter % 50 === 0 && this.enemyType === "medium")
  //     this.mBullets.push(
  //       new Bullet(
  //         this.ctx,
  //         5,
  //         13,
  //         "./img/laser-bolt-1.png",
  //         this.posX,
  //         this.posY,
  //         this.width,
  //         this.height,
  //         2,
  //         "enemy"
  //       )
  //     );
  //   if (this.framesCounter % 50 === 0 && this.enemyType === "big")
  //     this.bBullets.push(
  //       new Bullet(
  //         this.ctx,
  //         5,
  //         13,
  //         "./img/laser-bolt-1.png",
  //         this.posX,
  //         this.posY,
  //         this.width,
  //         this.height,
  //         3,
  //         "enemy"
  //       )
  //     );
  // }
}
