const Invitation = require('../models/Invitation');
const User = require('../models/User');
const Organization = require('../models/Organization');

module.exports = {
    create : async (req, res, err) => {
        const { userId,name} = req.body;
        const users = {'role':req.body.role, 'userId':req.body.userId}; 
        const invitation = await Invitation.create({
            userId,
        });
        const organization= await Organization.create({
            name,
            users,
        })
     
        const userById = await User.findById(userId);
        userById.invId.push(invitation);
        userById.orgId.push(organization);       
        await userById.save();
        if(err) console.log('Error Detected!', err);
        return res.json(invitation);
        
    },
    find : async(req,res)=>{
    const invitation= await Invitation.find();
    return res.json(invitation)
}
}