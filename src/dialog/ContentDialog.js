import { addScore, addTask, addTaskAttemptCount, setAllTaskAnswered, taskAttemptCount, taskCorrectCount } from "../scenes/World";
import ReadingMaterials from "./ReadingMaterials";
import ScoreDialog from "./ScoreDialog";

//to determine the selected answer of which sign
let answersMap = new Map();

let currentSign;
let isQuizActive = false;
let visible = false;

export default class ContentDialog {

    constructor() { }

    newDialog(scene, sign) {

        //------------------------------------------------------------- DISPLAYING THE DIALOG --------------------------------------------------------------------------------/

        currentSign = sign;

        this.setDialogFunctions(scene);

        //reading materials div
        let readingContentBox = document.getElementById("reading-material-content");
        //questions div
        let questionsContentBox = document.getElementById("questions-content");

        //confirmation dialog
        let confirmBox = document.getElementById("confirm-box");

        //to determine if the answered task is correct/wrong
        let isCorrect = false;

        //remove contents before adding content, to avoid text duplicates
        while (readingContentBox.firstChild) {

            readingContentBox.removeChild(readingContentBox.firstChild);

        }

        while (questionsContentBox.firstChild) {

            questionsContentBox.removeChild(questionsContentBox.firstChild);

        }

        //load dialog
        loadContents();

        visible = true;

        //------------------------------------------------------------- DISPLAYING THE DIALOG --------------------------------------------------------------------------------/

        //************************************************************   DIALOG FUNCTIONS   **********************************************************************************/

        function loadContents() {

            try {

                //dialog box div
                let dialogBox = document.getElementById('input-box');

                //multple choice, true or false box from index.html variable initialization
                let trueOrFalseBox = document.getElementById('true-false-block');
                let multipleChoiceBox = document.getElementById('multiple-choice-block');

                // get true-false buttons from index
                var optionTrue = document.getElementById('optionTrue');
                var optionFalse = document.getElementById('optionFalse');

                //multiple choice options
                var optionA = document.getElementById('option1');
                var optionB = document.getElementById('option2');
                var optionC = document.getElementById('option3');

                //get readingmaterial and quiz buttons (link)
                var quizBtn = document.getElementById("quiz-button");
                var readingMaterialBtn = document.getElementById("reading-material-button");

                //modal
                var quiz = document.getElementById("quiz");
                var readingMaterial = document.getElementById("reading-material");

                let readingMat = new ReadingMaterials();
                let contents = readingMat.getContents();

                contents.forEach(content => {

                    if (content.getSign() == sign.name) {

                        sign.setDifficulty(content.getDifficulty());

                        // 0 = means true or false, 1 means multiple choice, else ang gigamit kay fixed ang value either 0 or 1
                        switch (content.getType()) {

                            case 0:

                                //show true-false div 
                                trueOrFalseBox.style.display = "block";
                                //hide multiple choice div
                                multipleChoiceBox.style.display = "none";

                                break;

                            case 1:

                                //hide true-false div 
                                trueOrFalseBox.style.display = "none";
                                //show multiple choice div
                                multipleChoiceBox.style.display = "block";

                                break;

                        }

                        if (sign.isQuizClicked()) {

                            quizBtn.className = "title-after";
                            readingMaterialBtn.className = "title-locked";

                            quiz.style.display = "inline-block";
                            readingMaterial.style.display = "none";
                            isQuizActive = true;


                        } else {

                            quizBtn.className = "title-before";
                            readingMaterialBtn.className = "title-after";

                            quiz.style.display = "none";
                            readingMaterial.style.display = "inline-block";

                        }

                        optionTrue.className = "btn btn-primary";
                        optionFalse.className = "btn btn-primary";
                        optionA.className = "btn btn-primary";
                        optionB.className = "btn btn-primary";
                        optionC.className = "btn btn-primary";

                        setDifficultyText(content.getDifficulty());
                        putReadingMaterials(content.getReadingMaterial());
                        putQuestions(content.getQuestion());
                        putAnswers(content.getType(), content.getAnswer());

                        dialogBox.style.display = "inline-block";

                    }

                });


            } catch (e) {



            }

        }

        function putReadingMaterials(arrayOfContents) {

            arrayOfContents.forEach(phrase => {

                var readingMaterialContent = document.createElement('P');
                readingMaterialContent.className = "left";
                var contentText = null;

                if (phrase == '') {

                    var spacing = document.createElement('br')

                    readingMaterialContent.appendChild(spacing);

                }

                contentText = document.createTextNode(phrase);

                readingMaterialContent.appendChild(contentText);

                readingContentBox.appendChild(readingMaterialContent);

            });

        }

        function putQuestions(arrayOfQuestions) {

            arrayOfQuestions.forEach(phrase => {

                var questionContent = document.createElement('P');
                questionContent.className = "left";
                var contentText = null;

                if (phrase == '') {

                    var spacing = document.createElement('br')

                    questionContent.appendChild(spacing);

                }

                contentText = document.createTextNode(phrase);

                questionContent.appendChild(contentText);

                questionsContentBox.appendChild(questionContent);

            });

        }

        function putAnswers(type, answer) {

            switch (type) {

                case 0:

                    trueFalseAnswerHandler(sign, answer);

                    break;

                case 1:

                    multipleChoiceAnswerHandler(sign, answer);

                    break;


            }

        }

        function setDifficultyText(difficulty) {

            //difficultyBox
            var difficultyBox = document.getElementById('difficulty')
            var difficultyText = document.createElement('P');

            while (difficultyBox.firstChild) {

                difficultyBox.removeChild(difficultyBox.firstChild);

            }

            switch (difficulty) {

                case 0:

                    var text = document.createTextNode('Easy');
                    difficultyText.className = "q-difficulty-easy";
                    difficultyText.appendChild(text);
                    difficultyBox.appendChild(difficultyText);

                    break;

                case 1:

                    var text = document.createTextNode('Average');
                    difficultyText.className = "q-difficulty-average";
                    difficultyText.appendChild(text);
                    difficultyBox.appendChild(difficultyText);

                    break;

                case 2:

                    var text = document.createTextNode('Hard');
                    difficultyText.className = "q-difficulty-advanced";
                    difficultyText.appendChild(text);
                    difficultyBox.appendChild(difficultyText);

                    break;

            }

        }

        function multipleChoiceAnswerHandler(sign, answer) {

            let selectedAnswerID;

            //multiple choice options
            var optionA = document.getElementById('option1');
            var optionB = document.getElementById('option2');
            var optionC = document.getElementById('option3');

            optionA.removeAttribute("onclick");
            optionB.removeAttribute("onclick");
            optionC.removeAttribute("onclick");

            switch (answer) {

                case 0:

                    var wrongAnswersArray = [];

                    if (sign.isDone()) {

                        if (sign.isCorrect()) {

                            optionA.className = "btn btn-success";
                            optionB.className = "btn btn-primary";
                            optionC.className = "btn btn-primary";

                        } else {

                            let buttons = [];

                            buttons.push(optionA, optionB, optionC);

                            if (answersMap.has(sign.name)) {

                                selectedAnswerID = answersMap.get(sign.name);

                            }

                            buttons.forEach(button => {

                                button.className = "btn btn-primary"

                                if (button.id == selectedAnswerID) {

                                    button.className = "btn btn-danger";

                                }

                            });

                        }

                    } else {

                        // @ts-ignore
                        optionA.disabled = false;
                        // @ts-ignore
                        optionB.disabled = false;
                        // @ts-ignore
                        optionC.disabled = false;

                        optionA.addEventListener("click", correctAnswerHandler, { once: true });
                        optionB.addEventListener("click", wrongAnswerHandler, { once: true });
                        optionC.addEventListener("click", wrongAnswerHandler, { once: true });

                        wrongAnswersArray.push(optionB, optionC);

                        //param = correctAnswer, wrongAnswers (array)
                        optionA.onclick = function () {

                            setMultipleChoiceFunctions(optionA, wrongAnswersArray, optionA);

                        }

                        optionB.onclick = function () {

                            setMultipleChoiceFunctions(optionA, wrongAnswersArray, optionB);

                        }

                        optionC.onclick = function () {

                            setMultipleChoiceFunctions(optionA, wrongAnswersArray, optionC);

                        }

                    }

                    break;

                case 1:

                    var wrongAnswersArray = [];

                    if (sign.isDone()) {

                        if (sign.isCorrect()) {

                            optionA.className = "btn btn-primary";
                            optionB.className = "btn btn-success";
                            optionC.className = "btn btn-primary";

                        } else {

                            let buttons = [];

                            buttons.push(optionA, optionB, optionC);

                            if (answersMap.has(sign.name)) {

                                selectedAnswerID = answersMap.get(sign.name);

                            }

                            buttons.forEach(button => {

                                button.className = "btn btn-primary"

                                if (button.id == selectedAnswerID) {

                                    button.className = "btn btn-danger";

                                }

                            });

                        }

                    } else {

                        // @ts-ignore
                        optionA.disabled = false;
                        // @ts-ignore
                        optionB.disabled = false;
                        // @ts-ignore
                        optionC.disabled = false;

                        optionA.addEventListener("click", wrongAnswerHandler, { once: true });
                        optionB.addEventListener("click", correctAnswerHandler, { once: true });
                        optionC.addEventListener("click", wrongAnswerHandler, { once: true });

                        wrongAnswersArray.push(optionA, optionC);

                        //param = correctAnswer, wrongAnswers (array)

                        optionA.onclick = function () {

                            setMultipleChoiceFunctions(optionB, wrongAnswersArray, optionA);

                        }

                        optionB.onclick = function () {

                            setMultipleChoiceFunctions(optionB, wrongAnswersArray, optionB);

                        }

                        optionC.onclick = function () {

                            setMultipleChoiceFunctions(optionB, wrongAnswersArray, optionC);

                        }

                    }

                    break;

                case 2:

                    var wrongAnswersArray = [];

                    if (sign.isDone()) {

                        if (sign.isCorrect()) {

                            optionA.className = "btn btn-primary";
                            optionB.className = "btn btn-primary";
                            optionC.className = "btn btn-success";

                        } else {

                            let buttons = [];

                            buttons.push(optionA, optionB, optionC);

                            if (answersMap.has(sign.name)) {

                                selectedAnswerID = answersMap.get(sign.name);

                            }

                            buttons.forEach(button => {

                                button.className = "btn btn-primary"

                                if (button.id == selectedAnswerID) {

                                    button.className = "btn btn-danger";

                                }

                            });

                        }

                    } else {

                        // @ts-ignore
                        optionA.disabled = false;
                        // @ts-ignore
                        optionB.disabled = false;
                        // @ts-ignore
                        optionC.disabled = false;

                        optionA.addEventListener("click", wrongAnswerHandler, { once: true });
                        optionB.addEventListener("click", wrongAnswerHandler, { once: true });
                        optionC.addEventListener("click", correctAnswerHandler, { once: true });

                        wrongAnswersArray.push(optionA, optionB);

                        //param = correctAnswer, wrongAnswers (array)
                        optionA.onclick = function () {

                            setMultipleChoiceFunctions(optionC, wrongAnswersArray, optionA);

                        }

                        optionB.onclick = function () {

                            setMultipleChoiceFunctions(optionC, wrongAnswersArray, optionB);

                        }

                        optionC.onclick = function () {

                            setMultipleChoiceFunctions(optionC, wrongAnswersArray, optionC);

                        }


                    }

                    break;

            }

        }

        function trueFalseAnswerHandler(sign, answer) {

            var optionTrue = document.getElementById('optionTrue');
            var optionFalse = document.getElementById('optionFalse');

            switch (answer) {

                case 0:

                    if (sign.isDone()) {

                        if (sign.isCorrect()) {

                            optionTrue.className = "btn btn-success";
                            optionFalse.className = "btn btn-primary";

                        } else {

                            optionTrue.className = "btn btn-primary";
                            optionFalse.className = "btn btn-danger";

                        }


                    } else {

                        // @ts-ignore
                        optionTrue.disabled = false;
                        // @ts-ignore
                        optionFalse.disabled = false;

                        optionTrue.addEventListener("click", correctAnswerHandler, { once: true });
                        optionFalse.addEventListener("click", wrongAnswerHandler, { once: true });
                        //param = correctAnswer, wrongAnswer                              
                        setTrueFalseConfirmFunctions(optionTrue, optionFalse);

                    }

                    break;

                case 1:

                    if (sign.isDone()) {

                        if (sign.isCorrect()) {

                            optionTrue.className = "btn btn-primary";
                            optionFalse.className = "btn btn-success";

                        } else {

                            optionTrue.className = "btn btn-danger";
                            optionFalse.className = "btn btn-primary";

                        }

                    } else {

                        // @ts-ignore
                        optionTrue.disabled = false;
                        // @ts-ignore
                        optionFalse.disabled = false;

                        optionTrue.addEventListener("click", wrongAnswerHandler, { once: true });
                        optionFalse.addEventListener("click", correctAnswerHandler, { once: true });
                        //param = correctAnswer, wrongAnswer
                        setTrueFalseConfirmFunctions(optionFalse, optionTrue);

                    }

                    break;

            }

        }

        function setMultipleChoiceFunctions(correctAnswer, wrongAnswers, answer) {

            //yes/no dialog options
            let optionYes = document.getElementById("optionYes");
            let optionNo = document.getElementById("optionNo");

            //purpose = para mabal an unsa nga option ang giclick sa user.

            optionYes.onclick = function () {

                answersMap.set(sign.name, answer.id);

                if (isCorrect) {

                    addTask(1);
                    addTaskAttemptCount(1);
                    addScore('sign', sign.getDifficulty());
                    correctAnswer.className = "btn btn-success";
                    sign.setIsCorrect(true);

                } else {

                    addTaskAttemptCount(1);
                    answer.className = "btn btn-danger";
                    sign.setIsCorrect(false);

                }

                showMessageDialog();

                wrongAnswers.forEach(wrongAnswer => {

                    wrongAnswer.disabled = true;

                });

                correctAnswer.disabled = true;
                sign.setDone(true);
                sign.setTexture('task-finished');
                confirmBox.style.display = "none";

            }

            optionNo.onclick = function () {

                wrongAnswers.forEach(wrongAnswer => {

                    wrongAnswer.addEventListener("click", wrongAnswerHandler, { once: true });

                });

                correctAnswer.addEventListener("click", correctAnswerHandler, { once: true });
                confirmBox.style.display = "none";

            }

        }

        function setTrueFalseConfirmFunctions(correctAnswer, wrongAnswer) {

            //yes/no dialog options
            let optionYes = document.getElementById("optionYes");
            let optionNo = document.getElementById("optionNo");

            optionYes.onclick = function () {

                if (isCorrect) {

                    addTask(1);
                    addTaskAttemptCount(1);
                    addScore('sign', sign.getDifficulty());
                    correctAnswer.className = "btn btn-success";
                    sign.setIsCorrect(true);


                } else {

                    addTaskAttemptCount(1);
                    wrongAnswer.className = "btn btn-danger";
                    sign.setIsCorrect(false);

                }

                showMessageDialog();

                sign.setDone(true);
                sign.setTexture('task-finished');
                correctAnswer.disabled = true;
                wrongAnswer.disabled = true;
                confirmBox.style.display = "none";

            }

            optionNo.onclick = function () {

                correctAnswer.addEventListener("click", correctAnswerHandler, { once: true });
                wrongAnswer.addEventListener("click", wrongAnswerHandler, { once: true });
                confirmBox.style.display = "none";

            }

        }

        function showMessageDialog() {

            //messageBox
            let messageBox = document.getElementById("message-box");
            let messageBoxContent = document.getElementById("message-box-content");
            let messageContent = document.createElement("P");

            while (messageBoxContent.firstChild) {

                messageBoxContent.removeChild(messageBoxContent.firstChild);

            }

            if (isCorrect) {

                var messageText = document.createTextNode("Your answer is correct!");

            } else {

                var messageText = document.createTextNode("Your answer is wrong!");

            }

            messageContent.className = "justify";
            messageContent.appendChild(messageText);
            messageBoxContent.appendChild(messageContent);

            messageBox.style.display = "inline-block";
        }

        function correctAnswerHandler() {

            isCorrect = true;
            confirmBox.style.display = "inline-block";
            isQuizActive = false;

        }

        function wrongAnswerHandler() {

            isCorrect = false;
            confirmBox.style.display = "inline-block";
            isQuizActive = false;

        }

        //************************************************************   DIALOG FUNCTIONS   **********************************************************************************/

    }

