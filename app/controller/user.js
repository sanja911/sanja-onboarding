const User = require('../models/User');
//const Project = require('../models/Project');
const Organization  = require('../models/Organization');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken')
module.exports = {
    create : async (req) =>{
        new Promise((resolve,reject)=>{
            bcrypt.hash(req.body.password,10, (err,hash)=>{ 
             if(err) reject(err);
             const { name,username,email } = req.body;
             User.create({ 
                 name,
                 username,
                 email,
                 password:hash
             },(err,res)=>{
                 if(err) reject(err)
                 resolve(res)
             });
            })
        })
        .then(res=>console.log('Data :',res))
        .catch(err=>console.log('Error !',err))
    },
    find : async (req, res) => {
        const { id }=req.params;
        const user = await User.findById(id)
        return res.send(user)
        
    },

    update : async (req,res,next)=>{
        const { id } = req.params;
        const { name,username,email,password }=req.body;
        new Promise((resolve)=>{
            User.findById(id).update({
                name,
                username,
                email,
                password 
            })
            resolve(res)
        })
       .then(res=>res.json({message:'Data Successful Updated'}))
       .catch(err=>console.log('Error ! :' ,err))
   
    },
    delete : async (req) => {
        const {id}=req.params;
       new Promise((resolve)=>{
            Organization.find({user_id:id}).deleteOne({
                user_id:id},(res)=>{                   
                       resolve(res);
                })
         })
        .then(res=>console.log('Data: ', res))
        .catch(err=>console.log('error :',err))
        .then(del=>User.findByIdAndDelete(id,()=>{
            return del;
        }))
}
}
