'use strict';

const express = require('express');
const http = require('http');
const cors = require('cors');
const port = 1337;
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(cors({ origin: '127.0.0.1' }));
app.use(cors());
app.use('/', express.static(__dirname));

app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});

const server = http.createServer(app);

server.listen(port, () => console.log(`Server started on port localhost:${port}`));
// Other vices alloy , echo , fable , onyx , nova , and shimmer