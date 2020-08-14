const Project = require('../models/Project');
const Users = require('../models/User');
const { NotExtended } = require('http-errors');

//const post=new Post()
module.exports = {
    create : async (req, res) => {

        console.log(req.params);
       // user = req.params;
       // organization=req.params;
       // id = user.id;

        const { id,proj_name, description} = req.body;
        const post = await Project.create({
            proj_name,
            description,
            id,
        });
        await post.save();

        const userByUser= await Users.findById(id)
        userByUser.project.push(post);
        await userByUser.save();
        return res.send(userByUser); 
    },

    find : async (req, res) => {
        const {id}=req.params;
        const user = await Project.findById(id);
        return res.send(user)
    },
    update : async (req,res, next)=>{
        const { id } = req.params;
        const {proj_name,description}=req.body;
        Project.findById(id).update({
            proj_name,
            description,
            user:id,
        },(err)=>{
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        })
    },

    delete : async (req) => {
        const {id}=req.params;
       
        var deleteData= new Promise((resolve,reject)=>{
           Users.find({project:id}).updateOne({$pull:{project:id}},(err)=>{
                if(err) reject(err);
                Project.findByIdAndDelete(id,(err,res)=>{
                    if(err) reject(err);
                    resolve(res)
                });  
           });
        });
        deleteData
            .then(res=>console.log('Data :',res))
            .catch(err=>console.log('error',err))
        }
       }
            
     
    
