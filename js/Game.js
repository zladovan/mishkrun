require(['lib/phaser.min', 'Player', 'Ground', 'Enemy'], function(PhaserDep, Player, Ground, Enemy) {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	var ground;
	var player;	
	var enemies;
	var stars;
	var score = 0;
	var scoreText;
	var fx;

	function preload() {
		game.load.image('sky', 'assets/sky.png');
		game.load.image('ground', 'assets/platform.png');
		game.load.image('star', 'assets/star.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
		game.load.audio('sfx', 'assets/sfx.ogg');
	}

	function create() {
		
		game.physics.startSystem(Phaser.Physics.P2JS);
		//game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 300;
		
		var sky = game.add.sprite(0, 0, 'sky');	
		sky.fixedToCamera = true;

		enemies = game.add.group();
		ground = new Ground(game, createEnemy);		
		game.add.existing(ground);
		player = game.add.existing(new Player(game, 32, 0));	
		

		stars = game.add.group();
		stars.enableBody = true;	
		stars.physicsBodyType = Phaser.Physics.P2JS;	
		var starMaterial = game.physics.p2.createMaterial('starMaterial');
		for (var i = 0; i < 11; i++) {
			var star = stars.create(35 + i * 70, 5, 'star');			
			star.body.data.gravityScale = 0.1;
			star.body.setMaterial(starMaterial);
			//star.body.data.shapes[0].sensor = true;		
			//star.body.bounce.y = 0.7 + Math.random() * 0.2;
			//console.info("star %d: %o", i, star);
			//star.body.gravity.y = 6;
		}

		scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000'});
		scoreText.fixedToCamera = true;

		//game.camera.setSize(100, 100);
		game.camera.follow(player);

		fx = game.add.audio('sfx');
		fx.allowMultiple = true;
		fx.addMarker('collect-star', 0.0, 0.458);
		fx.addMarker('land', 0.740, 0.078);

		game.physics.p2.setPostBroadphaseCallback(
			function(body1, body2) {
				//if (body1.sprite.key === 'star' || body2.sprite.key === 'star') {
				//	console.info('PBP b1: %o b2: %o', body1.sprite.key, body2.sprite.key);
				//}
				if (body1.sprite.key === 'star' && body2.sprite.key === 'dude') {
					console.info('POST BROAD PHASE player vs star');
					return false;
				}

				return true;
			},
			this);

		player.body.onBeginContact.add(
			function(body, shapeA, shapeB, equation) {
				if (body.sprite.key == 'star') {
					collectStar(player, body.sprite);
				}
				console.info(
					"Hit with %s A %o B %o eq %o",
					body.sprite.key,
					shapeA,
					shapeB,
					equation);	
			}, 
			this);
	}

	function update() {
		
		//player.update();
		/*console.info(
			'camera x: %o y: %o player x: %o y: %o', 
			game.camera.x,
			game.camera.y,
			player.position.x,
			player.position.y);	*/
		
		if (player.position.x > game.camera.view.centerX || game.camera.view.x > 0) {			
			game.world.setBounds(
				Phaser.Math.clampBottom(player.position.x - game.width / 2, 0), 
				0, 
				game.width, 
				game.height);
		}
		
		ground.update();
		//enemy.update();
		//game.physics.arcade.collide(stars, platforms);
		//game.physics.arcade.overlap(player, stars, collectStar, null, this);
	}

	function collectStar(player, star) {
		star.kill();
		score += 10;
		scoreText.text = 'Score: ' + score;
		fx.play('collect-star');
	}

	function createEnemy(platform) {
		if (Math.random() > 0.9) {
			var enemy = game.add.existing(new Enemy(game, platform.x, platform.y - platform.height / 2, platform.minX, platform.maxX));
			enemies.add(enemy);
			return enemy;
		} else {
			return { kill: function() {}}
		}
	}
});