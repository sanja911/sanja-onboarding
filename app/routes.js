const express = require('express');
const router = new express.Router;
const User = require('./controller/owner/owner');
const Post = require('./controller/project/project');
const Inv = require('./controller/invitation/invitation');
const Task = require('./controller/task/task');
const Users = require('./controller/user/user');
router.get('/',(req,res)=>res.send('ok'));
// own routes
router.post('/owner/create/:id',User.create);
router.post('/owner/find',User.find);
router.post('/owner/find/post/:id', User.userByPost);
// project routes
router.post('/project/create/:id',Post.create);
router.post('/project/populate/:id',Post.update);
router.post('/project/find/',Post.find);
// inv routes
router.post('/invitation/create/:id', Inv.create);
router.post('/invitation/populate/:id',Inv.userByPost);
//task routes
router.post('/task/create/:id',Task.create);
router.post('/task/find',Task.find);
router.post('/task/populate/:id',Task.update);
//user routes
router.post('/user/create',Users.create);
router.post('/user/find',Users.find);
router.post('/user/populate/:id',Users.update);
module.exports = router;