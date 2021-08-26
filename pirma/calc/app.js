const http=require('http');

const server = http.createServer((req, res)=>{
const url = req.url;
const method = req.method;

if(url === '/result' && method === 'POST') console.log('Calculate');

res.setHeader('Content-Type','text/html');
res.write('<html>');
res.write('<head>');
res.write('<title>Calc</title>');
res.write('</head>');
res.write('<body>');
res.write('<form action="result" method="post">');
res.write('<input type="text" name="skaicius">');
res.write('<button type="submit">SQ</button>');

res.write('</form>');
res.write('</body>');
res.write('</html>');
res.end();
})

server.listen(8080,'localhost');