function audioPlayerContr(track) {
  const audioPlayer = document.querySelector(
    '.audio-player__quest .audio-player'
  );
  const audio = new Audio(track);
  const buttonPlay = document.querySelector(
    '.audio-player__quest .toggle-play'
  );
  const timeline = audioPlayer.querySelector('.audio-player__quest .timeline');
  const volumeSlider = audioPlayer.querySelector(
    '.audio-player__quest .volume-slider'
  );
  let isPlay = true;

  buttonPlay.addEventListener('click', function () {
    if (isPlay) {
      audio.play();
      isPlay = false;
      buttonPlay.classList.add('pause');
      buttonPlay.classList.remove('play');
    } else {
      audio.pause();
      isPlay = true;
      buttonPlay.classList.add('play');
      buttonPlay.classList.remove('pause');
    }
  });

  volumeSlider.addEventListener('click', (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector('.volume-percentage').style.width =
      newVolume * 100 + '%';
  });

  timeline.addEventListener('click', (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  });

  audio.addEventListener('loadeddata', () => {
    const time = audio.duration;
    const timeLength = document.querySelector('.length');
    const currentTimeSec = document.querySelector(
      '.audio-player__quest .current'
    );
    timeLength.innerText = getTime(time);
    currentTimeSec.innerText = '0:00';
    setInterval(() => {
      const progressBar = audioPlayer.querySelector(
        '.audio-player__quest .progress-bar'
      );
      progressBar.style.width =
        (audio.currentTime / audio.duration) * 100 + '%';
      if (currentTimeSec) {
        currentTimeSec.innerText = getTime(audio.currentTime);
      }
    }, 100);
  });
}

const getTime = (length) => {
  let seconds = 0;
  let minutes = 0;
  if (length > 60) {
    seconds = Math.floor(length % 60);
    minutes = Math.floor(length / 60);
  } else {
    seconds = Math.floor(length);
  }
  return `${minutes ? minutes : '0'}:${seconds > 9 ? seconds : '0' + seconds}`;
};

export default audioPlayerContr;
