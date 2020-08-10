const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/EO',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

// routes
app.use(require('./app/routes'));
app.set('view engine','ejs');
                                                                                                                                                        
app.listen(3000, () => console.log('server on!'));

