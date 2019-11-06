const Lifes = {
  ctx: undefined,
  life: undefined,

  init: function(ctx, life) {
    this.ctx = ctx;
    this.life = life;
  },

  draw: function(life) {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px sans-serif";
    this.ctx.fillText("ENERGY: " + life, 5, 26);
  }
};
