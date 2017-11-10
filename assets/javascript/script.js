console.log("Script.js connected")

var arrayOfQuestions = [];
var correctAnswerPosition;
var timeHolderSecondary;
var timeHolderMain
var indexOfQuestion = 0;
var score = [0, 0, 0];

function displayQuestion() {
    $("#timeBar").css("width", "100%");
    $("#question").text(arrayOfQuestions[indexOfQuestion].question);
    var position = getRandomPositions();
    correctAnswerPosition = position[0];
    $("#" + position[0]).html(arrayOfQuestions[indexOfQuestion].correctAnswer);
    $("#" + position[1]).html(arrayOfQuestions[indexOfQuestion].answer2);
    $("#" + position[2]).html(arrayOfQuestions[indexOfQuestion].answer3);
    $("#" + position[3]).html(arrayOfQuestions[indexOfQuestion].answer4);
}

function addQuestionToArray(questionBody, answer1, answer2, answer3, answer4) {
    //Pushing new object inside the array
    arrayOfQuestions.push({
        question: questionBody,
        correctAnswer: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
    })
}

function getRandomPositions() {
    var arr = [];
    arr = _.shuffle(_.range(0, 4)).slice(0, 4)
    console.log(arr);
    return arr;
}

function mainFunc() {
    $(".btn-group-vertical").show();
    var counter = 25;
    timeHolderSecondary = setInterval(function() {
        --counter
        $("#timeBar").css("width", (counter * 4) + "%");
    }, 1000);
    timeHolderMain = setInterval(function() {
        $(".btn-group-vertical").hide();
        console.log("You were thinking too long! Rigth answer: " + arrayOfQuestions[indexOfQuestion].correctAnswer);
        $("#question").text("You were thinking too long! Rigth answer: " + arrayOfQuestions[indexOfQuestion].correctAnswer);
        clearTimeout(timeHolderSecondary);
        clearTimeout(timeHolderMain);
        score[2]++;
        finalChecker()
    }, 25 * 1000);
}

function finalChecker() {
    if (indexOfQuestion === arrayOfQuestions.length - 1) {
        $("#question").html("Your score:" + "<p><i class='middle material-icons'>check_circle</i> Correct answers:" + score[0] + "</p><br><p><i class='middle material-icons'>cancel</i> Incorrect answers: " + score[1] + "</p><br><p><i class='middle material-icons'>add_alarm</i> Not answered: " + score[2]);
        $(".btn-group-vertical").hide();
        $(".startButton").prepend("<i class='material-icons'>autorenew</i>")
        $(".startButton").show()
    }
    else {
        setTimeout(function() {
            $(".btn-group-vertical").show();
            indexOfQuestion++;
            displayQuestion();
            mainFunc();
        }, 2000)
    }
}

$(document).ready(function() {
    addQuestionToArray("Who is The One in The Matrix movie?", "Neo", "Morpeus", "Mr.Smith", "Trinity");
    addQuestionToArray("What is a pugilist?", "A boxer", "A stamp collector", "A writer", "The cake is lie");
    addQuestionToArray("How many faces does a cube have?", "Six", "Four", "Ten", "Depends on the size of the cube");

    $(".selectors").on("click", function(event) {
        $(".btn-group-vertical").hide();
        clearTimeout(timeHolderSecondary);
        clearTimeout(timeHolderMain);

        if (event.currentTarget.id == correctAnswerPosition) {
            console.log("Correct answer!");
            $("#question").text("Correct answer!")
            score[0]++;
        }
        else {
            console.log("Incorrect answer! Correct answer is " + arrayOfQuestions[indexOfQuestion].correctAnswer);
            $("#question").text("Incorrect answer! Correct answer is " + arrayOfQuestions[indexOfQuestion].correctAnswer);
            score[1]++;
        }
        finalChecker();
    });

    function start() {
        score = [0, 0, 0];
        indexOfQuestion = 0;
        displayQuestion();
        mainFunc();
        $(".startButton").hide();
    }
    $(".btn-group-vertical").hide();
    $(".startButton").click(start);
});
