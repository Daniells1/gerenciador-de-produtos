const DB = require("./../database/connection")
const Produto = require("./../models/Produto")
class ProdutoController{

    async index(req, res) {

        const messages = await req.flash("msg")
       
      
        res.render("produto/index", { messages });

    }

   async salvar(req, res) {
        
        let { nome, valor_compra, valor_venda, estoque_minimo, estoque_atual } = req.body

        let p = new Produto(nome, valor_compra, valor_venda, estoque_minimo, estoque_atual);
        let errors = p.validate()

        if(errors.length == 0){
        
        let sqlInsert = `insert into produtos values (null, '${nome}', ${valor_compra}, ${valor_venda},
        ${estoque_minimo}, ${estoque_atual}, now())`

        const con = await DB.connect()
        await con.execute(sqlInsert)
        await req.flash("msg", "Produto salvo com  sucesso!") 
        } else{
            await req.flash("msg", errors) 
        }
        res.redirect("/produtos/")
    }

    async buscar(req, res) {

        const messages = await req.flash("msg")
        const con = await DB.connect()
        const [rowsProdutos ] = await con.query("select * from produtos")

        res.render('produto/buscar' , { messages, produtos: rowsProdutos });

    }
    
    async editar(req, res) {
        const messages = await req.flash("msg")
        let id = req.params.id
        const con = await DB.connect()
        const [produtos ] = await con.query("select * from produtos where id = ?", [id]);
        if(produtos.length == 0) {
            await req.flash("msg", "Produto não encontrado!") 
            res.redirect("/produtos/")

        }

        let produto = produtos[0]
        res.render("produto/editar", { messages, produto });

    }

    async excluir(req, res) {
        
        let id = req.params.id
        const con = await DB.connect()
        await con.execute("delete from produtos where id = ?", [id])
        await req.flash("msg", "Produto excluído com  sucesso!") 
        res.redirect("/produtos/buscar")
        
    }
    
    async editarSave( req, res) {
        let { nome, valor_compra, valor_venda, estoque_minimo, estoque_atual, id } = req.body
        let p = new Produto(nome, valor_compra, valor_venda, estoque_minimo, estoque_atual)
       

        let errors = p.validate()

       

        if(errors.length == 0){
        
        let sqlUpdate = `update produtos set nome ='${nome}', valor_compra = ${valor_compra}, valor_venda = ${valor_venda},
        estoque_minimo = ${estoque_minimo}, estoque_atual = ${estoque_atual} where id =  ${id}`

        const con = await DB.connect()
        await con.execute(sqlUpdate)
        await req.flash("msg", "Produto salvo com  sucesso!") 
        } else{
            await req.flash("msg", errors) 
        }
        res.redirect("/produtos/editar/"+id)
    }

}

module.exports = new ProdutoController()