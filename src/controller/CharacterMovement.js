import Phaser from "phaser";

function characterControl(character, cursors) {

	const walkSpeed = 5;
	const runSpeed = 12;
	let isRunning = false;

	//movements

	if (cursors.left.isDown && !cursors.right.isDown) {

		if (cursors.shift.isDown) {

			isRunning = true;
			character.setVelocityX(-runSpeed);

			if (character.isTouchingGround()) {

				character.play('player-run', true);

			}

		} else {

			isRunning = false;
			character.setVelocityX(-walkSpeed);

			if (character.isTouchingGround()) {

				character.play('player-walk', true);

			}

		}

		character.setFaceToLeft();
		character.flipX = true;

	} else if (cursors.right.isDown && !cursors.left.isDown) {

		if (cursors.shift.isDown) {

			isRunning = true;
			character.setVelocityX(runSpeed);

			if (character.isTouchingGround()) {

				character.play('player-run', true);

			}

		} else {

			isRunning = false;
			character.setVelocityX(walkSpeed);

			if (character.isTouchingGround()) {

				character.play('player-walk', true);

			}

		}

		character.setFaceToRight();
		character.flipX = false;

	}

	//onJump
	if (Phaser.Input.Keyboard.JustDown(cursors.up)) {

		if (character.isTouchingGround()) {

			character.setIsTouchingGround(false);

			if (isRunning) {

				character.setVelocityY(-20);

			} else {

				character.setVelocityY(-15);

			}

			character.play('player-jump', false);

		}

	}

	//check if player is not moving
	if (((character.isTouchingGround() && !cursors.left.isDown) && (character.isTouchingGround() && !cursors.right.isDown))
		|| (character.isTouchingGround() && cursors.left.isDown) && (character.isTouchingGround() && cursors.right.isDown)) {

		character.play('player-idle', true);

	}

}

//avoid jumping mid-air
function onCharacterCollision(scene) {

	scene.on("collisionstart", function (event) {

		if (event.pairs[0].bodyB.gameObject instanceof Phaser.Physics.Matter.Sprite) {

			if (event.pairs[0].bodyB.gameObject.name == 'character') {

				event.pairs[0].bodyB.gameObject.setIsTouchingGround(true);

			}

			if (event.pairs[0].bodyA.gameObject instanceof Phaser.Physics.Matter.Sprite) {

				if (((event.pairs[0].bodyB.gameObject.name == 'bronze-coin' || event.pairs[0].bodyB.gameObject.name == 'silver-coin' ||
					event.pairs[0].bodyB.gameObject.name == 'gold-coin') && event.pairs[0].bodyA.gameObject.name == 'character') ||
					((event.pairs[0].bodyA.gameObject.name == 'bronze-coin' || event.pairs[0].bodyA.gameObject.name == 'silver-coin' ||
						event.pairs[0].bodyA.gameObject.name == 'gold-coin') && event.pairs[0].bodyB.gameObject.name == 'character')) {

							if (event.pairs[0].bodyA.gameObject.name == 'character') {

								event.pairs[0].bodyA.gameObject.setIsTouchingGround(false);
				
							}

							if (event.pairs[0].bodyB.gameObject.name == 'character') {

								event.pairs[0].bodyB.gameObject.setIsTouchingGround(false);
				
							}
				}

			}

		}

	});

}

export {

	characterControl,
	onCharacterCollision

}