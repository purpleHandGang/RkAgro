var app=require("express")();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/artsdb');
var artSchema=new mongoose.Schema({
									name : String,
									url  : String,										
									des  : String
								  });
var art = mongoose.model("art",artSchema);

app.get("/" , function(req,res){
	res.render("LandingPage.ejs");
});

app.get("/artspage",function(req,res){
	art.find({},function(err,value){
									if (err)
										console.log(err);
									else
										res.render("art.ejs",{data:value});
									});
});

app.get("/insertpage",function(req,res){
	res.render("InsertPage.ejs");
});

app.post("/insertimage",function(req,res){
var myurl=req.body.imagelink;
var myname=req.body.logo;
var mydes=req.body.description;
var newdata=new art({
						name : myname,
						url  : myurl,
						des  : mydes
					});
newdata.save(function(err,value){
									if (err)
										console.log(err);
									else
										{
											art.find({},function(err,value){
									if (err)
										console.log(err);
									else
										res.render("art.ejs",{data:value});
									});
										}	
								});

});
app.listen(4040,function(){
	console.log("Server Started");
});