const {player} = require("../../models")

exports.getPlayers = async(req,res)=>{
    try {
        const {id} = req.params
        console.log(id);

       const players = await player.findAll({
           where:{
            idGame:id 
           },attributes:{
               exclude:["createdAt","updatedAt"]
           }
       })

        res.send({
            status:"success",
            players
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}