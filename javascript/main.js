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

window.scrollTo(0, 0);

//#endregion

//#region Menus

const MENU_PANEL = document.getElementById("menu-panel");

const NAVBAR_MENU = document.getElementById("navbar-menu");
const HAMBURGER_MENU = document.getElementById("hamburger-menu");
const TOOLBAR_MENU = document.getElementById("toolbar-menu");

const HAMBURGER_BUTTON_IMG = document.querySelectorAll('.navbar__icon--hamburger');

const NAVBAR_PULLER = document.getElementById("navbar-puller");

let isHamburgerHidden = new Boolean(true);
let isNavbarHidden = new Boolean(false);
let isNavbarMoving = new Boolean(false);

function NavbarMenu(dir)
{
  switch(dir)
  {
    case "down":
      MENU_PANEL.style.top = "0";
      NAVBAR_PULLER.innerHTML = "↑";
      GRADE_TOOL.style.top = "125px";

      break;

    case "up":
      MENU_PANEL.style.top = "-85px";
      NAVBAR_PULLER.innerHTML = "↓";
      GRADE_TOOL.style.top = "40px";
      break;
  }
}

function NavbarPuller()
{
  NavbarMenu(isNavbarHidden ? "down" : "up");
}

window.onscroll = function() 
{
  let currentScrollPos = window.scrollY;
  
  if (isHamburgerHidden)
  {
    if(currentScrollPos > 85)
    {
      NavbarMenu("up");
    }
    else if(currentScrollPos < 5)
    {
      NavbarMenu("down");
    }
  }

}

MENU_PANEL.addEventListener("transitionend", () => {

  if (MENU_PANEL.style.top >= "0")
  {
    isNavbarHidden = false;
  }
  else if (MENU_PANEL.style.top === "-85px")
  {
    isNavbarHidden = true;
  }

});

function HamburgerMenu()
{
  if (isHamburgerHidden) 
  {
    isHamburgerHidden = false;
    HAMBURGER_MENU.classList.remove("navbar--hidden");
    TOOLBAR_MENU.classList.add("navbar--hidden");
    HAMBURGER_BUTTON_IMG[0].classList.add("navbar--hidden");
    HAMBURGER_BUTTON_IMG[1].classList.remove("navbar--hidden");

  } else {
    isHamburgerHidden = true;
    HAMBURGER_MENU.classList.add("navbar--hidden");
    TOOLBAR_MENU.classList.remove("navbar--hidden");
    HAMBURGER_BUTTON_IMG[0].classList.remove("navbar--hidden");
    HAMBURGER_BUTTON_IMG[1].classList.add("navbar--hidden");
  }
}

//#endregion

//#region Modes

let currentMode, previousMode, indexMode = 0;

const MODE_HEADER = document.getElementById("mode-header");
const MODE_MESSAGE = document.getElementById("mode-message");

let modes = [
  {
    index : "0",
    title : "Notepad Mode",
    message : ["Write Your <br> Thoughts !", "Your notes are...", "Your thoughts are..."], 
    html: `



    `
  },
  {
    index : "1",
    title : "TODO List Mode",
    message : ["Your Grades are <br> a secret.", "Prepare for the <br> best (worst).", "Need Help?"], 
    html: `



    `
  },
  {
    index : "2",
    title : "Grade Calculator Mode",
    message : ["Your Grades are <br> a secret.", "Prepare for the <br> best (worst).", "Need Help?"], 
    html: `



    `
  }
]

//#endregion

//#region Tools

// Calculadora

const CALCULATOR_TOOL = document.getElementById("calculator-tool");
const CALCULATOR_DRAG = document.getElementById("calculator-tool-draggable");
const CALCULATOR_BUTTONS = document.querySelectorAll(".calculator__button");
const CALCULATOR_DISPLAY = document.getElementById("calculator-display");

const CALCULATOR_TOOL_PANELS = document.getElementsByClassName("calculator__section");
const CALCULATOR_PANEL_CHANGER = document.getElementById("calculator-panel-changer");
const CALCULATOR_HISTORY_CLEANER = document.getElementById("calculator-history-cleaner");
const CALCULATOR_ICONS = document.getElementsByClassName("calculator__icon");

