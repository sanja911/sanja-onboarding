const Post = require('../../models/Project');
const User = require('../../models/Owner');
const Users = require('../../models/User');
const post=new Post()
module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        user = req.params;
        organization=req.params;
        id = user.id;

        const { proj_name, description} = req.body;
        const post = await Post.create({
            proj_name,
            description,
            user:id,
        });
        await post.save();

        const userByUser= await Users.findById(id)
        userByUser.project.push(post);
        await userByUser.save();
        return res.send(userByUser); 
    },

    find : async (req, res) => {
        const user = await Post.find()
        return res.send(user)
    },
    update : async (req,res)=>{
        const { id } = req.params;
        const {proj_name,description}=req.body;
        const userByPost = await Post.findById(id).update({
            proj_name,
            description,
            user:id,
        });
        res.send(userByPost);
    }
}