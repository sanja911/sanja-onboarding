var express = require('express');
var router=express.Router();
var mongoose = require('mongoose');

var Task = require('../models/Task.js');
 
//GET//
router.get('/', function(req, res, next){  
    Task.find(function(err, task){
        if(err) return next(err);
        res.json(Task);
    });
});
//POST//
router.post('/', function(req, res, next){  
    Task.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
//fungsi get /Taskect/id
router.get('/:id', function(req, res, next){  
    Task.findById(req.params.id, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi PUT /Task/id
router.put('/:id', function(req, res, next){  
    Task.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi DELETE /Task/id
router.delete('/:id', function(req, res, next){  
    Task.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
module.exports=router;
