const validator = require("validator")
class Produto{

    constructor(nome = "", valor_compra = 0, valor_venda = 0, estoque_minimo = 0, estoque_atual = 0) {
     
        this.nome = nome
        this.valor_compra = valor_compra 
        this.valor_venda = valor_venda
        this.estoque_minimo = estoque_minimo
        this.estoque_atual = estoque_atual
    
    }

    validate() {
        let errors = []

        validator.isEmpty( this.nome ) ? errors.push("Preencha o campo nome") : ""
        validator.isEmpty( this.valor_compra ) || !validator.isCurrency( this.valor_compra , { allow_negatives : false })? errors.push("Valor compra deve ser numérico e maior  que 0") : ""
        validator.isEmpty( this.valor_venda ) || !validator.isCurrency( this.valor_venda , { allow_negatives : false })? errors.push("Valor venda deve ser numérico e maior  que 0") : ""
        validator.isEmpty( this.estoque_minimo ) || !validator.isInt( this.estoque_minimo , { gt : 0 } )? errors.push("Estoque mínimo deve ser maior que 0") : ""
        validator.isEmpty( this.estoque_atual ) || !validator.isInt( this.estoque_atual , { gt : 0 } )? errors.push("Estoque atual deve ser maior que 0") : ""


        return errors
    }
}

module.exports = Produto