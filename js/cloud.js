class Cloud {
  constructor(ctx, width, height, velocity) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();

    this.x = 0;
    this.y = 0 - height;

    this.velocity = velocity;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.move();
  }

  move() {
    this.y += this.velocity;
  }
}

class HighCloud extends Cloud {
  constructor(ctx, width, height, velocity) {
    super(ctx, width, height, velocity);
    this.image.src = './img/high-cloud.png';
  }
}

class MidCloud extends Cloud {
  constructor(ctx, width, height, velocity) {
    super(ctx, width, height, velocity);
    this.image.src = './img/mid-cloud.png';
  }
}
