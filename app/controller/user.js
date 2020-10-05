const User = require('../models/User');
const Project = require('../models/Project');
const Organization = require('../models/Organization');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const auth = require('../middleware/auth');
const jwtdecode = require('jwt-decode');
module.exports = {
    create : async (req,res) =>{
             const hash =  bcrypt.hashSync(req.body.password, 10);
             const { name,username,email } = req.body;
             const user = await User.create({ 
                 name,
                 username,
                 email,
                 password:hash
        })
             return res.status(200).json(user)
     },
    signin : async(req,res,next)=>{
      User.findOne({email:req.body.email}, function(err, userInfo){
          if (err) next(err);
          if(bcrypt.compareSync(req.body.password, userInfo.password)) {
             const token = jwt.sign({id: userInfo._id,orgId: userInfo.orgId}, config.JWT_SECRET, { expiresIn: '2h' });             
             res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});  
            }else{
              res.status(401).json({status:"error", message: "Invalid email/password!!!", data:null});
            }
          }
        );
    },
    find : async (req, res,next) => {
        const { id }=req.params;
        const find = await User.findById(id)
        res.status(200).json({
            success: true,
            message: "User found",
            result: find
        });
    },
    update : async (req,res)=>{
        const { id } = req.params;
        const { name,username,email,password }=req.body;
        const update = await User.findById({_id:id}).update({$set:req.body})
        const viewById = await User.findById(id)
        res.status(200).json({
            success: true,
            message: "User Updated",
            result: viewById
        })
    },
    delete : async (req,res) => {
    const {id}=req.params;
     // const org=await Organization.findOne({"users.userId" :id})
       new Promise((resolve,reject)=>{
            User.findByIdAndDelete(id,(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        .then(proj_del=>Project.find({users:{userId:id}}).update({$pull:{users:{userId:id}}},(err,next)=>{
          if(err) next(err)
          return proj_del
        }))
        .then(org_del=>Organization.find({"users.userId":id}).update({$pull:{users:{userId:id}}},(err,next)=>{
          if(err) next(err)
          return org_del
      }))
        .catch(err=>console.log('error :',err))
        .then((result)=>{

        res.json({message:"Data "+id+" Successful Deleted"})
       })
       //return res.json(org)
       })
     }
 }
