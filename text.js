var express = require('express');
var app=express();
app.set('port',80);
app.set('view engine', 'html');//默认使用模板

//app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));//设置静态文件 请求加载位置
app.set('view engine','html');
app.set('view',__dirname+'./view')
app.get('/',function(req,res){
	res.sendfile('./view/wap_h5.html');
});
app.listen(app.get('port'));
console.log('This server start...');
