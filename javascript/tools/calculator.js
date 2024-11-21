//Calculator
export default class CalculatorTool
{
    constructor(CALCULATOR_TOOL, CALCULATOR_PANELS, CALCULATOR_BUTTONS, CALCULATOR_DISPLAY, CALCULATOR_PANEL_CHANGER, CALCULATOR_HISTORY_CLEANER, CALCULATOR_ICONS)
    {
        this.CALCULATOR_TOOL = CALCULATOR_TOOL;
        this.CALCULATOR_PANELS = CALCULATOR_PANELS;
        this.CALCULATOR_BUTTONS = CALCULATOR_BUTTONS;
        this.CALCULATOR_DISPLAY = CALCULATOR_DISPLAY;
        this.CALCULATOR_PANEL_CHANGER = CALCULATOR_PANEL_CHANGER;
        this.CALCULATOR_HISTORY_CLEANER = CALCULATOR_HISTORY_CLEANER;
        this.CALCULATOR_ICONS = CALCULATOR_ICONS;
    }
}

let calculatorPanelIndex = 0;
let calculatorHistory = [];
let currentInput = '';  
let result = '';

export function AddEventCalculator(CalculatorTool)
{
    Object.keys(CalculatorTool.CALCULATOR_BUTTONS).forEach(button => {

        CalculatorTool.CALCULATOR_BUTTONS[button].addEventListener("click", () => {
            
            const VALUE = CalculatorTool.CALCULATOR_BUTTONS[button].textContent;
            if (VALUE === 'C') 
            {
                currentInput = '';
                CalculatorTool.CALCULATOR_DISPLAY.value = '';
            } 
            else if (VALUE === '=') 
            {
                try 
                {
                    result = eval(currentInput);
                    AddCalculatorHistory(currentInput);
                    CalculatorTool.CALCULATOR_DISPLAY.value = result;
                    currentInput = result;
                } 
                catch 
                {
                    CalculatorTool.CALCULATOR_DISPLAY.value = 'Error';
                    currentInput = '';
                }
            } 
            else 
            {
                currentInput += VALUE;
                CalculatorTool.CALCULATOR_DISPLAY.value = currentInput;
            }
        });

    });

    CalculatorTool.CALCULATOR_PANEL_CHANGER.addEventListener("click", () =>
    {
        if (calculatorPanelIndex === 0)
        {
            CalculatorTool.CALCULATOR_PANELS[calculatorPanelIndex].classList.add("tool--hidden");
            CalculatorTool.CALCULATOR_ICONS[calculatorPanelIndex].classList.add("tool--hidden");
            CalculatorTool.CALCULATOR_PANELS[calculatorPanelIndex + 1].classList.remove("tool--hidden");
            CalculatorTool.CALCULATOR_ICONS[calculatorPanelIndex + 1].classList.remove("tool--hidden");
            calculatorPanelIndex ++;

            UpdateCalculatorHistory(CalculatorTool);

        }
        else if (calculatorPanelIndex === 1)
        {
            CalculatorTool.CALCULATOR_PANELS[calculatorPanelIndex - 1].classList.remove("tool--hidden");
            CalculatorTool.CALCULATOR_ICONS[calculatorPanelIndex - 1].classList.remove("tool--hidden");
            CalculatorTool.CALCULATOR_PANELS[calculatorPanelIndex].classList.add("tool--hidden");
            CalculatorTool.CALCULATOR_ICONS[calculatorPanelIndex].classList.add("tool--hidden");
            calculatorPanelIndex --;

            CalculatorTool.CALCULATOR_HISTORY_CLEANER.classList.add('tool--hidden');
        }
    });

    CalculatorTool.CALCULATOR_HISTORY_CLEANER.addEventListener("click", () =>
    {
        ClearCalculatorHistory(CalculatorTool);
    });

}
export function RemoveEventCalculator(CalculatorTool)
{
    Object.keys(CalculatorTool.CALCULATOR_BUTTONS).forEach(button => {

        CalculatorTool.CALCULATOR_BUTTONS[button].outerHTML = CalculatorTool.CALCULATOR_BUTTONS[button].outerHTML;
    });

    CalculatorTool.CALCULATOR_PANEL_CHANGER.outerHTML = CalculatorTool.CALCULATOR_PANEL_CHANGER.outerHTML;
    CalculatorTool.CALCULATOR_HISTORY_CLEANER.outerHTML = CalculatorTool.CALCULATOR_HISTORY_CLEANER.outerHTML;
}

function CalculatorResult(currentInput)
{
  this.input = currentInput;
  this.date = new Date().toLocaleString();
  this.eval = eval(currentInput);
}

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

export function UpdateCalculatorHistory(CalculatorTool)
{
    CalculatorTool.CALCULATOR_PANELS[1].innerHTML = '';

    if(calculatorHistory.length === 0)
    {
        const NEW_DIV = document.createElement('div');
        NEW_DIV.className = 'tool__item';
        NEW_DIV.innerHTML = 
        `
        <p class="tool__text tool__text--result"> NO DATA </p>
        `;

        CalculatorTool.CALCULATOR_PANELS[1].appendChild(NEW_DIV);
        CalculatorTool.CALCULATOR_HISTORY_CLEANER.classList.add('tool--hidden');
    }
    else
    {
        calculatorHistory.forEach(result =>
        {
        const NEW_DIV = document.createElement('div');
        NEW_DIV.className = 'tool__item'
        NEW_DIV.innerHTML = 
        ` 
        <p class="tool__text tool__text--result">${result.input} = ${result.eval}</p>
        <p class="tool__text tool__text--date">${result.date}</p>
        `;

        CalculatorTool.CALCULATOR_PANELS[1].appendChild(NEW_DIV);
        });

        CalculatorTool.CALCULATOR_HISTORY_CLEANER.classList.remove('tool--hidden');
    }
}

export function SaveCalculatorHistory()
{
  localStorage.setItem('calculatorHistory', JSON.stringify(calculatorHistory));
}

export function LoadCalculatorHistory()
{
  const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory'));
  if(savedHistory)
  {
    calculatorHistory = savedHistory;
    console.log("historial de la calculadora cargado");
  }
}

export function ClearCalculatorHistory(CalculatorTool)
{
  localStorage.removeItem('calculatorHistory');
  calculatorHistory = [];
  UpdateCalculatorHistory(CalculatorTool);
  console.log("historial de la calculadora limpiado");
}