const Task = require('../models/Task');
const Project = require('../models/Project');
const Organization = require('../models/Organization');

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
        await Task.findById(id).updateOne({
            summary,
            description,
            createdBy,
            dueDate,
            status,
            assignee
       })
      const viewById = await Task.findById(id)
      return res.json(viewById)
    },
    delete : async (req,res)=>{
        const{id}=req.params;
        new Promise((resolve)=>{
            Project.find({task:id}).updateOne({
                $pull:{task:id}},(res)=>{
                    resolve(res);
        })
       .then((result)=>{
           return res.json(result)
       })
       .catch(err=>console.log('error ',err))
       .then(del=>Task.findByIdAndDelete(id,()=>{
        return del;
       }))
        })
    }
}