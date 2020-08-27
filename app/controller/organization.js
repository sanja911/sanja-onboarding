const Organization = require('../models/Organization');
const User = require('../models/User');

module.exports = {
    create : async (req, res) =>{
        const {name} = req.body;
        const users = {'role':req.body.role, 'id':req.body.id}; 
        const id = req.body.id
        const organization = await Organization.create({
            name,
            users
        }) 
        const userById = await User.findById(id);
        userById.orgId.push(organization);
        //userById.role.push(organization);
        await userById.save();
        return res.json(userById);
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
    update : async (req,res, next)=>{
        const { id } = req.params;
        const {name}=req.body;
        const userId = {'role':req.body.role, 'id':req.body.id}; 
        new Promise ((resolve)=>{
           Organization.findById(id).updateOne({
                name,
                userId,
            })
            resolve(res)
        })
        .then(res=>res.json({message:'Data Successful Updated'}))
        .catch(err=>console.log(err))
    },


  delete: async(req,res) => {
    const {id}=req.params;
    new Promise((resolve)=>{
        User.find({orgId:id}).updateOne({$pull:{orgId:id}},(res)=>{
         resolve(res)
    })
  })
  .then(res=>res.json({message:'Data Successful Deleted'}))
  .catch(err=>console.log('error :',err))
  .then(del=>Organization.findByIdAndDelete(id,() =>{
  return del;
  })) 
}
}
