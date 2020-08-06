var express=require('express');
var router=express.Router();
var mongoose = require('mongoose');
var Seneca = require('seneca');
var Owner = require('../models/Owner.js');
 
//GET//
router.get('/', function(req, res, next){  
    Owner.find(function(err, owner){
        if(err) return next(err);
        res.json(owner);
    });
});
router.get('/user', function(req, res, next){  
    Owner.find(function(err, owner){
        if(err) return next(err);
        res.json(owner);
    });
});
//POST//
router.post('/', function(req, res, next){  
    Owner.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
//fungsi get /Owner/id
router.get('/:id', function(req, res, next){  
    Owner.findById(req.params.id, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});

//fungsi PUT /Owner/id
router.put('/:id', function(req, res, next){  
    Owner.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
//fungsi DELETE /Owner/id
router.delete('/:id', function(req, res, next){  
    Owner.findByIdAndRemove(req.params.id, req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    });
});
module.exports=router;
