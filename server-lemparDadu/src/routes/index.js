const express=require('express')

const router = express.Router()

const {auth} =require('../controllers/middlewere/authToken')
const {register,login} = require("../controllers/auth")
const {addGame} = require("../controllers/game")

const {getPlayers} = require("../controllers/player")

const {getdadu} = require("../controllers/dadu")

router.post("/register",register)
router.post("/login",login)

router.post("/game",addGame)

router.get("/players/:id",getPlayers)

router.get("/dadu/:id",getdadu)


module.exports= router 