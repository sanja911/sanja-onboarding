const Organization = require('../models/Organization');
const User = require('../models/User');

module.exports = {
    create : async (req, res) =>{
        const {name} = req.body;
        const users = {'role':req.body.role, 'userId':req.body.userId}; 
        const userId = req.body.userId
        const organization = await Organization.create({
            name,
            users
        }) 
        const userById = await User.findById(userId);
        userById.orgId.push(organization);
        await userById.save();
        return res.json(organization);
    },

    find : async (req, res) => {
        const { id } = req.params;
        const user = await Organization.findById(id)
        return res.json(user)
    },
    
    findAll : async(req,res)=>{
        const finds = await Organization.find();
        return res.json(finds);
    },
    update : async (req,res)=>{
        const { id } = req.params;
        const {name}=req.body;
        const users = {'role':req.body.role, 'userId':req.body.userId}; 
        await Organization.findOneAndUpdate({_id:id},{$set:req.body,users});
        const viewById = await Organization.findById(id)
        return res.json(viewById);
    },

  delete: async(req,res)=>{
    const {id}=req.params;
    new Promise((resolve,reject)=>{
        Organization.findOneAndDelete({_id:id},(err,res)=>{
            if(err) reject(err)
            resolve(res)
        })
        .then(del=>User.find({orgId:id}).updateOne({$pull:{orgId:id}},(err,next)=>{
            if(err) next(err)
            return del
        }))
        .catch(err=>console.log('error',err))
        .then((result)=>{
            return res.json({message:"Data "+id+ " Successful Deleted"})
        })
    })}
}
