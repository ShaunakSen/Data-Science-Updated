var data;
var resultP;

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
    resultP = createP('');

    button.mousePressed(euclideanSimilarity);


    function euclideanSimilarity(){
        var name1 = dropdown1.value();
        var name2 = dropdown2.value();

        ratings1 = users[name1];
        ratings2 = users[name2];

        // get list of movies that of the critics

        var titles = Object.keys(ratings1)

        // remove the 'name' and 'timestamp' properties from the array

        var i = titles.indexOf('name');
        titles.splice(i, 1);
        var j = titles.indexOf('timestamp');
        titles.splice(j, 1);

        console.log(titles)
        
        var sumSquares = 0;
        for (var i = 0; i < titles.length; ++i){
            var title = titles[i];

            //get rating of 2 selected critic for each title
            var rating1 = ratings1[title];
            var rating2 = ratings2[title];
            
            // handle null values
            if (rating1 != null && rating2 != null){
                var diff = rating1 - rating2;
                sumSquares += diff*diff;
            }

            
        }
        //distance
        var d = sqrt(sumSquares);

        // similarity is actually inversely related to the distance
        // we do (1+d) to handle div by 0 error and also it gives us a score bw 0 and 1
        // if d = 0, score = 1
        // if d is v high score tends to be 0
        var similarity = 1/(1+d);

        // output the similarity value
        resultP.html(similarity);   
    }
}