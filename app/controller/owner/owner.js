const User = require('../../models/Owner');
const User1 = require('../../models/User');
module.exports = {
    create : async (req, res) =>{
        const { name, user } = req.body;
        user_id=req.params;
        id=user_id.id;
        const owner = await User.create({
            user_id:id,
            name,
            user,
            //created,
           // updated
        })
        await owner.save();
        const userById = await User1.findById(id);
        
        userById.user_id.push(owner);
        await userById.save();
        return res.send(userById);
    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },

    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await User1.findById(id).populate('user');
        res.send(userByPost);
    }

}
