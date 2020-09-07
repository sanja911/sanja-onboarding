const User = require('../models/User');
//const Project = require('../models/Project');
const Organization  = require('../models/Organization');
const Project = require('../models/Project');

module.exports = {
    create : async (req,res) =>{
             const { name,username,email,password } = req.body;
             const user = await User.create({ 
                 name,
                 username,
                 email,
                 password
             })
            return res.json(user);
    },
    find : async (req, res) => {
        const { id }=req.params;
        const user = await User.findById(id)
        return res.json(user)
        
    },

    update : async (req,res)=>{
        const { id } = req.params;
        const { name,username,email,password }=req.body;
        await User.findOneAndUpdate({_id:id},{$set:req.body})
        const viewById = await User.findById(id)
        return res.json(viewById)
    },


    delete : async (req,res) => {
        const {id}=req.params;
         
          new Promise((resolve,reject)=>{
              User.findByIdAndDelete(id,(err,res)=>{
                  if(err) reject(err)
                  resolve(res)
              })
        
          .then(org_del=>Organization.find({users:{userId:id}}).deleteMany({users:{userId:id}},(err,next)=>{
              if(err) next(err)
              return org_del
          }))
          .then(proj_del=>Project.find({users:{userId:id}}).deleteMany({users:{userId:id}},(err,next)=>{
            if(err) next(err)
            return proj_del
          }))
          .catch(err=>console.log('error :',err))
          .then((result)=>{
             res.json({message:"Data "+id+" Successful Deleted"})
         })
         })          
 }
 }
 