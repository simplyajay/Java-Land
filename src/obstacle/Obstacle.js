export default class Obstacle extends Phaser.Physics.Matter.Sprite{

    constructor(scene, x, y, texture){

        super(scene, x, y, texture);
        this.scene.add.existing(this);
        this.setSensor(true);
        this.setStatic(true);
        this.setName("obstacle");

    }

}