const express = require("express")
const orderroute = express.Router()
const {ordermodel}=require("../models/ordermodel")

/**
 * @swagger
 * components:
 *   schemas:
 *     orderschema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user:
 *           type: Object
 *         restaurant:
 *           type: Object
 *         totalPrice:
 *           type: Number
 *         deliveryAddress:
 *           type: Object
 *         status:
 *           type: Object
 */

/**
 * @swagger
 * /api/orders/:id:
 *   get:
 *     summary: This route is get all the orders from database.
 *     responses:
 *       200:
 *         description: The list of all the resturant.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/orderschema'
 */
orderroute.get("/orders/:id", async (req, res) => {
    try {
       let {id}=req.params
        let order=await ordermodel.findOne({_id:id})
        
        res.status(200).send({"order":order})
    } catch (error) {
        console.log(error)
    }
})
/**
 * @swagger
 * /api/orders:
 *  post:
 *      summary: To add a new resturant menu to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/orderschema'
 *      responses:
 *          200:
 *              description: The order was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/orderschema'
 *          500:
 *              description: Some server error
 */
orderroute.post("/orders", async (req, res) => {
    try {
        let payload=req.body
        let order=new ordermodel(payload)
        await order.save()
        res.status(200).send("order added")
    } catch (error) {
        console.log(error)
    }
})
/**
 * @swagger
 * /api/orders/:id:
 *   patch:
 *     summary: To update a user in the database
 *     tags: [posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/orderschema'
 *     responses:
 *       200:
 *         description: The order was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/orderschema'
 *       404:
 *         description: The specified user ID does not exist.
 *       500:
 *         description: Some server error
 */
orderroute.patch("/orders/:id", async (req, res) => {
    try {
        let {id}=req.params
        let {status}=req.body
        let order=await ordermodel.findOne({_id:id})
        order.status=status
        await order.save()
        
        res.status(200).send({"msg":"atatus uppdated"})
    } catch (error) {
        console.log(error)
    }
})





module.exports={orderroute}