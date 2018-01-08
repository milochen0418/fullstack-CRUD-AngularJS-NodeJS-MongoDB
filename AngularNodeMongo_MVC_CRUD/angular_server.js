var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var portNum = 3456;
var mongoose = require('mongoose');
var mongoUrl = 'mongodb://localhost/newDB2';
mongoose.connect('mongodb://localhost/newDB2');
var collectionName = 'form';
var FormSchema = new mongoose.Schema({
   name: String,
   created: {type: Date, default: Date.now}
},{collection:collectionName});

var Form = mongoose.model("Form", FormSchema);

Form.find( function receiveData (err, data) {
   console.log(err);
   console.log(JSON.stringify(data, null , 4));
   //process.exit(1);
} );


//just find by id
Form.findById('56a78dc628e2a68126e1c925', function (err, data) {
   console.log('test findById() function');
   console.log(err);
   console.log(JSON.stringify(data, null , 4));
});

//find by id and change it
if(0) //sample code for remove item by mongoose 
{
Form.findById('56a78dc628e2a68126e1c925', function (err, data) {
   console.log(' findById() function and change it');
   console.log(err);
   console.log('before change');
   console.log(JSON.stringify(data, null , 4));
   data.name = data.name + 'L';
   data.save();
   console.log('after change');
   console.log(JSON.stringify(data, null , 4));
});
}

app.use("/public", express.static(path.join(__dirname, 'angular/')));
console.log("http://xxx.xxx.xxx:xxxx/public/* is mapping to ./angular/");

//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.get('/api/form/:id', function(req, res) { 
   Form.findById(req.params.id, function (err, data) {
		res.json(data);
   });
});



function addForm(nameStr) {
	console.log('addForm with name = ' + nameStr);
	var form = new Form({name:nameStr, created:new Date()});
	form.save();
}



app.post('/api/form/', function (req, res){
	console.log('app.post() -> Create');
	//addForm(req.body.name);
	var form = new Form({name:req.body.name, created:new Date()});
	form.save();
 
	console.log('req.body.name = ' + req.body.name);
	res.end();
	//res('POST for Create TODO');
});

app.get('/api/form', function(req, res){
	console.log('app.get() -> Read');
   //Form.findById('56a4281c1747bbea6c40212f', function (err, data) {
   Form.find( function (err, data) {
      res.json(data);
   });
});

app.put('/api/form/:id', function(req,res ) {
	console.log('FU app.put() -> Update with id = ' + req.params.id);
	if(!req.body) { 
		return res.send(400); 
	} 
	else {
		//console.log('req.body = '+ JSON.stringify(req));
		console.log('req.body = '+ JSON.stringify(req.body));
	}



	//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
	Form.findById(req.params.id, function(err, form) {
		if(err) {
			console.log('err');
		}
		else {
			console.log('name = ' + req.body.name + ', created = '+ req.body.created);
		
			form.name = req.body.name;
			//form.created = req.body.created;
			form.save();
			Form.find( function(err, data) {
				res.json(data);
			});
		}
	});
});
 

app.delete('/api/form/:id', function(req, res) {
	console.log('app.delete() -> Delete with id = '+req.params.id );
	Form.remove({_id: req.params.id}, function(err,doc) {
		//console.log(err);
		//console.log(doc);
   	Form.find( function (err, data) {
      	res.json(data);
   	});
	});
	//res('DELETE for Delete TODO');
});

 


app.listen(portNum);
console.log('server is listen on port ' + portNum);
console.log('Use browser to open http://<hostname>:'+portNum+'/public/');
console.log('For example, if your hostname is google.com than open  http://google.com:'+portNum+'/public/');



