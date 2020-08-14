const Task = require('../models/Task');
const Project = require('../models/Project');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
       // project = req.params;
       // id = project.id;
        const { id,summary, description, created_by,due_date,status,assignee} = req.body;
        const post = await Task.create({
            id,
            summary,
            description,
            created_by,
            due_date,
            status,
            assignee
        });
        await post.save();

        const userById = await Project.findById(id);

        userById.task.push(post);
        await userById.save();

        return res.send(userById);
    },
    find : async (req, res) => {
        const { id } = req.params;
        const user = await Task.findById(id)
        return res.send(user)
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { summary, description, created_by,due_date,status,assignee}=req.body;
       Task.findById(id).update({
            project:id,
            summary,
            description,
            created_by,
            due_date,
            status,
            assignee
        },(err)=>{
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        })
    },
    delete : async (req,res)=>{
        const{id}=req.params;
        var Del= new Promise((resolve,reject)=>{
            Project.find({task:id}).updateOne({
                $pull:{task:id}},(err)=>{
                    if(err) reject(err);
                    Task.findByIdAndDelete(id,(err,res)=>{
                        if(err) reject(err);
                        resolve(res);
                });
        })
    });
    Del
    .then(res=>console.log('Data :',res))
    .catch(err=>console.log('Error! ',err))
      
    }
}