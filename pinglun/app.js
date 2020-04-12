
var fs = require('fs')
var http = require('http')
var url = require('url')

var template = require('art-template')

var comments = [
    {name:'张三',message:'我先试大大试看哈哈哈1',dataTime:'2020-05-01'},
    {name:'李四',message:'我先试试看2',dataTime:'2020-05-01'},
    {name:'王五',message:'我先试试看3',dataTime:'2020-05-01'},
]

http.createServer(function (request, response) {

    // var url = request.url;
    // console.log(url);
    // url.parse(请求路径，true)
    // true：将我们的query字符串转换成对象
    var pathnameObj = url.parse(request.url,true)
    var pathname = pathnameObj.pathname;
    // console.log(pathname)
    if (pathname === '/') {
        fs.readFile('./views/index.html', function (err, data) {
            if (err) { return response.end('404') }
           var htmlStr =  template.render(data.toString(),{
                comments:comments
            })
            response.end(htmlStr)
        })
    } else if (pathname === '/post') {
        fs.readFile('./views/post.html', function (err, data) {
            if (err) { return response.end('404') }
            response.end(data)
        })
        // indexOf 判断字符串中public是否存在
    }else if(pathname.indexOf('/public/') === 0){
        // 这是我的约定 就是我自己认为的
        // 约定:只要包含public 那就认为是要访问我的静态资源 也就是我的css js
        // localhost://3500/public/css 只要下面包含public就意味着访问的是静态资源 就是link的bootstrap地址\
        fs.readFile('.'+pathname,function(err,data){
            if (err) { return response.end('404') }
            response.end(data)
        })
    } else if (pathname === '/pinglun2') {
        var con = pathnameObj.query;
        comments.unshift(con);
        console.log(comments)
        // 根据状态码判断是否需要重定向，statusCode = 302  如果点击提交，则需要重定向到/也就是我们的根目录
        response.statusCode = 302;  //响应的结果是302 临时重定向
        // 301 是永久重定向
        // 点击提交之后就回到首页 '/' 
        response.setHeader('Location','/');
        response.end()
    }else{
        fs.readFile('./views/404.html',function(err,data){
            response.end(data)
        })
    }
}).listen(3500, function () {
    console.log('server is running....')
})


