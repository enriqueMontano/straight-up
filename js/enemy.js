class Enemy {
  constructor(ctx, width, height, posX, posY, velocity) {

    this.ctx = ctx
    this.width = width
    this.height = height

    this.image = new Image()

    this.frames = 2
    this.framesIndex = 0

    this.posX = posX
    this.posY = posY

    this.velocity = velocity
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
    )
    this.animate(framesCounter)
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++
    if (this.framesIndex > 1) this.framesIndex = 0
  }

  move() {
    this.posY += this.velocity
  }

  // chasePlayerMovement(playerX) {
  //   if (this.enemyType === "big") {
  //     this.posY += this.vY;
  //     this.posX = playerX - 1;
  //   }
  // }
}

class EasyEnemy extends Enemy {
  constructor(ctx, width, height, posX, posY, velocity) {
    super(ctx, width, height, posX, posY, velocity)
    this.image.src = './img/enemy-easy.png'
  }
}

class NormalEnemy extends Enemy {
  constructor(ctx, width, height, posX, posY, velocity) {
    super(ctx, width, height, posX, posY, velocity)
    this.image.src = './img/enemy-normal.png'
  }
}

class HardEnemy extends Enemy {
  constructor(ctx, width, height, posX, posY, velocity) {
    super(ctx, width, height, posX, posY, velocity)
    this.image.src = './img/enemy-hard.png'
  }
}