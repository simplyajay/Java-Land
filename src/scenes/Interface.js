import Phaser from "phaser";
import { bronzeCount, goldCount, health, isCharacterAlive, isDeathAnimationFinished, isGameOver, silverCount, taskCorrectCount } from "./World";

let healthImage;
let bronzeCountText;
let silverCountText;
let goldCountText;
let taskCountText;
let textStyle = {

    fontSize: '1.5vw',
    fontFamily: 'Courier New',
    stroke: '#474747',
	strokeThickness: 4,

}

let gameOverTextStyle = {

    fontSize: '1.5vw',
    fontFamily: 'Courier New',
    stroke: '#474747',
	strokeThickness: 4,

}

let deathMessage;
let interactText;

let screenCenterX = 0;
let screenCenterY = 0;

export default class Interface extends Phaser.Scene{

    constructor(){

        super({

            key: 'interface'

        })

    }

    preload(){

        //interface = bronze,silver,gold,tasks
		this.load.image('bronze-ui' , 'interface/bronze.png');
		this.load.image('silver-ui' , 'interface/silver.png');
		this.load.image('gold-ui' , 'interface/gold.png');
		this.load.image('task-ui' , 'interface/task.png');
        this.load.image('heart-0' , 'interface/heart-0.png');
        this.load.image('heart-1' , 'interface/heart-1.png');
        this.load.image('heart-2' , 'interface/heart-2.png');
        this.load.image('heart-3' , 'interface/heart-3.png');
        this.load.image('heart-4' , 'interface/heart-4.png');
        this.load.image('heart-5' , 'interface/heart-5.png');

    }

    create(){

        screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
	    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2.5;

        this.createImage();

    }

    update(){

        this.updateText();

        healthImage.setTexture('heart-' + health);

        if(!isCharacterAlive && isDeathAnimationFinished){

            if(isGameOver){

                deathMessage.setText('Game Over');
                deathMessage.setVisible(true);
                interactText.setText('Press <space> to view score');
                interactText.setVisible(true);
    
            }else{
    
                if(health > 0){
    
                    deathMessage.setText('You Died');
                    deathMessage.setVisible(true);
                    interactText.setText('Press <space> to respawn');
                    interactText.setVisible(true);
                    
                }
    
            }

        }else{

            deathMessage.setVisible(false);
            interactText.setVisible(false);

        }

    }

    createImage(){

        healthImage = this.add.image(110, 40, 'heart-3');
        healthImage.setScale(0.25);

        var bronzeImage = this.add.image(30, 100, 'bronze-ui');
        bronzeImage.setScale(0.07);
        bronzeCountText = this.add.text(bronzeImage.x * 1.2, bronzeImage.y, bronzeCount.toString(), textStyle);

        var silverImage = this.add.image(30, 150, 'silver-ui');
        silverImage.setScale(0.07);
        silverCountText = this.add.text(silverImage.x * 1.2, silverImage.y, silverCount.toString(), textStyle);

        var goldImage = this.add.image(30, 200, 'gold-ui');
        goldImage.setScale(0.07);
        goldCountText = this.add.text(goldImage.x * 1.2, goldImage.y, goldCount.toString(), textStyle);

        var taskImage = this.add.image(30, 250, 'task-ui');
        taskImage.setScale(0.7);
        taskCountText = this.add.text(taskImage.x * 1.2, taskImage.y, taskCorrectCount.toString(), textStyle);

        deathMessage = this.add.text(screenCenterX, screenCenterY, '', gameOverTextStyle).setOrigin(0.5);
        interactText = this.add.text(screenCenterX, this.cameras.main.worldView.y + this.cameras.main.height / 2, '', textStyle).setOrigin(0.5);
        deathMessage.setVisible(false);
        interactText.setVisible(false);

    }

    updateText(){

        bronzeCountText.setText(bronzeCount.toString());
        silverCountText.setText(silverCount.toString());
        goldCountText.setText(goldCount.toString());
        taskCountText.setText(taskCorrectCount.toString());

    }

}