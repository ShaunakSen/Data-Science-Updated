class Point {
  float x;
  float y;
  int label;
  
  //Constructor
  Point(){
    x = random(-1, 1);
    y = random(-1, 1);
    if (x < y){
      label = 1;
    } else {
      label = -1;
    }
  }
  
  // function to get pixel space mappings
  
  float pixelX(){
    return map(x, -1, 1, 0, width);
  }
  
  float pixelY(){
    return map(y, -1, 1, height, 0);
  }
  
  void show(){
    stroke(0);
    if (label == 1){
      fill(255);
    } else {
      fill(0);
    }
    
    // map the x and y values to pixel space so that they show up correctly
    float px = pixelX();
    float py = pixelY();
    
     
    
    ellipse(px, py, 32, 32);
  }
}
