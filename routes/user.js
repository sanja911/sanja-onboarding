var express = require('express');
var router=express.Router();
var mongoose = require('mongoose');

var User = require('../models/User.js');
 
//GET//
router.get('/', function(req, res, next){  
    User.find(function(err, user){
        if(err) return next(err);
        res.json(User);
    });
});
//POST//
router.post('/', function(req, res, next){  
    User.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
//fungsi get /Userect/id
router.get('/:id', function(req, res, next){  
    User.findById(req.params.id, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi PUT /User/id
router.put('/:id', function(req, res, next){  
    User.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi DELETE /User/id
router.delete('/:id', function(req, res, next){  
    User.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
module.exports=router;
