var data;

function preload(){
    data = loadJSON('./data/movie_data.json');
}

function setup(){
    noCanvas();
    console.log(data)
}