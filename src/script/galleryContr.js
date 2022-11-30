import audioPlayerContrAbout from './audioPlayerContrAbout';

const galleryContr = (data) => {
  const list = document.querySelector('ul');
  const listElems = document.querySelectorAll('li');
  const gallery = document.querySelector('.gallery');
  const modal = document.querySelector('.modal-window');
  const overlay = document.querySelector('.overlay');

  const width = 90; // image width
  const count = 6; // visible images count
  let position = 0;
  let dataI;
  let dataID;

  gallery.addEventListener('click', function (e) {
    const temp = e.target.closest('.img-item');
    dataI = temp.innerText[0];
    dataID = temp.innerText[1];
    console.log(data[dataI]);
    let [birdItem] = data[dataI].filter((el) => {
      return el.id === +dataID;
    });
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    modal.innerHTML = `<div class="container text-center">
    <div class="row allign-center">
      <div class="col-md-6 allign-center">
        <img
          class="border-radius-6 my-2 mx-1 image"
          src="${birdItem?.image}"
          alt="unknown bird"
        />
      </div>
      <div class="col-md-6 about-block__dicrip mx-1">
      <div class="close">X</div>
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
    audioPlayerContrAbout(birdItem.audio);
    document.querySelector('.close').addEventListener('click', function () {
      overlay.classList.add('hidden');
      modal.classList.add('hidden');
    });
  });

  overlay.addEventListener('click', function () {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
  });

  document.querySelector('.prev').onclick = function () {
    position += width * count;
    position = Math.min(position, 0);
    list.style.marginLeft = position + 'px';
  };

  document.querySelector('.next').onclick = function () {
    position -= width * count;
    position = Math.max(position, -width * (listElems.length - count));
    list.style.marginLeft = position + 'px';
  };
};

export default galleryContr;
