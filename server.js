// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./model/user');

mongoose.connect('mongodb://localhost:27017/tockto', function(){
	console.log('success on connecting to tockto');
});	

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8082;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {      // middleware to use for all requests
    // do logging
    console.log('A request arrived.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

/*var userRoute = router.route('/users');
																				
// create a user (accessed at POST http://localhost:8080/api/users)
userRoute.post(function(req, res) {    		       
        var user = new User();      // create a new instance of the User model
        user.kakaoID = req.query.kakaoID;  // set the bears name (comes from the request)
        user.nickName = req.query.nickName;
        
        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
});*/

router.post('/users', function(req,res){
	var user = new User();      // create a new instance of the User model
        user.kakaoID = req.query.kakaoID;  // set the bears name (comes from the request)
        user.nickName = req.query.nickName;
        
        // save the bear and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
})

router.get('/users/:kakao_id', function(req, res){
	User.find({ kakaoID: req.params.kakao_id}, function(err, user){
		if(err)
			res.send(err);
		console.log(user);
		res.json(user);	
	});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);