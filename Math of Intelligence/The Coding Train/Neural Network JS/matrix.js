function Matrix(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];

    // loop through each row
    for (var i = 0; i < this.rows; ++ i){
        // every single row is also an array
        this.matrix[i] = [];
        for (var j = 0; j < this.cols; ++j){
            // initialize each value to 0
            this.matrix[i][j] = 0;
        }
    }
}

// randomly populate values of the matrix

Matrix.prototype.randomize = function(){
    for(var i = 0; i < this.rows; ++i){
        for(var j = 0; j < this.cols; ++j){
            this.matrix[i][j] = Math.floor(Math.random() * 10);
        }
    }
}


// addition function

Matrix.prototype.add = function(n){

    // check if n is a matrix

    if (n instanceof Matrix){
        for(var i = 0; i < this.rows; ++i){
            for(var j = 0; j < this.cols; ++j){
                this.matrix[i][j] += n.matrix[i][j];
            }
        }
    } else 
    // n is just a scalar number 
    {
        for(var i = 0; i < this.rows; ++i){
            for(var j = 0; j < this.cols; ++j){
                this.matrix[i][j] += n;
            }
        }
    }

}

// scalar multiplication function

Matrix.prototype.multiply = function(n){
    
    if (n instanceof Matrix){
        for(var i = 0; i < this.rows; ++i){
            for(var j = 0; j < this.cols; ++j){
                this.matrix[i][j] *= n.matrix[i][j];
            }
        }
    } else {
        for(var i = 0; i < this.rows; ++i){
            for(var j = 0; j < this.cols; ++j){
                this.matrix[i][j] *= n;
            }
        }
    }
    
}