    hideDialog() {

        //hide dialog
        let dialogBox = document.getElementById('input-box');
        let confirmBox = document.getElementById("confirm-box");
        let quiz = document.getElementById("quiz");
        let readingMaterial = document.getElementById("reading-material");
        let quizBtn = document.getElementById("quiz-button");
        let readingMaterialBtn = document.getElementById('reading-material-button');

        dialogBox.style.display = "none";
        confirmBox.style.display = "none";
        quiz.style.display = "none";
        readingMaterial.style.display = "inline-block";
        quizBtn.className = "title-before";
        readingMaterialBtn.className = "title-after";

        visible = false;

    }

    setDialogFunctions(scene) {

        // DIALOG FUNCTION

        // Get the modal
        var quiz = document.getElementById("quiz");
        var readingMaterial = document.getElementById("reading-material");
        var inputBox = document.getElementById('input-box')

        //messageBox ok button
        var messageBox = document.getElementById("message-box");
        var okButton = document.getElementById("optionOk");

        // Get the button that opens the modal
        var quizBtn = document.getElementById("quiz-button");
        var readingMaterialBtn = document.getElementById("reading-material-button");
        var closeBtn = document.getElementById("close-button");

        //quiz-confirm dialog
        var quizConfirmBox = document.getElementById("quiz-confirm-box");
        var quizOptionProceed = document.getElementById("quiz-confirm-optionProceed");
        var quizOptionCancel = document.getElementById("quiz-confirm-optionCancel");

        //answer confirm dialog
        var answerConfirmBox = document.getElementById("confirm-box");

        var okButton2 = document.getElementById('finish-optionOk');
        var messageBox2 = document.getElementById('finish-message-box');

        // When the user clicks the button1/quizbtn, open the quiz div
        quizBtn.onclick = function () {

            if (!isQuizActive) {

                quizConfirmBox.style.display = "inline-block";

            }

        }

        quizOptionProceed.onclick = function () {

            quiz.style.display = "inline-block";
            quizBtn.className = "title-after";

            readingMaterial.style.display = "none";
            readingMaterialBtn.className = "title-locked";

            isQuizActive = true;
            currentSign.setQuizClicked(true);

            quizConfirmBox.style.display = "none";

        }

        quizOptionCancel.onclick = function () {

            quizConfirmBox.style.display = "none";

        }

        // When the user clicks the btn2/reading_mat -> close the quiz div ->open the reading_mat_content div
        readingMaterialBtn.onclick = function () {
            readingMaterial.style.display = "inline-block";
            readingMaterialBtn.className = "title-after";

            quiz.style.display = "none";
            quizBtn.className = "title-before";
        }

        closeBtn.onclick = function () {

            inputBox.style.display = "none";
            quizConfirmBox.style.display = "none";
            answerConfirmBox.style.display = "none";
            messageBox.style.display = "none";
            scene.resume();

        }

        okButton.onclick = function () {

            messageBox.style.display = "none";

            if (taskAttemptCount == 20) {

                messageBox2.style.display = "inline-block";

            }

        }

        okButton2.onclick = function () {

            if (isDialogVisible()) {

                let dialogBox = document.getElementById('input-box');
                let confirmBox = document.getElementById("confirm-box");
                let quiz = document.getElementById("quiz");
                let readingMaterial = document.getElementById("reading-material");
                let quizBtn = document.getElementById("quiz-button");
                let readingMaterialBtn = document.getElementById('reading-material-button');

                dialogBox.style.display = "none";
                confirmBox.style.display = "none";
                quiz.style.display = "none";
                readingMaterial.style.display = "inline-block";
                quizBtn.className = "title-before";
                readingMaterialBtn.className = "title-after";
                messageBox2.style.display = "none";

                setAllTaskAnswered(true);
                visible = false;

                var scoreDialog = new ScoreDialog();
                scoreDialog.showScoreDialog(scene);

            }

        }


    }

}

function isDialogVisible() {

    return visible;

}

export {

    isDialogVisible

}






