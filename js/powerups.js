class Powerup {
  constructor(ctx, x) {
    this.ctx = ctx
    this.width = 16
    this.height = 16

    this.image = new Image()
    this.image.src = './img/power-up-2.png'

    this.sound = new Audio()
    this.sound.src = './audio/power-up.mp3'

    this.frames = 2
    this.framesIndex = 0

    this.x = x
    this.y = 0

    this.velocity = 3
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
    this.move()
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) this.framesIndex++
    if (this.framesIndex > 1) this.framesIndex = 0
  }

  move() {
    this.y += this.velocity
  }
}
