define(function(require) {
	
	ScreenGamepad = function(game) {	
		this.cursors = game.input.keyboard.createCursorKeys();
	}
	
	ScreenGamepad.prototype.constructor = ScreenGamepad;
	
	ScreenGamepad.prototype.isLeft = function() {
		return this.cursors.left.isDown;
	}
	
	ScreenGamepad.prototype.isRight = function() {
		return this.cursors.right.isDown;
	}

	ScreenGamepad.prototype.isJump = function() {
		return this.cursors.up.isDown;
		
	}
});
