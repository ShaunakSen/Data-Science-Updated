var data;
var resultP;

var users = {};

var resultDivs = [];

function preload(){
    data = loadJSON('./data/movie_data.json');
}

function setup(){
    noCanvas();
    //console.log(data);

    

    // we want to create a lookup object where key will be name of critic
    // value will be the object

   

    

    // using p5.js to create dropdowns

    var dropdown = createSelect('');

    for (var i = 0; i < data.users.length; ++i){

        name = data.users[i].name;

        // populate the dropdown with names
        dropdown.option(name);

        users[name] = data.users[i];
    }

    console.log(users);

    // create a button

    var button = createButton('Submit');
    resultP = createP('');

    button.mousePressed(findNearestNeighbors);
    
    function findNearestNeighbors(){

        //clear result divs

        for (var i = 0; i < resultDivs.length; ++i){
            resultDivs[i].remove();
        }

        resultDivs = [];

        var name = dropdown.value();

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

        data.users.sort(compareSimilarity);

        function compareSimilarity(a, b){
            var score1 = similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1;
        }
        
        var k = 5;

        for (var i = 0; i < k; ++i){
            var name = data.users[i].name
            var div = createDiv(name + ': Similarity Score: ' + similarityScores[name]);
            resultDivs.push(div);
            resultP.parent(div);
        }

        
    }
}

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