//Array del historial de resultados
let calculatorHistory = [];

//Variables
let currentInput = '';
let result = '';

//Ciclo "forEach()" por cada boton
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
      try 
      {
        // Evaluar
        result = eval(currentInput);
        
        AddCalculatorHistory(currentInput);

        // Mostrar resultado
        CALCULATOR_DISPLAY.value = result;
        currentInput = result;
        
      } 
      catch 
      {
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
function CalculatorResult(currentInput)
{
  this.input = currentInput;
  this.date = new Date().toLocaleString();
  this.eval = eval(currentInput);
}

//Añadir historial
function AddCalculatorHistory(input)
{
  if (input === '' || input === undefined) return;

  calculatorHistory.push(new CalculatorResult(input));
  console.log("Añadido el calculo al historial");

  if (calculatorHistory.length > 5) //Limitar historial a 5 calculos
  {
    calculatorHistory.shift();
    console.log("Limite del historial alcanzado, eliminado el calculo mas antiguo");
  }

  if(calculatorHistory.length > 0)  SaveCalculatorHistory();

}

//Actualizar historial
function UpdateCalculatorHistory()
{
  CALCULATOR_TOOL_PANELS[1].innerHTML = '';

  if(calculatorHistory.length === 0)
  {
    const NEW_DIV = document.createElement('div');
    NEW_DIV.className = 'calculator__history-item';
    NEW_DIV.innerHTML = 
    `
    <p class="calculator__history-text calculator__history-text--result"> NO DATA </p>
    `;
    CALCULATOR_TOOL_PANELS[1].appendChild(NEW_DIV);

    CALCULATOR_HISTORY_CLEANER.classList.add('calculator--hidden');
  }
  else
  {
    calculatorHistory.forEach(result =>
    {
      const NEW_DIV = document.createElement('div');
      NEW_DIV.className = 'calculator__history-item'
      NEW_DIV.innerHTML = 
      ` 
      <p class="calculator__history-text calculator__history-text--result">${result.input} = ${result.eval}</p>
      <p class="calculator__history-text calculator__history-text--date">${result.date}</p>
      `;
      CALCULATOR_TOOL_PANELS[1].appendChild(NEW_DIV);
    });

    CALCULATOR_HISTORY_CLEANER.classList.remove('calculator--hidden');
  }
}

function SaveCalculatorHistory()
{
  localStorage.setItem('calculatorHistory', JSON.stringify(calculatorHistory));
}

function LoadCalculatorHistory()
{
  const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory'));
  if(savedHistory)
  {
    calculatorHistory = savedHistory;
  }
}

function ClearCalculatorHistory()
{
  localStorage.removeItem('calculatorHistory');
  calculatorHistory = [];
  UpdateCalculatorHistory();
}

LoadCalculatorHistory();

//Mover Calculadora

let calcOffsetX, calcOffsetY, isCalcDrag = false;

CALCULATOR_DRAG.addEventListener("mousedown", CalculatorDragStart);
CALCULATOR_DRAG.addEventListener("touchstart", CalculatorDragStart);
CALCULATOR_DRAG.addEventListener("mouseup", CalculatorDragStop);
CALCULATOR_DRAG.addEventListener("touchend", CalculatorDragStop);

function CalculatorDragStart(e)
{
  isCalcDrag = true;

  if(e.type === 'mousedown')
  {
    calcOffsetX = e.clientX - CALCULATOR_TOOL.offsetLeft;
    calcOffsetY = e.clientY - CALCULATOR_TOOL.offsetTop;
  
    CALCULATOR_DRAG.style.cursor = 'grabbing';
  }
  else if(e.type === 'touchstart')
  {
    calcOffsetX = e.touches[0].clientX - CALCULATOR_TOOL.offsetLeft;
    calcOffsetY = e.touches[0].clientY - CALCULATOR_TOOL.offsetTop;
  }
}

function CalculatorDrag(newX, newY)
{
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  if (newX < 0) {
      newX = 0;
  } else if (newX + CALCULATOR_TOOL.offsetWidth > viewportWidth) {
      newX = viewportWidth - CALCULATOR_TOOL.offsetWidth;
  }

  if (newY < 40) {
      newY = 40;
  } else if (newY + CALCULATOR_TOOL.offsetHeight > viewportHeight) {
      newY = viewportHeight - CALCULATOR_TOOL.offsetHeight;
  }

  CALCULATOR_TOOL.style.left = `${newX}px`;
  CALCULATOR_TOOL.style.top = `${newY}px`;
  
}

function CalculatorDragStop()
{
  isCalcDrag = false;
  CALCULATOR_DRAG.style.cursor = 'move';
}

document.addEventListener('mousemove', (e) => {

  if (isCalcDrag) 
    {
      let newX = e.clientX - calcOffsetX;
      let newY = e.clientY - calcOffsetY;

      CalculatorDrag(newX, newY);
    }

});

document.addEventListener('touchmove', (e) => {

  if (isCalcDrag) 
    {
      let newX = e.touches[0].clientX - calcOffsetX;
      let newY = e.touches[0].clientY - calcOffsetY;

      CalculatorDrag(newX, newY);
    }

});

//Ver historial

let calculatorPanelIndex = 0;

CALCULATOR_PANEL_CHANGER.addEventListener("click", () =>
{
  if (calculatorPanelIndex === 0)
  {
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex].classList.add("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex].classList.add("calculator__icon--hidden");
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex + 1].classList.remove("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex + 1].classList.remove("calculator__icon--hidden");
    calculatorPanelIndex ++;

    UpdateCalculatorHistory();

  }
  else if (calculatorPanelIndex === 1)
  {
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex - 1].classList.remove("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex - 1].classList.remove("calculator__icon--hidden");
    CALCULATOR_TOOL_PANELS[calculatorPanelIndex].classList.add("calculator__section--hidden");
    CALCULATOR_ICONS[calculatorPanelIndex].classList.add("calculator__icon--hidden");
    calculatorPanelIndex --;

    CALCULATOR_HISTORY_CLEANER.classList.add('calculator--hidden');
  }
});

//Grades

const GRADE_TOOL = document.getElementById("grade-tool");

function GetGrade()
{
  let nmax = parseInt(document.getElementById("grade-tool-nmax").value);
  let nmin = parseInt(document.getElementById("grade-tool-nmin").value);
  let napr = parseInt(document.getElementById("grade-tool-napr").value);
  let e = parseInt(document.getElementById("grade-tool-e").value);
  let p = parseInt(document.getElementById("grade-tool-p").value);
  let pmax = parseInt(document.getElementById("grade-tool-pmax").value);

  if(p > pmax)
  {
    Toastify({
      text: `!Puntaje superior a ${pmax}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #FF0000, #ff8478)",
      },
    }).showToast();
  }
  else
  {
    Toastify({
      text: `Tu nota es: ${CalculateGrades(nmax, nmin, napr, e, p, pmax)}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
}

function CalculateGrades(nmax, nmin, napr, e, p, pmax)
{
  let e_normal = (e / 100);
  let e_confirm = (e_normal * pmax);

  if(p < e_confirm)
  {
    return (grade = (napr - nmin) * (p / (e_normal * pmax)) + nmin) * 100/100;
  }
  else if(p >= e_confirm)
  {
    return (grade = (nmax - napr) * ( (p - e_confirm) / (pmax * (1 - e_normal)) ) + napr) * 100/100;
  }

}

//Grade Calculator Tool

let isCalcHidden = new Boolean(true);
let isGradeHidden = new Boolean(true);
CALCULATOR_TOOL.style.display = "none";
GRADE_TOOL.style.display = "none";

function RenderTool(type)
{
  switch(type)
  {
    case "calculator":

    if(isCalcHidden)
    {
      CALCULATOR_TOOL.style.display = "unset";
      CALCULATOR_TOOL.style.top = "125px";
      CALCULATOR_TOOL.style.left = "0px";
      isCalcHidden = false;
    }
    else
    {
      CALCULATOR_TOOL.style.display = "none";
      isCalcHidden = true;
    }

    break;

    case "grade":

    if(isGradeHidden)
    {
      GRADE_TOOL.style.display = "unset";
      isGradeHidden = false;
    }
    else
    {
      GRADE_TOOL.style.display = "none";
      isGradeHidden = true;
    }

    break;
  }
}

//#endregion