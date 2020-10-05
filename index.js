const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const config = require('./config');
// middlewares
app.set('secretKey','nodeRestApi')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/EO',
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
function validateUser(req, res, next) {
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      req.body.userId = decoded.id;
      next();
    }
  });
}
  
// routes
//app.use('/user',validateUser,users)
app.use(require('./app/routes'));
app.set('view engine','ejs');
app.use(express.static('public'));
/*app.get("/",function(req,res){
    res.render("pages/index");
});*/                                                                                                                                                        
app.listen(3000, () => console.log('server on!'));

