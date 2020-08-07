const User = require('../../models/Owner');

module.exports = {
    create : async (req, res) =>{
        const { name, user } = req.body;
        const owner = await User.create({
            name,
            user,
           // created,
           // updated
        })

        return res.send(owner)
    },

    find : async (req, res) => {
        const user = await User.find()
        return res.send(user)
    },
    /*find_inv : async (req, res) => {
        const inv = await User.find()
        return res.send(inv)
    },*/
    postsByUser : async (req, res) => {
       const { id } = req.params;
       const user = await User.findById(id).populate('project');

        res.send(user.project);
    }
   /* InvByUser : async (req, res) => {
        const { id } = req.params;
        const inv = await User.findById(id).populate('invitation');
 
         res.send(inv.invitation);
     }*/
}
