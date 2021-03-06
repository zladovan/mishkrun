define(function(require) {
	var PhaserDep = require('lib/phaser.min'),
	    Keyboard = require('input/Keyboard'),
	    ScreenGamepad = require('input/ScreenGamepad');

	Controls = function(game) {
		if (game.device.desktop) {
			this.controller = new Keyboard(game);
		} else {
			this.controller = new ScreenGamepad(game);
		}
	}
	
	Controls.prototype.constructor = Controls;
	
	Controls.prototype.isLeft = function() {
		return this.controller.isLeft();
	}
	
	Controls.prototype.isRight = function() {
		return this.controller.isRight();
	}

	Controls.prototype.isJump = function() {
		return this.controller.isJump();
	}

	return Controls;
});

