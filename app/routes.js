const express = require('express');
const app = express();
var path=require('path');
const router = new express.Router;
const Organization = require('./controller/organization');
const Project = require('./controller/project');
const Invitation = require('./controller/invitation');
const Task = require('./controller/task');
const Users = require('./controller/user');


// own routes
router.post('/organization/:id',Organization.create);
router.get('/organization/:id',Organization.find);
router.put('/organization/:id',Organization.update);
router.delete('/organization/:id',Organization.delete);
// project routes
router.post('/project/:id',Project.create);
router.put('/project/:id',Project.update);
router.get('/project/:id' ,Project.find);
router.delete('/project/:id', Project.delete);
// inv routes
router.post('/invitation/:id', Invitation.create);
//router.post('/invitation/populate/:id',Inv.userByPost);
//task routes 
router.post('/task/:id',Task.create); 
router.get('/task/:id',Task.find);
router.put('/task/:id',Task.update); 
router.delete('/task/:id',Task.delete);
//user routes
router.post('/user/',Users.create);
router.get('/user/:id',Users.find);
router.put('/user/:id',Users.update);
router.delete('/user/:id',Users.delete);
//Views
module.exports = router;