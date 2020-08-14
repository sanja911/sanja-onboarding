const Organizaton = require('../models/Organizaton');
const User = require('../models/User');
module.exports = {
    create : async (req, res) =>{
        const { id,name, user } = req.body;
        //user_id=req.params;
        //id=user_id.id;
        const organization = await User.create({
            id,
            name,
            user
        })
        await organization.save();
        const userById = await Organizaton.findById(id);
        userById.org_id.push(organization);
        await userById.save();
        return res.send(userById);
    },

    find : async (req, res) => {
        const { id } = req.params;
        const user = await Organizaton.findById(id)
        return res.send(user)
    },
    update : async (req,res,next)=>{
        const { id } = req.params;
        const { name, user }=req.body;
        Organizaton.findById(id).update({
            name,
            user,
        },function(err){
            if(err) return next(err);
            res.json({message:'Data Successful Updated'})
        });
   
    },

  delete: async(req) => {
    const {id}=req.params;
    new Promise((resolve,reject)=>{
        Organizaton.find({org_id:id}).updateOne({$pull:{org_id:id}},(err)=>{
            if (err) reject(err);
            User.findByIdAndDelete(id, (err,res)=>{
                if(err) reject(err)
                resolve(res)
        });
    })
  })
  .then(res=>console.log('Data :',res ,'Successful Delete'))
  .catch(err=>console.log('error :',err))
}
}
