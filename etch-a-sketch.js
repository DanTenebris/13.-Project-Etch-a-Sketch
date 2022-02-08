const body = document.querySelector('body');

const divButton = document.createElement('div');
divButton.setAttribute('class', 'divButton');
body.appendChild(divButton);

const unitButton = document.createElement('button');
unitButton.textContent = 'Number of squares';
unitButton.onclick = unitButtonPrompt;
divButton.appendChild(unitButton);

const eraseButton = document.createElement('button');
eraseButton.textContent = 'Erase';
eraseButton.setAttribute('id', 'erase');
eraseButton.onclick = erasingButtonFunction;
divButton.appendChild(eraseButton);

const drawButton = document.createElement('button');
drawButton.textContent = 'Draw';
drawButton.setAttribute('id', 'draw');
drawButton.onclick = drawingButtonFunction;

const clearButton = document.createElement('button');
clearButton.textContent = 'Clear';
clearButton.onclick = clearingButtonFunction;
divButton.appendChild(clearButton);

const mainContainer = document.createElement('main');
mainContainer.style.display = 'grid';
body.appendChild(mainContainer);

containerMaker(16);
divDrawingListener();


function unitButtonPrompt() {
  const gridQuantity = checkPrompt(showPrompt());
  if (!(gridQuantity === undefined)) {
    containerMaker(gridQuantity);
    divDrawingListener();
    changeButton(true);
  }
  return;
}

function erasingButtonFunction() {
  divErasingListener();
  changeButton();
  return;
}

function drawingButtonFunction() {
  divDrawingListener();
  changeButton();
  return;
}

function clearingButtonFunction() {
  const containerGridDiv = document.querySelectorAll('.gridDiv');
  containerGridDiv.forEach((div) => {
    erasingHover(div);
  });
  return;
}

function changeButton(option = false) {
  const buttons = document.querySelectorAll('button');
  if (!option) {
    divButton.removeChild(buttons[1]);
    if (buttons[1].id === 'erase') {
      divButton.insertBefore(drawButton, buttons[2]);
    } else {
      divButton.insertBefore(eraseButton, buttons[2]);
    }
  } else if (option) {
    if (buttons[1].id === 'draw') {
      divButton.removeChild(buttons[1]);
      divButton.insertBefore(eraseButton, buttons[2]);
    }
  }
  return;
}

function deleteContent() {
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.lastChild);
  }
  return;
}

function showPrompt() {
  const divQuantitySquared = prompt('Write the quantity squared of unities between 70 and 1.', 16);
  return divQuantitySquared;
}

function checkPrompt(value) {
  if ((value <= 70) && (value >= 1)) {
    deleteContent();
    return value;
  } else if (value === '' || value === null) {
    return alert('Cancelled');
  } else {
    alert('You must write a number between 70 and 1.');
    return checkPrompt(showPrompt());
  }
}

function containerMaker(quantity) {
  const gridTotal = quantity * quantity;
  const containerBackgroundColor = checkRandomRGB(randomRGB(), randomRGB(), randomRGB());
  mainContainer.style.backgroundColor = containerBackgroundColor;

  for (let i = 0; i < gridTotal; i++) {
    let divGrid = document.createElement('div');
    mainContainer.appendChild(divGrid);
    divGrid.setAttribute('class', 'gridDiv');
    divGrid.style.backgroundColor = containerBackgroundColor;
  }

  addingGridTemplate(quantity);
  return;
}

function addingGridTemplate(gridQuantity) {
  const gridWidthHeight = 100 / gridQuantity;
  mainContainer.style.gridTemplateColumns = 'repeat(' + gridQuantity + ', ' + gridWidthHeight + '%)';
  mainContainer.style.gridTemplateRows = 'repeat(' + gridQuantity + ', ' + gridWidthHeight + '%)';
  return;
}

function randomRGB() {
  const rgbArray = [0, 255];
  const randomArray = Math.floor(Math.random() * 2);
  return rgbArray[randomArray];
}

//Prevent all rgb color numbers from being zero.
function checkRandomRGB(red, green, blue) {
  if ((red === 0) && (green === 0) && (blue === 0)) {
    const resultRgb = checkRandomRGB(randomRGB(), randomRGB(), randomRGB());
    return (resultRgb);
  } else {
    return ('rgb(' + red + ', ' + green + ', ' + blue + ')');
  }
}

function divDrawingListener() {
  const containerGridDiv = document.querySelectorAll('.gridDiv');
  containerGridDiv.forEach((div) => {
    const newDiv = div.cloneNode(true);
    div.parentNode.replaceChild(newDiv, div);

    newDiv.addEventListener('mouseover', () => {
      drawingHover(newDiv);
    });
  });
}

function divErasingListener() {
  const containerGridDiv = document.querySelectorAll('.gridDiv');
  containerGridDiv.forEach((div) => {
    const newDiv = div.cloneNode(true);
    div.parentNode.replaceChild(newDiv, div);

    newDiv.addEventListener('mouseover', () => {
      erasingHover(newDiv);
    });
  });
}

function drawingHover(divElement) {
  const divBackgroundColor = getComputedStyle(divElement).backgroundColor;

  let rgbArray = divBackgroundColor.match(/(\d[\d\.]*)/g); //Search all the numbers in an array.
  rgbArray = rgbArray.map(function(x) {
    return parseInt(x);
  });
  rgbArray = rgbArray.map(reduceNumberRgb);

  divElement.style.backgroundColor = 'rgb(' + rgbArray[0] + ', ' + rgbArray[1] + ', ' + rgbArray[2] + ')';
  return;
}

function erasingHover(divElement) {
  const divContainerBackgroundColor = getComputedStyle(mainContainer).backgroundColor;

  let rgbArray = divContainerBackgroundColor.match(/(\d[\d\.]*)/g); //Search all the numbers in an array.
  rgbArray = rgbArray.map(function(x) {
    return parseInt(x);
  });

  divElement.style.backgroundColor = 'rgb(' + rgbArray[0] + ', ' + rgbArray[1] + ', ' + rgbArray[2] + ')';
  return;
}

//Reduce all rgb numbers greater than zero by 10%.
function reduceNumberRgb(number) {
  const rgbPercentage = 255 / 10;
  if (number > 0) {
    number -= rgbPercentage;
  }
  return number;
}