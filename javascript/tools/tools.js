//Variables
let viewportWidth;
let viewportHeight;

//#region Calculator Tool

let calculator_Instance;

import CalculatorTool, {AddEventCalculator, RemoveEventCalculator, LoadCalculatorHistory} from "./calculator.js";

LoadCalculatorHistory();

export function ActivateCalculatorTool()
{
  calculator_Instance = FindCalculatorTool();
  AddEventCalculator(calculator_Instance);
  ActivateTool(calculator_Instance.CALCULATOR_TOOL, "active");
  isCalcHidden = false;
}

function FindCalculatorTool()
{
  const CALCULATOR_TOOL = document.getElementById("calculator-tool");
  const CALCULATOR_PANELS = document.getElementsByClassName("tool__panel--calculator");
  const CALCULATOR_BUTTONS = document.getElementsByClassName("calculator-button");
  const CALCULATOR_DISPLAY = document.getElementById("calculator-display");
  const CALCULATOR_PANEL_CHANGER = document.getElementById("calculator-panel-changer");
  const CALCULATOR_HISTORY_CLEANER = document.getElementById("calculator-history-cleaner");
  const CALCULATOR_ICONS = document.getElementsByClassName("tool__icon");

  if(!CALCULATOR_TOOL || !CALCULATOR_PANELS || !CALCULATOR_BUTTONS || !CALCULATOR_DISPLAY || !CALCULATOR_PANEL_CHANGER || !CALCULATOR_HISTORY_CLEANER || !CALCULATOR_ICONS)
  {
    ShowError("Calculator Tool nodes not found");
  }

  return new CalculatorTool(CALCULATOR_TOOL, CALCULATOR_PANELS, CALCULATOR_BUTTONS, CALCULATOR_DISPLAY, CALCULATOR_PANEL_CHANGER, CALCULATOR_HISTORY_CLEANER, CALCULATOR_ICONS);
}

function RemoveCalculatorTool()
{
  RemoveEventCalculator(calculator_Instance);
  ActivateTool(calculator_Instance.CALCULATOR_TOOL, "hidden");
  calculator_Instance = null;
  isCalcHidden = true;
}

//#endregion

//#region Grade Tool

import {ToolGradeCalculate} from "./grade.js";

export function ActivateGradeTool()
{
  const GRADE_TOOL = document.getElementById("grade-tool");
  const GRADE_BUTTON = document.getElementById("grade-tool-button");
  GRADE_BUTTON.addEventListener("click", () => ToolGradeCalculate());
  ActivateTool(GRADE_TOOL, "active");
  isGradeHidden = false;
}

function RemoveGradeTool()
{
  const GRADE_TOOL = document.getElementById("grade-tool");
  const GRADE_BUTTON = document.getElementById("grade-tool-button");
  GRADE_BUTTON.outerHTML = GRADE_BUTTON.outerHTML;
  ActivateTool(GRADE_TOOL, "hidden");
  isGradeHidden = true;
}

//#endregion

//#region Weather Tool

import {AddWeatherEvent} from "./weather.js";

export function ActivateWeatherTool()
{
  const WEATHER_TOOL = document.getElementById("weather-tool");
  ActivateTool(WEATHER_TOOL, "active");
  SpawnWeatherTool();
  isWeatherHidden = false;
}

function SpawnWeatherTool()
{
  const WEATHER_TITLE = document.createElement("strong");
  const WEATHER_WRAPPER = document.createElement("div");
  const WEATHER_INPUT = document.createElement("input");
  const WEATHER_BUTTON = document.createElement("button");

  WEATHER_TITLE.id = "weather-tool-title";
  WEATHER_INPUT.id = "weather-tool-input";
  WEATHER_BUTTON.id = "weather-tool-button";
  
  WEATHER_TITLE.className = "tool__text tool__text--title";
  WEATHER_WRAPPER.className = "tool__wrapper display-flex--column";
  WEATHER_INPUT.className = "tool__input tool__input--weather";
  WEATHER_BUTTON.className = "tool__button tool__button--weather";
  
  WEATHER_TITLE.innerHTML = "Get The Weather";
  WEATHER_BUTTON.innerHTML = "Search";

  WEATHER_INPUT.type = "text";
  WEATHER_INPUT.placeholder = "Enter City (City, Country Code)";
  WEATHER_INPUT.autocomplete = "off";
  
  const WEATHER_PANEL = document.getElementById("weather-tool-panel");
  WEATHER_PANEL.appendChild(WEATHER_TITLE);
  WEATHER_PANEL.appendChild(WEATHER_WRAPPER)
  WEATHER_PANEL.appendChild(WEATHER_INPUT);
  WEATHER_PANEL.appendChild(WEATHER_BUTTON);

  AddWeatherEvent(WEATHER_BUTTON);
}

function RemoveWeatherTool()
{
  const WEATHER_TOOL = document.getElementById("weather-tool");
  const WEATHER_PANEL = document.getElementById("weather-tool-panel");
  WEATHER_PANEL.innerHTML = "";
  ActivateTool(WEATHER_TOOL, "hidden");
  isWeatherHidden = true;
}

//#endregion

//#region ToolBar Render

let isCalcHidden = new Boolean(true);
let isGradeHidden = new Boolean(true);
let isWeatherHidden = new Boolean(true);

export function Tools()
{
  let CALCULATOR_TOOL = document.getElementById("calculator-tool");
  let GRADE_TOOL = document.getElementById("grade-tool");
  let WEATHER_TOOL = document.getElementById("weather-tool");

  if(!CALCULATOR_TOOL || !GRADE_TOOL || !WEATHER_TOOL)
  {
    ShowError("Tools not found");
  }

  CALCULATOR_TOOL.style.display = "none";
  GRADE_TOOL.style.display = "none";
  WEATHER_TOOL.style.display = "none";
}

function ActivateTool(tool, dir)
{
  switch(dir)
  {
    case "active":
      tool.style.display = "unset";
      tool.style.top = (viewportHeight / 2) - (tool.offsetHeight / 2) + "px";
      tool.style.left = (viewportWidth / 2) - (tool.offsetWidth / 2) + "px";
    break;

    case "hidden":
      tool.style.display = "none";
    break;
  }

}

export function RenderTool(type)
{

  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;

  switch(type)
  {
    case "calculator":

      isCalcHidden? ActivateCalculatorTool(): RemoveCalculatorTool();

    break;

    case "grade":

      isGradeHidden? ActivateGradeTool(): RemoveGradeTool();

    break;

    case "weather":

      isWeatherHidden? ActivateWeatherTool(): RemoveWeatherTool();

    break;
  }

}

export function ShowError(error)
{
    Toastify
    (
        {
            text: `!Error: ${error}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: 
            {
                background: "linear-gradient(to right, #FF0000, #ff8478)",
            },
        }
    ).showToast();
}

//#endregion