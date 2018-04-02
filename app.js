let express = require('express');
let fs = require('fs');
let axios = require('axios');
let app = express();

app.use(express.static('static'));
app.use(express.static('dist'));

app.get('/data', function (req, res) {
    axios.get('http://labs.bible.org/api/?passage=random&formatting=plain')
        .then(function(resp) {
            res.send(resp.data)
        }).catch(function(err) {
            res.send()
        }
    );
});

app.get('/verse', function (req, res){
    fs.readFile('./index.html', 'utf8', function(err, data){
        if (err) throw err;
        res.send(data);
    });

});

app.listen(3000);

console.log("Running at port 3000");
