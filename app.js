var express=require('express');
var app=express();
app.use(express.static('public'));
var http=require('http').Server(app);
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});
var fs=require('fs');
var datebase={};
fs.readdir('./public/images',function(err,files){
	for(var i=0;i<files.length;i++){
		fs.stat('./public/images/'+files[i],(function(i){
			return  function(err,stats){
			var mtime=stats.mtime;
			console.log(mtime);
			var key=mtime.getFullYear()+'-'+mtime.getMonth()+'-'+mtime.getDate();
             if(!datebase[key]){
             	datebase[key]=[];
             }
            datebase[key].push(files[i]);
            console.log(datebase);
		}
	})(i));
	}
})
app.get('/rili',function(req,res){
	// var datebase={
	//  '2015-10-27':['16.jpg','17.jpg','18.jpg'],	
 //     '2015-10-26':['1.jpg','2.jpg','3.jpg'],
 //     '2015-10-25':['4.jpg','5.jpg','6.jpg'],
 //     '2015-10-24':['7.jpg','8.jpg','9.jpg'],
 //     '2015-10-23':['10.jpg','11.jpg','12.jpg'],
 //     '2015-10-22':['13.jpg','14.jpg','15.jpg']
	// }
	if(datebase[req.query.timea]){
		res.json(datebase[req.query.timea]);
	}else{
		res.send('');
	}
});

http.listen(3000,function(){
	console.log('listening on *:3000');
});
//json->{} [] {[]} [{}]
//send ->14 '我是'