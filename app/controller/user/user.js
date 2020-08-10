const User = require('../../models/User');

module.exports = {
    create : async (req, res) =>{
        const { name,username,email,password } = req.body;
        const user = await User.create({
            name,
            username,
            email,
            password
        });

        return res.send(user)
    },

    postsByUser : async (req, res) => {
       const { id } = req.params;
       const proj = await User.findById(id).populate('project');
       const { id1 }=req.params;
       const  user = await User.findById(id1).populate('owner'); 
       res.send(proj.project);
       res.send(user.organization);

    },
    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },
    update : async (req,res)=>{
        const { id } = req.params;
        const { name,username,email,password }=req.body;
        const userByPost = await User.findById(id).update({
            name,
            username,
            email,
            password
        });
        res.send(userByPost);
    }
}