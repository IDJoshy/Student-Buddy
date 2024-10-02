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

//#region Desafio 1.

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

//Calculator

const CALCULATOR_BUTTONS = document.querySelectorAll(".calculator__button");
const CALCULATOR_DISPLAY = document.getElementById("calculator-display");

//Variables
let currentInput = '';
let result = '';

//ciclo "forEach()" por cada boton
CALCULATOR_BUTTONS.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      // Borrar
      currentInput = '';
      CALCULATOR_DISPLAY.value = '';

    } else if (value === '=') {
      // Un try catch
      try {
        result = eval(currentInput);
        CALCULATOR_DISPLAY.value = result;
        currentInput = result; 

      } catch {
        CALCULATOR_DISPLAY.value = 'Error';
        currentInput = '';
      }

    } else {
      // Mostrar valor
      currentInput += value;
      CALCULATOR_DISPLAY.value = currentInput;
    }
});
});

//#endregion