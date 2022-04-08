const {user} = require("../../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.register= async (req,res)=>{

    console.log(req.body); 
    try{
        const checkEmail = await user.findOne({
            where:{
                email:req.body.email
            }
        })

        if(checkEmail){
            return res.send({
                status:"failed",
                message:"email already used"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const createUser = await user.create({
            username: req.body.username,
            email: req.body.email,
            password:hashedPassword
        })

        res.status(200).send({
            status:"success",
            data:{
                id: createUser.id,
                username:createUser.fullName,
                email: createUser.email,
            }
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

exports.login= async (req,res)=>{

    try{    
        
        const findingUser = await user.findOne({
            where:{
                email:req.body.email
            },
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        })
        
        const comparePassword = await bcrypt.compare(req.body.password,findingUser.password)

        if(!comparePassword){
            res.status(400).send({
                status:"failed",
                message:"your email and password is invalid"
            })
        }

        const dataToken = {
            id:findingUser.id,
            username:findingUser.fullName,
            email:findingUser.email,
        }

        const SEKRET_KEY = process.env.TOKEN_KEY
        const token = jwt.sign(dataToken,SEKRET_KEY)

        res.status(200).send({
            data:{
                id:findingUser.id,
                username: findingUser.fullName,
                email: findingUser.email,
                token
            }
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            status:"failed",
            message:"server error"
        })
    }
}

