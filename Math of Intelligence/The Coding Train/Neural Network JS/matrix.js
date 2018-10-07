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

// scalar addition function

Matrix.prototype.add = function(n){
    for(var i = 0; i < this.rows; ++i){
        for(var j = 0; j < this.cols; ++j){
            this.matrix[i][j] += n;
        }
    }
}

// scalar multiplication function

Matrix.prototype.multiply = function(n){
    for(var i = 0; i < this.rows; ++i){
        for(var j = 0; j < this.cols; ++j){
            this.matrix[i][j] *= n;
        }
    }
}
