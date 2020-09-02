const User = require('../models/User');
//const Project = require('../models/Project');
const Organization  = require('../models/Organization');

module.exports = {
    create : async (req,res) =>{
        new Promise((resolve,reject)=>{
             const { name,username,email,password } = req.body;
             User.create({ 
                 name,
                 username,
                 email,
                 password
             },(err,res)=>{
                 if(err) reject(err)
                 resolve(res)
             });
            })
        .then((result)=>{
            return res.json(result)
        })
        .catch(err=>console.log('Error !',err))
    },
    find : async (req, res) => {
        const { id }=req.params;
        const user = await User.findById(id)
        return res.json(user)
        
    },

    update : async (req,res)=>{
        const { id } = req.params;
        const { name,username,email,password }=req.body;
        await User.findById(id).updateOne({
                name,
                username, 
                email,
                password
        })
        const viewById = await User.findById(id)
        return res.json(viewById)
    },

    delete : async (req) => {
       const {id}=req.params;
       new Promise((resolve)=>{
            Organization.find({user_id:id}).deleteOne({
                user_id:id},(res)=>{                   
                       resolve(res);
                })
         })
        .then((result)=>{
            return res.json(result)
        })
        .catch(err=>console.log('error :',err))
        .then(del=>User.findByIdAndDelete(id,()=>{ 
            return del;
        }))
}
}
