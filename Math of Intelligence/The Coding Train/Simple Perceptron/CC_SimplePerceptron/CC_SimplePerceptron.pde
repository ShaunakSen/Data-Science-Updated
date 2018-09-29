Perceptron brain;

// declare an array of 100 Point 
Point[] points = new Point[100];

void setup(){
  size(500, 500);
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
  
  // train each pt
  
  for (Point pt: points){
    float[] inputs = {pt.x, pt.y};
    brain.train(inputs, pt.label);
    
  }
}
