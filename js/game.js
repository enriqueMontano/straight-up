const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  playerKeys: {
    arrowUp: false,
    arrowRight: false,
    arrowDown: false,
    arrowLeft: false,
    space: false
  },

  init: function() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = 256;
    this.height = 272;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start: function() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clear();
      this.drawAll();
      this.moveAll();

      this.clearClouds();
      this.clearEnemys();
      this.clearPowerUps();
      this.generateClouds();
      this.generateEnemys();
      this.generatePowerUps();

      if (
        this.isCollisionSmall() ||
        this.isCollisionMedium() ||
        this.isCollisionBig()
      ) {
        this.generatePlayerExplosion();
        // this.generateSenemyExplosion();
        // this.generateMenemyExplosion();
        // this.generateBenemyExplosion();

        // this.gameOver();
      }

      // if (this.isCollisionFirstPowerUp()) {
      //   // this.firstPowerUp();
      // }

      // if (this.isCollisionSecondPowerUp()) {
      //   // this.secondPowerUp();
      // }

      if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps);
  },

  reset: function() {
    this.desertBackground = new Background(
      this.ctx,
      256,
      272,
      "./img/desert-backgorund.png",
      0,
      0,
      1
    );
    this.player = new Player(
      this.ctx,
      16,
      24,
      "./img/ship.png",
      this.width / 2 - 8,
      this.height - 50,
      this.playerKeys,
      this.width,
      this.height
    );

    this.playerExplosion = [];
    // this.sEnemyExplosion = [];
    // this.mEnemyExplosion = [];
    // this.bEnemyExplosion = [];

    this.sClouds = [];
    this.tClouds = [];

    this.sEnemys = [];
    this.mEnemys = [];
    this.bEnemys = [];

    this.firstPower = [];
    this.secondPower = [];
  },

  generateClouds: function() {
    if (this.framesCounter % 150 === 0)
      this.tClouds.push(
        new Clouds(this.ctx, 256, 103, "./img/clouds-transparent.png", 0, 0, 3)
      );

    if (this.framesCounter % 350 === 0)
      this.sClouds.push(
        new Clouds(this.ctx, 512, 206, "./img/clouds.png", 0, 0, 6)
      );
  },

  generatePlayerExplosion: function() {
    // console.log(this.player.posX);
    this.playerExplosion.push(
      new Explosion(this.ctx, 30, 30, this.player.posX, this.player.posY)
    );
  },

  // generateSenemyExplosion: function() {
  //   this.sEnemyExplosion.push(
  //         new Explosion(
  //           this.ctx,
  //           30,
  //           30,
  //           this.sEnemys.enemy.posX,
  //           this.sEnemys.enemy.posY
  //         );
  //   );
  // },

  // generateMenemyExplosion: function() {
  //   // console.log(this.mEnemyExplosion)
  //   this.mEnemyExplosion.push(
  //     new Explosion(this.ctx, 50, 50, this.mEnemys.posX, this.mEnemys.posY)
  //   );
  // },

  // generateBenemyExplosion: function() {
  //   // console.log(this.bEnemyExplosion)
  //   this.bEnemyExplosion.push(
  //     new Explosion(this.ctx, 100, 100, this.bEnemys.posX, this.bEnemys.posY)
  //   );
  // },

  generateEnemys: function() {
    if (this.framesCounter % 70 === 0)
      this.sEnemys.push(
        new Enemy(
          this.ctx,
          16,
          16,
          "./img/enemy-small.png",
          this.width / 2,
          0,
          1,
          1,
          "small"
        )
      );
    if (this.framesCounter % 100 === 0)
      this.mEnemys.push(
        new Enemy(
          this.ctx,
          32,
          16,
          "./img/enemy-medium.png",
          this.width / 2 - 50,
          2,
          2,
          "medium"
        )
      );
    if (this.framesCounter % 150 === 0)
      this.bEnemys.push(
        new Enemy(
          this.ctx,
          16,
          16,
          "./img/enemy-big.png",
          this.width / 2 + 50,
          3,
          3,
          "big"
        )
      );
  },

  generatePowerUps: function() {
    if (this.framesCounter % 60 === 0)
      this.firstPower.push(
        new Powerup(
          this.ctx,
          8,
          8,
          "./img/power-up-1.png",
          this.width / 2 - 100,
          0,
          1
        )
      );
    if (this.framesCounter % 120 === 0)
      this.secondPower.push(
        new Powerup(
          this.ctx,
          8,
          8,
          "./img/power-up-2.png",
          this.width / 2 + 100,
          0,
          3
        )
      );
  },

  drawAll: function() {
    this.desertBackground.draw();
    this.tClouds.forEach(cloud => cloud.draw());
    this.firstPower.forEach(powerUp => powerUp.draw(this.framesCounter));
    this.secondPower.forEach(powerUp => powerUp.draw(this.framesCounter));
    this.player.draw(this.framesCounter);
    this.sEnemys.forEach(enemy => enemy.draw(this.framesCounter));
    this.mEnemys.forEach(enemy => enemy.draw(this.framesCounter));
    this.bEnemys.forEach(enemy => enemy.draw(this.framesCounter));

    this.playerExplosion.forEach(explosion =>
      explosion.draw(this.framesCounter)
    );

    // this.sEnemyExplosion.forEach(explosion =>
    //   explosion.draw(this.framesCounter)
    // );
    // this.mEnemyExplosion.forEach(explosion =>
    //   explosion.draw(this.framesCounter)
    // );
    // this.bEnemyExplosion.forEach(explosion =>
    //   explosion.draw(this.framesCounter)
    // );
    this.sClouds.forEach(cloud => cloud.draw());
  },

  moveAll: function() {
    this.desertBackground.move();
    this.tClouds.forEach(cloud => cloud.move());
    this.player.move();
    this.sEnemys.forEach(enemy => enemy.move());
    this.mEnemys.forEach(enemy => enemy.move());
    this.bEnemys.forEach(enemy => enemy.move());
    this.firstPower.forEach(powerUp => powerUp.move());
    this.secondPower.forEach(powerUp => powerUp.move());
    this.sClouds.forEach(cloud => cloud.move());
    // console.log(this.tClouds);
    // console.log(this.sClouds);
    // console.log(this.sEnemys);
    // console.log(this.mEnemys);
    // console.log(this.bEnemys);
    // console.log(this.firstPower);
    // console.log(this.secondPower);
  },

  clearClouds: function() {
    this.sClouds = this.sClouds.filter(
      cloud => cloud.posY - cloud.height <= this.height
    );
    this.tClouds = this.tClouds.filter(
      cloud => cloud.posY - cloud.height <= this.height
    );
  },

  clearEnemys: function() {
    this.sEnemys = this.sEnemys.filter(
      enemy => enemy.posY - enemy.height <= this.height
    );
    this.mEnemys = this.mEnemys.filter(
      enemy => enemy.posY - enemy.height <= this.height
    );
    this.bEnemys = this.bEnemys.filter(
      enemy => enemy.posY - enemy.height <= this.height
    );
  },

  clearPowerUps: function() {
    this.firstPower = this.firstPower.filter(
      powerUp => powerUp.posY <= this.height
    );
    this.secondPower = this.secondPower.filter(
      powerUp => powerUp.posY <= this.height
    );
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  isCollisionSmall: function() {
    return this.sEnemys.some(
      enemy =>
        this.player.posX + this.player.width > enemy.posX &&
        enemy.posX + enemy.width > this.player.posX &&
        this.player.posY + this.player.height > enemy.posY &&
        enemy.posY + enemy.height > this.player.posY
    );
  },

  isCollisionMedium: function() {
    return this.mEnemys.some(
      enemy =>
        this.player.posX + this.player.width > enemy.posX &&
        enemy.posX + enemy.width > this.player.posX &&
        this.player.posY + this.player.height > enemy.posY &&
        enemy.posY + enemy.height > this.player.posY
    );
  },

  isCollisionBig: function() {
    return this.bEnemys.some(
      enemy =>
        this.player.posX + this.player.width > enemy.posX &&
        enemy.posX + enemy.width > this.player.posX &&
        this.player.posY + this.player.height > enemy.posY &&
        enemy.posY + enemy.height > this.player.posY
    );
  },

  // isCollisionBulletSmallEnemy: function() {
  //   this.player.bullets.forEach(bullet =>
  //     this.sEnemys.forEach(enemy => {
  //       if (bullet.posX > enemy.posX && bullet.posY > enemy.posY) {
  //         this.generateSenemyExplosion();
  //       }
  //     })
  //   );
  // },

  // isCollisionBullet: function() {

  // },

  // firstPowerUp: function() {
  //   console.log("powerUp");
  // },

  // secondPowerUp: function() {
  //   console.log("powerUp");
  // },

  gameOver: function() {
    clearInterval(this.interval);
  }
};