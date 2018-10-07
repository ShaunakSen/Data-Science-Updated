class Matrix {

    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
    
        // loop through each row
        for (let i = 0; i < this.rows; ++ i){
            // every single row is also an array
            this.matrix[i] = [];
            for (let j = 0; j < this.cols; ++j){
                // initialize each value to 0
                this.matrix[i][j] = 0;
            }
        }
    }
    
    // randomly populate values of the matrix
    
    randomize(){
        for(let i = 0; i < this.rows; ++i){
            for(let j = 0; j < this.cols; ++j){
                this.matrix[i][j] = Math.floor(Math.random() * 10);
            }
        }
    }
    
    
    // addition function
    
    add(n){
    
        // check if n is a matrix
    
        if (n instanceof Matrix){
            for(let i = 0; i < this.rows; ++i){
                for(let j = 0; j < this.cols; ++j){
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
        } else 
        // n is just a scalar number 
        {
            for(let i = 0; i < this.rows; ++i){
                for(let j = 0; j < this.cols; ++j){
                    this.matrix[i][j] += n;
                }
            }
        }
    
    }
    
    // scalar multiplication function
    
    multiply(n){
    
        if (n instanceof Matrix){
            for(let i = 0; i < this.rows; ++i){
                for(let j = 0; j < this.cols; ++j){
                    this.matrix[i][j] *= n.matrix[i][j];
                }
            }
        } else {
            for(let i = 0; i < this.rows; ++i){
                for(let j = 0; j < this.cols; ++j){
                    this.matrix[i][j] *= n;
                }
            }
        }
        
    }


} //--------------------- end of class 




