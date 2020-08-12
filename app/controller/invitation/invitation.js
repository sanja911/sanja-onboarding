const Post = require('../../models/Inv');
const User = require('../../models/User');
const Org = require('../../models/Organizaton');
module.exports = {
    create : async (req, result) => {

        console.log(req.params);
        user = req.params;
        id = user.id;
        const { name,user} = req.body;
        const post = await Post.create({
           
        });
        const us=await
        await post.save();

        const userById = await User.findById(id);

        userById.inv_id.push(post);
        await userById.save();

        return res.send(result);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('owner');
        res.send(userByPost);
    }
}