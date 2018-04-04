let express = require('express');
let fs = require('fs');
let axios = require('axios');
let app = express();
let redis = require('redis');

let client = redis.createClient();
client.on('error', function(err){
    console.log('Something went wrong ', err)
});

client.set('my test key', 'my test value', redis.print);
client.get('my test key', function(error, result) {
    if (error) throw error;
    console.log('GET result ->', result)
});

app.use(express.static('static'));
app.use(express.static('dist'));


app.get('/get', function (req, res) {
    
});


app.get('/data', function (req, res) {
    axios.get('http://labs.bible.org/api/?passage=random&formatting=plain&type=json')
        .then(function(resp) {
            let result = resp.data[0];
            res.send(result)
        }).catch(function(err) {
            res.send(err)
        }
    );
});

app.get('/', function (req, res){
    fs.readFile('./index.html', 'utf8', function(err, data){
        if (err) throw err;
        res.send(data);
    });

});


app.listen(3000);

console.log("Running at port 3000");
