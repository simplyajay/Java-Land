import Phaser, { GameObjects, Physics } from 'phaser'
import MaleCharacter from '../characters/MaleCharacter';
import TaskSign from '../signs/TaskSign';
import Coin from '../coin/Coin';
import { createMaleCharacterAnimation } from '../animations/MaleCharacterAnimation';
import { createCoinAnimations } from '../animations/CoinsAnimation';
import { characterControl } from '../controller/CharacterMovement';
import { onCharacterCollision } from '../controller/CharacterMovement';
import { rotatePlayerPhysicsShape } from '../controller/CharacterPhysicsShape';
import { onCoinOverlap, onDangerZoneOverlap, onSignOverlap, showInteractText } from '../controller/Overlap';
import Obstacle from '../obstacle/Obstacle';
import ScoreDialog from '../dialog/ScoreDialog';
import ContentDialog, { isDialogVisible } from '../dialog/ContentDialog';

let signs = [];
let dangerZones = [];
let score = 0;
let health = 5;
let bronzeCount = 0;
let bronzeTotalCount = 0;
let silverCount = 0;
let silverTotalCount = 0;
let goldCount = 0;
let goldTotalCount = 0;

let taskAttemptCount = 0;
let taskCorrectCount = 0;
let taskTotalCount = 0;
let interactText;
let isPaused = false;

let isGameOver = false;
let isCharacterAlive = true;
let isDeathAnimationFinished = false;
let spawnPointX = 0;
let spawnPointY = 0;

let hasInterface = false;
let destroyable = false;
let textStyle = {

	fontSize: '35px',
	fontFamily: 'Courier New',
	stroke: '#474747',
	strokeThickness: 4,

}

let allTaskAnswered = false;

export default class World extends Phaser.Scene {

	constructor() {

		super('main-scene');
		this.cursors = undefined;
		this.isTouchingGround = true;
		this.isLeft = false;
		this.isRight = true;

	}

	preload() {

		//map
		this.load.image('tileset', 'worlds/world-tileset-extruded.png');
		this.load.tilemapTiledJSON('map', 'worlds/world.json');

		//character
		this.load.atlas('character', 'character_male/character-male.png', 'character_male/character-male.json');

		//character physics shapes json
		this.load.json('character-left-shapes', 'character_male/character-male-left-shapes.json')
		this.load.json('character-right-shapes', 'character_male/character-male-right-shapes.json')

		//obstacles
		this.load.image('thorn-top-1', 'obstacles/top-thorn-1-left.png');
		this.load.image('thorn-top-2', 'obstacles/top-thorn-1-right.png');
		this.load.image('thorn-top-3', 'obstacles/top-thorn-2-left.png');
		this.load.image('thorn-top-4', 'obstacles/top-thorn-2-right.png');
		this.load.image('thorn-bottom-1', 'obstacles/bottom-thorn-1-left.png');
		this.load.image('thorn-bottom-2', 'obstacles/bottom-thorn-2-left.png');
		this.load.image('thorn-bottom-3', 'obstacles/bottom-thorn-1-right.png');
		this.load.image('thorn-bottom-4', 'obstacles/bottom-thorn-2-right.png');

		//signs
		this.load.image('task-unfinished', 'task_signs/task_sign_unfinished.png');
		this.load.image('task-finished', 'task_signs/task_sign_finished.png');

		//bronze coins
		this.load.atlas('bronze-coin', 'coin_bronze/bronze.png', 'coin_bronze/bronze.json');

		//silver coins
		this.load.atlas('silver-coin', 'coin_silver/silver.png', 'coin_silver/silver.json');

		//gold coins
		this.load.atlas('gold-coin', 'coin_gold/gold.png', 'coin_gold/gold.json')

		//heart 
		this.load.atlas('heart', 'heart/heart.png', 'heart/heart.json')

		//interface = bronze,silver,gold,tasks

		this.load.image('bronze-ui', 'interface/bronze.png');
		this.load.image('silver-ui', 'interface/silver.png');
		this.load.image('gold-ui', 'interface/gold.png');
		this.load.image('task-ui', 'interface/task.png');

	}

