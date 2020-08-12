const Post = require('../../models/Inv');
const User = require('../../models/User');
const Org = require('../../models/organization')

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        user = req.params;
        id = user.id;
        if(Org.find({user_id:id},{user:'Manager'}||{user:'Owner'})){
            const { description,inv_date} = req.body;
            const { name,user} = req.body;
            const orga = await Org.create({
                user_id:id,
                name,
                user                
            })
            const post = await Post.create({
                description,
                inv_date
            });
            await post.save();
            await orga.save()
            const userById = await User.findById(id);
            userById.inv_id.push(orga);
            userById.inv_id.push(post);
            await userById.save();
    
            return res.send(userById);
        }else{
            res.send(err)
        }
      
    },
    userByPost : async (req,res)=>{
        const { id } = req.params;
        const userByPost = await Post.findById(id).populate('organization');
        res.send(userByPost);
    }
}