export default class Coin extends Phaser.Physics.Matter.Sprite{

    constructor(scene, x, y, texture){

        super(scene, x, y, texture);

        this.setScale(0.1);
        this.scene.add.existing(this);
        this.setSensor(true);
        this.setStatic(true);

    }

}