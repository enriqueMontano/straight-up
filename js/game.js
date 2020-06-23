const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,

  score: 0,
  life: 5,

  playerKeys: {
    arrowUp: false,
    arrowRight: false,
    arrowDown: false,
    arrowLeft: false,
    space: false,
  },

  player: undefined,
  enemies: [],
  explosions: [],
  firstPower: [],

  init: function () {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.width = 512
    this.height = 544
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.start()
  },

  start: function () {
    this.reset()
    this.musicGame.play()
    this.interval = setInterval(() => {
      this.framesCounter++

      this.clear()
      this.drawAll()

      this.generateClouds()
      this.generateEnemies()
      this.generatePowerUps()

      if (this.isPlayerCollision(this.firstPower)) this.life++
      if (this.isPlayerCollision(this.enemies)) {
        this.life--
        this.explosions.push(
          new Explosion(this.ctx, this.player.width, this.player.height, this.player.x, this.player.y)
        )
      }
      this.isCollision(this.player.bullets, this.enemies)

      this.clearClouds()
      this.clearEnemys()
      this.clearPowerUps()
      if (this.life < 1) this.gameOver()
      if (this.framesCounter > 1000) this.framesCounter = 0
    }, 1000 / this.fps)
  },

  reset() {
    this.life = 5
    this.score = 0
    Score.init(this.ctx, this.score)
    Lifes.init(this.ctx, this.life)

    this.desertBackground = new Background(this.ctx, 512, 544)

    this.player = new Player(
      this.ctx,
      32,
      48,
      './img/ship.png',
      this.width / 2 - 8,
      this.height - 50,
      this.playerKeys,
      this.width,
      this.height
    )

    this.sClouds = []
    this.tClouds = []

    this.musicGame = new Audio()
    this.musicGame.src = './audio/abandoned-hopes.mp3'

    this.endGame = new Audio()
    this.endGame.src = './audio/player-death.mp3'
  },

  generateClouds: function () {
    if (this.framesCounter % 150 === 0)
      this.tClouds.push(new Clouds(this.ctx, 512, 206, './img/clouds-transparent.png', 0, 0, 6))

    if (this.framesCounter % 350 === 0) this.sClouds.push(new Clouds(this.ctx, 1024, 412, './img/clouds.png', 0, 0, 12))
  },

  generateEnemies() {
    if (this.framesCounter % 50 === 0) this.enemies.push(new EnemyFactory(this.ctx, this.randomPosX(), 'easy'))
    if (this.framesCounter % 100 === 0) this.enemies.push(new EnemyFactory(this.ctx, this.randomPosX(), 'normal'))
    if (this.framesCounter % 200 === 0) this.enemies.push(new EnemyFactory(this.ctx, this.randomPosX(), 'hard'))
  },

  generatePowerUps: function () {
    if (this.framesCounter % 50 === 0) this.firstPower.push(new Powerup(this.ctx, this.randomPosX()))
  },

  drawAll: function () {
    this.desertBackground.draw()
    this.tClouds.forEach((cloud) => cloud.draw())
    this.firstPower.forEach((powerUp) => powerUp.draw(this.framesCounter))
    this.player.draw(this.framesCounter)
    this.enemies.forEach((enemy) => enemy.draw(this.framesCounter))
    this.explosions.forEach((explosion) => explosion.draw(this.framesCounter))
    this.sClouds.forEach((cloud) => cloud.draw())
    Score.draw(this.score)
    Lifes.draw(this.life)
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  clearClouds: function () {
    this.sClouds = this.sClouds.filter((cloud) => cloud.posY - cloud.height <= this.height)
    this.tClouds = this.tClouds.filter((cloud) => cloud.posY - cloud.height <= this.height)
  },

  clearEnemys() {
    this.enemies = this.enemies.filter((enemy) => enemy.y - enemy.height <= this.height)
  },

  clearPowerUps: function () {
    this.firstPower = this.firstPower.filter((powerUp) => powerUp.y <= this.height)
  },

  isPlayerCollision(arr) {
    return arr.some((cv) => {
      if (
        cv.x < this.player.x + this.player.width &&
        cv.x + cv.width > this.player.x &&
        cv.y < this.player.y + this.player.height &&
        cv.height + cv.y > this.player.y
      ) {
        arr.splice(cv, 1)
        cv.sound.play()
        return true
      }
    })
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
          arr1.splice(cv1, 1)
          arr2.splice(cv2, 1)
          cv2.sound.play()
          this.score += 10
          this.explosions.push(new Explosion(this.ctx, cv2.width, cv2.height, cv2.x, cv2.y))
        }
      })
    })
  },

  gameOver() {
    setTimeout(() => {
      clearInterval(this.interval)
      document.querySelector('#game-over').style.display = 'flex'
    }, 500)
    this.musicGame.pause()
    this.endGame.play()
  },

  randomPosX() {
    return Math.floor(Math.random() * (this.width - 0)) + 0
  },
}
