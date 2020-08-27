const express = require('express');
const app = express();
var path=require('path');
const router = new express.Router;
//const seneca = require('seneca')()
const Organization = require('./controller/organization');
const Project = require('./controller/project');
const Invitation = require('./controller/invitation');
const Task = require('./controller/task');
const Users = require('./controller/user');
// own routes
router.post('/organization/',Organization.create);
router.get('/organization/:id',Organization.find);
router.get('/organization/',Organization.findAll);
router.put('/organization/:id',Organization.update);
router.delete('/organization/:id',Organization.delete);
// project routes
router.post('/project/',Project.create);
router.put('/project/:id',Project.update);
router.get('/project/:id' ,Project.find);
router.get('/project/',Project.findAll);
router.delete('/project/:id', Project.delete);
// inv routes
router.post('/invitation/', Invitation.create);
router.get('/invitation/',Invitation.find);
//task routes 
router.post('/task/',Task.create); 
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