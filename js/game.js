const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  playerKeys: {
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
    ARROW_LEFT: 37,
    SPACE: 32
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
      this.generateClouds();
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

    this.sClouds = [];
    this.tClouds = [];
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

  drawAll: function() {
    this.desertBackground.draw();
    this.tClouds.forEach(cloud => cloud.draw());
    this.player.draw(this.framesCounter);
    this.sClouds.forEach(cloud => cloud.draw());
  },

  moveAll: function() {
    this.desertBackground.move();
    this.tClouds.forEach(cloud => cloud.move());
    this.player.move();
    this.sClouds.forEach(cloud => cloud.move());
  },

  clearClouds: function() {
    this.sClouds = this.sClouds.filter(
      cloud => cloud.posY - cloud.height <= this.height
    );
    this.tClouds = this.tClouds.filter(
      cloud => cloud.posY - cloud.height <= this.height
    );
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
};
