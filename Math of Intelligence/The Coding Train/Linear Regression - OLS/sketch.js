var data = [];

function setup(){
    // create a canvas (400x400) and set a grayish background
    createCanvas(400, 400);
    background(51);
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
        fill(255);
        stroke(255);
        ellipse(x, y, 8, 8)


    }
}