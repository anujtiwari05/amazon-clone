var express=require('express');
var app = express();


app.get('/',function(req,res){
  res.json('Hello Anuj');
});


app.listen(3000,function(err){
  if(err) throw err;

  console.log('Server is Running');

});
