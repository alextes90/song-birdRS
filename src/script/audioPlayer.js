const audioPlayer = () => {
  return `<div class="audio-player__quest">
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
`;
};

export default audioPlayer;
