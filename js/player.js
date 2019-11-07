class Player {
  constructor(
    ctx,
    width,
    height,
    image,
    posX,
    posY,
    keys,
    gameWidth,
    gameHeight
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image = new Image();
    this.image.src = image;

    this.framesIndex = 0;
    this.frames = 2;

    this.posX = posX;
    this.posY = posY;
    this.speed = 4;

    this.keys = keys;
    this.bullets = [];

    this.setListeners();

    this.sound = new Audio();
    this.sound.src = "./audio/shoot.mp3";
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      0,
      this.framesIndex * Math.floor(this.image.height / this.frames),
      this.image.width,
      Math.floor(this.image.height / this.frames),
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.clearBullets();
    this.bullets.forEach(bullet => bullet.draw(framesCounter));
    this.animate(framesCounter);
  }

  move() {
    if (this.keys.arrowUp && this.posY + this.gameHeight >= this.gameHeight) {
      this.posY -= this.speed;
    }
    if (this.keys.arrowRight && this.posX < this.gameWidth - this.width) {
      this.posX += this.speed;
    }
    if (this.keys.arrowDown && this.posY < this.gameHeight - this.width) {
      this.posY += this.speed;
    }
    if (this.keys.arrowLeft && this.posX + this.gameWidth >= this.gameWidth) {
      this.posX -= this.speed;
    }
    this.bullets.forEach(bullet => bullet.move());
    // console.log(this.bullets);
  }

  animate(framesCounter) {
    if (framesCounter % 5 === 0) this.framesIndex++;
    if (this.framesIndex > 1) this.framesIndex = 0;
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.keys.arrowLeft = true;
      }
      if (e.keyCode === 39) {
        this.keys.arrowRight = true;
      }
    });
    document.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode === 37) {
        this.keys.arrowLeft = false;
      }
      if (e.keyCode === 39) {
        this.keys.arrowRight = false;
      }
    });
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 38) {
        this.keys.arrowUp = true;
      }
      if (e.keyCode === 40) {
        this.keys.arrowDown = true;
      }
    });
    document.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode === 38) {
        this.keys.arrowUp = false;
      }
      if (e.keyCode === 40) {
        this.keys.arrowDown = false;
      }
    });
    document.addEventListener("keydown", e => {
      e.preventDefault();
      if (e.keyCode === 32) {
        this.keys.space = true;
        this.shoot();
        this.sound.play();
      }
    });
    document.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode === 32) {
        this.keys.space = false;
      }
    });
  }

  shoot() {
    this.bullets.push(
      new Bullet(
        this.ctx,
        10,
        26,
        "./img/laser-bolt-2.png",
        this.posX,
        this.posY,
        this.width,
        this.height,
        4,
        "player"
      )
    );
  }

  clearBullets() {
    this.bullets = this.bullets.filter(
      bullet => bullet.posY + bullet.height >= this.height
    );
  }
}