//console.log("starta server...");

var fs = require('fs');
var data = fs.readFileSync('words.json');
var wordz = JSON.parse(data);

//console.log(wordz);
var express = require('express');
var app = express();

var server = app.listen(3000,listening);

function listening() {
    console.log("hlustandi...");
}

app.use(express.static('files'));

app.get('/add/:word/:score?', addWord);

function addWord(req, res) {
    var data = req.params;
    var word = data.word;
    var score = Number(data.score);
    var reply;
    if (!score) {
        reply = {
            msg: "okkur vantar score!"
        }
    } else {
        wordz[word] = score;
        var data = JSON.stringify(wordz, null, 2); 
        fs.writeFile('words.json', data, finished);
            function finished(err){
                console.log('yamm yamm set!');
            }

        reply = {
            msg: "Takkar takk!!"
         } 
    }

    res.send(reply);
}

app.get('/all', sendWordz);

function sendWordz(req, res) {
    res.send(wordz);
}

app.get('/search/:word/', searchWord);

function searchWord(req, res) {
    var word = req.params.word;
    var reply;
    if(wordz[word]) {
    reply = {
        status: "found",
        word: word,
        score: wordz[word]
    }
    } else {
        reply = {
            status: "not found",
            word: word
        }
    }
    
        res.send(reply);
    }


