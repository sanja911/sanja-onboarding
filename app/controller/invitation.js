const Invitation = require('../models/Invitation');
const User = require('../models/User');
const Organization = require('../models/Organization');
module.exports = {
    create : async (req, res, err) => {

        console.log(req.params);
     
        const { userId,name,user} = req.body;
        const invitation = await Invitation.create({
            userId,

        });
        const organization= await Organization.create({
            name,
            user,
            userId
        })
     
        const userById = await User.findById(userId);
        userById.invId.push(invitation);
        userById.orgId.push(organization);       
        await userById.save();
        if(err) console.log('Error Detected!', err);
        return res.send(userById);
        
    },
    find : async(res)=>{
    new Promise((resolve)=>{
        Invitation.find(function(res){
            resolve(res);
        })
    })
    .then(res=>console.log('Data :',res))
    .catch(err=>console.log('error',err))
    }
}