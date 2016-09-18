define(function(require) {
	var PhaserDep = require('lib/phaser.min'),
	    R = require('lib/ramda.min');

	var BUTTONS = {
		left : {
			name: 'left',
			sprite: {idle: 0, pressed: 1},
			pos: {x: 10, y: 500}

		}, 

		right: {
			name: 'right',
			sprite: {idle: 0, pressed: 1},
			pos: {x: 116, y: 500}
		}, 

		jump: {
			name: 'jump',
			sprite: {idle: 2, pressed: 3},
			pos: {x: 650, y: 450}
		}
	};

	ScreenGamepad = function(game) {	
		this.buttons = R.map(R.curry(createButton)(this, game))(BUTTONS);
	}
	
	//ScreenGamepad.prototype = Object.create(Phaser.Group.prototype);

	ScreenGamepad.prototype.constructor = ScreenGamepad;
	
	ScreenGamepad.prototype.isLeft = function() {
		return this.buttons['left'].isDown;
	}
	
	ScreenGamepad.prototype.isRight = function() {
		return this.buttons['right'].isDown;
	}

	ScreenGamepad.prototype.isJump = function() {
		return this.buttons['jump'].isDown;
		
	}

	function createButton(context, game, def) {
		var button = game.add.button(
			def.pos.x, 
			def.pos.y, 
			'gamepad', 
			null, 
			context, 
			def.sprite.idle, 
			def.sprite.pressed, 
			def.sprite.idle,
			def.sprite.pressed);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
		//button.scale.setTo(0.5, 0.5);
		button.fixedToCamera = true;  //our buttons should stay on the same place  
		button.events.onInputOver.add(function(){ context.buttons[def.name].isDown = true; });
    	button.events.onInputOut.add(function(){ context.buttons[def.name].isDown = false; });
    	button.events.onInputDown.add(function(){ context.buttons[def.name].isDown = true; });
		button.events.onInputUp.add(function(){ context.buttons[def.name].isDown = false; });	
		return { isDown: false };
	}

	return ScreenGamepad;
});
