var express = require('express');
var router=express.Router();
var mongoose = require('mongoose');

var Project = require('../models/Project.js');
 
//GET//
router.get('/', function(req, res, next){  
    Project.find(function(err, project){
        if(err) return next(err);
        res.json(Project);
    });
});
//POST//
router.post('/', function(req, res, next){  
    Project.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
//fungsi get /Projectect/id
router.get('/:id', function(req, res, next){  
    Project.findById(req.params.id, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi PUT /Project/id
router.put('/:id', function(req, res, next){  
    Project.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi DELETE /Project/id
router.delete('/:id', function(req, res, next){  
    Project.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
module.exports=router;
