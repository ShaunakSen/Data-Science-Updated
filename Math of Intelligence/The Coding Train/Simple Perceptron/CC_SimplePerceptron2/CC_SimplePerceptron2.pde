Perceptron brain;

// keep a counter to track how many pts  have been used to train the perceptron
int counter = 0;

// declare an array of 100 Point 
Point[] points = new Point[100];

void setup(){
  size(800, 880);
  brain = new Perceptron(3);
  
  //initialie the points
  
  for (int i = 0; i < points.length; ++i){
    points[i] = new Point();
  }
  
}

void draw(){
  background(255);
  
  // boundry
  
  stroke(0);
  
  Point p1 = new Point(-1, f(-1));
  Point p2 = new Point(1, f(1));
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());
  
  
  //for point in points, display the points
  
  for (Point pt : points){
    pt.show();
  }
  
  // initially color each pt red or green based on correct or incorrect
  for (Point pt: points){
    float[] inputs = {pt.x, pt.y, pt.bias};
    int target = pt.label;
    int guess = brain.guess(inputs);
    if (guess == target){
      fill(0, 255, 0);
    }
    else {
      fill(255, 0, 0);
    }
    noStroke();
    ellipse(pt.pixelX(), pt.pixelY(), 16, 16);
  }
  
  
  //move the next part to mousePressed() function if u want
  
  // train the perceptron using the next point and see how the wt changes and how that affects the labelling
  Point required_point = points[counter];
  float[] inputs = {required_point.x, required_point.y, required_point.bias};
  int target = required_point.label;
  brain.train(inputs, target);
  if (counter < points.length - 1){
    counter += 1;
  } else {
    counter = 0;
  }
}

void mousePressed(){

  
  
}
