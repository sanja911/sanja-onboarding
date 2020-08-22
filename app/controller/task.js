const Task = require('../models/Task');
const Project = require('../models/Project');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
       // project = req.params;
       // id = project.id;
        const { id,summary, description, createdBy,dueDate,status,assignee} = req.body;
        const tasks = await Task.create({
            id,
            summary,
            description,
            createdBy,
            dueDate,
            status,
            assignee
        });
        const userById = await Project.findById(id);
        userById.task.push(tasks);
        await userById.save();
        return res.send(userById);
    },
    find : async (req, res) => {
        const { id } = req.params;
        const task = await Task.findById(id)
        return res.send(task)
    },
    findAll: async(res) => {
        const task = await Task.find()
        return res.send(task) 
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { summary, description, createdBy,dueDate,status,assignee}=req.body;
       Task.findById(id).update({
            project:id,
            summary,
            description,
            createdBy,
            dueDate,
            status,
            assignee
        },(err)=>{
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        })
    },
    delete : async (req)=>{
        const{id}=req.params;
        new Promise((resolve)=>{
            Project.find({task:id}).updateOne({
                $pull:{task:id}},(res)=>{
                    resolve(res);
        })
       .then(res=>console.log('Data :', res))
       .catch(err=>console.log('error ',err))
       .then(del=>Task.findByIdAndDelete(id,()=>{
        return del;
       }))
        })
    }
}