	create() {

		this.group = this.matter.world.nextGroup(true);

		this.cursors = this.input.keyboard.createCursorKeys();

		let [spawnX, spawnY] = this.createWorld();

		this.createPlayer(spawnX, spawnY, 'character');

		this.scene.launch('interface');

		onCharacterCollision(this.matter.world);

		onCoinOverlap(this.matter.world);

		this.freezeControl();
		this.unfreezeControl();

	}

	update() {

		if (health == 0) {

			setIsGameOver(true);

		}

		if (isCharacterAlive) {

			isDeathAnimationFinished = false;

			if (!isPaused) {

				characterControl(this.character, this.cursors);

			}


		} else {

			if (Phaser.Input.Keyboard.JustDown(this.cursors.space) && isDeathAnimationFinished) {

				//main menu
				if (isGameOver) {

					var scoreDialog = new ScoreDialog();

					scoreDialog.showScoreDialog(this.scene);

					//respawn
				} else {

					this.character.setPosition(spawnPointX, spawnPointY);
					setIsCharacterAlive(true);

				}

			}

		}

		onSignOverlap(this.matter.world, this.character, signs, this.cursors);

		onDangerZoneOverlap(this.character, dangerZones);

		this.createInteractText();

		this.updateInteractText();

	}

	createWorld() {

		let spawnPointX = 0;
		let spawnPointY = 0;

		//map creation
		const map = this.make.tilemap({ key: 'map' });
		const mapTileSet = map.addTilesetImage('grassland-biome-tileset', 'tileset', 128, 128, 1, 2);
		map.createLayer('Objects Layer', mapTileSet);

		//defining world spawn point
		const spawnLayer = map.getObjectLayer('Spawn Layer');

		spawnLayer.objects.forEach(objData => {

			const { x, y, name } = objData;

			switch (name) {

				case 'spawn-point': {

					spawnPointX = x;
					spawnPointY = y;

				}

			}

		})

		//spawn signs
		this.spawnSigns(map);

		//coin animations
		createCoinAnimations(this.anims);

		//spawn coins
		this.spawnBronzeCoins(map);
		this.spawnSilverCoins(map);
		this.spawnGoldCoins(map);

		//spawn hearts
		this.spawnHearts(map);

		//spawn obstacles
		this.spawnObstacles(map);

		//solidify ground layer
		const groundLayer = map.createLayer('Ground Layer', mapTileSet);
		groundLayer.setCollisionByProperty({ collides: true });
		this.matter.world.convertTilemapLayer(groundLayer);

		//define camera bounds relative to world size
		this.matter.world.setBounds(0, -256, map.widthInPixels, map.heightInPixels);
		this.cameras.main.setBounds(0, -256, map.widthInPixels, map.heightInPixels);

		this.createDangerZone(map)

		return [spawnPointX, spawnPointY];

	}

	createPlayer(x, y, key) {

		//character physics shapes
		var characterRightShapes = this.cache.json.get('character-right-shapes');
		var characterLeftShapes = this.cache.json.get('character-left-shapes');

		//character creation, animation must be created first
		createMaleCharacterAnimation(this.anims);

		this.character = new MaleCharacter(this.matter.world, x, y, key)
		this.cameras.main.startFollow(this.character, true, 0.1, 0.1);
		this.setSpawnPoint(this.character.x, this.character.y);

		this.character.on('animationcomplete', function () {

			isDeathAnimationFinished = true;

		})

		rotatePlayerPhysicsShape(this.character, characterLeftShapes, characterRightShapes);

	}

