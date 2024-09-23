//Loader
const loader = document.querySelector(".loader");

window.addEventListener("load", () =>
{
    loader.classList.add("loader--hidden");

    loader.addEventListener("transitionend", () =>
    {
        loader.remove();
    })
})

const loader_images = document.querySelectorAll('.loader__image');

let loader_images_index = 0;
const loader_images_time = 200;


function loader_images_animation() {
    loader_images[loader_images_index].classList.remove('loader__image--active');
    loader_images_index = (loader_images_index + 1) % loader_images.length;
    loader_images[loader_images_index].classList.add('loader__image--active');
}

setInterval(loader_images_animation, loader_images_time);

//Navbar
let prevScrollPos = window.scrollY;
window.onscroll = function() 
{
    let currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-7.5rem";
    }
    prevScrollPos = currentScrollPos;
}