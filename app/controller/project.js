const Project = require('../models/Project');
const Users = require('../models/User');
const { NotExtended } = require('http-errors');

//const post=new Post()
module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        const {projName, description,userId} = req.body;
        const users = {'role':req.body.role, 'userId':req.body.userId}
        const projects = await Project.create({
            projName,
            description,
            users
        });
        const userByUser= await Users.findById(userId)
        userByUser.project.push(projects);
        await userByUser.save();
        return res.json(projects); 
    },

    find : async (req, res) => {
        const {id}=req.params;
        const user = await Project.findById(id);
        return res.json(user)
    },
    findAll : async(req,res)=>{
        const finds = await Project.find();
        return res.json(finds);
    },
    update : async (req,res)=>{
        const { id } = req.params;
        const {projName,description}=req.body;
        const users = {'role':req.body.role, 'userId':req.body.userId}
        await Project.findOneAndUpdate({_id:id},{$set:req.body,users})
        const viewById = await Project.findById(id)
        return res.json(viewById);
    },

    delete : async (req,res) => {
            const {id}=req.params;
            new Promise((resolve,reject)=>{
                Project.findOneAndDelete({_id:id},(err,res)=>{
                    if(err) reject(err)
                    resolve(res)
                })
               .then(del=>Users.find({project:id}).updateOne({$pull:{project:id}},(err,next)=>{
                   if(err) next(err)
                   return del
               }))
               .catch(err=>console.log('error',err))
               .then((result)=>{
                   return res.json({message:"Data "+id+ " Successful Deleted"})
               })
            })
        }

}
