class Perceptron {

// create an array to store wts
float[] weights = new float[2];



// constructor: here we loop through all the wts and give them a random value bw -1 and +1
Perceptron(){
  for(int i = 0; i < weights.length; ++i){
    weights[i] = random(-1, 1);
  }
  
  }
  
  int sign(float n){
    // this is our Activation Function
    if (n >= 0){
      return 1;
    }
    else{
      return -1;
    }
  }
  
  int guess(float[] inputs){
    //here we compute the weighted sum
    float sum = 0;
    for (int i = 0; i < weights.length; ++i){
      sum += inputs[i] * weights[i];
    }
    
    int output = sign(sum);
    
    return output;
    
  }
}
