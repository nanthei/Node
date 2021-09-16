const jwt = require('jsonwebtoken');
const User = require('../model/user');

const auth = async (req, res, next)=>{
try{
const token = req.header('Authorization').replace('Bearer ','');
const decoded = jwt.verify(token,'Kz585++64');
const user = await User.findOne({_id:decoded._id, 'tokens:token':token});
if(!user){
    throw new Error('auth nepavyko');
}
req.token = token;
req.user = user;
next();
}catch(e){
res.status(401).send({error:'prasome prisijungti'});
}
};

module.exports = auth;