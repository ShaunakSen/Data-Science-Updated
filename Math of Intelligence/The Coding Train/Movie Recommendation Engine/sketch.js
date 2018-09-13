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

    // for each title create a dropdown with options
    
    for (var i = 0; i < titles.length; ++i){
        var div = createDiv(titles[i]);
        var dropdown = createSelect('');
        dropdown.title = titles[i];
        dropdown.option('not seen'); 
        dropdown.parent(div);
        for (var star = 1; star < 6; ++star){
            dropdown.option(star);
        }
        dropdowns.push(dropdown);
    }


    // loop to populate lookup object

    for (var i = 0; i < data.users.length; ++i){

        name = data.users[i].name;

        // populate lookup obj
        users[name] = data.users[i];
    }

    // console.log(users);

    // create a button

    var button = createButton('Submit');
    resultP = createP('');

    button.mousePressed(predictRatings);

    function predictRatings(){

        // first we want to create an obj for new user with move_title -> rating mapping

        var newUser = {};

        for (var i = 0; i < dropdowns.length; ++i){
            var title = dropdowns[i].title;
            var rating = dropdowns[i].value();
            if (rating == 'not seen'){
                rating = null;
            }

            newUser[title] = rating;
        }

        console.log(newUser);

        // find nearest neighbors to that user

        findNearestNeighbors(newUser);
    }

    
    function findNearestNeighbors(newUser){

        //clear result divs

        for (var i = 0; i < resultDivs.length; ++i){
            resultDivs[i].remove();
        }

        resultDivs = [];

        // create an obj of (name) -> similarity score

        var similarityScores = {};

        for(var i = 0; i < data.users.length; ++i){
            var otherUser = data.users[i];
            var similarity = euclideanDistance(newUser, otherUser);
            
            similarityScores[otherUser.name] = similarity;
            
        }
        //console.log(similarityScores);

        // sort users desc based on similarity scores

        data.users.sort(compareSimilarity);

        function compareSimilarity(a, b){
            var score1 = similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1;
        }

        // get a list of all movies not rated

        for (var i = 0; i < data.titles.length; ++i){
            var title = data.titles[i];
            if (newUser[title] == null){

                // now we have to predict star ratings for those titles

                // look at the 5 NN
                
                var k = 5;
                var weightedSum = 0;
                var similaritySum = 0;

                for (var j = 0; j < k; ++j){
                    // remeber data.users is sorted according to similarity
                    var jth_user = data.users[j];
                    var jth_user_similarity = similarityScores[jth_user.name]; 
                    var jth_user_rating = jth_user[title]
                    if (jth_user_rating != null){
                        weightedSum = weightedSum + jth_user_rating * jth_user_similarity;
                        similaritySum = similaritySum + jth_user_similarity;
                    } 
                }
                var predicted_rating = nf(weightedSum/similaritySum, 1, 2);
                var div = createDiv(title + ':' + predicted_rating);
                resultDivs.push(div);
                div.parent(resultP);

            }
        }
        
    }
}

// calculate similarity score for 2 users

function euclideanDistance(ratings1, ratings2){

    var titles = data.titles;
    
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