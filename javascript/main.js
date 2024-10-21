//#region Loader

const LOADER_PANEL = document.getElementById("loader-panel");

window.addEventListener("load", () =>
{
    LOADER_PANEL.classList.add("loader--hidden");

    LOADER_PANEL.addEventListener("transitionend", () =>
    {
      LOADER_PANEL.remove();
    })
})

const LOADER_IMG_INTERVAL = 200;
const LOADER_IMG = document.querySelectorAll('.loader__image');

let loaderImgIndex = 0;

function loader_images_animation() {
    LOADER_IMG[loaderImgIndex].classList.remove('loader__image--active');
    loaderImgIndex = (loaderImgIndex + 1) % LOADER_IMG.length;
    LOADER_IMG[loaderImgIndex].classList.add('loader__image--active');
}

setInterval(loader_images_animation, LOADER_IMG_INTERVAL);

//#endregion

//#region Navbar 

const NAVBAR_MENU = document.getElementById("navbar-menu");
const HAMBURGER_MENU = document.getElementById("hamburger-menu");

const HAMBURGER_BUTTON_IMG = document.querySelectorAll('.navbar__hamburger-icon');
let isHamburgerHidden = new Boolean(true);

function HamburgerMenu()
{
  if (isHamburgerHidden) 
  {
    isHamburgerHidden = false;
    HAMBURGER_MENU.classList.remove("hamburger--hidden");
    HAMBURGER_BUTTON_IMG[0].classList.add("navbar__hamburger-icon--hidden");
    HAMBURGER_BUTTON_IMG[1].classList.remove("navbar__hamburger-icon--hidden");

  } else {
    isHamburgerHidden = true;
    HAMBURGER_MENU.classList.add("hamburger--hidden");
    HAMBURGER_BUTTON_IMG[0].classList.remove("navbar__hamburger-icon--hidden");
    HAMBURGER_BUTTON_IMG[1].classList.add("navbar__hamburger-icon--hidden");
  }
}

//Hide On Scroll
let prevScrollPos = window.scrollY;
window.onscroll = function() 
{
  let currentScrollPos = window.scrollY;
  
  if (isHamburgerHidden)
  {
    if (prevScrollPos > currentScrollPos) 
    {
      NAVBAR_MENU.style.top = "0";
    } else {
      NAVBAR_MENU.style.top = "-7.5rem";      
    }
  }

  prevScrollPos = currentScrollPos;
}

//#endregion

//#region Desafio 1 y 2

//Login
const USERNAME_VALID = "admin";
const PASSWORD_VALID = "12345";

const LOGIN_PANEL = document.getElementById("login-panel");
const MENU_PANEL = document.getElementById("menu-panel");
const MAIN_PANEL = document.getElementById("main-panel");

MENU_PANEL.style.display = "none";
MAIN_PANEL.style.display = "none";

document.getElementById("login-form").addEventListener("submit", function(event) 
{
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (username === USERNAME_VALID && password === PASSWORD_VALID) 
    { 
      LOGIN_PANEL.style.display = "none";      
      MAIN_PANEL.style.display = "block";
      MENU_PANEL.style.display = "block";

    } else {
      alert("Error: Invalid access credentials.");
    }
});

//Calculadora

const CALCULATOR_TOOL = document.getElementById("calculator-tool");
const CALCULATOR_DRAG = document.getElementById("calculator-tool-draggable");
const CALCULATOR_BUTTONS = document.querySelectorAll(".calculator__button");
const CALCULATOR_DISPLAY = document.getElementById("calculator-display");

const CALCULATOR_TOOL_PANELS = document.getElementsByClassName("calculator__section");
const CALCULATOR_PANEL_CHANGER = document.getElementById("calculator-panel-changer");
const CALCULATOR_ICONS = document.getElementsByClassName("calculator__img");

//Array del historial de resultados
let calculatorHistory = [];

//Variables
let currentInput = '';
let result = '';

//ciclo "forEach()" por cada boton
CALCULATOR_BUTTONS.forEach(button => 
{
  button.addEventListener('click', () => 
  {
    const VALUE = button.textContent;

    if (VALUE === 'C') {
      // Borrar
      currentInput = '';
      CALCULATOR_DISPLAY.value = '';

    } else if (VALUE === '=') {
      // Un try catch
      try {

        // Evaluar
        result = eval(currentInput);

        // Guardar historial
        CalculatorHistory(currentInput);

        // Mostrar resultado

        CALCULATOR_DISPLAY.value = result;
        currentInput = result;
        
      } catch {
        CALCULATOR_DISPLAY.value = 'Error';
        currentInput = '';
      }

    } else {
      // Mostrar valor + Nuevo input
      currentInput += VALUE;
      CALCULATOR_DISPLAY.value = currentInput;
    }
  });
});

//Objeto (Guardar resultados calculadora)

function CalculatorResult(result)
{
  this.result = result;
  this.eval = function() { return eval(this.result); }
}

//Añadir historial

function CalculatorHistory(currentInput)
{
  calculatorHistory.push(new CalculatorResult(currentInput));
  console.log("Se ha añadido un nuevo calculo al historial => " + $(currentInput).text());
}

//Drag

let isCalcDrag = false;
let calcOffsetX, calcOffsetY;

CALCULATOR_DRAG.addEventListener('mousedown', (e) => {
  isCalcDrag = true;
  calcOffsetX = e.clientX - CALCULATOR_TOOL.offsetLeft;
  calcOffsetY = e.clientY - CALCULATOR_TOOL.offsetTop;
  CALCULATOR_DRAG.style.cursor = 'grabbing';
});

CALCULATOR_DRAG.addEventListener('mouseup', () =>
{
  isCalcDrag = false;
  CALCULATOR_DRAG.style.cursor = 'move';
});
  
document.addEventListener('mousemove', (e) => {

  if (isCalcDrag) 
    {
      let newX = e.clientX - calcOffsetX;
      let newY = e.clientY - calcOffsetY;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (newX < 0) {
          newX = 0;
      } else if (newX + CALCULATOR_TOOL.offsetWidth > viewportWidth) {
          newX = viewportWidth - CALCULATOR_TOOL.offsetWidth;
      }

      if (newY < 0) {
          newY = 0;
      } else if (newY + CALCULATOR_TOOL.offsetHeight > viewportHeight) {
          newY = viewportHeight - CALCULATOR_TOOL.offsetHeight;
      }

      CALCULATOR_TOOL.style.left = `${newX}px`;
      CALCULATOR_TOOL.style.top = `${newY}px`;
    }
});

//Change Panel

let calculatorPanelIndex = 0;

CALCULATOR_PANEL_CHANGER.addEventListener("click", () =>
{
  if (calculatorPanelIndex === 0)
  {
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex].classList.add("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex].classList.add("calculator__img--hidden");
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex + 1].classList.remove("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex + 1].classList.remove("calculator__img--hidden");
    calculatorPanelIndex ++;

  }else if (calculatorPanelIndex === 1)
  {
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex - 1].classList.remove("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex - 1].classList.remove("calculator__img--hidden");
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex].classList.add("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex].classList.add("calculator__img--hidden");
    calculatorPanelIndex --;
  }
});

//#endregion