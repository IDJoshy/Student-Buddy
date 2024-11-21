//Calculator Tool
let calculator_Instance;

import CalculatorTool, {AddEventCalculator, RemoveEventCalculator, LoadCalculatorHistory} from "./calculator.js";
LoadCalculatorHistory();

export function ActivateCalculatorTool()
{
  let calculatorTool = document.getElementById("calculator-tool");
  let calculatorPanels = document.getElementsByClassName("tool__panel--calculator");
  let calculatorButtons = document.getElementsByClassName("calculator-button");
  let calculatorDisplay = document.getElementById("calculator-display");
  let calculatorPanelChanger = document.getElementById("calculator-panel-changer");
  let calculatorHistoryCleaner = document.getElementById("calculator-history-cleaner");
  let calculatorIcons = document.getElementsByClassName("tool__icon");

  if(!calculatorTool || !calculatorPanels || !calculatorButtons || !calculatorDisplay || !calculatorPanelChanger || !calculatorHistoryCleaner || !calculatorIcons)
  {
    return console.error("Calculator Tool nodes not found");
  }
  else
  {
    calculator_Instance = new CalculatorTool(calculatorTool, calculatorPanels, calculatorButtons, calculatorDisplay, calculatorPanelChanger, calculatorHistoryCleaner, calculatorIcons);
    AddEventCalculator(calculator_Instance);
    calculatorTool.style.display = "unset";
    return console.log("Calculator Tool nodes found and initialized");
  }
}

function RemoveCalculatorTool()
{
  calculator_Instance.CALCULATOR_TOOL.style.display = "none";
  RemoveEventCalculator(calculator_Instance);
  calculator_Instance = null;
}

//Grade Tool

const GRADE_TOOL = document.getElementById("grade-tool");
const GRADE_BUTTON = document.getElementById("grade-tool-button");
GRADE_BUTTON.addEventListener("click", GetGradeValues);

import {GetGradeValues} from "./grade.js";

export function ActivateGradeTool()
{
  GRADE_TOOL.style.display = "unset";
}

function RemoveGradeTool()
{
  GRADE_TOOL.style.display = "none"
}

// ToolBar Render Tools
let isCalcHidden = new Boolean(true);
let isGradeHidden = new Boolean(true);

export function Tools()
{
  let CALCULATOR_TOOL = document.getElementById("calculator-tool");
  let GRADE_TOOL = document.getElementById("grade-tool");

  if(!CALCULATOR_TOOL || !GRADE_TOOL)
  {
    return console.error("Calculator Tool or Grade Tool nodes not found");
  }

  CALCULATOR_TOOL.style.display = "none";
  GRADE_TOOL.style.display = "none";
}

export function RenderTool(type)
{
  switch(type)
  {
    case "calculator":

      if(isCalcHidden)
      {
        ActivateCalculatorTool();
        isCalcHidden = false;
      }
      else
      {
        RemoveCalculatorTool();
        isCalcHidden = true;
      }

      break;

    case "grade":
      if(isGradeHidden)
      {  
        ActivateGradeTool();
        isGradeHidden = false;
      }
      else
      {
        RemoveGradeTool();
        isGradeHidden = true;
      }
      break;
  }



}


