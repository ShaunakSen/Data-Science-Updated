var data;

function preload(){
    data = loadJSON('./data/movie_data.json');
}

function setup(){
    noCanvas();
    //console.log(data);

    

    // we want to create a lookup object where key will be name of critic
    // value will be the object

    var users = {};

    

    // using p5.js to create dropdowns

    var dropdown1 = createSelect('');
    var dropdown2 = createSelect('');

    for (var i = 0; i < data.users.length; ++i){

        name = data.users[i].name;

        // populate the dropdowns with names
        dropdown1.option(name);
        dropdown2.option(name);

        users[name] = data.users[i];
    }

    console.log(users);

    // create a button

    var button = createButton('Submit');

    button.mousePressed(euclideanSimilarity);


    function euclideanSimilarity(){
        var person1 = dropdown1.value();
        var person2 = dropdown2.value()

        console.log(users[person1]);
        console.log(users[person2]);
    }
}