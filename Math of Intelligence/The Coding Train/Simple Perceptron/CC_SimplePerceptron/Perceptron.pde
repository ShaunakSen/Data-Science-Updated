class Perceptron {

// create an array to store wts
float[] weights = new float[2];

// initialize the learningrate
float lr = 0.1;



// constructor: here we loop through all the wts and give them a random value bw -1 and +1
Perceptron(){
  
  for(int i = 0; i < weights.length; ++i){
    weights[i] = random(-1, 1);
    
  }
  println("The initial wts are ...........................");
  println(weights[0], weights[1]);
  
  
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
  
  // training function
  
  void train(float[] inputs, int target){
    // compute the guess for the set of ips
    
    println("Before tuning the wts are ...........................");
    println(weights[0], weights[1]);
    
    println("The inputs are ...........................");
    println(inputs[0], inputs[1]);
    
    int guess = guess(inputs);
    
    println("The guess is ...........................");
    println(guess);
    
    // compute the error
    int error = target - guess;
    
    println("The error is ...........................");
    println(error);
    
    println("Tuning the wts ...........................");
    
    // now that the error is known tune each wt
    
    for (int i = 0; i < weights.length; ++i){
      weights[i] += error * inputs[i] * lr;
    }
    
    println("After tuning the wts are ...........................");
    println(weights[0], weights[1]);
    
    
  }
}
