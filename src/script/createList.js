const createList = (data) => {
  const listToAppend = document.createElement('ul');
  listToAppend.classList.add('append-list');
  data.forEach((el) => {
    const listElement = document.createElement('li');
    listElement.classList.add('list-element');
    listElement.innerText = el.name;
    listToAppend.append(listElement);
  });
  return listToAppend;
};

export default createList;
