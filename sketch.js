//camera variables
let capture;
let x;
let y;

//data variables
let sedentaryList = []; //sedentary minutes
let stepList = []; //steps
let notActive = [];
let stepCount = [];
let sedentary_data;
let num_days; // number of days of data
let day_num = 0;
let num_steps; //number of step intervals
let step_num = 0;
let sedentary, steps;

function preload(){
  //Load list of json file names
  sedentaryList = loadStrings('sedentary-dataList.txt');
  stepList = loadStrings('steps-dataList.txt')
}

function setup() {
  createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  background(0);
  x  = 0;
  y = 0;
  frameRate(15);

  //setup camera
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  //select month
  let month = int(random(18));
  print(month);
  notActive = loadJSON(sedentaryList[month]);
  stepCount = loadJSON(stepList[month]); 
}

function draw() {
  //background(220);
  //intro noise
  if (frameCount < 150){
    noStroke();
    fill(random(175,360), random(100), random(100));
    for (let l = 0; l < 500; l++){
      circle(random(width), random(height), random(100));
    }
  }
  if (frameCount==100){
    num_days = Object.keys(notActive).length;
    print(num_days);
    num_steps = Object.keys(stepCount).length;
  }

  if (frameCount > 150){
    sedentary = notActive[day_num]['value'];
    steps = stepCount[step_num]['value'];
    day_num += 1;
    step_num += 1;
    let notActiveColor = map(sedentary, 0, 1200, 175, 360);
    
    camGrrrl();
    activityMapping();
    //change background color
    background(notActiveColor, 100, 100, 1);
    
    print(steps);
    //cycle
    if (day_num >= num_days){
      day_num = 0;
      }
    
    if (step_num >= num_steps){
      step_num = 0;
    }
  }
}

function activityMapping(){
  // stepdust
  push();
  translate(width*.75, height*.4);
  let num1 = 200;
  let cir = (360 / num1) * (frameCount % num1);
  rotate((radians(cir)));
  let inside = map(steps, 0, 100, 100, 0)
  noStroke();
  fill(inside);
  let stretch = map(steps, 0, 100, width, 200)
  for (let i = 0; i < steps; i++){
    rect(0 + random(-stretch), 0 + random(stretch/2), random(inside), random(inside));
  }
  pop();
}

function camGrrrl(){
  if (frameCount%15==0){
    filter(INVERT);
    image(capture, x, y, width*.25, height*.25);
    x += width*.25;
    if (x >= width){
      x = 0;
      y += height*.25
    }
    
    if (y >= height){
      y = 0;
    }
   }
}