	spawnSigns(map) {

		const signSpawnLayer = map.getObjectLayer('Sign Layer');

		let count = 1;
		let signName = 'sign-'

		signSpawnLayer.objects.forEach(objData => {

			switch (objData.name) {

				case 'sign': {

					var sign = new TaskSign(this.matter.world, objData.x, objData.y - (objData.height * 0.25), 'task-unfinished');
					sign.setName(signName + count);

					//this.ilhananNum(sign)

					count++;

					signs.push(sign);

				}

			}

		});

		taskTotalCount = count - 1;

	}

	createInteractText() {

		if (showInteractText) {

			if (!hasInterface) {

				const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
				const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2.5;

				interactText = this.add.text(screenCenterX, screenCenterY, 'Press <Space> to Interact', textStyle).setOrigin(0.5);
				destroyable = true;
				hasInterface = true;

			}

		} else {

			if (destroyable) {

				interactText.destroy();
				hasInterface = false;

			}

		}

	}

	updateInteractText() {

		if (hasInterface) {

			const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
			const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2.5;

			interactText.setPosition(screenCenterX, screenCenterY).setOrigin(0.5);

		}
	}

	spawnBronzeCoins(map) {

		const bronzeLayer = map.getObjectLayer('Bronze Layer');
		var count = 0;

		bronzeLayer.objects.forEach(objData => {

			const { x, y, name, height } = objData;

			switch (name) {

				case 'bronze': {

					count++;
					var bronzeCoin = new Coin(this.matter.world, x, y - 20, 'bronze-coin');
					bronzeCoin.setName('bronze-coin');
					bronzeCoin.play('bronze-coin-anims');

				}

			}

		});

		bronzeTotalCount = count;

	}

	spawnSilverCoins(map) {

		const silverLayer = map.getObjectLayer('Silver Layer');
		var count = 0;

		silverLayer.objects.forEach(objData => {

			const { x, y, name, height } = objData;

			switch (name) {

				case 'silver': {

					count++;
					var silverCoin = new Coin(this.matter.world, x, y - 20, 'silver-coin');
					silverCoin.setName('silver-coin');
					silverCoin.play('silver-coin-anims');

				}


			}

		});

		silverTotalCount = count;

	}

	spawnGoldCoins(map) {

		const goldLayer = map.getObjectLayer('Gold Layer');
		var count = 0;

		goldLayer.objects.forEach(objData => {

			const { x, y, name, height } = objData;

			switch (name) {

				case 'gold': {

					count++;
					var goldCoin = new Coin(this.matter.world, x, y - 20, 'gold-coin');
					goldCoin.setName('gold-coin');
					goldCoin.play('gold-coin-anims');

				}


			}

		});

		goldTotalCount = count;

	}

	spawnHearts(map){

		const heartLayer = map.getObjectLayer('Heart Layer');
		var count = 0;

		heartLayer.objects.forEach(objData => {

			const { x, y, name, height } = objData;

			switch (name) {

				case 'heart': {

					count++;
					var heart = new Coin(this.matter.world, x, y - 20, 'heart');
					heart.setName('heart');
					heart.play('heart-anims');

				}

			}

		});

	}

	spawnObstacles(map) {

		const spikeTopLayer = map.getObjectLayer('SpikeTop Layer');
		const spikeBottomLayer = map.getObjectLayer('SpikeBottom Layer');
		var spikesTopArray = ['thorn-top-1', 'thorn-top-2', 'thorn-top-3', 'thorn-top-4'];
		var spikesBottomArray = ['thorn-bottom-1', 'thorn-bottom-2', 'thorn-bottom-3', 'thorn-bottom-4'];

		spikeTopLayer.objects.forEach(objData => {

			const { x, y, name, height } = objData;

			var texture = spikesTopArray[Math.floor(Math.random() * spikesTopArray.length)];
			var obstacle = new Obstacle(this.matter.world, x, y, texture);
			obstacle.setPosition(x + obstacle.width / 2, y + obstacle.height / 2);

		});

		spikeBottomLayer.objects.forEach(objData => {

			const { x, y, name, height } = objData;

			var texture = spikesBottomArray[Math.floor(Math.random() * spikesTopArray.length)];
			var obstacle = new Obstacle(this.matter.world, x, y, texture);
			obstacle.setPosition(x, y + obstacle.height / 2);

		});

	}

