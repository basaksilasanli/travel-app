const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');



const app = express();
app.use(cors());
// to use json
app.use(bodyParser.json());
// to use url encoded values
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'));

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

const trips = [];

/* Routes */

app.get('/', (req, res) => {
    res.status(200).send('./dist/index.html');
});

app.post('/save', (req, res, next) => {
    if (req.body !== " ") {
        const trip = req.body.trip;
        trips.push(trip);
        res.status(201).send(trip);
    } else {
        res.status(400).json('Bad Request');
    }
});

app.post('/forecast', async (req, res, next) => {
    if (req.body.endpoint !== " ") {
        const endpoint = req.body.endpoint;
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(201).send(jsonRes);
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(400).json('Bad Request');
    }
});

