import Phaser from "phaser";

export default class TaskSign extends Phaser.Physics.Matter.Sprite{

    constructor(scene, x, y, texture, frame){

        super(scene, x, y, texture, frame);

        //this.setBounce(0);
        this.scene.add.existing(this);
        this.setSensor(true);
        this.setStatic(true);
        this.finished = false;
        this.correct = false;
        this.quizClicked = false;
        this.difficulty = null;

    }

    isDone(){

        return this.finished;

    }

    setDone(value){

        this.finished = value;

    }

    isCorrect(){

        return this.correct;

    }

    setIsCorrect(value){

        this.correct = value;

    }

    isQuizClicked(){

        return this.quizClicked;

    }

    setQuizClicked(value){

        this.quizClicked = value;

    }

    getDifficulty(){

        return this.difficulty;

    }

    setDifficulty(value){

        this.difficulty = value;

    }

}