let cam;

var boxes = [];
var midTwn;
var attractor;
var shdr;
var images = [];
var processedImages = [];

function preload() {
  midTwn = loadImage("https://upload.wikimedia.org/wikipedia/en/0/01/Midtown_120_Blues.jpg");
  for(var i;i<images.length;i++){
    var newPic = loadImage(images[i]);
    processedImages.push(newPic);
  }

  // shdr = loadShader("./shader.vert","./shader.frag");
}

function newBox() {
  var nuBox = new textBox();
  boxes.push(nuBox);
}


function setup() {
  var cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  attractor = new Attractor();
  for (i = 0; i < 500; i++) {
    newBox();
  }
}


function draw() {
  // shader(shdr);
  
  // shdr.setUniform("u_resolution", [width, height]);
  // shdr.setUniform("u_time", millis() / 1000.0);
  // shdr.setUniform("u_mouse", [mouseX, map(mouseY, 0, height, height, 0)]);
  background(200);
  // ambientLight();
  orbitControl();
  for (i = 0; i < boxes.length; i++) {
    boxes[i].applyForce(attractor.attract(boxes[i]));
    boxes[i].move();
    boxes[i].update();
    boxes[i].render();
    // console.log(boxes[i]);
  }
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // box(50);
}

class Attractor {
  constructor() {
    this.location = p5.Vector.random3D();
    this.mass = 20;
    this.G = 0.4;
  }
  attract = function (object) {
    var force = this.location.sub(object.pos);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 50.0);

    force.normalize();
    var strength = (this.G * this.mass * object.mass) / (distance * distance);
    force.mult(strength);

    return force;
  }
}

class textBox {
  pos = p5.Vector.random3D();
  vel = createVector(0, 0, 0);
  mass;
  rot;
  accel;
  noise_num;
  txtNum;


  constructor() {
    // this.pos = createVector((Math.random() * 50) - 25, (Math.random() * 50) - 25, (Math.random() * 50) - 25);
    this.pos = this.pos.mult(Math.random() * 500);
    this.color = color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    this.Xrot = 0;
    this.Yrot = 0;
    this.Zrot = 0;
    this.mass = 10;
    this.txtNum = Math.floor(Math.random() * processedImages.length);
    this.noise_num = (Math.random() * 50) - 25;
    if ((Math.random() * 75) > 25) {
      this.rotX = true;
    }
    if ((Math.random() * 75) < 50) {
      this.rotY = true;
    }
    if ((Math.random() * 75) > 65) {
      this.rotX = false
    }
    this.rotAmt = Math.random() / 10;
    // console.log(this.pos.x)
    this.vel = createVector(1, 0, 0);
    this.accel = createVector(0, 0, 0);
    this.size = Math.random() * 30;
  }

  applyForce = function (force) {
    var f = force.div(this.mass);
    this.accel.add(f);
  }

  render = function () {
    // console.log(this.pos);
    translate(this.pos.x, this.pos.y, this.pos.z);
    rotateX(this.Xrot);
    rotateY(this.Yrot);
    noStroke();
    // fill(this.color);
    texture(processedImages[txtNum]);
    box(this.size);
    pop();
    // resetMatrix();
  }

  move = function () {
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.accel.mult(0);
  }

  update = function () {
    push();
    if (this.rotY) {
      this.Yrot += this.rotAmt;
    }
    if (this.rotX) {
      this.Xrot += this.rotAmt;
    }


    // rotate(this.rot + frameCount);
    // resetMatrix();
  }
}