const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const helmet = require('helmet');
const morgan = require('morgan');

app.use(helmet());
app.use(morgan('common'));
require('./config/mongoose')(app);

require('./src/routerHandle')(app);

const PORT = process.env.PORT || 3000;

app.use('/', (req, res) => {
    res.send('hello quang trieu')
})

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})

