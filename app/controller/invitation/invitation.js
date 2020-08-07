const Post = require('../../models/Inv');
const User = require('../../models/Owner');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        user = req.params;
        id = user.id;
        const { description,inv_date} = req.body;
        const post = await Post.create({
            description,
            inv_date
        });
        await post.save();

        const userById = await User.findById(id);

        userById.inv_id.push(post);
        await userById.save();

        return res.send(userById);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('owner');
        res.send(userByPost);
    }
}