const body = document.querySelector('body');

const unitButton = document.createElement('button');
unitButton.textContent = 'Number of unities squared';
body.appendChild(unitButton);

const mainContainer = document.createElement('main');
mainContainer.style.display = 'grid';
body.appendChild(mainContainer);

containerMaker(16);

//Button in action.
unitButton.addEventListener('click', () => {
  const gridQuantity = checkPrompt(showPrompt());
  containerMaker(gridQuantity);
});

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

  for (let i = 0; i < gridTotal; i++) {
    let divGrid = document.createElement('div');
    mainContainer.appendChild(divGrid);
    divGrid.setAttribute('class', 'gridDiv');
    divGrid.style.backgroundColor = containerBackgroundColor;
  }

  addingGridTemplate(quantity);
  divListener();
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

//Event Listener mouseover
function divListener() {
  const containerGridDiv = document.querySelectorAll('.gridDiv');
  containerGridDiv.forEach((div) => {
    div.addEventListener('mouseover', () => {
      changeColor(div);
    });
  });
}

//This function changes the color when the mouse is over the element.
function changeColor(divElement) {
  const divBackgroundColor = getComputedStyle(divElement).backgroundColor;

  let rgbArray = divBackgroundColor.match(/(\d[\d\.]*)/g); //Search all the numbers in an array.
  rgbArray = rgbArray.map(function(x) {
    return parseInt(x);
  });
  rgbArray = rgbArray.map(reduceNumberRgb);

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