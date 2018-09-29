Perceptron brain;

// declare an array of 100 Point 
Point[] points = new Point[20];

void setup(){
  size(500, 500);
  brain = new Perceptron();
  
  //initialie the points
  
  for (int i = 0; i < points.length; ++i){
    points[i] = new Point();
  }
  
  float inputs[] = {-1, 0.5};
 
  
  for (Point pt : points){
    
    
    println(pt.x, pt.y);
    
    float[] pt_inputs = {pt.x, pt.y};
    
    brain.train(pt_inputs, pt.label);
    
    
  }
}

void draw(){
  background(255);
  
  // boundry
  
  stroke(0);
  line(0, 0, width, height);
  
  //for point in points
  
  
}
