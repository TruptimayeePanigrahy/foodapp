const express = require("express")
const resturantroute = express.Router()


const { resturantmodel } = require("../models/resturantmodel")
/**
 * @swagger
 * components:
 *   schemas:
 *     resturantschema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: Object
 *         menu:
 *           type: Array
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: This route is get all the resturant from database.
 *     responses:
 *       200:
 *         description: The list of all the resturant.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resturantschema'
 */

resturantroute.get("/restaurants", async (req, res) => {
    try {
        let data = await resturantmodel.find()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

/**
 * @swagger
 * /api/restaurants/:id:
 *   get:
 *     summary: This route is get all the resturant from database.
 *     responses:
 *       200:
 *         description: The list of all the resturant.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resturantschema'
 */

resturantroute.get("/restaurants/:id", async (req, res) => {
    try {
        const {id}=req.params
        let data = await resturantmodel.findById({_id:id})
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})

/**
 * @swagger
 * /api/restaurants/:id/menu:
 *   get:
 *     summary: This route is get all the resturant from database.
 *     responses:
 *       200:
 *         description: The list of all the menu.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/resturantschema'
 */


resturantroute.get("/restaurants/:id/menu", async (req, res) => {
    try {
        const {id}=req.params
        let data = await resturantmodel.findById({_id:id})
        res.status(200).send(data.menu)
    } catch (error) {
        console.log(error)
    }
})

/**
 * @swagger
 * /api/restaurants/:id/menu:
 *  post:
 *      summary: To add a new resturant menu to the database
 *      tags: [posts]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/resturantschema'
 *      responses:
 *          200:
 *              description: The menu was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/resturantschema'
 *          500:
 *              description: Some server error
 */


resturantroute.post("/restaurants/:id/menu", async (req, res) => {
    try {
        const { id } = req.params
        const newdata= req.body
        let data = await resturantmodel.findById({_id:id })
       
        data.menu.push(newdata)
        await data.save()
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
})


resturantroute.post("/add", async (req, res) => {
    try {
        let data = req.body
        const newdata = new resturantmodel(data)
      await newdata.save()
res.status(201).send({"msg":"Resturant addedd successfully!!"})
    } catch (error) {
       console.log(error) 
    }
})

/**
* @swagger
* /api/restaurants/:id/menu/:id:
*   delete:
*     summary: To delete a menu from the database
*     tags: [posts]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/resturantschema'
*     responses:
*       200:
*         description: The menu was successfully deleted.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/resturantschema'
*       404:
*         description: The specified user ID does not exist.
*       500:
*          description: Some server error
*/

resturantroute.delete("/restaurants/:id/menu/:id", async (req, res) => {
   try {
       let { id,menuid} = req.params
       
       let data = await resturantmodel.findById({ _id: id })
       let menudata = data.menu
       console.log(menudata)
       console.log(data)
       let arr = menudata.filter((ele, ind) => {
           if (ele._id == menuid) {
               return false
           } else {
               true
           }
       })
       data.menu = arr
       await data.save()
       res.status(202).send({"msg":"menu deleted successfully!!"})
   } catch (error) {
    console.log(error)
   }
})


module.exports={resturantroute}