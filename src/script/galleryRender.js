const galleryRender = (data) => {
  let tempsString = '';
  data.forEach((el, index) => {
    el.forEach(
      (element) =>
        (tempsString += `<li class="img-item" ><img src="${element.image}" />${index}${element.id}</li>`)
    );
  });
  const temp = `<ul>${tempsString}
</ul>`;
  return temp;
};

export default galleryRender;
