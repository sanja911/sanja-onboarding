const User = require('../models/User');
//const Project = require('../models/Project');
const Organization  = require('../models/Organizaton');

module.exports = {
    create : async (req, res) =>{
        const { name,username,email,password } = req.body;
        const user = await User.create({
            name,
            username,
            email,
            password,
        });

        return res.send(user)
    },
    find : async (req, res) => {
        const { id }=req.params;
        const user = await User.findById(id)
        return res.send(user)
    },
    
    view : async (res,req) => {
        const {id}=req.params;
        const user = await User.findById(id) 
        return res.send(user)
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { name,username,email,password }=req.body;
        User.findById(id).update({
            name,
            username,
            email,
            password 
        },(err)=>{
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        });
   
    },
    delete : async (req) => {
        const {id}=req.params;
        var Delete = new Promise((resolve,reject)=>{
            Organization.find({user_id:id}).deleteOne({
                user_id:id},(err)=>{
                    if(err) reject(err);
                    User.findByIdAndDelete(id,(err,res)=>{
                        if(err) reject(err);
                        resolve(res);
                }) 
        })
    })
    Delete
        .then(res=>console.log('Data: ', res))
        .catch(err=>console.log('error :',err))
}
}
