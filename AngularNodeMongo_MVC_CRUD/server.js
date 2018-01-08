var express = require('express');
var app = express();
var portNum = 3000;
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

app.get('/api/form', function(req, res){
   //Form.findById('56a4281c1747bbea6c40212f', function (err, data) {
   Form.find( function (err, data) {
      res.json(data);
   });
});
app.listen(portNum);
console.log('server is listen on port ' + portNum);




