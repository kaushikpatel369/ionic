	var express = require('express');
	var app = express();
	//var mongojs = require('mongojs');
	//var db = mongojs('contactlist',['contactlist,users']);
	var ObjectID = require('mongodb').ObjectID;
	var MongoClient = require('mongodb').MongoClient;
	var bodyParser = require('body-parser');
	app.use(express.static(__dirname + "/www"))
	app.use(bodyParser.json());
	app.use(function (req, res, next) {
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
		// Pass to next layer of middleware
		next();
	});

	//var url = 'mongodb://localhost:27017/headnode';
	//mongodb://raj9701:raj970123@ds155727.mlab.com:55727/contactlists
	var url='mongodb://headnode:hn1993@ds155130.mlab.com:55130/headnode'
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	console.log("Connected to Database");
	
	//add the class details in db
	app.post('/stureg',function(req,res){
			console.log("i get GET add student request");
			console.log(req.body);
			db.collection('student').insertOne(req.body,function(err,docs){
				//console.log(docs);
				//assert.equal(1, docs);
				res.json(docs);
			});
	});
	
	app.post('/comreg',function(req,res){
			console.log("i get GET add Company request");
			console.log(req.body);
			db.collection('company').insertOne(req.body,function(err,docs){
				//console.log(docs);
				//assert.equal(1, docs);
				res.json(docs);
			});
	});
	
	app.post('/studentlogin',function(req,res){
		console.log("I get student login request");
		console.log(req.body);
		db.collection('student').find({phone:req.body.phone,password:req.body.password}).toArray(function(err,docs){
			console.log(docs);
			console.log(docs);
			console.log('working');
			res.json(docs);
		});
	});
	
	app.post('/companylogin',function(req,res){
		console.log("I get student login request");
		console.log(req.body);
		db.collection('company').find({cname:req.body.cname,password:req.body.password}).toArray(function(err,docs){
			console.log(docs);
			console.log(docs);
			console.log('working');
			res.json(docs);
		});
	});


});
var port = process.env.PORT || 4000 ;
app.listen(port);
console.log("applistining on port",+port);