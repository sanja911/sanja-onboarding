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
app.set('view engine','hbs');
app.use(express.static('public'));
app.set('views' ,path.join(__dirname,'views'));
// own routes
router.post('/organization/create/:id',User.create);
router.post('/organization/find/:id',User.find);
router.get('/organization/update/:id', User.update);
router.get('/organization/delete/:id',User.delete);
// project routes
router.get('/project/create/:id',Post.create);
router.get('/project/update/:id',Post.update);
router.get('/project/find/:id' ,Post.find);
router.get('/project/delete/:id', Post.delete);
// inv routes
router.post('/invitation/create/:id', Inv.create);
//router.post('/invitation/populate/:id',Inv.userByPost);
//task routes
router.post('/task/create/:id',Task.create); 
router.post('/task/find/:id',Task.find);
router.post('/task/edit/:id',Task.update);
router.get('/task/delete/:id',Task.delete);
//user routes
router.post('/user/create',Users.create);
router.get('/user/find/:id',Users.find);
router.get('/user/edit/:id',Users.update);
router.get('/user/delete/:id',Users.delete);
//Views
app.get("/",function(request,resolve){
    resolve.render("index")
}),
module.exports = router;