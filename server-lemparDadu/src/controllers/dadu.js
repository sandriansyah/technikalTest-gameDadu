const {dadu} = require("../../models")

exports.getdadu = async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id);

       const data = await dadu.findAll({
           where:{
            idPlayer:id 
           },attributes:{
               exclude:["createdAt","updatedAt"]
           }
       })

        res.send({
            status:"success",
            data
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}