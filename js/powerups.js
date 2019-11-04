class Powerup {
    constructor(ctx, width, heigth, image, posX, posY, speed){
        this.ctx = ctx;
        this.width = width;
        this.heigth = heigth;
        
        this.image = new Image();
        this.image.src = image;

        this.frames = 2;
        this.framesIndex = 0;

        this.posX = posX;
        this.posY = posY - heigth;
        
        this.vY = speed;
    }

    draw(framesCounter){
        this.ctx.drawImage(
            this.image,
            this.framesIndex * Math.floor(this.image.width / this.frames),
            0,
            Math.floor(this.image.width / this.frames),
            this.image.height,
            this.posX,
            this.posY,
            this.width,
            this.heigth
        );
        this.animate(framesCounter);
    }

        animate(framesCounter) {
        if (framesCounter % 10 === 0) this.framesIndex++;
        if (this.framesIndex > 1) this.framesIndex = 0;
      }

    move(){
        this.posY += this.vY;
    }
}