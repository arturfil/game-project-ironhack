var Input = {
  init: function(data) {
    var self = this;

    $(window).on('keydown', function (event) {
      self.helpers.down[event.keyCode] = true;
    });

    $(window).on("keyup", function() {
      delete self.helpers.down[event.keyCode];
      delete self.helpers.pressed[event.keyCode];
    })
  },

  helpers: {
    isDown: function (code) {
      return Input.helpers.down[code];
    },

      isPressed: function () {
        if (Input.helpers.pressed[code]) {
          return false;
        } else if (Input.helpers.down[code]) {
          return Input.helpers.pressed[code] = true;
        }

        return false
      },

      down: {},
      pressed: {}
  }
};
