// Setup Dimensions
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 5;  // 1024
canvas.height = 64 * 5;  // 576

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
};

const level = 1;

let levels = {
    1: new Level({
        collisionsLevel: collisionsLevel0,
        backgroundImageSrc: './img/backgroundLevel0.png',
        doorPosition: { x: 555555555550, y: 0 },
        playerStartPosition: { x: 50, y: 50 }
    }),
    2: new Level({
        collisionsLevel: collisionsLevel2,
        backgroundImageSrc: './img/backgroundLevel2.png',
        doorPosition: { x: 772, y: 336 },
        playerStartPosition: { x: 98, y: 158 }
    }),
    3: new Level({
        collisionsLevel: collisionsLevel3,
        backgroundImageSrc: './img/backgroundLevel3.png',
        doorPosition: { x: 176, y: 335 },
        playerStartPosition: { x: 750, y: 230 }
    })
};

    // Create a new player
    const player = new Player({
        levels: levels,
        keys: keys
    });


    // Animate Player   
    function animate() {
        window.requestAnimationFrame(animate)
    
        background.draw()
        
        doors.forEach((door) => {
            door.draw()
        })
    
        player.handleInput(keys)
        player.draw()
        player.update()
    
        // Level switch
        c.save()
        c.globalAlpha = player.overlay.opacity
        c.fillStyle = 'black'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.restore()
    }

    levels[1].init()
    animate()