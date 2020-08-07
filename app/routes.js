const express = require('express');
const router = new express.Router;
const User = require('./controller/owner/owner');
const Post = require('./controller/project/project');
const Inv = require('./controller/invitation/invitation');
router.get('/',(req,res)=>res.send('ok'));
// own routes
router.post('/owner/create',User.create);
router.post('/owner/find',User.find);
router.post('/owner/find/post/:id', User.postsByUser);
// project routes
router.post('/project/create/:id', Post.create);
router.post('/project/populate/:id',Post.userByPost);
// inv routes
router.post('/invitation/create/:id', Inv.create);
router.post('/invitation/populate/:id',Inv.userByPost);

module.exports = router;