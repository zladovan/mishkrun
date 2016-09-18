define(function(require) {
	var PhaserDep = require('lib/phaser.min');

	Keyboard = function(game) {	
		console.info("PhaserDep %o", PhaserDep);
		this.cursors = game.input.keyboard.createCursorKeys();
	}
	
	Keyboard.prototype.constructor = Keyboard;
	
	Keyboard.prototype.isLeft = function() {
		return this.cursors.left.isDown;
	}
	
	Keyboard.prototype.isRight = function() {
		return this.cursors.right.isDown;
	}

	Keyboard.prototype.isJump = function() {
		return this.cursors.up.isDown;
		
	}

	return Keyboard;
});
