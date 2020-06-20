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
    this.life = 5
    this.musicGame.play()
    this.interval = setInterval(() => {
      this.framesCounter++

      this.clear()
      this.drawAll()
      this.moveAll()

      this.generateClouds()
      this.generateEnemies()
      this.generatePowerUps()

      this.isCollisionEnemy()
      // this.isCollisionFirstPowerUp()
      // this.isCollisionSmall()
      // this.isCollisionMedium()
      // this.isCollisionBig()
      this.clearClouds()
      this.clearEnemys()
      this.clearPowerUps()
      if (this.life < 1) this.gameOver()
      if (this.framesCounter > 1000) this.framesCounter = 0
    }, 1000 / this.fps)
  },

  reset() {
    Score.init(this.ctx, this.score)
    Lifes.init(this.ctx, this.life)

    this.desertBackground = new Background(
      this.ctx,
      512,
      544,
      './img/desert-backgorund.png',
      0,
      0,
      2
    )

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

    this.firstPower = []

    this.playerExplosion = []

    this.musicGame = new Audio()
    this.musicGame.src = './audio/abandoned-hopes.mp3'

    this.playerExplosionSound = new Audio()
    this.playerExplosionSound.src = './audio/player explosion.mp3'

    this.powerUpSound = new Audio()
    this.powerUpSound.src = './audio/power-up.mp3'

    this.playerDeathSound = new Audio()
    this.playerDeathSound.src = './audio/player-death.mp3'
  },

  generateClouds: function () {
    if (this.framesCounter % 150 === 0)
      this.tClouds.push(
        new Clouds(this.ctx, 512, 206, './img/clouds-transparent.png', 0, 0, 6)
      )

    if (this.framesCounter % 350 === 0)
      this.sClouds.push(
        new Clouds(this.ctx, 1024, 412, './img/clouds.png', 0, 0, 12)
      )
  },

  generateEnemies() {
    if (this.framesCounter % 50 === 0)
      this.enemies.push(new EnemyFactory(this.ctx, this.randomPosX(), 'easy'))
    if (this.framesCounter % 100 === 0)
      this.enemies.push(new EnemyFactory(this.ctx, this.randomPosX(), 'normal'))
    if (this.framesCounter % 200 === 0)
      this.enemies.push(new EnemyFactory(this.ctx, this.randomPosX(), 'hard'))
  },

  generatePowerUps: function () {
    if (this.framesCounter % 1000 === 0)
      this.firstPower.push(
        new Powerup(
          this.ctx,
          16,
          16,
          './img/power-up-1.png',
          this.randomPosX(),
          0,
          2
        )
      )
  },

  drawAll: function () {
    this.desertBackground.draw()
    this.tClouds.forEach((cloud) => cloud.draw())
    this.firstPower.forEach((powerUp) => powerUp.draw(this.framesCounter))
    this.player.draw(this.framesCounter)
    this.enemies.forEach((enemy) => {
      enemy.draw(this.framesCounter)
    })
    this.explosions.forEach((explosion) => {
      explosion.draw(this.framesCounter)
    })
    this.playerExplosion.forEach((explosion) =>
      explosion.draw(this.framesCounter)
    )
    this.sClouds.forEach((cloud) => cloud.draw())
    Score.draw(this.score)
    Lifes.draw(this.life)
  },

  moveAll: function () {
    this.desertBackground.move()
    this.tClouds.forEach((cloud) => cloud.move())
    this.player.move()
    this.enemies.forEach((enemy) => enemy.move())
    this.firstPower.forEach((powerUp) => powerUp.move())
    this.sClouds.forEach((cloud) => cloud.move())
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.width, this.height)
  },

  clearClouds: function () {
    this.sClouds = this.sClouds.filter(
      (cloud) => cloud.posY - cloud.height <= this.height
    )
    this.tClouds = this.tClouds.filter(
      (cloud) => cloud.posY - cloud.height <= this.height
    )
  },

  clearEnemys() {
    this.enemies = this.enemies.filter(
      (enemy) => enemy.y - enemy.height <= this.height
    )
  },

  clearPowerUps: function () {
    this.firstPower = this.firstPower.filter(
      (powerUp) => powerUp.posY <= this.height
    )
  },

  isCollisionEnemy() {
    this.player.bullets.some((bullet) =>
      this.enemies.some((enemy) => {
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.height + bullet.y > enemy.y
        ) {
          enemy.explosionSound.play()
          this.score = this.score + 10
          this.explosions.push(
            new Explosion(this.ctx, enemy.width, enemy.height, enemy.x, enemy.y)
          )
          this.enemies = this.enemies.filter((cv) => cv !== enemy)
          this.player.bullets = this.player.bullets.filter(
            (cv) => cv !== bullet
          )
        }
      })
    )
  },

  isCollisionFirstPowerUp: function () {
    this.firstPower.forEach((powerUp) => {
      if (
        this.player.posY < powerUp.posY &&
        this.player.posX > powerUp.posX &&
        this.player.posX < powerUp.posX + this.player.width
      ) {
        this.life++
        this.powerUpSound.play()
        let index = this.firstPower.indexOf(powerUp)
        if (index > -1) {
          this.firstPower.splice(index, 1)
        }
      }
    })
  },

  // isCollisionSmall: function () {
  //   this.sEnemys.forEach((enemy) => {
  //     if (
  //       this.player.posY < enemy.posY &&
  //       this.player.posX > enemy.posX &&
  //       this.player.posX < enemy.posX + this.player.width
  //     ) {
  //       this.life--
  //       this.score--
  //       this.sEnemyExplosionSound.play()
  //       this.playerExplosion.push(
  //         new Explosion(this.ctx, 60, 60, this.player.posX, this.player.posY)
  //       )
  //       let index = this.sEnemys.indexOf(enemy)
  //       if (index > -1) {
  //         this.sEnemys.splice(index, 1)
  //       }
  //     }
  //   })
  // },

  // isCollisionMedium: function() {
  //   this.mEnemys.forEach(enemy => {
  //     if (
  //       this.player.posY < enemy.posY &&
  //       this.player.posX > enemy.posX &&
  //       this.player.posX < enemy.posX + this.player.width
  //     ) {
  //       this.life--;
  //       this.score--;
  //       this.mEnemyExplosionSound.play();
  //       this.playerExplosion.push(
  //         new Explosion(this.ctx, 60, 60, this.player.posX, this.player.posY)
  //       );
  //       let index = this.mEnemys.indexOf(enemy);
  //       if (index > -1) {
  //         this.mEnemys.splice(index, 1);
  //       }
  //     }
  //   });
  // },

  // isCollisionBig: function() {
  //   this.bEnemys.forEach(enemy => {
  //     if (
  //       this.player.posY < enemy.posY &&
  //       this.player.posX > enemy.posX &&
  //       this.player.posX < enemy.posX + this.player.width
  //     ) {
  //       this.life--;
  //       this.score--;
  //       this.bEnemyExplosionSound.play();
  //       this.playerExplosion.push(
  //         new Explosion(this.ctx, 60, 60, this.player.posX, this.player.posY)
  //       );
  //       let index = this.bEnemys.indexOf(enemy);
  //       if (index > -1) {
  //         this.bEnemys.splice(index, 1);
  //       }
  //     }
  //   });
  // },

  gameOver: function () {
    setTimeout(() => {
      clearInterval(this.interval)
    }, 500)
    this.musicGame.pause()
    this.playerExplosionSound.play()
    this.playerDeathSound.play()
    this.musicGame.pause()
    this.playerExplosion.push(
      new Explosion(this.ctx, 120, 120, this.player.posX, this.player.posY)
    )
    setTimeout(() => {
      document.querySelector('#game-over').style.display = 'flex'
    }, 600)
  },

  randomPosX() {
    return Math.floor(Math.random() * (this.width - 0)) + 0
  },
}
