const express = require("express");
const app = express();
//var path=require('path');
const router = new express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config");
//const seneca = require('seneca')()
const Organization = require("./controller/organization");
const Project = require("./controller/project");
// const Invitation = require('./controller/invitation');
const Task = require("./controller/task");
const Users = require("./controller/user");
const auth = require("./middleware/auth");

// own routes
router.post("/organization/", auth.isAuthenticated, Organization.create);
router.get("/organization/:id", auth.isAuthenticated, Organization.find);
router.get("/organization/", auth.isAuthenticated, Organization.findAll);
router.put("/organization/:id", auth.isAuthenticated, Organization.update);
router.delete("/organization/:id", auth.isAuthenticated, Organization.delete);
// project routes
router.post("/project/", auth.isAuthenticated, Project.create);
router.put("/project/:id", auth.isAuthenticated, Project.update);
router.get("/project/:id", auth.isAuthenticated, Project.find);
router.post("/project/:id", Project.findAll);
router.delete("/project/:id", auth.isAuthenticated, Project.delete);
// inv routes
/*router.post('/invitation/', Invitation.create);
router.get('/invitation/',Invitation.find);*/
//task routes
router.post("/task/", auth.isAuthenticated, Task.create);
router.get("/task/:id", auth.isAuthenticated, Task.find);
router.get("/task/", auth.isAuthenticated, Task.findAll);
router.put("/task/:id", auth.isAuthenticated, Task.update);
router.delete("/task/:id", auth.isAuthenticated, Task.delete);
//user routes
router.post("/user/", Users.create);
router.post("/user/signin", Users.signin);
router.get("/user/list", auth.isAuthenticated, Users.myList);
router.get("/user/managed", auth.isAuthenticated, Users.myManaged);
router.get("/user/:id", auth.isAuthenticated, Users.find);
router.put("/user/", auth.isAuthenticated, Users.update);
router.delete("/user/", auth.isAuthenticated, Users.delete);

module.exports = router;
