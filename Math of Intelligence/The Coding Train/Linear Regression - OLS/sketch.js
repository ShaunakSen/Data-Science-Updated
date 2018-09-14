var data = [];

var m = 1;
var b = 0;

function setup(){
    // create a canvas (400x400) and set a grayish background
    createCanvas(400, 400);
    background(51);
}

function linearRegression(){
    var xsum = 0;
    var ysum = 0;
    for(var i = 0; i < data.length; ++i){
        xsum += data[i].x;
        ysum += data[i].y;
    }
    var xmean = xsum/data.length;
    var ymean = ysum/data.length;

    var numerator = 0;
    var denominator = 0;

    for(var i = 0; i < data.length; ++i){
        var x = data[i].x;
        var y = data[i].y;
        numerator += (x - xmean) * (y - ymean);
        denominator += (x - xmean) * (x - xmean);
    }

    m = numerator/denominator;

    b = ymean - m * xmean;
}

function drawLine(){

    // this function draws a line for m and b

    var x1 = 0;
    var y1 = m*x1 + b;
    var x2 = 1;
    var y2 = m*x2 + b;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);

    stroke(255);
    line(x1, y1, x2, y2);
}


function mousePressed(){
    // whenever i press the mouse i am going to create a new data point

    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);

    var point = createVector(x, y);
    data.push(point);
}

function draw(){
    background(51);

    for (var i = 0; i < data.length; ++i){
        // map back to pixel range

        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);

        //draw an ellipse at that pt of 8x8
        
        stroke(255, 0, 255);
        ellipse(x, y, 8, 8)


    }

    // if there are at least 2 pts, plot the best fit line  based on calculated values of m & b

    if (data.length > 1){
        linearRegression();
        drawLine();
    }
}