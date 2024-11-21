//Loader

export default class Loader
{
    constructor(LOADER_PANEL, LOADER_ANIM_IMG, loaderAnimIndex)
    {
        this.LOADER_PANEL = LOADER_PANEL;
        this.LOADER_ANIM_IMG = LOADER_ANIM_IMG;
        this.loaderAnimIndex = loaderAnimIndex;
    }
}

let IsLoaded = false;

export function Load(Loader)
{
    IsLoaded = false;

    window.addEventListener("load", () =>
    {
        Loader.LOADER_PANEL.classList.add("loader--hidden");
    
        Loader.LOADER_PANEL.addEventListener("transitionend", () =>
        {
            Loader.LOADER_PANEL.remove();
            IsLoaded = true;
        });
    });
}

export function LoaderAnimation(Loader)
{
    setInterval(() => {

        if (!IsLoaded)
        {
            Loader.LOADER_ANIM_IMG[Loader.loaderAnimIndex].classList.remove('loader__image--active');
            Loader.loaderAnimIndex = (Loader.loaderAnimIndex + 1) % Loader.LOADER_ANIM_IMG.length;
            Loader.LOADER_ANIM_IMG[Loader.loaderAnimIndex].classList.add('loader__image--active');
        }else
        {
            clearInterval();
        }

    }, 200);
}