import audioPlayer from './audioPlayer';

const renderQuestBlock = (id, data) => {
  const [birdItem] = data.filter((el) => {
    return el.id === id;
  });
  const temp = `<div class="row prime-bg border-radius-6 allign-center">
  <div class="col-sm-4 my-3 picture-box">
    <img
      class="border-radius-6 image"
      src="${birdItem.image}"
      alt="${birdItem.name}"
    />
  </div>
  <div class="col-sm-8 my-3">
    <div class="answer-block__container">
      <div class="border-bottom align-start rem-2">${birdItem.name}</div>
${audioPlayer()}
    </div>
  </div>
</div>`;
  return temp;
};

export default renderQuestBlock;
