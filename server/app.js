const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require('dotenv/config');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccess: 200
}

app.use(cors(corsOptions));
app.use('/', router);

mongoose.connect(process.env.DB_URI)
.then(() => console.log('DB Connected!'))
.catch(err => console.log(err))

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log('Server is running on', port);
})