// code quiz
// set up variables and questions
var qBody = document.getElementById("quiz");
var qResults = document.getElementById("results");
var fScore = document.getElementById("finalscore");
var qEnd = document.getElementById("quizend");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("time");
var qStart = document.getElementById("startbtn");
var startQp = document.getElementById("startPage");
var hsContainer = document.getElementById("hscontainer");
var hsPage = document.getElementById("hspage");
var hsInput = document.getElementById("initials");
var hsInit = document.getElementById("hsinitials");
var hsScore = document.getElementById("hsscore");
var sScore = document.getElementById("submitscore");
var endButtons = document.getElementById("endbtns");
var button1 = document.getElementById("1");
var button2 = document.getElementById("2");
var button3 = document.getElementById("3");
var button4 = document.getElementById("4");

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
    choice2: "On browser clse",
    choice3: "No expiration time",
    choice4: "On pc restart",
    correctAnswer: "3"}, 
];
var finalQ = qQuestions.length;
var currentQ = 0;
var score = 0;
var correct;
var timeLeft = 75;

function generateqQuestions (){
    qEnd.style.display = "none";
    if (currentQ === finalQ){
        return sShow();
    }
    var currentQuestion = qQuestions[currentQ];
    questionEl.innerhtml = "<p>" + currentQuestion.question + "<p>";
    button1.innerHTML = currentQ.choice1;
    button2.innerHTML = currentQ.choice2;
    button3.innerHTML = currentQ.choice3;
    button4.innerHTML = currentQ.choice4;
};
function startQuiz(){
    qEnd.style.display = "none";
    startQp.style.display = "none";

    // timer
   var timerI = setInterval(function(){
   if (timeLeft > 1) {
    quizTimer.textContent = timeLeft + ' Time Remaining';
    timeLeft--;
   } else {
    quizTimer.textContent = '';
    clearInterval(timerI);
    sScore();
   }
},1000);
qBody.style.display ="block";
}
function sScore(){
    qBody.style.display="none";
    qEnd.style.display ="flex";
    hsInit.value = "";
}
// qStart.addEventListener("click", startQuiz);
   //  need to have timer start when user is presented with a question 
//  another question appears after user answers the previous one. 
//  if user answers question wrongly time will be subtracted from the clock 
//  when user answers all questions or time runs out, quiz is over. 
//  once quiz is over user can save their initials and score.  