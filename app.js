let express = require('express');
let fs = require('fs');
let axios = require('axios');
let request = require('request');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let striptags = require('striptags');
let app = express();

let btnCmpnt = require('./ButtonComponent.js');

app.set('port', 3000);

app.get('/', function (req, res) {
    request('http://labs.bible.org/api/?passage=random', function (err, response, body) {
        fs.readFile('./index1.html', 'utf8', function(err, data){
            if(err) throw err;

            const document = data.replace(/<div id="data"><\/div>/, `<div id="data">${body}</div>`)
            res.send(document)
        });
    });
});

app.get('/json', function (req, res){
    fs.readFile('./index2.html', 'utf8', function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

app.get('/react', function (req, res){
    axios
        .get('http://labs.bible.org/api/?passage=random&formatting=plain')
        .then(function (response) {

            let button = React.createElement(btnCmpnt.button, {verse: response.data});
            let html = ReactDOMServer.renderToString(button);
            fs.readFile('./index3.html', 'utf8', function(err, data){
               if (err) throw err;

               const document = data.replace(/<div id="content"><\/div>/, `<div id="content">${html}</div>`);
               res.send(document);
            });
        })
        .catch(error => {
            console.log(error)
        })
});

app.listen(3000);

console.log("Running at port 3000");

