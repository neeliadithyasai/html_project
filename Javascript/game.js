const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

const topic = localStorage.getItem("topic");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

if(topic.valueOf() == "com")
{
  console.log(topic.valueOf());

comgame();
}else if(topic.valueOf() == "sports")
{

  sporgame();


}else if(topic.valueOf() == "maths")
{

  mathgame();


}else if(topic.valueOf() == "ent")
{

  entgame();


}


function comgame(){

fetch("https://raw.githubusercontent.com/neeliadithyasai/html_project/master/Javascript/computers.json")
.then(res => {
  return res.json();
})
.then(loadedQuestions => {
  console.log(loadedQuestions.results);
  questions = loadedQuestions.results.map(loadedQuestion => {
    const formattedQuestion = {
      question: loadedQuestion.question
    };

    const answerChoices = [...loadedQuestion.incorrect_answers];
    formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
    answerChoices.splice(
      formattedQuestion.answer - 1,
      0,
      loadedQuestion.correct_answer
    );

    answerChoices.forEach((choice, index) => {
      formattedQuestion["choice" + (index + 1)] = choice;
    });

    return formattedQuestion;
  });
  startGame();
})
.catch(err => {
  console.error(err);
});

}

function sporgame(){

  fetch("https://raw.githubusercontent.com/neeliadithyasai/html_project/master/Javascript/sports.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      };
  
      const answerChoices = [...loadedQuestion.incorrect_answers];
      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );
  
      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });
  
      return formattedQuestion;
    });
    startGame();
  })
  .catch(err => {
    console.error(err);
  });
  
  }

  function entgame(){

    fetch("https://raw.githubusercontent.com/neeliadithyasai/html_project/master/Javascript/entertainment.json")
    .then(res => {
      return res.json();
    })
    .then(loadedQuestions => {
      console.log(loadedQuestions.results);
      questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
          question: loadedQuestion.question
        };
    
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(
          formattedQuestion.answer - 1,
          0,
          loadedQuestion.correct_answer
        );
    
        answerChoices.forEach((choice, index) => {
          formattedQuestion["choice" + (index + 1)] = choice;
        });
    
        return formattedQuestion;
      });
      startGame();
    })
    .catch(err => {
      console.error(err);
    });
    
    }
  
    
    function mathgame(){

      fetch("https://raw.githubusercontent.com/neeliadithyasai/html_project/master/Javascript/maths.json")
      .then(res => {
        return res.json();
      })
      .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
          const formattedQuestion = {
            question: loadedQuestion.question
          };
      
          const answerChoices = [...loadedQuestion.incorrect_answers];
          formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
          answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
          );
      
          answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice;
          });
      
          return formattedQuestion;
        });
        startGame();
      })
      .catch(err => {
        console.error(err);
      });
      
      }
      
  



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore",score);
    //go to the end page
    return window.location.assign('end.html');
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


