const User = require('../../models/User');
const Proj = require('../../models/Project');
const Org  = require('../../models/Organizaton');

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

    postsByUser : async (req, res) => {
       const { id } = req.params;
       const proj = await User.findById(id).populate('project');
       const { id1 }=req.params;
       const  user = await User.findById(id1).populate('organization'); 
       res.send(proj.project);
       res.send(user.organization);

    },
    find : async (req, res) => {
        const { id }=req.params;
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
        },function(err,post){
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        });
   
    },
    delete : async (req, res, next) => {
        const {id}=req.params;
        Org.find({user_id:id}).deleteOne({
            user_id:id}
         ,function(err){
            if(err){
                res.send(err)
            }else{
                User.findByIdAndDelete(id ,function(err){
                    if(err){
                        res.send(err)
                    }else{
                       Proj.find({user:id}).deleteOne({
                           user:id
                       },function (err,result){
                           if(err){
                               res.send(err)
                           }else{
                               res.send(result)
                           }

                       })
                    }
                })
            }
        } )
    }
    }  
