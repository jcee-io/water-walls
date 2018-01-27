const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('client'));

app.get('/api/:walls', (req,res) => {

});

app.get('*', (req,res) => {
	res.redirect('/');
});

app.listen(process.env.PORT || 3000);