const Post = require('../../models/Project');
const User = require('../../models/Owner');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        user = req.params;
        id = user.id;
        const { proj_name, description} = req.body;
        const post = await Post.create({
            proj_name,
            description,
            user:id
//            created,
 //           updated
        });
        await post.save();

        const userById = await User.findById(id);

        userById.project.push(post);
        await userById.save();

        return res.send(userById);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('owner');
        res.send(userByPost);
    }
}