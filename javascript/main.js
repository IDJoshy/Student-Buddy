//App

window.scrollTo(0, 0);

//Loader
const LOADER_PANEL = document.getElementById("loader-panel");
const LOADER_ANIM_IMG = document.getElementsByClassName("loader__image");
let loaderAnimIndex = 0;

import Loader, {Load, LoaderAnimation} from "./anim/loader.js";
const LOADER = new Loader(LOADER_PANEL, LOADER_ANIM_IMG, loaderAnimIndex);

Load(LOADER);
LoaderAnimation(LOADER);

//Menus
const MENU_PANEL = document.getElementById("menu-panel");
const MENU_PULLER = document.getElementById("menu-puller");

const NAVBAR_MENU = document.getElementById("navbar-menu");
const TOOLBAR_MENU = document.getElementById("toolbar-menu");
const HAMBURGER_MENU = document.getElementById("hamburger-menu");
const HAMBURGER_BUTTON = document.getElementById("hamburger-button");

import Menu, {AddEvent_Navbar, Pull_Navbar, Hide_Hamburger} from "./menu/menu.js";
const MENU = new Menu(MENU_PANEL, MENU_PULLER, NAVBAR_MENU, TOOLBAR_MENU, HAMBURGER_MENU);

AddEvent_Navbar(MENU);

MENU_PULLER.addEventListener("click", () => Pull_Navbar(MENU));
HAMBURGER_BUTTON.addEventListener("click", () => Hide_Hamburger(MENU));

//Tools
import {Tools, RenderTool} from "./tools/tools.js";

Tools();

const TOOL_CALCULATOR_BUTTON = document.getElementById("toolbar-button-calculator");
const TOOL_GRADE_BUTTON = document.getElementById("toolbar-button-grade");

TOOL_CALCULATOR_BUTTON.addEventListener("click", () => RenderTool("calculator"));
TOOL_GRADE_BUTTON.addEventListener("click", () => RenderTool("grade"));

//Grab
import {AddEvents_Grab} from "./misc/grab.js";
AddEvents_Grab();
