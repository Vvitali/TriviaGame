console.log("Script.js connected")

//DONE I have to create an object which will store questions, and answers
var arrayOfQuestions = [];
var correctAnswerPosition;
var correctAnswerText;
var timeHolderSecondary;
var timeHolderMain
var indexOfQuestion = -1;
//DONE For displaying content - I will use mainArea div, and jquery .html method.
function displayQuestion(currentIndex) {
    $("#question").text(arrayOfQuestions[currentIndex].question);
    var position = getRandomPositions();
    correctAnswerPosition = position[0];
    $("#" + position[0]).html(arrayOfQuestions[currentIndex].correctAnswer);
    $("#" + position[1]).html(arrayOfQuestions[currentIndex].answer2);
    $("#" + position[2]).html(arrayOfQuestions[currentIndex].answer3);
    $("#" + position[3]).html(arrayOfQuestions[currentIndex].answer4);
}
//Correct answer should be always first!
//DONE and also I have to create a function (constructor), which will take questions, and put it in the object(As I did with The Matrix RPG game).
function addQuestionToArray(questionBody, answer1, answer2, answer3, answer4) {
    //Pushing new object inside the array
    arrayOfQuestions.push({
        question: questionBody,
        correctAnswer: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
    })
    //console.log(arrayOfQuestions[arrayOfQuestions.length - 1].question + " : " + arrayOfQuestions[arrayOfQuestions.length - 1].correctAnswer + " : " + arrayOfQuestions[arrayOfQuestions.length - 1].answer2 + " : " + arrayOfQuestions[arrayOfQuestions.length - 1].answer3 + " : " + arrayOfQuestions[arrayOfQuestions.length - 1].answer4);
}
// TODO
function getRandomPositions() {
    var temp = 10;
    var a, b, c, d;
    a = ~~(Math.random() * 4);
    temp - a;
    b = ~~(Math.random() * 4);
    c = ~~(Math.random() * 4);
    d = ~~(Math.random() * 4);

    return [0, 1, 2, 3];
}

function showTheNextQuestion() {
    indexOfQuestion++;
    var counter = 30;
    console.log("started");

    displayQuestion(indexOfQuestion);
    correctAnswerText = arrayOfQuestions[indexOfQuestion].correctAnswer;
    timeHolderSecondary = setInterval(function() {
        $("#time").text(counter--);
    }, 1000);
    timeHolderMain = setInterval(function() {
        console.log("You were thinking too long! " + correctAnswerPosition + " " + correctAnswerText);
        clearTimeout(timeHolderSecondary);
        clearTimeout(timeHolderMain);
        showTheNextQuestion()
    }, 30 * 1000);
}

$(document).ready(function() {

    addQuestionToArray("Who is The One in The Matrix movie?", "Neo", "Morpeus", "Mr.Smith", "The cake is lie");
    addQuestionToArray("What is a pugilist?", "A boxer", "A stamp collector", "A writer", "The cake is lie");
    addQuestionToArray("How many faces does a cube have?", "Six", "Four", "Ten", "Depends on the size of the cube");

    $(".selectors").on("click", function(event) {
        if (event.currentTarget.id == correctAnswerPosition) {
            console.log("Correct answer!");
            clearTimeout(timeHolderSecondary);
            clearTimeout(timeHolderMain);
            showTheNextQuestion()
        }
        else {
            clearTimeout(timeHolderSecondary);
            clearTimeout(timeHolderMain);
            console.log("Incorrect answer! Correct answer is " + correctAnswerText);
            showTheNextQuestion()
        }
    });
    showTheNextQuestion();
});
