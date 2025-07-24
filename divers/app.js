const http = require('http')

// http.createServer((req,res)=>{
//    res.writeHead(200,{'content-type':'text/plain'}) 
//    res.end("Hello word !")

//     console.log("Req :"+ req.url);

//     console.log("Res :"+ res.req);
    
    


// }).listen(5000);


http.createServer((req,res)=>{
    console.log("Methode Request : "+ req.method +" URL: "+req.url);

    if (req.url=="/") {
        res.writeHead(200,{'content-type':'text/html'});
        res.end("<h1>Acceuil</h1>");
    }

    if (req.url=="/about") {
        res.writeHead(200,{'content-type':'text/html'})
        res.end("<h1>About </h1>")
    }

    if (res.url=="/admin") {
        res.writeHead(404,{'content-type':'text/html'})
        res.end("not found")
    }
    
}).listen(5000);