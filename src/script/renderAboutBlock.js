const renderAboutBlock = (item, data) => {
  const [birdItem] = data.filter((el) => {
    return el.name === item;
  });
  const temp = `<div class="container text-center">
  <div class="row allign-center">
    <div class="col-md-6 allign-center">
      <img
        class="border-radius-6 my-2 mx-1 image"
        src="${birdItem?.image}"
        alt="unknown bird"
      />
    </div>
    <div class="col-md-6 about-block__dicrip mx-1">
      <div>
        <div class="py-1 border-bottom align-start">${birdItem?.name}</div>
        <div class="py-1 border-bottom align-start">
        ${birdItem?.species}
        </div>
      </div>

      <div class="audio-player__about">
      <div class="audio-player">
      <div class="play-container">
        <div class="toggle-play play"></div>
      </div>
      <div class="audio-palayer__time-block">
        <div class="timeline">
          <div class="progress-bar"></div>
        </div>
        <div class="time">
          <div class="current">0:00</div>
          <div class="length">0:00</div>
        </div>
      </div>
      <div class="controls">
        <div class="volume-container">
          <div class="volume-slider">
            <div class="volume-percentage"></div>
          </div>
        </div>
      </div>
      </div>
    </div>

    </div>

    <div class="col-md-12 align-start px-3">
    ${birdItem?.description}
    </div>
  </div>
</div>`;

  return temp;
};

export default renderAboutBlock;
