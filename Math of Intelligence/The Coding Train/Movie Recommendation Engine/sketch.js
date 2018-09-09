var data;

function preload(){
    data = loadJSON('./data/movie_data.json');
}

function setup(){
    noCanvas();
    //console.log(data);

    var users = data.users;

    // using p5.js to create dropdowns

    var dropdown1 = createSelect('');
    var dropdown2 = createSelect('');

    for (var i = 0; i < users.length; ++i){

        // populate the dropdowns with names
        dropdown1.option(users[i].name);
        dropdown2.option(users[i].name);
    }

    // create a button

    var button = createButton('Submit');

    button.mousePressed(euclideanSimilarity);


    function euclideanSimilarity(){
        var person1 = dropdown1.value();
        var person2 = dropdown2.value()

        console.log(person1, person2);
    }
}