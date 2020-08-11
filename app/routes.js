const express = require('express');
const app = express();
var path=require('path');
const hbs=require('hbs');
const router = new express.Router;
const User = require('./controller/organization/organization');
const Post = require('./controller/project/project');
const Inv = require('./controller/invitation/invitation');
const Task = require('./controller/task/task');
const Users = require('./controller/user/user');
var methodOverride = require('method-override');
app.set('view engine','hbs');
app.use(express.static('public'));
app.set('views' ,path.join(__dirname,'views'));
app.use(methodOverride());
// own routes
router.post('/organization/create/:id',User.create);
router.post('/organization/find/:id',User.find);
router.post('/organization/update/:id', User.update);
// project routes
router.post('/project/create/:id',Post.create);
router.post('/project/populate/:id',Post.update);
router.post('/project/find/:id',Post.find);
//router.post('/project/delete/:id', Post.delete);
// inv routes
router.post('/invitation/create/:id', Inv.create);
router.post('/invitation/populate/:id',Inv.userByPost);
//task routes
router.post('/task/create/:id',Task.create);
router.post('/task/find/:id',Task.find);
router.post('/task/populate/:id',Task.update);
//user routes
router.post('/user/create',Users.create);
router.post('/user/find/:id',Users.find);
router.post('/user/populate/:id',Users.update);
//Views
app.get("/",function(request,resolve){
    resolve.render("index")
}),
module.exports = router;