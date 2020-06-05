const hostname = '127.0.0.1';
const port = 3001;
const express = require('express')
const app = express()

app.param('string', function(req, res, next, value){
    let array = value.split(",");
    let valid = true;
    array.forEach((element, key) => {
        let antes = key===0 ? array[array.length-1] : array[key-1];
        let despues = key===array.length-1 ? array[0] : array[key+1];
        antes = antes[antes.length-1];
        despues = despues.substring(1, 0);
        if(!element.startsWith(antes) || !element.endsWith(despues))
            valid=false;
    });
	req.validacion = valid;
    next();
});

app.get('/circulo-de-palabras/:string', (req, res) => {
	res.writeHead(200,{'Content-Type': 'text/html'});
	res.write('<html>');
	res.write('<head>');
	res.write('<title>Circulo de Palabras</title>');
	res.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
	res.write('</head>');
	res.write('<body>');
	res.write(`Ciruclo: ${req.validacion}`);
	res.write('</br>');
	res.write(`${req.params['string']}`);
	res.write('</br>');
	res.write('</body>');
	res.write('</html>');
	res.end();
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});