var http = require('http')
var fs = require('fs')
var url = require('url')
const { stringify } = require('querystring')
var port = process.argv[2]

if (!port) {
    console.log('请输入指定端口。如：\nnode server.js 8888')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** main start ************/

    console.log('有小可爱访问服务器。路径（带查询参数）为：' + pathWithQuery)

    if (path === '/') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`您好呀`)
        response.end()
    } else if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('index.html').toString()
        const page1 = fs.readFileSync('../db/page1.json').toString()
        const array = JSON.parse(page1)
        const result= array.map(item=>`<li>${item.id}</li>`).join('')
        string= string.replace('{{page1}}',`<ul id='xxx'>${result}</ul>`)
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync(`main.js`))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('style.css'))
        response.end()
    } else if (path==='/2.js'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('2.js'))
        response.end()
    } else if (path==='/3.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('3.html'))
        response.end()
    }else if (path==='/4.xml'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('4.xml'))
        response.end()
    }else if(path==='/5.json'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('5.json'))
        response.end()
    }else if(path==='/page2.json'){
        console.log(111);
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('../db/page2.json'))
        response.end()
    }else if(path==='/page3.json'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.write(fs.readFileSync('../db/page3.json'))
        response.end()
    }else{
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径有错误哦~`)
        response.end()
    }

    /******** main end ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功！请输入下列地址访问\nhttp://localhost:' + port)