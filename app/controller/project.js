const Project = require('../models/Project');
const Users = require('../models/User');
const { NotExtended } = require('http-errors');

//const post=new Post()
module.exports = {
    create : async (req, res) => {

        console.log(req.params);
    

        const { userid,projName, description,role} = req.body;
        const projects = await Project.create({
            projName,
            role,
            description,
            userid,
        });
       // await post.save();
        const userByUser= await Users.findById(userid)
        userByUser.project.push(projects);
        await userByUser.save();
        return res.json(userByUser); 
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
    update : async (req,res, next)=>{
        const { id } = req.params;
        const {projName,description}=req.body;
        new Promise ((resolve)=>{
            Project.findById(id).update({
                projName,
                description
            })
            resolve(res)
        })
        .then(res=>res.json({message:'Data Successful Updated'}))
        .catch(err=>console.log(err))
    },

    delete : async (req) => {
       const {id}=req.params;
       new Promise((resolve)=>{
           Users.find({project:id}).updateOne({$pull:{project:id}},(res)=>{
                    resolve(res)
                })
           })
          .then(res=>res.json({message: 'Data Successful Deleted '}))
          .catch(err=>console.log('error',err))
          .then(del=>Project.findByIdAndDelete(id,()=>{
              return del;
          }))
        }
       }
            
     
    
