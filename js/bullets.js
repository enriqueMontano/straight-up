class Bullet {
  constructor(
    ctx,
    width,
    height,
    image,
    playerX,
    playerY,
    playerWidth,
    playerHeight,
    speed,
    playerType
  ) {
    this.ctx = ctx
    this.width = width
    this.height = height

    this.image = new Image()
    this.image.src = image

    this.framesIndex = 0
    this.frames = 2

    this.x = (playerWidth - 5) / 2 + playerX
    this.y = playerY - playerHeight
    this.vY = speed
    this.playerType = playerType
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.animate(framesCounter)
  }

  animate(framesCounter) {
    if (framesCounter % 5 === 0) this.framesIndex++
    if (this.framesIndex > 1) this.framesIndex = 0
  }

  move() {
    if (this.playerType === 'player') {
      this.y -= this.vY
    }
    if (this.playerType === 'enemy') {
      this.y += this.vY
    }
  }
}
