const {game,player,dadu} = require("../../models")

exports.addGame = async(req,res)=>{
    try {
        const {number} = req.body 
        console.log(number); 
         

        const createGame = await game.create({
            playerOfNumber: number,
            numberOfDadu: number,
            // idUser : req.user.id
        })  

        const findGame = await game.findOne({
            where:{  
                id:createGame.id
            },attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })

        for (let i = 1; i <= number; i++) {
            const createPlayer = await player.create({
                playerName: "player"+ i,
                idGame: findGame.id
            })

            for (let n = 1; n < number; n++) {
                const createDadu = await dadu.create({
                    idPlayer: createPlayer.id,
                    daduName:"dadu"+n,
                });
                
            }
        }


        // const createGame = await game.create(data)

        res.send({
            status:"success",
            findGame
        })
    } catch (error) {
        console.log(error);
        res.send({
            status:"failed",
            message:"server error"
        })
    }
}