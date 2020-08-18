const Invitation = require('../models/Invitation');
const User = require('../models/User');
const Organizaton = require('../models/Organizaton');
module.exports = {
    create : async (req, res, err) => {

        console.log(req.params);
        //users = req.params;
        //id = users.id;
        //const { user_id}=req.body;
        const { user_id,name,user} = req.body;
        const post = await Invitation.create({
            user_id,

        });
        const org= await Organizaton.create({
            name,
            user,
            user_id
        })
        //User.findById(user_id).updateOne({
        //    $push:{org_id:org._id}});
        await post.save();
        const userById = await User.findById(user_id);
        userById.inv_id.push(post);
        userById.org_id.push(org);       
        await userById.save();
        if(err) console.log('Error Detected!', err);
        return res.send(userById);
        
    },
    find : async(res)=>{
    new Promise((resolve,reject)=>{
        Invitation.find(function(err,res){
            if(err) reject(err)
            resolve(res);
        })
    })
    .then(res=>console.log('Data :',res))
    .catch(err=>console.log('error',err))
    }
/*    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('owner');
        res.send(userByPost);
    }*/

}