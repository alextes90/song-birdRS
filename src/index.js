import birdsData from './script/bird';
import createList from './script/createList';
import renderAboutBlock from './script/renderAboutBlock';
import randomBird from './script/randomBird';
import aboutBlockInnerHTML from './script/aboutBlockInnerHTML';
import audioPlayer from './script/audioPlayer';
import audioPlayerContr from './script/audioPlayerContr';
import audioPlayerContrAbout from './script/audioPlayerContrAbout';
import birdsDataEN from './script/birdsDataEN';
import levelNameRu from './script/levelNameRu';
import levelNameEn from './script/levelNameEn';
import galleryContr from './script/galleryContr';
import galleryRender from './script/galleryRender';

const answerBlock = document.querySelector('.answer-block');
const aboutBlock = document.querySelector('.about-block');
const questBlock = document.querySelector('.quest-block');
const winMusic = new Audio('src/assets/audio/success-1-6297.mp3');
const loseMusic = new Audio('src/assets/audio/negative_beeps-6008.mp3');
const nextButton = document.querySelector('.button');
const scoreHTML = document.querySelector('.score');
const variantsBlock = document.querySelector('.variants-block');
const buttonBlock = document.querySelector('.button-block');
const finalFiled = document.querySelector('.final-field');
const enLanguage = document.querySelector('.language__En');
const ruLanguage = document.querySelector('.language__Ru');
const levelName = document.querySelector('.level-name');
const quizSectionArr = document.querySelectorAll('.quiz-section');
const logo = document.querySelector('.logo');
const startSection = document.querySelector('.start-section');
const startQuiz = document.querySelector('.start-quiz');
const gallery = document.querySelector('.gallery');
const galleryDescription = document.querySelector('.gallery__description');

let level = 0;
let score = 0;
let dataLanguage = 'RU';
let curData = birdsData;
ruLanguage.classList.add('level-decor');
startQuiz.innerText = 'Начать Викторину';
galleryDescription.innerText = 'Нажми на картинку птицы, чтобы узнать больше';

if (localStorage.getItem('language') === 'EN') {
  dataLanguage = 'EN';
  curData = birdsDataEN;
  ruLanguage.classList.remove('level-decor');
  enLanguage.classList.add('level-decor');
  startQuiz.innerText = 'Start Quiz';
  galleryDescription.innerText = "Click the birds's img to know more";
}

//It is the random num that will be the correct answer
const answerArr = randomBird();

const nextLevel = () => {
  level++;
  init(level);
};

//Language change
enLanguage.addEventListener('click', function () {
  dataLanguage = 'EN';
  curData = birdsDataEN;
  localStorage.setItem('language', 'EN');
  document.location.reload();
});
ruLanguage.addEventListener('click', function () {
  curData = birdsData;
  dataLanguage = 'RU';
  localStorage.setItem('language', 'RU');
  document.location.reload();
});

//Logo on click to start page. At the begging all is closed

logo.addEventListener('click', function () {
  quizSectionArr.forEach((el) => el.classList.add('hidden'));
  startSection.classList.remove('hidden');
});
logo.click();

//Display gallery
gallery.innerHTML = galleryRender(curData);
galleryContr(curData);

//Start Qiuz

startQuiz.addEventListener('click', function () {
  quizSectionArr.forEach((el) => el.classList.remove('hidden'));
  startSection.classList.add('hidden');
});

//Init question
const init = (level) => {
  if (dataLanguage === 'RU') {
    aboutBlock.innerHTML = `<p>
  Послушайте плеер <br />
  и выбирите птицу
  </p>`;
    levelName.innerHTML = levelNameRu();
  } else {
    aboutBlock.innerHTML = `<p>
  Listen to Player <br />
  and chose the bird
  </p>`;
    levelName.innerHTML = levelNameEn();
  }

  finalFiled.classList.add('hidden');
  scoreHTML.innerText = `Score: ${score}`;
  let tempScore = 5;
  const levelArr = document.querySelectorAll('.level');
  levelArr.forEach((el) => el.classList.remove('level-decor'));
  levelArr[level].classList.add('level-decor');
  let checker = true;

  questBlock.innerHTML = aboutBlockInnerHTML();
  const questAudio = document.querySelector('.audio-quest');
  nextButton.classList.remove('win');
  if (level > 1) {
    nextButton.removeEventListener('click', nextLevel);
  }
  let birdData = curData[level];
  let birdDataList = createList(birdData);
  const initQuestAudio = birdData.find(
    (el) => el.id === answerArr[level]
  ).audio;

  // questAudio.innerHTML = `<source
  // src="${initQuestAudio}"
  // />`;

  questAudio.innerHTML = audioPlayer();
  audioPlayerContr(initQuestAudio);

  //Creating list of birds
  answerBlock.innerHTML = '';
  answerBlock.append(birdDataList);

  //Clicking on the certain bird from list show her description

  answerBlock.addEventListener('click', function (e) {
    const item = e.target.closest('.list-element');
    const child = renderAboutBlock(item.innerText, birdData);
    aboutBlock.innerHTML = child;
    const [birdItem] = birdData.filter((el) => {
      return el.name === item.innerText;
    });
    audioPlayerContrAbout(birdItem?.audio);
    const answerId = birdData?.find((el) => el.name === item.innerText)?.id;
    if (checker) {
      if (answerId === answerArr[level]) {
        const questImage = document.querySelector('.image-quest');
        const answerName = document.querySelector('.answer-name');
        const buttonPlay = document.querySelector(
          '.audio-player__quest .toggle-play'
        );
        item.classList.add('win');
        winMusic.play();

        questImage.src = `${
          birdData?.find((el) => el.name === item.innerText).image
        }`;
        answerName.innerHTML = `${
          birdData?.find((el) => el.name === item.innerText).name
        }`;
        if (buttonPlay.classList.contains('pause')) {
          buttonPlay.click();
        }

        checker = false;
        nextButton.classList.add('win');
        nextButton.addEventListener('click', nextLevel);
        score += tempScore;
        if (level === 5) {
          questBlock.classList.add('hidden');
          buttonBlock.classList.add('hidden');
          variantsBlock.classList.add('hidden');
          finalFiled.classList.remove('hidden');
          const finalScore = document.querySelector('.final-score');
          const congratulation = document.querySelector('.congratulation');

          if (dataLanguage === 'EN') {
            finalScore.innerText = `Your score is ${score} out of 30`;
            congratulation.innerText = 'Congratulation!';
          } else {
            finalScore.innerText = `Ваш счет ${score} из 30`;
            congratulation.innerText = 'Поздравляем!';
          }

          const tryAgain = document.querySelector('.button__again');
          if (score !== 30) {
            tryAgain.addEventListener('click', function () {
              document.location.reload();
            });
          } else {
            tryAgain.classList.add('hidden');
            finalScore.innerText = `Your score is ${score} out of 30. You are the best!`;
          }
        }
      } else {
        if (!item.classList.contains('error')) {
          tempScore--;
          loseMusic.play();
          item.classList.add('error');
        }
      }
    }
  });
};

console.log('270 points');

init(level);
