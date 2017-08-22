var Render = {
  init: function (data) {
    Render.helpers.drawEntity(data.entities.background, data.canvas.bgCtx);
  },

  helpers: {
    drawEntity: function (entity, ctx) {
      ctx.drawImage(entity.sprite.img,
        entity.sprite.scrX, entity.sprite.srcY,
        entity.sprite.srcW, entity.sprite.scrH,
        entity.x, entity.y,
        entity.w, entity.h);
    }
  }
};
