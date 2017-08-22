var Entities = {
  init: function (data) {
    var background = {
      sprite: new Entities.helpers.Sprite(data.spriteSheet, 0, 35, 256, 200),
      x: 0,
      y: 0,
      w: 768,
      h: 600
    };

    data.entities = {};

    data.entities.background = background;

  },
  helpers: {
    Sprite: function (img, srcX, srcY, srcW, srcH) {
      this.img = img;
      this.srcX = srcX;
      this.srcY = srcY;
      this.srcW = srcW;
      this.srcH = srcH;
    }
  }

};
