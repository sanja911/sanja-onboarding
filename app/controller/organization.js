const Organization = require('../models/Organization');
const User = require('../models/User');

module.exports = {
    create : async (req, res) =>{
        const { userId,name, user } = req.body;
      
        const organization = await Organization.create({
            userId,
            name,
            user
        })
  
        const userById = await User.findById(userId);
        userById.orgId.push(organization);
        await userById.save();
        return res.send(userById);
    },

    find : async (req, res) => {
        const { id } = req.params;
        const user = await Organization.findById(id)
        return res.send(user)
    },
    
    findAll : async(res)=>{
        const finds = await Organization.find();
        console.log('Data :', res)
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { name, user }=req.body;
        Organization.findById(id).update({
            name,
            user,
        },function(err){
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        });
   
    },

  delete: async(req) => {
    const {id}=req.params;
    new Promise((resolve)=>{
        User.find({orgId:id}).updateOne({$pull:{orgId:id}},(res)=>{
         resolve(res)
    })
  })
  .then(res=>console.log('Data :',res ,'Successful Delete'))
  .catch(err=>console.log('error :',err))
  .then(del=>Organization.findByIdAndDelete(id,() =>{
  return del;
  }))
}
}
