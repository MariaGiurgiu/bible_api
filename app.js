let express = require('express');
let app = express();

let fs = require('fs');
let request = require('request');

app.set('port', 3000);

app.get('/', function (req, res) {
    // request({
    //     uri: 'http://labs.bible.org/api/?passage=random'
    // }).pipe(res)
    request('http://labs.bible.org/api/?passage=random', function (err, response, body) {
        fs.readFile('./index.html', 'utf8', function(err, data){
            if(err) throw err;

            const document = data.replace(/<div id="data"><\/div>/, `<div id="data">${body}</div>`)
            res.send(document)
        });
    });


});

app.listen(3000);

console.log("Running at port 3000");

