const Post = require('../../models/Project');
const Users = require('../../models/User');
const { NotExtended } = require('http-errors');
const post=new Post()
module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        user = req.params;
        organization=req.params;
        id = user.id;

        const { proj_name, description} = req.body;
        const post = await Post.create({
            proj_name,
            description,
            user:id,
        });
        await post.save();

        const userByUser= await Users.findById(id)
        userByUser.project.push(post);
        await userByUser.save();
        return res.send(userByUser); 
    },

    find : async (req, res) => {
        const {id}=req.params;
        const user = await Post.findById(id);
        return res.send(user)
    },
    update : async (req,res, next)=>{
        const { id } = req.params;
        const {proj_name,description}=req.body;
        Post.findById(id).update({
            proj_name,
            description,
            user:id,
        },function(err,post){
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        })
    },
   
   delete : async (req, res, next) => {
        const {id}=req.params;
        Users.find({project:id}).updateOne({
            $pull:{project:id}
        },function(err){
            if(err){
                res.send(err)
            }else{
                Post.findByIdAndDelete(id ,function(err,result){
                    if(err){
                        res.send(err)
                    }else{
                        res.send(result)
                    }
                })
            }
        } );
    }  
}