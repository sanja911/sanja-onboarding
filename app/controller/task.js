const Task = require('../models/Task');
const Project = require('../models/Project');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        const { projectId,summary, description, createdBy,dueDate,status,assignee} = req.body;
        const tasks = await Task.create({
            projectId,
            summary,
            description,
            createdBy,
            dueDate,
            status,
            assignee
        });
        const userById = await Project.findById(projectId);
        userById.task.push(tasks);
        await userById.save();
        return res.json(tasks);
    },
    find : async (req, res) => {
        const { id } = req.params;
        const task = await Task.findById(id)
        return res.json(task)
    },
    findAll: async(req,res) => {
        const task = await Task.find()
        return res.json(task) 
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { summary, description, createdBy,dueDate,status,assignee}=req.body;
        await Task.findOneAndUpdate({_id:id},{$set:req.body})
        const viewById = await Task.findById(id)
        return res.json(viewById)
    },
    delete : async (req,res)=>{
        const{id}=req.params;
        new Promise((resolve,reject)=>{
            Task.findByIdAndDelete(id,(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
       .then(del_proj=>Project.find({task:id}).updateOne({$pull:{task:id}},(err,next)=>{
           if(err) next(err)
           return del_proj
       }))
       .catch(err=>console.log('error ',err))
       .then((result)=>{
        return res.json({message:"Data "+id+" Successful Deleted"})
        })
        })
    }
}