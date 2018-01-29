const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const waterWalls = require('../waterWalls');
const waterWallsIndex = require('../waterWallsIndex');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/api', async (req,res) => {
	let query = Object.keys(req.query).map(key => Number(req.query[key]));
	// we're making this so that we can access this endpoint only through the js file and not browser
	if(query.length === 0) {
		res.redirect('/');
	}

	let map = waterWalls(query);
	let { indexes } = waterWallsIndex(query);
  res.json({ map, indexes })
});

app.get('*', (req,res) => {
	res.redirect('/');
});

app.listen(process.env.PORT || 3000);