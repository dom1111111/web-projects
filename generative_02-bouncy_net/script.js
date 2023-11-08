///////// Constants and Variables /////////

const layout = document.querySelector(".layout");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"]

var numberOfJoints = 3;
var joints = [];
var animationInterval;

///////// functions /////////

// get random number
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// addjust canvas drawing size to match it's CSS defined size (and dynamically addapt to window size or resize)
function adjustCanvasSize() {
    canvas.width = canvas.clientWidth;              // see: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
    canvas.height = canvas.clientHeight;
    console.log("Canvas width and height:", canvas.width, canvas.height);
};

// create multiple random joints with random starting coordinates (within the canvas) and directions
function makeJoints() {
    for (let i = 0; i < numberOfJoints; i++) {      // fill "joints" array with random joints - as many as defined in 'numberOfJoints'
        let dx = getRandInt(-10, 10)                // randomly determine a direction
        if (dx == 0) {dx++}                         // ensure that dx is not 0 (a perfectly horizontal direction)
        joints.push({                               // each joint is an object with:
            x: getRandInt(0, canvas.width),         // starting x coordinate
            y: getRandInt(0, canvas.height),        // starting y coordinate
            dx: dx,                                 // starting x direction number
            dy: 11 - dx,                            // starting y direction number
        })
    };
};

// move joints by the direction numbers, but make sure they "bounce" off the edges of the canvas (change direction as to not go past the edge)
function moveJointsToEndCoord() {
    for (let joint of joints) {
        joint.x += joint.dx;
        joint.y += joint.dy;

        if (joint.x > canvas.width || joint.x < 0) {
            joint.dx = -joint.dx
        }
        if (joint.y > canvas.height || joint.y < 0) {
            joint.dy = -joint.dy
        }
    }
};

// draw lines between all 'joints' to form a web
function drawNet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // first clear the entire canvas

    ctx.beginPath();

    for (let joint of joints) {                     // draw lines between all coordinates in joints
        for (let otherJoint of joints) {
            if (joint.x == otherJoint.x && joint.y == otherJoint.y) {
                continue                            // skip drawing the line, if the coordinate is the same
            };
            ctx.moveTo(joint.x, joint.y);
            ctx.lineTo(otherJoint.x, otherJoint.y);
        };
    };
    
    ctx.stroke();
};

// main net animation function
function animateNet(fps) {
    clearInterval(animationInterval)
    let ms = Math.round(1000 / fps)
    animationInterval = setInterval(() => {         // repeatendly redraw the net with its joints moving in straights lines, bouncing off the edge of the canvas
        moveJointsToEndCoord()
        window.requestAnimationFrame(drawNet);
    }, ms);                                         // 17 ms delay results in movement at around 60 fps
}


///////// listeners /////////

// listener for addjusting the canvas size on any resize
window.addEventListener("resize", adjustCanvasSize);


///////// main code /////////

adjustCanvasSize();         // adjust canvas size

makeJoints();               // make net joints by filling joints array with coordinates

drawNet();                  // draw net (lines connected by joints)

animateNet(60)              // animate it!
