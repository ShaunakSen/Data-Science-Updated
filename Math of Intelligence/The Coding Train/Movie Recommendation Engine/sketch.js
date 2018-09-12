var data;
var resultP;

// we want to create a lookup object where key will be name of critic
// value will be the object
var users = {};

var resultDivs = [];

function preload(){
    data = loadJSON('./data/movie_data.json');
}

function setup(){
    noCanvas();

    // creating a form for a new user to submit ratings

    var titles = data.titles;
    var dropdowns = []
    
    for (var i = 0; i < titles.length; ++i){
        var div = createDiv(titles[i]);
        var dropdown = createSelect('');
        dropdown.title = titles[i];
        dropdown.option('not seen'); 
        dropdown.parent(div);
        dropdowns.push(dropdown);
        for (var star = 1; star < 6; ++star){
            dropdown.option(star);
        }
    }

    // using p5.js to create dropdowns

    var dropdown = createSelect('');

    // loop to populate dropdown and lookup objects

    for (var i = 0; i < data.users.length; ++i){

        name = data.users[i].name;

        // populate the dropdown with names
        dropdown.option(name);

        // populate lookup obj
        users[name] = data.users[i];
    }

    // console.log(users);

    // create a button

    var button = createButton('Submit');
    resultP = createP('');

    button.mousePressed(predictRatings);

    function predictRatings(){

        // first we want to create an obj with move_title -> rating mapping

        var newUser = {};

        console.log(dropdowns);

        for (var i = 0; i < dropdowns.length; ++i){
            var title = dropdowns[i].title;
            var rating = dropdowns[i].value();
            if (rating == 'not seen'){
                rating = null;
            }

            newUser[title] = rating;
        }

        console.log(newUser);
    }

    
    function findNearestNeighbors(){

        //clear result divs

        for (var i = 0; i < resultDivs.length; ++i){
            resultDivs[i].remove();
        }

        resultDivs = [];

        var name = dropdown.value();

        // create an obj of (name) -> similarity score

        var similarityScores = {};

        for(var i = 0; i < data.users.length; ++i){
            var otherUser = data.users[i].name;
            
            if (otherUser != name){
                // compute similarity score
                var similarity = euclideanDistance(name,otherUser)
                similarityScores[otherUser] = similarity
            }
            else{
                // same user, assign -1 
                similarityScores[otherUser] = -1
            }
        }
        //console.log(similarityScores);

        // sort users desc based on similarity scores

        data.users.sort(compareSimilarity);

        function compareSimilarity(a, b){
            var score1 = similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1;
        }
        
        // select top 5 similar users and display them

        var k = 5;

        for (var i = 0; i < k; ++i){
            var name = data.users[i].name
            var div = createDiv(name + ': Similarity Score: ' + similarityScores[name]);
            resultDivs.push(div);
            resultP.parent(div);
        }

        
    }
}

// calculate similarity score for 2 users

function euclideanDistance(name1, name2){
        

    ratings1 = users[name1];
    ratings2 = users[name2];

    // get list of movies that of the critics

    var titles = Object.keys(ratings1)

    // remove the 'name' and 'timestamp' properties from the array

    var i = titles.indexOf('name');
    titles.splice(i, 1);
    var j = titles.indexOf('timestamp');
    titles.splice(j, 1);
    
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
    return similarity;
}