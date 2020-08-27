const Task = require('../models/Task');
const Project = require('../models/Project');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
       // project = req.params;
       // id = project.id;
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
        return res.json(userById);
    },
    find : async (req, res) => {
        const { id } = req.params;
        const task = await Task.findById(id)
        return res.json(task)
    },
    findAll: async(res) => {
        const task = await Task.find()
        return res.json(task) 
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { summary, description, createdBy,dueDate,status,assignee}=req.body;
       new Promise((resolve)=>{
        Task.findById(id).update({
            summary,
            description,
            createdBy,
            dueDate,
            status,
            assignee
       })
       resolve(res)
    })
       .then(res=>res.json({message:'Data Successful Updated'}))
       .catch(err=>console.log(err))
    
    },
    delete : async (req)=>{
        const{id}=req.params;
        new Promise((resolve)=>{
            Project.find({task:id}).updateOne({
                $pull:{task:id}},(res)=>{
                    resolve(res);
        })
       .then(res=>res.json({message:'Data Successful Deleted'}))
       .catch(err=>console.log('error ',err))
       .then(del=>Task.findByIdAndDelete(id,()=>{
        return del;
       }))
        })
    }
}