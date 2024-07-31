const quizData = [
  {
    question: 'What is the largest planet in our solar system?',
    options:  [
      { text: 'Mars', imagePath: 'images/mars.jpg' },
      { text: 'Jupiter', imagePath: 'images/jupiter.jpg' },
      { text: 'Saturn', imagePath: 'images/saturn.jpg' },
      { text: 'Neptune', imagePath: 'images/neptune.jpg' }
  ],
    answer:'jupiter',
  },
  {
    question: 'What is the tallest mountain in the world?',
    options:[
    { text: 'Mount Everest', imagePath: 'images/mounteverest.jpg' },
    { text: 'K2', imagePath: 'images/k2.jpg' },
    { text: 'Kangchenjunga', imagePath: 'images/kanchenjunga.jpg' },
    { text: 'Makalu', imagePath: 'images/makalu.jpg' }
  ],
    answer: 'Mount Everest',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options:[
      { text: 'Au', imagePath: 'images/au.jpg' },
      { text: 'Ag', imagePath: 'images/ag.jpg' },
      { text: 'Cu', imagePath: 'images/cu.jpg' },
      { text: 'Fe', imagePath: 'images/fe.jpg' }
    ],
    answer: 'Au',
  },
  {
  
    question: 'Who painted the Mona Lisa?',
    options:[
      { text: 'Pablo Picasso', imagePath: 'images/pablo.jpg' },
      { text: 'Vincent van Gogh', imagePath: 'images/vincent.jpg' },
      { text: 'Leonardo da Vinci', imagePath: 'images/vinci.jpg' },
      { text: 'Michelangelo', imagePath: 'images/micheal.jpg' }
    ],
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options:[
      { text: 'Lion', imagePath: 'images/lion.jpg' },
      { text: 'Tiger', imagePath: 'images/tiger.jpg' },
      { text: 'Elephant', imagePath: 'images/elephant.jpg' },
      { text: 'Giraffe', imagePath: 'images/giraffe.jpg' }
    ],
    answer: 'Lion',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  questionData.options.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = option.text;

    const optionText = document.createTextNode(option.text);

    const optionImage = document.createElement('img');
    optionImage.src = option.imagePath;
    optionImage.alt = option.text;
    optionImage.className = 'option-image';

    optionDiv.appendChild(radio);
    optionDiv.appendChild(optionText);
    optionDiv.appendChild(optionImage);
    optionsElement.appendChild(optionDiv);
  });

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}


submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

