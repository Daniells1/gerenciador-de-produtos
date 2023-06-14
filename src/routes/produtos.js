const express = require("express");
const app = express(); 
const router = express.Router();
const controller  = require("./../controller/ProdutoController")

router.get("/", controller.index);

router.post("/novo", controller.salvar);
router.get("/buscar", controller.buscar);
router.get("/editar/:id", controller.editar);
router.post("/editar", controller.editarSave);
router.get("/excluir/:id", controller.excluir);





module.exports = router;