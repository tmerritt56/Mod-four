// code quiz
// set up variables and questions
var element = document.getElementById("Start"); 
// start btn
var qBody = document.getElementById("quiz");
// quiz body
var qResults = document.getElementById("result");
// quiz results
var fScore = document.getElementById("finalscore");
// final score
var qEnd = document.getElementById("quizend");
//  quiz end page
var questionEl = document.getElementById("questions");
// questions el
var quizTimer = document.getElementById("time");
// quiz timer
var startQp = document.getElementById("startPage");
// starting page
var hsContainer = document.getElementById("hscontainer");
// high score  container
var hsPage = document.getElementById("hspage");
// hs page
var hsInput = document.getElementById("initials");
// hs input for initials
var hsInit = document.getElementById("hsinitials");
// hs score initials
var hsScore = document.getElementById("hsscore");
// high score score
var sScore = document.getElementById("submitscore");
// submit score button
var endButtons = document.getElementById("endbtns");
// end quiz or replay buttns 
var button1 = document.getElementById("1");
// button for choice 1
var button2 = document.getElementById("2");
// button for choice2
var button3 = document.getElementById("3");
// button for choice3
var button4 = document.getElementById("4");
// button for choice4

var qQuestions = [{
    question: "What does DOM stand for?",
    choice1: "Document Object Model",
    choice2: "Desktop Oriented Mode",
    choice3: "Digital Ordinance Model",
    choice4: "Display Object Management",
    correctAnswer: "1"},
{
    question: "What is used primarily to add styling to a web page?",
    choice1: "CSS",
    choice2: "HTML",
    choice3: "Python",
    choice4: "Potato",
    correctAnswer: "1"},
{
    question: "How many elements can you apply an 'Id' attribute to?",
    choice1: "3",
    choice2: "1",
    choice3: "130",
    choice4: "As many as you want",
    correctAnswer: "2"},
{
    question: "When is localStorage data cleared?",
    choice1: "On page reload",
    choice2: "On browser close",
    choice3: "No expiration time",
    choice4: "On pc restart",
    correctAnswer: "3"}, 
];
var finalQ = qQuestions.length;
var currentQ = 0;
var score = 0;
var correct;
var timeLeft = 40;
var timeInterval;

element.addEventListener("click",startQuiz);

function generateQuizQuestions (){
    qEnd.style.display = "none";
    if (currentQ === finalQ){
        return scoreS();
    }
    var currentQuestion = qQuestions[currentQ];
    questionEl.innerText = currentQuestion.question;
    button1.innerHTML = currentQuestion.choice1;
    button2.innerHTML = currentQuestion.choice2;
    button3.innerHTML = currentQuestion.choice3;
    button4.innerHTML = currentQuestion.choice4;
};
function startQuiz(){
    qEnd.style.display = "none";
    startQp.style.display = "none";
    generateQuizQuestions ();
    // timer
   timeInterval = setInterval(function(){
    timeLeft--;
    quizTimer.textContent = "Time remaining: " + timeLeft;
   if (timeLeft<0){
    clearInterval(timeInterval);
    scoreS();
   }
},1000);
qBody.style.display ="block";
}
function scoreS(){
    qBody.style.display="none";
    qEnd.style.display ="flex";
    hsInit.value = "";
    fScore.innerHTML = "You got "+ score + " out of " + qQuestions.length + " correct!";
}
sScore.addEventListener("click", function highscore(){
    if(hsInput.value === "") {
        alert("Please input your initials!");
        return false;
    } else {
        var savedHs = JSON.parse(localStorage.getItem("savedHs")) || [];
        var currentU = hsInput.value.trim();
        var currentHs = {
            name: currentU,
            score: score
        };
        qEnd.style.display = "none";
        hsContainer.style.display = "flex";
        hsPage.style.display = "block";
        endButtons.style.display = "flex";

        savedHs.push(currentHs);
        localStorage.setItem("savedHs",JSON.stringify(savedHs));
        generateHighScores();
    }
});

function generateHighScores (){
    hsInit.innerHTML = "";
    hsScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHs")) || [];
    for (i=0; i<highscores.length; i++) {
        var nName = document.createElement("li");
        var nScore = document.createElement("li");
        nName.textContent = highscores[i].name;
        nScore.textContent = highscores[i].score;
        hsInit.appendChild(nName);
        hsScore.appendChild(nScore);
    }
}
function showHighscore(){
    qBody.style.display = "none";
    qEnd.style.display = "none";
    hsContainer.display = "flex";
    hsPage.style.display = "block";
    endButtons.style.display = "flex";

    generateHighScores();
}

function clearScore(){
    window.localStorage.clear ();
    hsInit.textContent = "";
    hsScore.textContent = "";
}
function playAgain (){
    hsContainer.style.display = "none";
    qEnd.style.display = "none";
    startQp.style.display = "flex";
    timeLeft = 40;
    score = 0;
    currentQ = 0;
}
function checkAnswer (answers){
    correct = qQuestions[currentQ].correctAnswer;

    if (answers === correct && currentQ !== finalQ){
        score++;
        currentQ++;
        generateQuizQuestions();
    } else if (answers !== correct && currentQ !== finalQ){
        currentQ++;
        timeLeft -=10;
        generateQuizQuestions();
    } else {
        scoreS();
    }
}
   //  need to have timer start when user is presented with a question 
//  another question appears after user answers the previous one. 
//  if user answers question wrongly time will be subtracted from the clock 
//  when user answers all questions or time runs out, quiz is over. 
//  once quiz is over user can save their initials and score. 