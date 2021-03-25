const { generateQuery, asyncQuery } = require('../helper/queryHelp')

const db = require('../database')

module.exports = {
    getAllproducts: async (req, res) => {
        const queryProduct = `SELECT * FROM products`

        db.query(queryProduct, (err, result) => {
            if (err) return res.status(500).send(err)

            res.status(200).send(result)
        })
    },
    getProductPriceUp: async (req, res) => {
        try {
            const queryPriceUp = `SELECT * FROM products
            ORDER BY price_sell ASC`
            const result = await asyncQuery(queryPriceUp)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getProductPriceDown: async (req, res) => {
        try {
            const queryPriceDown = `SELET * FROM products
            ORDER BY price_sell DESC`
            const result = await asyncQuery(queryPriceDown)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getProductByCateDrink: async (req, res) => {
        try {
            const querySoftDrink = `SELECT * FROM products WHERE product_category = 1`
            const result = await asyncQuery(querySoftDrink)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getProductByCateChips: async (req, res) => {
        try {
            const queryChips = `SELECT * FROM products WHERE product_category = 2`
            const result = await asyncQuery(queryChips)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getProductByCateChoco: async (req, res) => {
        try {
            const queryChoco = `SELECT * FROM products WHERE product_category = 3`
            const result = await asyncQuery(queryChoco)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    getProductByCateCandy: async (req, res) => {
        try {
            const queryCandy = `SELECT * FROM products WHERE product_category = 4`
            const result = await asyncQuery(queryCandy)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
        
    }
}
