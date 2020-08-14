const Inv = require('../models/Inv');
const User = require('../models/User');
const Organizaton = require('../models/Organizaton');
module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        users = req.params;
        id = users.id;
        //const { user_id}=req.body;
        const { name,user,user_id} = req.body;
        const post = await Inv.create({
           user_id
        });
        const us=await Organizaton.create({
            name,
            user,
            user_id,
            users:id
        })
        await post.save();
        const userById = await User.findById(id);
        userById.inv_id.push(post);
       // userById.inv_id.push(us)        
        await userById.save();

        return res.send(userById);
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('owner');
        res.send(userByPost);
    }

}