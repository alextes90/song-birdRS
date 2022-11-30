import { NUM_OF_BIRD } from './const';

const randomBird = () => {
  const birdAnswerArr = [];
  for (let i = 1; i <= NUM_OF_BIRD; i++) {
    function getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    }
    const randomNum = getRandomArbitrary(1, NUM_OF_BIRD);
    birdAnswerArr.push(randomNum);
  }
  return birdAnswerArr;
};

export default randomBird;
