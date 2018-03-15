let express = require('express');
let fs = require('fs');
let request = require('request');
let axios = require('axios');
let app = express();

app.set('port', 3000);

app.get('/', function (req, res) {
    request('http://labs.bible.org/api/?passage=random', function (err, response, body) {
        fs.readFile('./index.html', 'utf8', function(err, data){
            if(err) throw err;

            const document = data.replace(/<div id="data"><\/div>/, `<div id="data">${body}</div>`)
            res.send(document)
        });
    });
});

app.get('/json', function (req, res){
    fs.readFile('./index1.html', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(data);
    });

    // axios
    //     .get('http://labs.bible.org/api/?passage=random&type=json',
    //         {
    //             headers: {'Conetent-Type': 'application/json'}
    //         })
    //     .then(function(response){
    //         res.write(JSON.stringify(response.data));
    //         res.end();
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
});

app.listen(3000);

console.log("Running at port 3000");

