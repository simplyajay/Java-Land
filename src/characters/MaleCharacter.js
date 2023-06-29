import Phaser from "phaser";

export default class MaleCharacter extends Phaser.Physics.Matter.Sprite{

    constructor(scene, x, y, key){

        super(scene, x, y, key);

        this.play('player-idle');
		this.setBounce(0);
		this.setName('character')
        this.setFixedRotation();
        this.scene.add.existing(this);

        this.left = false;
        this.right = true;
        this.touchingGround = true;

    }

    setFaceToRight(){

        this.right = true;
        this.left = false;
    
    }

    setFaceToLeft(){

        this.left = true;
        this.right = false;

    }

    setIsTouchingGround(val){

        this.touchingGround = val;

    }

    isFacingRight(){

        return this.right;

    }

    isFacingLeft(){

        return this.left;

    }

    isTouchingGround(){

        return this.touchingGround;

    }

}
