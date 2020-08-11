const User = require('../../models/organization');
const User1 = require('../../models/User');
module.exports = {
    create : async (req, res) =>{
        const { name, user } = req.body;
        user_id=req.params;
        id=user_id.id;
        const organization = await User.create({
            user_id:id,
            name,
            user,
            //created,
           // updated
        })
        await organization.save();
        const userById = await User1.findById(id);
        
        userById.org_id.push(organization);
        await userById.save();
        return res.send(userById);
    },

    find : async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id)
        return res.send(user)
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { name, user }=req.body;
        User.findById(id).update({
            name,
            user,
        },function(err,post){
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        });
   
    }

   /* userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await User1.findById(id).populate('user');
        res.send(userByPost);
    }*/

}
