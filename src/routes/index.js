const express = require('express')
const app = express()
const produtos = require("./produtos")
const controller = require("./../controller/IndexController")
const router = express.Router()

router.get("/", controller.index)

router.use("/produtos", produtos)

module.exports = router