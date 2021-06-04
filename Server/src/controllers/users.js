import Users from "../models/user";

class UsersController {
  // Get All
  async getAll(req, res,next) { 
    if (req.body) {
        try{
            let products = await Users.find({}).exec();
            return res.status(200).json(products);    
        }
        catch(err){
          return res.status(400).json({ error: err.message });
        }
    } else {
      return res.status(401).send({success: false, msg: 'Unauthorized. Please check the email address and password and try again.'});
    }
  };


  // Get by id
  async getById(req, res) {
    const _id=req.params.id;
    if(_id) {
    try {
        const obj = await Users.findById({_id});
        if (obj)
            return res.status(200).json(obj);
        else {  };
    } catch (error) {
      return res.status(404).json({ error: 'User not found' });
    }
  }
    else {
      return res.status(401).send({success: false, msg: 'Unauthorized.'});
     }
  }
 // Put by id
async put (req,res){
if (req.params.id && req.body) {
  try{
   const user = await Users.findById(req.params.id).exec();
   user.set(req.body);
   const result = await user.save();
   return res.status(200).json(result); 
  }  catch (err) {
    return res.status(400).json({success: false, msg: 'User does not exist!'});
} 
}
else {
 return res.status(401).send({success: false, msg: 'Unauthorized.'});
}
};

 // Delete by id
async delete (req, res) {
try {
    await Users.deleteOne({ _id: req.params.id }).exec();
   res.status(200).json({success: true, msg: ' User is deleted successfully.'});

} catch (err) {
  return res.status(400).json({success: false, msg: 'User does not exist!'});
}
}

}


export default new UsersController; 