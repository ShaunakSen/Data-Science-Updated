class Perceptron {

// create an array to store wts
float[] weights;

// initialize the learningrate
float lr = 0.01;



// constructor: here we loop through all the wts and give them a random value bw -1 and +1
Perceptron(int n){
  
  weights = new float[n];
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
    println(weights[0], weights[1], weights[2]);
    
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
    println(weights[0], weights[1], weights[2]);
    
    
    
  }
  
  float guessY(float x){
    float w0 = weights[0];
    float w1 = weights[1];
    float w2 = weights[2];
    
    println("Eqn of line is ...........................");
    println(-(w0/w1), "x + ", -(w2/w1));
    
    return -(w0/w1)*x - (w2/w1)*1;
  }
  
 
}