	createDangerZone(map) {

		const signSpawnLayer = map.getObjectLayer('Danger Layer');

		signSpawnLayer.objects.forEach(objData => {


			switch (objData.name) {

				case 'danger': {

					var rectangle = this.add.rectangle(objData.x + (objData.width * 0.5), objData.y - (objData.height * 0.25), objData.width, objData.height);
					dangerZones.push(rectangle);

				}

			}

		})


	}

	setSpawnPoint(x, y) {

		spawnPointX = x;
		spawnPointY = y;

	}

	freezeControl() {

		this.matter.world.on('pause', function () {

			isPaused = true;

		});

	}

	unfreezeControl() {

		this.matter.world.on('resume', function () {

			isPaused = false;

		});

	}

}

function addScore(item, difficulty) {

	switch (item) {

		case 'bronze': {

			score += 20;

			break;

		}

		case 'silver': {

			score += 40;

			break;

		}

		case 'gold': {

			score += 80;

			break;

		}

		case 'sign': {

			switch (difficulty) {

				case 0: {

					score += 500;

					break;

				}

				case 1: {

					score += 1000;

					break;

				}

				case 2: {

					score += 2000;

					break;

				}

			}

			break;

		}

	}

}

function addBronze(value) {

	bronzeCount += value;

}

function addSilver(value) {

	silverCount += value;

}

function addGold(value) {

	goldCount += value;

}

function addTask(value) {

	taskCorrectCount += value;

}

function addTaskAttemptCount(value) {

	taskAttemptCount += value;

}

function setAllTaskAnswered(value) {

	allTaskAnswered = value;

}

function updateHealth(action, value) {

	switch (action) {

		case 'add': {

			if(health < 5 && health > 0){

				health = health + value;

			}
			
			break;

		}

		case 'deduct': {

			if(health <= 5 && health > 0){

				health = health - value;

			}

			break;

		}

	}


}

function setIsGameOver(val) {

	isGameOver = val;

}

function setIsCharacterAlive(value) {

	isCharacterAlive = value;

}

function killCharacter(c) {

	setIsCharacterAlive(false);
	c.play('player-death', true);
	updateHealth('deduct', 1);

}

function restartGame() {

	signs = [];
	dangerZones = [];
	score = 0;
	health = 5;
	bronzeCount = 0;
	bronzeTotalCount = 0;
	silverCount = 0;
	silverTotalCount = 0;
	goldCount = 0;
	goldTotalCount = 0;
	taskAttemptCount = 0;
	taskCorrectCount = 0;
	taskTotalCount = 0;
	interactText;
	isPaused = false;
	isGameOver = false;
	isCharacterAlive = true;
	isDeathAnimationFinished = false;
	spawnPointX = 0;
	spawnPointY = 0;
	hasInterface = false;
	destroyable = false;
	allTaskAnswered = false;

}

export {

	signs,
	score,
	health,
	bronzeCount,
	bronzeTotalCount,
	silverCount,
	silverTotalCount,
	goldCount,
	goldTotalCount,
	taskAttemptCount,
	taskCorrectCount,
	taskTotalCount,
	isGameOver,
	isCharacterAlive,
	isDeathAnimationFinished,
	spawnPointX,
	spawnPointY,
	allTaskAnswered,
	updateHealth,
	addScore,
	addBronze,
	addSilver,
	addGold,
	addTask,
	addTaskAttemptCount,
	setAllTaskAnswered,
	setIsGameOver,
	setIsCharacterAlive,
	killCharacter,
	restartGame,

}

