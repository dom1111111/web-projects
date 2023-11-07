///////// Constants and Variables /////////

const layout = document.querySelector(".layout");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

var numberOfJoints = 20;
var joints = []


///////// functions /////////

// get random number
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// addjust canvas drawing size to match it's CSS defined size (and dynamically addapt to window size or resize)
function adjustCanvasSize() {
    canvas.width = canvas.clientWidth;      // see: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
    canvas.height = canvas.clientHeight;
    console.log("Canvas width and height:", canvas.width, canvas.height);
};

// get center coordinate of canvas
function getCanvasCenter() {
    return [canvas.width / 2, canvas.height / 2];
};

// get random coordinate within canvas
function getRandCoord() {
    return [getRandInt(0, canvas.width), getRandInt(0, canvas.height)];
};

// create multiple random coordinates (within the canvas) and put them in 'joints' array
function makeJoints() {
    for (let i = 0; i < numberOfJoints; i++) {      // fill "joints" array with random coordinates - as many as defined in 'numberOfJoints'
        joints.push(getRandCoord())
    };
};

// move joints by 1 pixel along the x and y dimension
function moveJointsSlightly() {
    for (let i = 0; i < numberOfJoints; i++) {
        let [newX, newY] = joints[i];
        if (getRandInt(0, 1) > 0) {
            newX++;
        } else {
            newX--;
        };
        if (getRandInt(0, 1) > 0) {
            newY++;
        } else {
            newY--;
        };
        joints[i] = [newX, newY];
    };
};

// draw lines between all 'joints' to form a web
function drawNet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // first clear the entire canvas

    ctx.beginPath();

    for (let coord of joints) {                     // draw lines between all coordinates in joints
        for (otherCoord of joints) {
            if (coord === otherCoord) {
                continue                            // skip drawing the line, if the coordinate is the same
            };
            ctx.moveTo(...coord);
            ctx.lineTo(...otherCoord);
        };
    };
    
    ctx.stroke();
};


///////// listeners /////////

// listener for addjusting the canvas size on any resize
window.addEventListener("resize", adjustCanvasSize);

///////// main code /////////

adjustCanvasSize();     // adjust canvas size

makeJoints();           // make net joints by filling joints array with coordinates

drawNet();              // draw net (lines connected by joints)

setInterval(() => {     // repeatendly redraw the net slightly different from its last position
    moveJointsSlightly();
    drawNet();
}, 17);                 // 17 ms delay results in movement at around 60 fps






// let c = getCanvasCenter();
// ctx.moveTo(...c);                // `...` is like an unpack operator
// ctx.lineTo(c[0]+100, c[1]+100);