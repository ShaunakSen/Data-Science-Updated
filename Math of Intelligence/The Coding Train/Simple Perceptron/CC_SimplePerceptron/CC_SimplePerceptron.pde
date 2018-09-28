Perceptron p;

// declare an array of 100 Point 
Point[] points = new Point[100];

void setup(){
  size(500, 500);
  p = new Perceptron();
  
  //initialie the points
  
  for (int i = 0; i < points.length; ++i){
    points[i] = new Point();
  }
  
  float inputs[] = {-1, 0.5};
  
  // print the inputs
  
  println("The ips are ...........................");
  println(inputs[0], inputs[1]);
  
  int guess = p.guess(inputs);
  println(guess);
}

void draw(){
  background(255);
  
  // boundry
  
  stroke(0);
  line(0, 0, width, height);
  
  //for point in points
  
  for (Point p : points){
    p.show();
  }
}
