const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

const shopDetails = async(req,res) =>{
    try{
      const {email} = req.body;
      const shopData = await User.findOne({where:{email:email}});
      if(shopData){
        res.status(200).send({id:shopData.id,firstname:shopData.firstname,lastname:shopData.lastname,shopname:shopData.shopname,address:shopData.address,mobile:shopData.mobile});
      }else{
        res.status(400).send({message:"Went Wrong While Getting Shop Details"})
      }
    }catch(error){
        console.log(error);
        res.status(500).send({message:error});
    }
};

module.exports = {shopDetails};