export default class Content{

    constructor(signName, readingMat, question, answer, difficulty, type){

        this.signName = signName;
        this.readingMaterial = readingMat;
        this.question = question;
        this.answer = answer;
        this.difficulty = difficulty;
        this.type = type;

    }

    getSign(){

        return this.signName;

    }

    getReadingMaterial(){

        return this.readingMaterial;

    }

    getQuestion(){

        return this.question;

    }

    getAnswer(){

        return this.answer;

    }

    getDifficulty(){

        return this.difficulty;

    }

    getType(){

        return this.type;

    }

}