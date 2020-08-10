const Task = require('../../models/Task');
const Project = require('../../models/Project');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        project = req.params;
        id = project.id;
        const { summary, description, created_by,due_date,status,assignee} = req.body;
        const post = await Task.create({
            project:id,
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
        const user = await Task.find()
        return res.send(user)
    },
    update : async (req,res)=>{
        const { id } = req.params;
        const { summary, description, created_by,due_date,status,assignee}=req.body;
        const userByPost = await Task.findById(id).update({
            project:id,
            summary,
            description,
            created_by,
            due_date,
            status,
            assignee
        });
        res.send(userByPost);
    }
}