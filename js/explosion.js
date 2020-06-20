class Explosion {
  constructor(ctx, width, heigth, playerX, playerY) {
    this.ctx = ctx
    this.width = width
    this.heigth = heigth

    this.image = new Image()
    this.image.src = './img/explosion.png'

    this.posX = playerX
    this.posY = playerY

    this.framesIndex = 0
    this.frames = 5
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.posX - 7,
      this.posY - 7,
      this.width,
      this.heigth
    )
    this.animate(framesCounter)
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++
  }
}
