let offsetX = [], offsetY = [], isDragging = [];
let eventHandlers = [];

export function AddEvents_Grab() 
{
    offsetX = [], offsetY = [], isDragging = [];
    const GRAB_SPACE = document.getElementsByClassName('grab-space');
    const GRAB_ITEM = document.getElementsByClassName('grab-item');

    SetEvents(GRAB_SPACE, GRAB_ITEM);
}

export function RemoveEvents_Grab()
{
    const GRAB_SPACE = document.getElementsByClassName('grab-space');

    for (let i = 0; i < GRAB_SPACE.length; i++) {
        const handlers = eventHandlers[i];

        if (handlers)
        {
            GRAB_SPACE[i].removeEventListener("mousedown", handlers.dragStartMouse);
            GRAB_SPACE[i].removeEventListener("touchstart", handlers.dragStartTouch);
            GRAB_SPACE[i].removeEventListener("mouseup", handlers.dragStopMouse);
            GRAB_SPACE[i].removeEventListener("touchend", handlers.dragStopTouch);

            window.removeEventListener("mousemove", handlers.dragMoveMouse);
            window.removeEventListener("touchmove", handlers.dragMoveTouch);
        }
    }

    eventHandlers = [];
}

function SetEvents(GRAB_SPACE, GRAB_ITEM) 
{
    for (let i = 0; i < GRAB_SPACE.length; i++) 
    {
        const dragStartMouse = (e) => DragStart(e, GRAB_ITEM[i], GRAB_SPACE[i], i);
        const dragStartTouch = (e) => DragStart(e, GRAB_ITEM[i], GRAB_SPACE[i], i);
        const dragStopMouse = () => DragStop(GRAB_SPACE[i], i);
        const dragStopTouch = () => DragStop(GRAB_SPACE[i], i);

        const dragMoveMouse = (e) => {
            if (isDragging[i]) {
                let newX = e.clientX - offsetX[i];
                let newY = e.clientY - offsetY[i];
                Drag(newX, newY, GRAB_ITEM[i]);
            }
        };

        const dragMoveTouch = (e) => {
            if (isDragging[i]) {
                let newX = e.touches[0].clientX - offsetX[i];
                let newY = e.touches[0].clientY - offsetY[i];
                Drag(newX, newY, GRAB_ITEM[i]);
            }
        };

        eventHandlers[i] = {
            dragStartMouse,
            dragStartTouch,
            dragStopMouse,
            dragStopTouch,
            dragMoveMouse,
            dragMoveTouch
        };

        GRAB_SPACE[i].addEventListener("mousedown", dragStartMouse, { passive: false });
        GRAB_SPACE[i].addEventListener("touchstart", dragStartTouch, { passive: false });
        GRAB_SPACE[i].addEventListener("mouseup", dragStopMouse, { passive: false });
        GRAB_SPACE[i].addEventListener("touchend", dragStopTouch, { passive: false });

        window.addEventListener("mousemove", dragMoveMouse, { passive: false });
        window.addEventListener("touchmove", dragMoveTouch, { passive: false });
    }
}

function DragStart(e, item, space, index) {
    isDragging[index] = true;

    if (e.type === 'mousedown') {
        offsetX[index] = e.clientX - item.offsetLeft;
        offsetY[index] = e.clientY - item.offsetTop;
        space.style.cursor = 'grabbing';
    } else if (e.type === 'touchstart') {
        offsetX[index] = e.touches[0].clientX - item.offsetLeft;
        offsetY[index] = e.touches[0].clientY - item.offsetTop;
    }
}

function Drag(newX, newY, item) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Restricciones de posición
    if (newX < 0) newX = 0;
    else if (newX + item.offsetWidth > viewportWidth) newX = viewportWidth - item.offsetWidth;

    if (newY < 40) newY = 40;
    else if (newY + item.offsetHeight > viewportHeight) newY = viewportHeight - item.offsetHeight;

    // Actualizar posición
    item.style.left = `${newX}px`;
    item.style.top = `${newY}px`;
}

function DragStop(space, index) {
    isDragging[index] = false;
    space.style.cursor = 'move';
}