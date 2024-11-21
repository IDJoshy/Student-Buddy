//Menus
export default class Menu 
{
    constructor(MENU_PANEL, MENU_PULLER, NAVBAR_MENU, TOOLBAR_MENU, HAMBURGER_MENU, HAMBURGER_BUTTON) 
    {
        this.MENU_PANEL = MENU_PANEL;
        this.MENU_PULLER = MENU_PULLER;
        this.NAVBAR_MENU = NAVBAR_MENU;
        this.TOOLBAR_MENU = TOOLBAR_MENU;
        this.HAMBURGER_MENU = HAMBURGER_MENU;
        this.HAMBURGER_BUTTON = HAMBURGER_BUTTON;
    }
}

let isNavbarHidden = false;
let isHamburgerHidden = true;

//Navbar
export function AddEvent_Navbar(Menu)
{
    Menu.MENU_PANEL.addEventListener("transitionend", () => {

        if (Menu.MENU_PANEL.style.top >= "0" && isNavbarHidden)
        {
            isNavbarHidden = false;
            console.log("Navbar hidden: " + isNavbarHidden);
        }
        else if (Menu.MENU_PANEL.style.top === "-85px" && !isNavbarHidden)
        {
            isNavbarHidden = true;
            console.log("Navbar hidden: " + isNavbarHidden);
        }
    
    });

    window.onscroll = () =>
    {
        let currentScrollPos = window.scrollY;
        
        if(!isNavbarHidden && isHamburgerHidden)
        {
            if(currentScrollPos > 85)
            {
                Hide_Navbar("up", Menu);
            }
        }
        else
        {
            if(currentScrollPos < 5)
            {
                Hide_Navbar("down", Menu);
            }
        }
    };
}

function Hide_Navbar(dir, Menu)
{
    switch(dir)
    {
        case "down":
            Menu.MENU_PANEL.style.top = "0";
            Menu.MENU_PULLER.innerHTML = "↑";
        break;
    
        case "up":
            Menu.MENU_PANEL.style.top = "-85px";
            Menu.MENU_PULLER.innerHTML = "↓";
        break;
    }
}

export function Pull_Navbar(Menu)
{
    Hide_Navbar(isNavbarHidden ? "down" : "up", Menu);
}

//Hamburger
export function Hide_Hamburger(Menu)
{
    const HAMBURGER_ICONS = document.getElementsByClassName("menu__icon--hamburger");

    if (isHamburgerHidden) 
    {
        isHamburgerHidden = false;
        Menu.HAMBURGER_MENU.classList.remove("menu--hidden");
        Menu.TOOLBAR_MENU.classList.add("menu--hidden");
        HAMBURGER_ICONS[0].classList.add("menu--hidden");
        HAMBURGER_ICONS[1].classList.remove("menu--hidden");
        Menu.MENU_PULLER.style.display = "none";

    } else {
        isHamburgerHidden = true;
        Menu.HAMBURGER_MENU.classList.add("menu--hidden");
        Menu.TOOLBAR_MENU.classList.remove("menu--hidden");
        HAMBURGER_ICONS[0].classList.remove("menu--hidden");
        HAMBURGER_ICONS[1].classList.add("menu--hidden");
        Menu.MENU_PULLER.style.display = "unset";
    }
}