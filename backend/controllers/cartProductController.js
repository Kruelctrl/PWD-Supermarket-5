// import connection / database
const db = require('../database')

const { generateQuery, asyncQuery } = require('../helpers/queryHelp')

module.exports = {
    getCartProduct: async (req, res) => {
        try {
            const CartProduct = 
            'select od.id_order, os.id_user, os.order_number, pr.product_name, pr.image, od.product_qty, pr.product_stock, pr.price_sell, os.total_payment, osr.status from order_detail od join order_status os on od.order_number = os.order_number join products pr on od.id_product = pr.id_product join order_status_referance osr on os.status = osr.idorder_status_referance join user u on os.id_user = u.id_user where os.status = 1 group by od.order_number'

            const result = await asyncQuery(CartProduct)

            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    deleteCartProduct : async (req, res) => {
        const { id_product, order_number, quantity } = req.body
        try {
            const deleteItem = `DELETE FROM order_detail SET quantity = ${db.escape(quantity)}
            WHERE id_product = ${parseInt(id_product)} AND order_number = '${order_number}'`
            await asyncQuery(deleteItem)

            res.status(200).send(`cart deleted for id_product ${id_product}`)
        }
        catch (err) {
            console.log(err)
            res.status(500).send(err)
        }
    },
    editCart: async (req, res) => {
        const { id_product, order_number, quantity } = req.body

        try {
            const editQty = `UPDATE order_detail SET quantity = ${db.escape(quantity)}
            WHERE id_product = ${parseInt(id_product)} AND order_number = '${order_number}'`
            await asyncQuery(editQty)

            res.status(200).send(`cart edited id_product ${+id_product} success`)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    checkout: async(req, res) => {
        try{

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    getHistory: async(req, res) => {
        try{

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
}