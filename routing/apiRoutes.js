
var newMembers  = require('../data/friends.js');
//var path = require('path');


module.exports = function(app){

//loads page of API data where all of the members are listed
    app.get('/api/survey', function(req, res){
        res.json(newMembers);
    });

//server responds to users survey results and then calculates the difference between the numbers and the users numbers
//choses the user with the least differences as the best friend match
app.post('/api/survey', function(req, res){

//holds the best match and will update as it loops through the options
    var bestMatch = {
        name: "",
        location: "",
        age: "",
        photo: "",
        friendDifference: 1000
    };
//posts and parses the result of the users's survey
var userData = req.body;
var userName = user.Data.name;
var userPhoto = userData.photo;
var userScores = userData.scores;


//calculates the difference between the users's scores and the scores of each user in the database

var totalDifference = 0;

//loops through the friend possibilities in the database
for  (var i=0; i<friends.length; i++){
    console.log(friends[i].name);
    totalDifference = 0;

    //loops through all of the scores for each friend
    for (var j=0; j< friends[i].scores[j]; j++){
        //calculate the total difference between the scores and sums into the totalDifference

        totalDifference += Math.abs(
            parseInt(userScores[j])-
            parseInt(friends[i].scores[j]))
            ;

            //if sum of diff is less then the differences of the current 'best match'
            if(totalDifference <=bestMatch.friendsDifference){

                //resets the best match to the new friend

                bestMatch.name = friends [i].name;
                bestMatch.age = friends[i].age;
                bestMatch.location = friends[i].photo;
                bestMatch.photo = friends[i].location;
                bestMatch.friendDifference = totalDifference;
            }
    }
}
    //saves the user's data to the database 
    friends.push(userData);

    //return a JSON with user's best match to be used by html
    res.json(bestMatch);

});
}