Perceptron brain;

// keep a counter to track how many pts  have been used to train the perceptron
int counter = 0;

// declare an array of 100 Point 
Point[] points = new Point[100];

void setup(){
  size(800, 880);
  brain = new Perceptron();
  
  //initialie the points
  
  for (int i = 0; i < points.length; ++i){
    points[i] = new Point();
  }
  
  float inputs[] = {-1, 0.5};
 
  int guess = brain.guess(inputs);
  println(guess);
}

void draw(){
  background(255);
  
  // boundry
  
  stroke(0);
  line(0, 0, width, height);
  
  //for point in points, display the points
  
  for (Point pt : points){
    pt.show();
  }
  
  // initially color each pt red or green based on correct or incorrect
  println("Coloring....................");
  for (Point pt: points){
    float[] inputs = {pt.x, pt.y};
    int target = pt.label;
    int guess = brain.guess(inputs);
    if (guess == target){
      fill(0, 255, 0);
    }
    else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(pt.x, pt.y, 16, 16);
  }
}

void mousePressed(){

  // train the perceptron using the next point and see how the wt changes and how that affects the labelling
  Point required_point = points[counter];
  float[] inputs = {required_point.x, required_point.y};
  int target = required_point.label;
  brain.train(inputs, target);
  if (counter < points.length){
    counter += 1;
  } else {
    return;
  }
  
}
