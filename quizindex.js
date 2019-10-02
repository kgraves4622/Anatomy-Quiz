let questionNumber = 0;
let score = 0;

//render the welcome page and start quiz button
function quizStart() {


  // $('.startQuiz').on('click', '.startButton', function (event) {
  $('.startQuiz').remove();
  $('.questionMode').css('display', 'block');
  $('.navButtons').css('display', 'block');
  $('.questionNumber').text(1);
  // });
}

function renderQuiz() {
  $('.questionMode').html(goThroughQuestions());
}

//will load the first of questions and allow user to click through quiz 
function goThroughQuestions() {
  if (questionNumber < STORE.length) {
    return `<div container="questions" class="question-${questionNumber}">
        <h2>${STORE[questionNumber].question}</h2>
        <form>
        <fieldset style='border-width:0px'>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
        <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
        <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <br><label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
        <span>${STORE[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
        <span>${STORE[questionNumber].answers[3]}</span>
        </label></br>
       
        <input type="submit" value="Submit" id="submitButton" / onClick="answerSelected(this)">

        </fieldset>
      </form>
      </div>`;
  } else {
    finalScore();
    $('.questionNumber').text(10)
  }
}

//once an answer is selected
function answerSelected() {
  let selected = $('input:checked');
  let answer = selected.val();

  if(answer !==undefined){

  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  if (answer === correctAnswer) {
    rightAnswerFeedback();
  } else {
    wrongAnswerFeedback(correctAnswer);
  }
}
}


//pop up displaying whether answer was correct/incorrect, X button at the bottom 
//if selected answer is correct

function rightAnswerFeedback() {

  var retval = `<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}" style="width: 100px; height: 100px;"/></div><p><b>You got it right!</b></p></div>`;

  $("#ModalText").html(retval);
  $(".modal").show();
  nextQuestion();
  displayNewScore();
}



//if selected answer is incorrect
function wrongAnswerFeedback(ra) {

  var retval = `<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}" style="width: 100px; height: 100px;"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${ra}"</span></p>`;

  $("#ModalText").html(retval);
  $(".modal").show();
  nextQuestion();
}

//changes score when correct answer selected
function displayNewScore() {
  score++;
  $('.score').text(score);
}

//progresses through quiz 
function questionProgress() {
  questionNumber++;
  $('.questionNumber').text(questionNumber+1);
}

//user goes to next question 
function nextQuestion() {
  questionProgress();
  renderQuiz();
}

//allows user to be sure they would like to start quiz over
function areYouSure() {
  var txt = confirm('Are you sure you want to start over?');
  if(txt === true) {
    startOver();
  } else {
    return false;
  };
}

//allows user to restart quiz by clicking "start over" button
function startOver() {
  location.reload();
}

function endQuiz() {
  if (questionNumber = STORE.length) {
    $('.navButtons').css('display', 'none');
  }
}

//informs user the quiz is over and of score, allows user to start over
function finalScore() {
  $('#startOver').hide();
  if (score >= 8) {
    $('.questionMode').html(`<div class="goodFeedback"><h3>You rock!</h3><img src="https://user-images.githubusercontent.com/49838700/61897733-4348ff00-af07-11e9-8b21-7a100566769d.jpg" alt="hand giving you rock sign" class="feedbackImg"/><p>You got ${score}/10 questions right. You\'re on your way to becoming a neurosurgeon!</p><button class="restartButton" type="button">Restart</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionMode').html(`<div class="goodFeedback"><h3>You did an okay job.</h3><img src="https://user-images.githubusercontent.com/49838700/61897748-43e19580-af07-11e9-8712-08b76c6f8419.jpg" alt="x-ray hand doing okay sign" class="feedbackImg"/><p>You got ${score}/10 questions right, but you\'ll be in med school in no time!</p><button class="restartButton" type="button">Restart</button></div>`);
  } else {
    $('.questionMode').html(`<div class="goodFeedback"><h3>Future patients may suffer.</h3><img src="https://user-images.githubusercontent.com/49838700/61897743-43e19580-af07-11e9-9237-334d007d8cd4.jpg" alt="skull" class="feedbackImg"/><p>You got ${score}/10 questions right. You may want to study a bit more before taking the MCAT!</p><button class="restartButton" type="button">Restart</button></div>`);
  }
  $('.restartButton').click(function () {
    startOver();
  });
}

//calls all functions necessary to run the quiz 
function loadQuiz() {

  // event handlers

  $('.close').click(function () {
    $("#myModal").hide();
  });


  $('.startQuiz').on('click', '.startButton', function (event) {
    quizStart();
  });

  $('.navButtons').on('click', '#startOver', function (event) {
    event.preventDefault();
    areYouSure();
    //startOver();
  });


  $('form').on('submit', function (event) {
    answerSelected();
  });

  // end event handlers

  renderQuiz();
}

$(loadQuiz);
