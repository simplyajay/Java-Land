import { bronzeCount, bronzeTotalCount, goldCount, goldTotalCount, restartGame, score, silverCount, silverTotalCount, taskCorrectCount, taskTotalCount } from "../scenes/World";
export default class ScoreDialog{

    constructor(){

    }

    showScoreDialog(scene){

        this.setScoreDialogFunctions(scene);

        var scoreDialogBox = document.getElementById('score-box');

        var bronzeScore = document.getElementById('bronze-score');
        var silverScore = document.getElementById('silver-score');
        var goldScore = document.getElementById('gold-score');

        var finalScoreText = document.getElementById('final-score');
        var collectedBronzeCount = document.getElementById('collected-bronze-count');
        var collectedSilverCount = document.getElementById('collected-silver-count');
        var collectedGoldCount = document.getElementById('collected-gold-count');
        var answeredTaskCount = document.getElementById('collected-task-count');

        bronzeScore.style.display = 'none';
        silverScore.style.display = 'none';
        goldScore.style.display = 'none';

        if(score >= 27710){

            goldScore.style.display = 'inline-block';

        }else if(score >= 16300){

            silverScore.style.display = 'inline-block';

        }else{

            bronzeScore.style.display = 'inline-block';

        }

        finalScoreText.innerHTML = score.toString();
        collectedBronzeCount.innerHTML = bronzeCount + '/' + bronzeTotalCount;
        collectedSilverCount.innerHTML = silverCount + '/' + silverTotalCount;
        collectedGoldCount.innerHTML = goldCount + '/' + goldTotalCount;
        answeredTaskCount.innerHTML = taskCorrectCount + '/' + taskTotalCount;

        scoreDialogBox.style.display = 'inline-block';

    }

    hideScoreDialog(){


    }

    setScoreDialogFunctions(scene){

        var scoreDialogBox = document.getElementById('score-box');
        var mainMenuButton = document.getElementById('main-menu-button');
        var playAgainButton = document.getElementById('play-again-button');

        mainMenuButton.onclick = function () {

            scoreDialogBox.style.display = 'none';
            restartGame();
            scene.stop('interface')
            scene.start('main-menu');

        }

        playAgainButton.onclick = function (){

            scoreDialogBox.style.display = 'none';
            restartGame();
            scene.restart();
            
        }

    }

}